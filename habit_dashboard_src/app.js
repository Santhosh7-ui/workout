// Data & State
const inspirationBooks = [
    { title: "Atomic Habits", author: "James Clear", quote: "You do not rise to the level of your goals. You fall to the level of your systems.", cover: "https://covers.openlibrary.org/b/id/12641042-M.jpg" },
    { title: "The Power of Habit", author: "Charles Duhigg", quote: "The Golden Rule of Habit Change: You can't extinguish a bad habit, you can only change it.", cover: "https://covers.openlibrary.org/b/id/10522521-M.jpg" },
    { title: "Deep Work", author: "Cal Newport", quote: "Clarity about what matters provides clarity about what does not.", cover: "https://covers.openlibrary.org/b/id/8254325-M.jpg" },
    { title: "Can't Hurt Me", author: "David Goggins", quote: "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.", cover: "https://covers.openlibrary.org/b/id/8381861-M.jpg" }
];

let habits = JSON.parse(localStorage.getItem('myHabits')) || [];
let currentTheme = localStorage.getItem('theme') || 'dark-theme';

// DOM Elements
const bodyKey = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const inspirationContent = document.getElementById('inspiration-content');
const todoList = document.getElementById('todo-list');
const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const matrixContainer = document.getElementById('matrix-container');

// Progress
const dailyProgressText = document.getElementById('daily-progress-text');
const dailyProgressFill = document.getElementById('daily-progress-fill');

// Restored Analytics
const statsTableContainer = document.getElementById('stats-table-container');
const barChartContainer = document.getElementById('bar-chart-container');

// Advanced Charts
const dailyPolarChart = document.getElementById('daily-polar-chart');
const polarStats = document.getElementById('polar-stats');
const weeklyLineChart = document.getElementById('weekly-line-chart');
const weeklyStats = document.getElementById('weekly-stats');
const monthlySplineChart = document.getElementById('monthly-spline-chart');
const monthlyStats = document.getElementById('monthly-stats');

function init() {
    if (currentTheme === 'light-theme') bodyKey.classList.add('light-theme');
    updateThemeIcon();
    renderInspiration();
    renderAll();
}

function renderAll() {
    renderHabits();
    renderDailyProgress();
    renderMonthlyMatrix();
    renderRestoredAnalytics();

    requestAnimationFrame(() => {
        renderDailyPolar();
        renderWeeklyLine();
        renderMonthlySpline();
    });
}

function getTodayString() { return new Date().toISOString().split('T')[0]; }
function getFormattedDate(year, month, day) { return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }

// --- 1. HABITS & EDIT ---
function renderHabits() {
    todoList.innerHTML = '';
    const today = getTodayString();
    habits.forEach((habit) => {
        const isCompleted = habit.completedDates.includes(today);
        const li = document.createElement('li');
        li.className = 'todo-item-container';
        if (habit.isEditing) {
            li.innerHTML = `<div class="todo-item editing"><input type="text" class="edit-input" id="edit-${habit.id}" value="${habit.text}" /><button class="icon-btn" onclick="saveEdit(${habit.id})"><span class="material-icons-round">check</span></button></div>`;
            setTimeout(() => document.getElementById(`edit-${habit.id}`).focus(), 10);
        } else {
            li.innerHTML = `<div class="todo-item ${isCompleted ? 'completed' : ''}"><div class="checkbox-round" onclick="toggleHabitToday(${habit.id})"><span class="material-icons-round" style="font-size:16px; color:white; display:${isCompleted ? 'block' : 'none'}">check</span></div><span onclick="toggleHabitToday(${habit.id})">${habit.text}</span></div><div class="actions"><button class="icon-btn" onclick="enableEdit(${habit.id})"><span class="material-icons-round">edit</span></button><button class="icon-btn" onclick="deleteHabit(${habit.id})"><span class="material-icons-round">delete_outline</span></button></div>`;
        }
        todoList.appendChild(li);
    });
}
window.enableEdit = function (id) { habits = habits.map(h => h.id === id ? { ...h, isEditing: true } : h); renderHabits(); }
window.saveEdit = function (id) { const i = document.getElementById(`edit-${id}`); if (i && i.value.trim()) { habits = habits.map(h => h.id === id ? { ...h, text: i.value.trim(), isEditing: false } : h); saveAndRender(); } }

// --- 2. DAILY PROGRESS ---
function renderDailyProgress() {
    if (habits.length === 0) { dailyProgressText.textContent = "0/0 Completed"; dailyProgressFill.style.width = "0%"; return; }
    const today = getTodayString();
    let count = 0;
    habits.forEach(h => { if (h.completedDates.includes(today)) count++; });
    const pct = Math.round((count / habits.length) * 100);
    dailyProgressText.textContent = `${count}/${habits.length} Completed Today`;
    dailyProgressFill.style.width = `${pct}%`;
}

// --- 3. MATRIX ---
function renderMonthlyMatrix() {
    if (habits.length === 0) { matrixContainer.innerHTML = ''; return; }
    const now = new Date(); const y = now.getFullYear(); const m = now.getMonth(); const dInM = new Date(y, m + 1, 0).getDate();
    let html = '<table class="matrix-table"><thead><tr><th>Habit</th>';
    for (let i = 1; i <= dInM; i++) html += `<th>${i}</th>`;
    html += '</tr></thead><tbody>';
    habits.forEach(h => {
        html += `<tr><td>${h.text}</td>`;
        for (let d = 1; d <= dInM; d++) {
            const date = getFormattedDate(y, m, d);
            const isC = h.completedDates.includes(date);
            html += `<td><input type="checkbox" class="matrix-checkbox" ${isC ? 'checked' : ''} onchange="toggleDate(${h.id},'${date}')" ${d > now.getDate() ? 'disabled' : ''}></td>`;
        }
        html += '</tr>';
    });
    matrixContainer.innerHTML = html + '</tbody></table>';
}

// --- 4. EXPORT ---
window.exportData = function () {
    let csv = "data:text/csv;charset=utf-8,Habit,Date Completed\n";
    habits.forEach(h => { h.completedDates.forEach(d => { csv += `"${h.text}",${d}\n`; }); });
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); link.setAttribute("download", `habit_tracker_${getTodayString()}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// --- 5. ANALYTICS ---
function renderRestoredAnalytics() {
    const stats = getHabitStats(30);
    if (stats.length === 0) { statsTableContainer.innerHTML = ''; barChartContainer.innerHTML = ''; return; }
    let tableHtml = '<table class="stats-table">';
    stats.forEach(s => { tableHtml += `<tr><td>${s.name}</td><td class="cell-val">${s.percentage}%</td></tr>`; });
    statsTableContainer.innerHTML = tableHtml + '</table>';
    let barHtml = '';
    stats.forEach(s => { barHtml += `<div class="bar-row"><div style="width:100px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${s.name}</div><div class="bar-bg"><div class="bar-fill" style="width:${s.percentage}%"></div></div><div>${s.percentage}%</div></div>`; });
    barChartContainer.innerHTML = barHtml;
}

function renderDailyPolar() {
    if (habits.length === 0) { dailyPolarChart.innerHTML = ''; return; }
    const today = getTodayString();
    let completed = 0; habits.forEach(h => { if (h.completedDates.includes(today)) completed++; });
    const pending = habits.length - completed;
    const radius = 80; const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((completed / habits.length) * circumference);
    const color = offset === circumference ? 'var(--text-secondary)' : 'var(--accent-color)';

    const svg = `
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="${radius}" fill="none" stroke="var(--border-color)" stroke-width="15" />
        <circle cx="100" cy="100" r="${radius}" fill="none" stroke="${color}" stroke-width="15" 
                stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 100 100)" stroke-linecap="round" />
        <text x="100" y="95" text-anchor="middle" fill="var(--text-primary)" font-size="28" font-weight="bold">${Math.round((completed / habits.length) * 100)}%</text>
        <text x="100" y="120" text-anchor="middle" fill="var(--text-secondary)" font-size="12">Daily Goal</text>
    </svg>`;
    dailyPolarChart.innerHTML = svg;

    // Updated Stats with explicit text
    polarStats.innerHTML = `
        <div class="stat-item"><span class="stat-val" style="color:var(--success)">${completed}</span><span>Completed</span></div>
        <div class="stat-item"><span class="stat-val" style="color:var(--text-secondary)">${pending}</span><span>Pending</span></div>
    `;
}

function renderWeeklyLine() {
    const data = getLastDaysData(7);
    const w = 300, h = 150, p = 20;
    const step = (w - p * 2) / 6;
    let path = `M ${p} ${h - p}`;
    let dots = '';
    let totalPct = 0;
    data.forEach((d, i) => {
        totalPct += d.pct;
        const x = p + (i * step);
        const y = (h - p) - ((d.pct / 100) * (h - p * 2));
        if (i === 0) path = `M ${x} ${y}`; else path += ` L ${x} ${y}`;
        dots += `<circle cx="${x}" cy="${y}" r="3" fill="var(--accent-color)" />`;
    });
    weeklyLineChart.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${path}" fill="none" stroke="var(--accent-color)" stroke-width="2"/>${dots}</svg>`;

    // FOCUS ANALYSIS: Find lowest completion habit in last 7 days
    const focusHabit = getWeakestHabit(7);

    weeklyStats.innerHTML = `
        <div class="stat-item"><span class="stat-val">${Math.round(totalPct / 7)}%</span><span>7-Day Avg</span></div>
        <div class="stat-item" style="text-align:right;">
            <span class="stat-val" style="color:var(--danger); font-size:1rem;">${focusHabit}</span>
            <span>Needs Focus</span>
        </div>
    `;
}

function getWeakestHabit(days) {
    // Count completions for each habit in last 'days'
    if (habits.length === 0) return "N/A";
    const counts = habits.map(h => {
        let count = 0;
        for (let i = 0; i < days; i++) {
            const d = new Date(); d.setDate(d.getDate() - i);
            if (h.completedDates.includes(d.toISOString().split('T')[0])) count++;
        }
        return { name: h.text, count: count };
    });
    // Sort by count asc
    counts.sort((a, b) => a.count - b.count);
    return counts[0].name;
}

function renderMonthlySpline() {
    const data = getLastDaysData(30); if (data.length < 2) return;
    const w = 600, h = 250, p = 30;
    const step = (w - p * 2) / (data.length - 1);
    const points = data.map((d, i) => { return [p + (i * step), (h - p) - ((d.pct / 100) * (h - p * 2))]; });
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1]; const p1 = points[i];
        const cp1x = p0[0] + (p1[0] - p0[0]) / 2; const cp2x = p0[0] + (p1[0] - p0[0]) / 2;
        d += ` C ${cp1x} ${p0[1]}, ${cp2x} ${p1[1]}, ${p1[0]} ${p1[1]}`;
    }
    const dArea = `${d} L ${w - p} ${h - p} L ${p} ${h - p} Z`;
    let total = 0; data.forEach(x => total += x.pct);
    monthlySplineChart.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="splineGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="var(--accent-color)" stop-opacity="0.2"/><stop offset="100%" stop-color="var(--accent-color)" stop-opacity="0"/></linearGradient></defs><path d="${dArea}" fill="url(#splineGradient)" stroke="none" /><path d="${d}" fill="none" stroke="var(--accent-color)" stroke-width="2" /></svg>`;
    monthlyStats.innerHTML = `<div class="stat-item"><span class="stat-val">${Math.round(total / 30)}%</span><span>Consistency Score</span></div><div class="stat-item"><span class="stat-val">30</span><span>Days Tracked</span></div>`;
}

function getHabitStats(days) {
    const now = new Date(); const y = now.getFullYear(); const m = now.getMonth(); const dInM = new Date(y, m + 1, 0).getDate();
    return habits.map(h => {
        let count = 0; h.completedDates.forEach(d => { if (new Date(d).getMonth() === m) count++; });
        return { name: h.text, percentage: Math.round((count / dInM) * 100) };
    });
}
function getLastDaysData(days) {
    const arr = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i); const s = d.toISOString().split('T')[0];
        let c = 0; habits.forEach(h => { if (h.completedDates.includes(s)) c++; });
        arr.push({ date: s, pct: habits.length ? (c / habits.length) * 100 : 0 });
    }
    return arr;
}
function renderInspiration() {
    const b = inspirationBooks[new Date().getDate() % inspirationBooks.length];
    // FIXED: Added Quote back
    inspirationContent.innerHTML = `
        <img src="${b.cover}" class="book-cover"/>
        <div>
            <h3>${b.title}</h3>
            <p style="color:var(--text-secondary); margin-bottom:1rem;">${b.author}</p>
            <div style="font-style:italic; border-left:2px solid var(--accent-color); padding-left:10px;">"${b.quote}"</div>
        </div>
    `;
}
function addHabit() { const v = habitInput.value.trim(); if (v) { habits.push({ id: Date.now(), text: v, completedDates: [] }); saveAndRender(); habitInput.value = ''; } }
window.toggleHabitToday = function (id) { toggleDate(id, getTodayString()); }
window.toggleDate = function (id, d) { habits = habits.map(h => { if (h.id === id) { const x = h.completedDates; return { ...h, completedDates: x.includes(d) ? x.filter(y => y !== d) : [...x, d] }; } return h; }); saveAndRender(); }
window.deleteHabit = function (id) { habits = habits.filter(h => h.id !== id); saveAndRender(); }
function saveAndRender() { localStorage.setItem('myHabits', JSON.stringify(habits)); renderAll(); }
addBtn.addEventListener('click', addHabit);
themeToggleBtn.addEventListener('click', () => { bodyKey.classList.toggle('light-theme'); updateThemeIcon(); });
function updateThemeIcon() { themeToggleBtn.querySelector('span').textContent = bodyKey.classList.contains('light-theme') ? 'dark_mode' : 'light_mode'; }
window.addEventListener('resize', () => { renderDailyPolar(); renderWeeklyLine(); renderMonthlySpline(); });
init();
