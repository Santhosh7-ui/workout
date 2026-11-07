// Aegis Clinical & Habit Engine - Two-Way Reactive Synchronization
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DEFAULT CLINICAL HABITS (Pre-seeded for Santhosh's Profile) ---
  const DEFAULT_HABITS = [
    { id: 101, key: 'habit_steps', text: 'Daily 6,000 Steps (Burn ~276 kcal)', completedDates: [] },
    { id: 102, key: 'habit_skipping', text: 'Skipping Rope HIIT (Max 400 Skips in 100-skip sets)', completedDates: [] },
    { id: 103, key: 'habit_workout_day', text: "Complete Today's Scheduled Workout Routine", completedDates: [] },
    { id: 104, key: 'habit_water', text: 'Drink 3.5 Litres Filtered Water', completedDates: [] },
    { id: 105, key: 'habit_dinner', text: 'Finish Dinner by 7:30 PM (13hr fast)', completedDates: [] },
    { id: 106, key: 'habit_liver_diet', text: 'Zero Alcohol & Zero Deep-Fried Foods', completedDates: [] }
  ];

  // Inspiration Quotes
  const inspirationBooks = [
    { title: "Atomic Habits", author: "James Clear", quote: "You do not rise to the level of your goals. You fall to the level of your systems." },
    { title: "The Power of Habit", author: "Charles Duhigg", quote: "The Golden Rule of Habit Change: You can't extinguish a bad habit, you can only change it." },
    { title: "Deep Work", author: "Cal Newport", quote: "Clarity about what matters provides clarity about what does not." },
    { title: "Can't Hurt Me", author: "David Goggins", quote: "You are in danger of living a life so comfortable, that you will die without realizing your true potential." }
  ];

  // --- 2. EXERCISE DATABASE (Attached Chart + 2x 4kg Dumbbells) ---
  const EXERCISE_DATABASE = [
    // UPPER BODY
    {
      id: 'upper_shoulder_press',
      category: 'upper',
      name: 'Shoulder Press (2x 4kg Dumbbells)',
      reps: '12 Reps',
      sets: 3,
      rest: '45s rest',
      load: '2x 4kg Dumbbells',
      target: 'Deltoids & Triceps',
      cue: 'Press dumbbells overhead with palms facing inward. Keep core braced to protect lumbar spine.'
    },
    {
      id: 'upper_seated_row',
      category: 'upper',
      name: 'Seated / Bent Row (2x 4kg Dumbbells)',
      reps: '12–15 Reps',
      sets: 3,
      rest: '45s rest',
      load: '2x 4kg Dumbbells',
      target: 'Upper Back & Lats',
      cue: 'Pull elbows back toward hips. Squeeze shoulder blades together for 1 full second at the peak.'
    },
    {
      id: 'upper_push_up',
      category: 'upper',
      name: 'Push Up (Standard or Knee)',
      reps: '10–12 Reps',
      sets: 3,
      rest: '60s rest',
      load: 'Bodyweight',
      target: 'Chest & Core',
      cue: 'Elbows at a 45-degree angle to torso. Keep straight body line from head to heels.'
    },
    {
      id: 'upper_tricep_dips',
      category: 'upper',
      name: 'Tricep Dips (Bench / Chair)',
      reps: '12 Reps',
      sets: 3,
      rest: '45s rest',
      load: 'Bodyweight',
      target: 'Triceps & Shoulders',
      cue: 'Keep back close to chair edge. Lower until elbows reach 90 degrees, then push through palms.'
    },

    // LOWER BODY
    {
      id: 'lower_squat',
      category: 'lower',
      name: 'Squat (Optional 2x 4kg at Shoulders)',
      reps: '15 Reps',
      sets: 3,
      rest: '45s rest',
      load: 'Bodyweight or 8kg total',
      target: 'Quadriceps & Glutes',
      cue: 'Feet shoulder-width apart. Push hips back as if sitting in a chair. Recruits large muscle glycogen to burn glucose.'
    },
    {
      id: 'lower_lunge',
      category: 'lower',
      name: 'Alternating Lunge',
      reps: '10 Reps / Leg',
      sets: 3,
      rest: '45s rest',
      load: 'Bodyweight (or 4kg in hands)',
      target: 'Glutes, Quads & Balance',
      cue: 'Take a generous step forward. Keep front knee behind toes and torso upright.'
    },
    {
      id: 'lower_bridge',
      category: 'lower',
      name: 'Glute Bridge (4kg on Pelvis)',
      reps: '15 Reps',
      sets: 3,
      rest: '30s rest',
      load: '4kg on Hips',
      target: 'Glutes & Hamstrings',
      cue: 'Drive through heels to lift hips until thighs align with torso. Zero knee/foot impact.'
    },
    {
      id: 'lower_1leg_deadlift',
      category: 'lower',
      name: '1-Leg Deadlift (Single 4kg Dumbbell)',
      reps: '10 Reps / Leg',
      sets: 3,
      rest: '45s rest',
      load: '4kg in Opposite Hand',
      target: 'Hamstrings, Glutes & Ankle Stability',
      cue: 'Hinge at hip while extending rear leg straight back. Maintain flat back throughout.'
    },

    // CORE
    {
      id: 'core_crunch',
      category: 'core',
      name: 'Abdominal Crunch',
      reps: '15 Reps',
      sets: 3,
      rest: '30s rest',
      load: 'Bodyweight',
      target: 'Rectus Abdominis',
      cue: 'Curl ribcage down toward pelvis. Do not pull on neck; pause at the top of contraction.'
    },
    {
      id: 'core_plank',
      category: 'core',
      name: 'Forearm Plank',
      reps: '45 Seconds',
      sets: 3,
      rest: '45s rest',
      load: 'Isometric',
      target: 'Deep Transverse Abdominis',
      cue: 'Squeeze glutes and press floor away with elbows. Maintain rigid neutral spine.'
    },
    {
      id: 'core_plank_twist',
      category: 'core',
      name: 'Plank Twist / Side Plank Reach',
      reps: '10 Reps / Side',
      sets: 3,
      rest: '45s rest',
      load: 'Bodyweight',
      target: 'Obliques & Shoulder Stability',
      cue: 'Rotate torso smoothly, reaching top arm toward ceiling, then tuck under body.'
    },
    {
      id: 'core_russian_twist',
      category: 'core',
      name: 'Russian Twist (with 4kg Dumbbell)',
      reps: '20 Total (10/side)',
      sets: 3,
      rest: '30s rest',
      load: '1x 4kg Dumbbell',
      target: 'Internal/External Obliques',
      cue: 'Lean back 45 degrees with chest proud. Rotate torso side to side under control.'
    },
    {
      id: 'core_bicycle_crunch',
      category: 'core',
      name: 'Bicycle Crunch',
      reps: '16 Total (8/side)',
      sets: 3,
      rest: '30s rest',
      load: 'Bodyweight',
      target: 'Obliques & Hip Flexors',
      cue: 'Slow, controlled tempo: bring opposite shoulder (not elbow) across toward knee.'
    },

    // CARDIO
    {
      id: 'cardio_mountain_climbers',
      category: 'cardio',
      name: 'Mountain Climbers',
      reps: '30 Seconds (or 24 Reps)',
      sets: 3,
      rest: '30s rest',
      load: 'Bodyweight Cardio',
      target: 'Cardiovascular & Core',
      cue: 'Drive knees toward chest in plank position without elevating hips.'
    },
    {
      id: 'cardio_star_jumps',
      category: 'cardio',
      name: 'Star Jumps / Jumping Jacks',
      reps: '25 Reps',
      sets: 3,
      rest: '30s rest',
      load: 'Bodyweight Cardio',
      target: 'Full Body Aerobic',
      cue: 'Land softly on balls of feet with knees slightly flexed to protect joints.'
    },
    {
      id: 'cardio_high_knees',
      category: 'cardio',
      name: 'High Knees (In Place)',
      reps: '30 Seconds',
      sets: 3,
      rest: '30s rest',
      load: 'Bodyweight HIIT',
      target: 'Metabolic Conditioning',
      cue: 'Pump arms in rhythm with knees; maintain upright posture.'
    },
    {
      id: 'cardio_skater_jumps',
      category: 'cardio',
      name: 'Skater Jumps',
      reps: '16 Total (8/side)',
      sets: 3,
      rest: '45s rest',
      load: 'Lateral Plyo',
      target: 'Lateral Glutes & Cardio',
      cue: 'Bound gently side to side, absorbing landing smoothly on single bent leg.'
    },
    {
      id: 'cardio_burpees',
      category: 'cardio',
      name: 'Burpees (Step-back Option)',
      reps: '8 Reps',
      sets: 3,
      rest: '60s rest',
      load: 'Full Body Metabolic',
      target: 'Maximum Caloric Burn',
      cue: 'Step back into plank (protects big toe / joints) rather than hard jump if feeling foot fatigue.'
    }
  ];

  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  // --- 3. STORAGE & STATE ---
  const STORAGE_KEYS = {
    HABITS: 'aegis_habits_v2',
    STEPS: 'aegis_santhosh_steps_v2',
    SKIPPING: 'aegis_santhosh_skipping_v2',
    SETS: 'aegis_santhosh_sets_v2',
    WATER_MET: 'aegis_santhosh_water_v2',
    LAST_DATE: 'aegis_santhosh_last_date_v2',
    DAILY_HISTORY: 'aegis_santhosh_daily_history_v2',
    CLINICAL_LOGS: 'aegis_santhosh_clinical_v2'
  };

  const todayStr = getTodayString();
  const lastActiveDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE) || todayStr;
  let dailyHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_HISTORY)) || {};

  let rawHabits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS)) || DEFAULT_HABITS;
  // Migrate legacy split habits to unified habit_workout_day
  let loadedHabits = rawHabits.filter(h => !['habit_upper', 'habit_lower_core', 'habit_cardio'].includes(h.key));
  DEFAULT_HABITS.forEach(defH => {
    if (!loadedHabits.some(h => h.key === defH.key)) {
      loadedHabits.push(defH);
    }
  });
  let habits = loadedHabits;
  let steps = parseInt(localStorage.getItem(STORAGE_KEYS.STEPS)) || 0;
  let storedSkipping = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKIPPING));
  let skippingRounds = (Array.isArray(storedSkipping) && storedSkipping.length === 4)
    ? storedSkipping
    : [false, false, false, false];
  let completedSets = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETS)) || {};
  let waterMet = JSON.parse(localStorage.getItem(STORAGE_KEYS.WATER_MET)) ?? false;

  // Day transition check: archive prior day's data and start a fresh daily morning
  if (lastActiveDate !== todayStr) {
    dailyHistory[lastActiveDate] = {
      steps: steps,
      skippingRounds: skippingRounds,
      completedSets: completedSets,
      waterMet: waterMet,
      archivedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_HISTORY, JSON.stringify(dailyHistory));

    steps = 0;
    skippingRounds = [false, false, false, false];
    completedSets = {};
    waterMet = false;
    localStorage.setItem(STORAGE_KEYS.LAST_DATE, todayStr);
    saveAll();
  }

  function saveAll() {
    const today = getTodayString();
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    localStorage.setItem(STORAGE_KEYS.STEPS, steps);
    localStorage.setItem(STORAGE_KEYS.SKIPPING, JSON.stringify(skippingRounds));
    localStorage.setItem(STORAGE_KEYS.SETS, JSON.stringify(completedSets));
    localStorage.setItem(STORAGE_KEYS.WATER_MET, JSON.stringify(waterMet));
    localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);

    // Keep daily snapshot permanently recorded
    dailyHistory[today] = {
      steps: steps,
      skippingRounds: skippingRounds,
      completedSets: completedSets,
      waterMet: waterMet,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_HISTORY, JSON.stringify(dailyHistory));
  }

  // --- 4. BI-DIRECTIONAL SYNCHRONIZATION ENGINE ---
  // When habit changes, reflect in workouts/diet/loop:
  function onHabitToggled(habit, isCompletedNow) {
    const today = getTodayString();
    if (habit.key === 'habit_steps') {
      steps = isCompletedNow ? Math.max(steps, 6000) : (steps >= 6000 ? 5500 : steps);
    } else if (habit.key === 'habit_skipping') {
      skippingRounds = skippingRounds.map(() => isCompletedNow);
    } else if (habit.key === 'habit_workout_day') {
      const todayDay = new Date().getDay();
      const plan = WEEKLY_SCHEDULE[todayDay];
      if (plan && plan.exerciseIds) {
        plan.exerciseIds.forEach(id => {
          completedSets[id] = isCompletedNow ? [1, 2, 3] : [];
        });
      }
    } else if (habit.key === 'habit_water') {
      waterMet = isCompletedNow;
    }

    saveAll();
    syncUIAfterStateChange();
  }

  // When workout/water changes, reflect in habits:
  function syncHabitsFromWorkouts() {
    const today = getTodayString();

    // 1. Check Steps (Clinical target: >= 6,000 steps)
    const stepHabit = habits.find(h => h.key === 'habit_steps');
    if (stepHabit) {
      const isDone = steps >= 6000;
      updateHabitDateState(stepHabit, isDone, today);
    }

    // 2. Check Skipping (Max 400 skips in 4 sets of 100 skips)
    const skippingHabit = habits.find(h => h.key === 'habit_skipping');
    if (skippingHabit) {
      const roundsDone = skippingRounds.filter(Boolean).length;
      const isDone = roundsDone >= 4;
      updateHabitDateState(skippingHabit, isDone, today);
    }

    // 3. Check Today's Scheduled Workout Routine
    const workoutHabit = habits.find(h => h.key === 'habit_workout_day');
    const todayDay = new Date().getDay();
    const plan = WEEKLY_SCHEDULE[todayDay];
    if (workoutHabit && plan && plan.exerciseIds) {
      const allDone = plan.exerciseIds.every(id => {
        const ex = EXERCISE_DATABASE.find(e => e.id === id);
        return ex && (completedSets[id] || []).length >= ex.sets;
      });
      const wasDone = workoutHabit.completedDates.includes(today);
      updateHabitDateState(workoutHabit, allDone, today);

      if (allDone && !wasDone && !hasCelebratedToday) {
        hasCelebratedToday = true;
        triggerWorkoutCelebration(plan.title);
      }
    }

    // 4. Check Water (Clinical target: 3.5L for 92kg & Uric Acid 8.4 mg/dL)
    const waterHabit = habits.find(h => h.key === 'habit_water');
    if (waterHabit) {
      updateHabitDateState(waterHabit, waterMet, today);
    }

    saveAll();
    syncUIAfterStateChange();
  }

  function updateHabitDateState(habit, shouldBeDone, today) {
    const hasToday = habit.completedDates.includes(today);
    if (shouldBeDone && !hasToday) {
      habit.completedDates.push(today);
    } else if (!shouldBeDone && hasToday) {
      habit.completedDates = habit.completedDates.filter(d => d !== today);
    }
  }

  function syncUIAfterStateChange() {
    renderSteps();
    renderSkipping();
    renderExercises();
    renderHabitDashboard();
    renderDietBadges();
    renderStudio();
  }

  // --- 5. RENDER HABIT DASHBOARD (FIRST TAB) ---
  const habitListContainer = document.getElementById('habitListContainer');
  const polarPercentNumber = document.getElementById('polarPercentNumber');
  const polarCircleFill = document.getElementById('polarCircleFill');
  const habitsCompletedCount = document.getElementById('habitsCompletedCount');
  const habitsPendingCount = document.getElementById('habitsPendingCount');
  const dailyProgressBarFill = document.getElementById('dailyProgressBarFill');
  const habitPercentText = document.getElementById('habitPercentText');
  const headerHabitSummary = document.getElementById('headerHabitSummary');

  // Live Workout Sync Card Elements in Tab 1
  const habitWorkoutBurnBadge = document.getElementById('habitWorkoutBurnBadge');
  const habitSetsDoneVal = document.getElementById('habitSetsDoneVal');
  const habitSetsSub = document.getElementById('habitSetsSub');
  const habitSkippingDoneVal = document.getElementById('habitSkippingDoneVal');
  const habitStepsDoneVal = document.getElementById('habitStepsDoneVal');
  const habitOpenStudioBtn = document.getElementById('habitOpenStudioBtn');
  const habitGoWorkoutsBtn = document.getElementById('habitGoWorkoutsBtn');

  if (habitOpenStudioBtn) {
    habitOpenStudioBtn.addEventListener('click', () => {
      const firstOpen = STUDIO_ITEMS.find(i => !isItemDone(i));
      openExerciseStudio(firstOpen ? firstOpen.id : STUDIO_ITEMS[0].id);
    });
  }
  if (habitGoWorkoutsBtn) {
    habitGoWorkoutsBtn.addEventListener('click', () => {
      dockItems.forEach(i => i.classList.toggle('active', i.dataset.tab === 'viewWorkoutHub'));
      tabViews.forEach(v => v.classList.toggle('active', v.id === 'viewWorkoutHub'));
      document.getElementById('deviceContent').scrollTop = 0;
    });
  }

  function renderHabitDashboard() {
    const today = getTodayString();
    let completedCount = 0;

    // Clinical Exercise Tracking Totals (ACSM METs Standards for 92kg)
    const upperIds = ['upper_shoulder_press', 'upper_seated_row', 'upper_push_up', 'upper_tricep_dips'];
    const upperSetsDone = upperIds.reduce((sum, id) => sum + (completedSets[id] || []).length, 0);
    const upperTotalSets = 12; // 4 exercises * 3 sets
    const upperBurn = Math.round(upperSetsDone * 12.7);

    const lcIds = [
      'lower_squat', 'lower_lunge', 'lower_bridge', 'lower_1leg_deadlift',
      'core_crunch', 'core_plank', 'core_plank_twist', 'core_russian_twist', 'core_bicycle_crunch'
    ];
    const lcSetsDone = lcIds.reduce((sum, id) => sum + (completedSets[id] || []).length, 0);
    const lcTotalSets = 27; // 9 exercises * 3 sets
    const lcBurn = Math.round(lcSetsDone * 10.6);

    const cardioIds = ['cardio_mountain_climbers', 'cardio_star_jumps', 'cardio_high_knees', 'cardio_skater_jumps', 'cardio_burpees'];
    const cardioSetsDone = cardioIds.reduce((sum, id) => sum + (completedSets[id] || []).length, 0);
    const cardioTotalSets = 15; // 5 exercises * 3 sets
    const cardioBurn = Math.round(cardioSetsDone * 19.6);

    const skippingDone = skippingRounds.filter(Boolean).length;
    const skippingBurn = Math.round(skippingDone * 30.7);

    const totalSetsCompleted = upperSetsDone + lcSetsDone + cardioSetsDone;
    const totalWorkoutBurn = upperBurn + lcBurn + cardioBurn + skippingBurn;
    const stepBurn = Math.round(steps * 0.046);

    // Update Live Workout HUD Card in Tab 1
    if (habitSetsDoneVal) habitSetsDoneVal.textContent = totalSetsCompleted;
    if (habitSetsSub) habitSetsSub.textContent = `${totalSetsCompleted} / 54 Sets Done`;
    if (habitWorkoutBurnBadge) habitWorkoutBurnBadge.textContent = `+${totalWorkoutBurn} kcal Burn`;
    if (habitSkippingDoneVal) habitSkippingDoneVal.textContent = `${skippingDone} / 4`;
    if (habitStepsDoneVal) habitStepsDoneVal.textContent = steps.toLocaleString();

    habitListContainer.innerHTML = '';
    habits.forEach(habit => {
      const isDone = habit.completedDates.includes(today);
      if (isDone) completedCount++;

      let subText = '';
      let pct = 0;
      let showProgress = false;

      if (habit.key === 'habit_steps') {
        showProgress = true;
        pct = Math.min(100, Math.round((steps / 6000) * 100));
        subText = `${steps.toLocaleString()} / 6,000 steps (${pct}%) · +${stepBurn} kcal NEAT`;
      } else if (habit.key === 'habit_skipping') {
        showProgress = true;
        pct = Math.min(100, Math.round((skippingDone / 4) * 100));
        subText = `${skippingDone} / 4 rounds (${skippingDone * 100} skips) · +${skippingBurn} kcal burn`;
      } else if (habit.key === 'habit_workout_day') {
        showProgress = true;
        const todayDay = new Date().getDay();
        const plan = WEEKLY_SCHEDULE[todayDay];
        if (plan && plan.exerciseIds) {
          const totalEx = plan.exerciseIds.length;
          const doneEx = plan.exerciseIds.filter(id => {
            const ex = EXERCISE_DATABASE.find(e => e.id === id);
            return ex && (completedSets[id] || []).length >= ex.sets;
          }).length;
          pct = totalEx > 0 ? Math.round((doneEx / totalEx) * 100) : 0;
          subText = `${doneEx} / ${totalEx} exercises done (${plan.short} Routine) · +${totalWorkoutBurn} kcal burn`;
        }
      } else if (habit.key === 'habit_water') {
        showProgress = true;
        pct = waterMet ? 100 : 0;
        subText = waterMet ? '3.5L Target Met ✓ · Renal Uric Acid Clearance Active' : '0.0 / 3.5 Litres (Clinical standard for UA 8.4 mg/dL)';
      }

      const li = document.createElement('li');
      li.className = `habit-row ${isDone ? 'completed' : ''}`;
      li.innerHTML = `
        <div class="habit-left" onclick="toggleHabitItem(${habit.id})">
          <div class="habit-check-circle">${isDone ? '✓' : ''}</div>
          <div class="habit-content-stack">
            <div class="habit-title-row">
              <span class="habit-text">${habit.text}</span>
              ${habit.key ? '<span class="habit-sync-badge">Auto-Synced</span>' : ''}
              ${isDone ? '<span class="habit-done-badge">Completed ✓</span>' : ''}
            </div>
            ${showProgress ? `
              <div class="habit-sub-progress">
                <span class="habit-progress-text">${subText}</span>
                <div class="habit-mini-track">
                  <div class="habit-mini-bar" style="width: ${pct}%"></div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="habit-actions">
          <button class="habit-icon-btn" onclick="deleteHabitItem(${habit.id})" title="Delete habit">✕</button>
        </div>
      `;
      habitListContainer.appendChild(li);
    });

    const total = habits.length;
    const pendingCount = total - completedCount;
    const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);

    // Update Polar Circle (Circumference = 2 * PI * 62 ≈ 389.5)
    const circumference = 389.5;
    const offset = circumference - (pct / 100) * circumference;
    polarCircleFill.style.strokeDashoffset = offset;
    polarPercentNumber.textContent = `${pct}%`;
    habitPercentText.textContent = `${pct}% Done`;
    dailyProgressBarFill.style.width = `${pct}%`;

    habitsCompletedCount.textContent = completedCount;
    habitsPendingCount.textContent = pendingCount;
    headerHabitSummary.textContent = `${completedCount}/${total} Habits`;

    // Render Matrix & Charts
    renderMonthlyMatrix();
    renderWeeklyTrendChart();
    renderMonthlySplineChart();
  }

  window.toggleHabitItem = function(id) {
    const today = getTodayString();
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const isDoneNow = !habit.completedDates.includes(today);
    if (isDoneNow) {
      habit.completedDates.push(today);
    } else {
      habit.completedDates = habit.completedDates.filter(d => d !== today);
    }

    onHabitToggled(habit, isDoneNow);
  };

  window.deleteHabitItem = function(id) {
    if (confirm('Delete this habit?')) {
      habits = habits.filter(h => h.id !== id);
      saveAll();
      renderHabitDashboard();
    }
  };

  // Add Custom Habit
  const newHabitInput = document.getElementById('newHabitInput');
  const addHabitBtn = document.getElementById('addHabitBtn');

  function addNewHabit() {
    const txt = newHabitInput.value.trim();
    if (!txt) return;
    habits.push({
      id: Date.now(),
      text: txt,
      completedDates: []
    });
    newHabitInput.value = '';
    saveAll();
    renderHabitDashboard();
  }

  addHabitBtn.addEventListener('click', addNewHabit);
  newHabitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewHabit();
  });

  // Export CSV
  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    let csv = "Habit,Date Completed\n";
    habits.forEach(h => {
      h.completedDates.forEach(d => {
        csv += `"${h.text.replace(/"/g, '""')}",${d}\n`;
      });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `santhosh_habits_${getTodayString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Monthly Consistency Matrix
  function renderMonthlyMatrix() {
    const container = document.getElementById('matrixContainer');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDay = now.getDate();

    let html = '<table class="matrix-table"><thead><tr><th>Habit</th>';
    for (let d = 1; d <= daysInMonth; d++) {
      html += `<th>${d}</th>`;
    }
    html += '</tr></thead><tbody>';

    habits.forEach(h => {
      html += `<tr><td>${h.text}</td>`;
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isDone = h.completedDates.includes(dateStr);
        const disabled = d > currentDay ? 'disabled' : '';
        html += `<td><input type="checkbox" class="matrix-chk" ${isDone ? 'checked' : ''} ${disabled} onchange="toggleMatrixDate(${h.id}, '${dateStr}')"></td>`;
      }
      html += '</tr>';
    });

    container.innerHTML = html + '</tbody></table>';
  }

  window.toggleMatrixDate = function(habitId, dateStr) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    const exists = habit.completedDates.includes(dateStr);
    if (exists) {
      habit.completedDates = habit.completedDates.filter(d => d !== dateStr);
    } else {
      habit.completedDates.push(dateStr);
    }
    saveAll();
    renderHabitDashboard();
  };

  // Weekly Trend Chart (SVG Line)
  function renderWeeklyTrendChart() {
    const chartEl = document.getElementById('weeklyLineChart');
    const avgEl = document.getElementById('weeklyAvgStat');
    const w = 320, h = 110, p = 15;
    const days = 7;
    const step = (w - p * 2) / (days - 1);

    let totalPct = 0;
    let path = '';
    let circles = '';

    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const dateStr = d.toISOString().split('T')[0];

      let count = 0;
      habits.forEach(h => { if (h.completedDates.includes(dateStr)) count++; });
      const pct = habits.length ? (count / habits.length) * 100 : 0;
      totalPct += pct;

      const x = p + (i * step);
      const y = (h - p) - ((pct / 100) * (h - p * 2));

      if (i === 0) path = `M ${x} ${y}`;
      else path += ` L ${x} ${y}`;

      circles += `<circle cx="${x}" cy="${y}" r="3" fill="#38bdf8" />`;
    }

    const avg = Math.round(totalPct / days);
    avgEl.textContent = `${avg}% 7-Day Avg`;
    chartEl.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <path d="${path}" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round"/>
        ${circles}
      </svg>
    `;
  }

  // Monthly Spline Chart (SVG Area Curve)
  function renderMonthlySplineChart() {
    const chartEl = document.getElementById('monthlySplineChart');
    const scoreEl = document.getElementById('monthlyScoreStat');
    const w = 340, h = 120, p = 15;
    const days = 30;
    const step = (w - p * 2) / (days - 1);

    const points = [];
    let totalPct = 0;

    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const dateStr = d.toISOString().split('T')[0];

      let count = 0;
      habits.forEach(h => { if (h.completedDates.includes(dateStr)) count++; });
      const pct = habits.length ? (count / habits.length) * 100 : 0;
      totalPct += pct;

      const x = p + (i * step);
      const y = (h - p) - ((pct / 100) * (h - p * 2));
      points.push([x, y]);
    }

    let dPath = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cpx = p0[0] + (p1[0] - p0[0]) / 2;
      dPath += ` C ${cpx} ${p0[1]}, ${cpx} ${p1[1]}, ${p1[0]} ${p1[1]}`;
    }

    const areaPath = `${dPath} L ${w - p} ${h - p} L ${p} ${h - p} Z`;
    const score = Math.round(totalPct / days);
    scoreEl.textContent = `${score}% Consistency`;

    chartEl.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="splineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#splineGrad)" />
        <path d="${dPath}" fill="none" stroke="#10b981" stroke-width="2" />
      </svg>
    `;
  }

  // Daily Wisdom Quote
  function renderWisdom() {
    const idx = new Date().getDate() % inspirationBooks.length;
    const b = inspirationBooks[idx];
    document.getElementById('wisdomQuote').textContent = `"${b.quote}"`;
    document.getElementById('wisdomAuthor').textContent = `— ${b.author}, ${b.title}`;
  }
  renderWisdom();

  // --- 6. RENDER WORKOUTS & DYNAMIC CALORIE STEP ENGINE ---
  const stepsDirectInput = document.getElementById('stepsDirectInput');
  const stepPercent = document.getElementById('stepPercent');
  const stepFill = document.getElementById('stepFill');
  const stepKcalBurn = document.getElementById('stepKcalBurn');
  const stepDynamicTdee = document.getElementById('stepDynamicTdee');
  const stepAdjustedTarget = document.getElementById('stepAdjustedTarget');
  const headerCalorieBadge = document.getElementById('headerCalorieBadge');
  const dietCalorieHeading = document.getElementById('dietCalorieHeading');
  const dietStepContext = document.getElementById('dietStepContext');
  const dietProtVal = document.getElementById('dietProtVal');
  const dietCarbVal = document.getElementById('dietCarbVal');
  const dietFatVal = document.getElementById('dietFatVal');
  const logStepsInput = document.getElementById('logStepsInput');
  const logStepsImpactTag = document.getElementById('logStepsImpactTag');
  const TARGET_STEPS = 6000;

  // Clinical calculation for 92 kg Male, 179 cm, 30y based on Mifflin-St Jeor & ACSM METs
  function calculateDynamicEnergy(stepCount) {
    const BMR = 1894; // Mifflin-St Jeor for 92kg, 179cm, 30y male: 10*92 + 6.25*179 - 5*30 + 5 = 1,893.75 kcal
    const sedentaryMaintenance = Math.round(BMR * 1.2); // ~2,273 kcal baseline (Sedentary NEAT)
    const stepBurnKcal = Math.round(stepCount * 0.046); // ~0.046 kcal/step (ACSM walking energy cost for 92kg)

    // Accurate ACSM Compendium of Physical Activities METs calculation per set
    let workoutBurnKcal = 0;
    let completedSetCount = 0;

    // Skipping: 10.0 METs * 92kg * (2/60 hr) = 30.67 kcal per 2-min round
    if (skippingRounds && skippingRounds.some(Boolean)) {
      const roundsDone = skippingRounds.filter(Boolean).length;
      workoutBurnKcal += Math.round(roundsDone * 30.7);
    }

    if (completedSets) {
      EXERCISE_DATABASE.forEach(ex => {
        const count = (completedSets[ex.id] || []).length;
        if (count > 0) {
          completedSetCount += count;
          let kcalPerSet = 12.7; // Upper body 4kg dumbbell (MET 5.5 * 92 * 1.5/60)
          if (ex.category === 'lower') kcalPerSet = 13.8; // Lower body compound (MET 6.0 * 92 * 1.5/60)
          else if (ex.category === 'core') kcalPerSet = 8.0; // Core floor movements (MET 4.0 * 92 * 1.25/60)
          else if (ex.category === 'cardio') kcalPerSet = 19.6; // HIIT cardio (MET 8.5 * 92 * 1.5/60)
          workoutBurnKcal += Math.round(count * kcalPerSet);
        }
      });
    }

    const dynamicTdee = sedentaryMaintenance + stepBurnKcal + workoutBurnKcal;
    // Clinical target deficit: ~550-650 kcal below dynamic TDEE, with clinical safety floor of 1,600 kcal
    const targetCalories = Math.max(1600, Math.min(2550, dynamicTdee - 600));

    // Clinical Macronutrient Standards:
    // 1. Protein: 1.6 g/kg lean mass protection = 145g locked (580 kcal)
    const proteinG = 145;
    // 2. Fat: 28% of target calories for dyslipidemia (LDL 182, Triglycerides 206)
    const fatG = Math.round((targetCalories * 0.28) / 9);
    // 3. Carbs: Remaining caloric balance in low-glycemic complex carbs for pre-diabetes (HbA1c 6.0%)
    const carbsG = Math.round((targetCalories - (proteinG * 4) - (fatG * 9)) / 4);

    return {
      stepBurnKcal,
      workoutBurnKcal,
      completedSetCount,
      dynamicTdee,
      targetCalories,
      proteinG,
      carbsG,
      fatG
    };
  }

  function renderSteps() {
    if (stepsDirectInput && document.activeElement !== stepsDirectInput) {
      stepsDirectInput.value = steps;
    }
    const pct = Math.min(100, Math.round((steps / TARGET_STEPS) * 100));
    if (stepPercent) stepPercent.textContent = `${pct}%`;
    if (stepFill) stepFill.style.width = `${pct}%`;

    // Calculate dynamic calories
    const energy = calculateDynamicEnergy(steps);

    if (stepKcalBurn) stepKcalBurn.textContent = `+${energy.stepBurnKcal} kcal`;
    if (stepDynamicTdee) stepDynamicTdee.textContent = `${energy.dynamicTdee.toLocaleString()} kcal`;
    if (stepAdjustedTarget) stepAdjustedTarget.textContent = `${energy.targetCalories.toLocaleString()} kcal`;
    if (headerCalorieBadge) headerCalorieBadge.textContent = `${energy.targetCalories.toLocaleString()} kcal`;

    if (dietCalorieHeading) {
      const mode = steps >= 8000 ? '🔥 High Burn Day' : steps < 4000 ? '⚡ Low Step Day' : 'Target Baseline';
      dietCalorieHeading.textContent = `${energy.targetCalories.toLocaleString()} kcal / day (${mode})`;
    }
    if (dietStepContext) {
      dietStepContext.textContent = `Dynamically calibrated for ${steps.toLocaleString()} steps today`;
    }
    if (dietProtVal) dietProtVal.textContent = `${energy.proteinG}g`;
    if (dietCarbVal) dietCarbVal.textContent = `${energy.carbsG}g`;
    if (dietFatVal) dietFatVal.textContent = `${energy.fatG}g`;

    if (logStepsInput && document.activeElement !== logStepsInput) {
      logStepsInput.value = steps;
    }
    if (logStepsImpactTag) {
      logStepsImpactTag.textContent = `+${energy.stepBurnKcal} kcal burn`;
    }
  }

  // Direct typing of steps by Santhosh
  if (stepsDirectInput) {
    stepsDirectInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 0;
      steps = Math.max(0, Math.min(40000, val));
      syncHabitsFromWorkouts();
    });
  }

  document.getElementById('addStepsBtn').addEventListener('click', () => {
    steps = Math.min(25000, steps + 500);
    syncHabitsFromWorkouts();
  });

  document.getElementById('addThousandBtn').addEventListener('click', () => {
    steps = Math.min(25000, steps + 1000);
    syncHabitsFromWorkouts();
  });

  document.getElementById('subStepsBtn').addEventListener('click', () => {
    steps = Math.max(0, steps - 500);
    syncHabitsFromWorkouts();
  });

  // --- 6. RENDER WORKOUTS, SKIPPING & 7-DAY SCHEDULE ---
  const WEEKLY_SCHEDULE = {
    0: {
      name: 'Sunday',
      short: 'Sun',
      title: 'Sunday: Active Recovery & Joint Decompression',
      focus: 'Gentle mobility stretching + 5,000 steps to flush Uric Acid (8.4 mg/dL) and prepare for the week.',
      skipsText: '⚡ Skips: Rest / Optional 100',
      stepsText: '👟 Steps: 5,000 gentle walk',
      tag: 'Recovery Day',
      exerciseIds: ['core_plank', 'lower_bridge', 'core_crunch']
    },
    1: {
      name: 'Monday',
      short: 'Mon',
      title: 'Monday: Upper Body Push & Core Blast',
      focus: 'Metabolic dumbbell volume to deplete glycogen and trigger 48-hr afterburn (EPOC).',
      skipsText: '⚡ Skips: 200 Skips (2 × 100)',
      stepsText: '👟 Steps: 6,000',
      tag: 'Upper & Core',
      exerciseIds: ['upper_shoulder_press', 'upper_push_up', 'upper_tricep_dips', 'core_plank', 'core_russian_twist']
    },
    2: {
      name: 'Tuesday',
      short: 'Tue',
      title: 'Tuesday: Lower Body Glycogen Depletion (Fat Furnace)',
      focus: 'Large quad & glute recruitment burns glucose directly to reverse HbA1c (6.0%) and pre-diabetes.',
      skipsText: '⚡ Skips: Rest from skipping',
      stepsText: '👟 Steps: 6,000',
      tag: 'Lower Body',
      exerciseIds: ['lower_squat', 'lower_lunge', 'lower_bridge', 'lower_1leg_deadlift', 'core_bicycle_crunch']
    },
    3: {
      name: 'Wednesday',
      short: 'Wed',
      title: 'Wednesday: Cardio & HIIT Conditioning (Max 400 Skips)',
      focus: 'Max fat oxidation interval session. 4 rounds of 100 skips with 45s recovery intervals.',
      skipsText: '⚡ Skips: 400 Skips (4 × 100)',
      stepsText: '👟 Steps: 6,000',
      tag: 'HIIT Cardio',
      exerciseIds: ['cardio_mountain_climbers', 'cardio_star_jumps', 'cardio_high_knees', 'cardio_skater_jumps', 'core_plank']
    },
    4: {
      name: 'Thursday',
      short: 'Thu',
      title: 'Thursday: Upper Body Pull & Posterior Stability',
      focus: 'Strengthens rhomboids, lats & obliques to optimize posture and trunk stability.',
      skipsText: '⚡ Skips: 200 Skips (2 × 100)',
      stepsText: '👟 Steps: 6,000',
      tag: 'Upper Pull & Core',
      exerciseIds: ['upper_seated_row', 'upper_shoulder_press', 'core_plank_twist', 'core_russian_twist', 'core_crunch']
    },
    5: {
      name: 'Friday',
      short: 'Fri',
      title: 'Friday: Full Body Functional Circuit (10kg Deficit Peak)',
      focus: 'Total body compound supersets to maximize weekend fat burning.',
      skipsText: '⚡ Skips: 300 Skips (3 × 100)',
      stepsText: '👟 Steps: 6,000',
      tag: 'Full Body',
      exerciseIds: ['lower_squat', 'upper_push_up', 'cardio_burpees', 'core_plank', 'upper_tricep_dips']
    },
    6: {
      name: 'Saturday',
      short: 'Sat',
      title: 'Saturday: Metabolic Mobility & Long Walk (Fat Oxidation)',
      focus: 'Low-impact core stability + 7,500 outdoor steps to burn pure free fatty acids.',
      skipsText: '⚡ Skips: 200 Skips (2 × 100)',
      stepsText: '👟 Steps: 7,500 Outdoor',
      tag: 'Active Fat Burn',
      exerciseIds: ['lower_bridge', 'lower_1leg_deadlift', 'core_plank_twist', 'cardio_skater_jumps']
    }
  };

  const todayDayOfWeek = new Date().getDay();
  let selectedDay = todayDayOfWeek.toString(); // Default to today

  const dayChips = document.querySelectorAll('.day-chip');
  const prescDayTitle = document.getElementById('prescDayTitle');
  const prescDayTag = document.getElementById('prescDayTag');
  const prescDayFocus = document.getElementById('prescDayFocus');
  const prescDaySkips = document.getElementById('prescDaySkips');
  const prescDaySteps = document.getElementById('prescDaySteps');
  const prescDayMovements = document.getElementById('prescDayMovements');
  const currentDayBadge = document.getElementById('currentDayBadge');

  function updateDayPrescriptionUI() {
    dayChips.forEach(chip => {
      const d = chip.dataset.day;
      chip.classList.toggle('active', d === selectedDay);
      chip.classList.toggle('today-mark', d === todayDayOfWeek.toString());
    });

    if (currentDayBadge) {
      currentDayBadge.textContent = selectedDay === todayDayOfWeek.toString() ? 'Today' : (WEEKLY_SCHEDULE[selectedDay] ? WEEKLY_SCHEDULE[selectedDay].short : 'All');
    }

    const plan = WEEKLY_SCHEDULE[selectedDay] || WEEKLY_SCHEDULE[todayDayOfWeek];
    if (currentDayBadge) {
      currentDayBadge.textContent = selectedDay === todayDayOfWeek.toString() ? 'Today' : (plan ? plan.short : '');
    }

    if (plan) {
      if (prescDayTitle) prescDayTitle.textContent = plan.title;
      if (prescDayTag) prescDayTag.textContent = plan.tag;
      if (prescDayFocus) prescDayFocus.textContent = plan.focus;
      if (prescDaySkips) prescDaySkips.textContent = plan.skipsText;
      if (prescDaySteps) prescDaySteps.textContent = plan.stepsText;
      if (prescDayMovements) prescDayMovements.textContent = `🎯 ${plan.exerciseIds.length} Prescribed Movements`;
    }
  }

  dayChips.forEach(chip => {
    chip.addEventListener('click', () => {
      selectedDay = chip.dataset.day;
      updateDayPrescriptionUI();
      renderExercises();
    });
  });

  updateDayPrescriptionUI();

  // Skipping Rounds (Max 400 Skips = 4 rounds x 100 skips)
  const skippingRoundsGrid = document.getElementById('skippingRoundsGrid');

  function renderSkipping() {
    skippingRoundsGrid.innerHTML = '';
    skippingRounds.forEach((isDone, idx) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `round-chip ${isDone ? 'done' : ''}`;
      const skips = (idx + 1) * 100;
      chip.innerHTML = isDone ? `R${idx + 1} (${skips}) ✓` : `R${idx + 1} (${skips})`;
      chip.title = `Round ${idx + 1}: 100 Skips (45s rest)`;
      chip.addEventListener('click', () => {
        skippingRounds[idx] = !skippingRounds[idx];
        syncHabitsFromWorkouts();
      });
      skippingRoundsGrid.appendChild(chip);
    });
  }

  // Exercise Feed - Renders ONLY the movements prescribed for that day of week!
  const exerciseFeed = document.getElementById('exerciseFeed');
  const dayRoutineHeader = document.getElementById('dayRoutineHeader');
  const dayRoutineCount = document.getElementById('dayRoutineCount');
  const studioLaunchProgress = document.getElementById('studioLaunchProgress');

  function renderExercises() {
    exerciseFeed.innerHTML = '';
    const plan = WEEKLY_SCHEDULE[selectedDay] || WEEKLY_SCHEDULE[todayDayOfWeek];
    const targetIds = plan.exerciseIds || [];
    const filtered = EXERCISE_DATABASE.filter(ex => targetIds.includes(ex.id));

    if (dayRoutineHeader) {
      dayRoutineHeader.textContent = `${plan.name}'s Prescribed Routine`;
    }
    if (dayRoutineCount) {
      dayRoutineCount.textContent = `${filtered.length} targeted movements`;
    }

    let completedMovementsCount = 0;
    filtered.forEach(ex => {
      const card = document.createElement('div');
      const checkedSets = completedSets[ex.id] || [];
      const allDone = checkedSets.length >= ex.sets;
      if (allDone) completedMovementsCount++;

      card.className = `ex-card-rich ${allDone ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="ex-header-row">
          <span class="ex-category-tag">${ex.category.toUpperCase()}</span>
          <span class="ex-header-right">
            <span class="pill-muted">${ex.target}</span>
            <button type="button" class="ex-watch-btn" data-watch="${ex.id}">▶ Watch Demo</button>
          </span>
        </div>
        <div class="ex-name-rich">
          ${allDone ? '✓ ' : ''}${ex.name}
        </div>
        <div class="ex-specs-row">
          <span class="spec-item"><span>Target:</span> ${ex.sets} sets &times; ${ex.reps}</span>
          <span class="spec-item"><span>Load:</span> ${ex.load}</span>
          <span class="spec-item"><span>Rest:</span> ${ex.rest}</span>
        </div>
        <p class="ex-safety-cue"><strong>Form & Safety Cue:</strong> ${ex.cue}</p>
        <div class="ex-sets-tracker" id="tracker_${ex.id}"></div>
      `;

      card.querySelector('.ex-watch-btn').addEventListener('click', () => openExerciseStudio(ex.id));

      const trackerContainer = card.querySelector(`#tracker_${ex.id}`);
      for (let s = 1; s <= ex.sets; s++) {
        const setBtn = document.createElement('button');
        const isChecked = checkedSets.includes(s);
        setBtn.type = 'button';
        setBtn.className = `set-check-btn ${isChecked ? 'checked' : ''}`;
        setBtn.textContent = isChecked ? `Set ${s} ✓` : `Set ${s}`;
        
        setBtn.addEventListener('click', () => {
          let currentList = completedSets[ex.id] || [];
          if (currentList.includes(s)) {
            currentList = currentList.filter(item => item !== s);
          } else {
            currentList.push(s);
          }
          completedSets[ex.id] = currentList;
          syncHabitsFromWorkouts();
        });

        trackerContainer.appendChild(setBtn);
      }

      exerciseFeed.appendChild(card);
    });

    if (studioLaunchProgress) {
      studioLaunchProgress.textContent = `${completedMovementsCount}/${filtered.length}`;
      studioLaunchProgress.classList.toggle('all-done', completedMovementsCount === filtered.length && filtered.length > 0);
    }
  }

  // Reset Button
  document.getElementById('resetWorkoutsBtn').addEventListener('click', () => {
    if (confirm('Reset today\'s workout set checks and skipping rounds?')) {
      skippingRounds = [false, false, false, false];
      completedSets = {};
      syncHabitsFromWorkouts();
    }
  });

  // --- 6b. INTERACTIVE EXERCISE STUDIO (Animated Demos + Completion Tracking) ---
  const STUDIO_COLORS = { upper: '#38bdf8', lower: '#10b981', core: '#f59e0b', cardio: '#fb7185' };
  const STUDIO_CAT_LABELS = { upper: 'Upper Body · 2×4kg', lower: 'Lower Body', core: 'Core', cardio: 'Cardio / HIIT' };
  const STUDIO_CAT_ORDER = ['upper', 'lower', 'core', 'cardio'];

  const SKIPPING_ITEM = {
    id: 'skipping_rope',
    category: 'cardio',
    name: 'Skipping Rope (Boxer Bounce - 100 Skips/Set)',
    reps: '100 Skips per Round',
    sets: 4,
    rest: '45s rest',
    load: 'Rope (Max 400 Skips)',
    target: 'Calves, Coordination & Fat Burn',
    cue: 'Low boxer bounce — jump only 1-2 cm on balls of feet. 4 sets of 100 skips with 45s rest to protect big toe & ankle joints.',
    special: 'skipping'
  };
  const STUDIO_ITEMS = [...EXERCISE_DATABASE, SKIPPING_ITEM];

  // Only flag derived from the uploaded report: Uric Acid 8.4 mg/dL (above reference range)
  const IMPACT_ALTERNATIVES = {
    cardio_star_jumps: 'Step-out jacks (no jump)',
    cardio_skater_jumps: 'Lateral step-touch with reach',
    cardio_burpees: 'Step-back burpee without the top jump',
    cardio_high_knees: 'Marching high knees (one foot always grounded)',
    skipping_rope: 'Shadow skipping (rope motion, minimal bounce)'
  };

  // ---- Pose library (side view facing right unless anim.front) ----
  // Angles in degrees: 0 = pointing down, 90 = forward/right, 180 = up, -90 = back/left
  const BASE_POSE = { px: 100, py: 110, t: 180, h1: 0, k1: 0, h2: 0, k2: 0, s1: 0, e1: 0, s2: 0, e2: 0 };
  const pose = (o = {}) => Object.assign({}, BASE_POSE, o);
  const SUPINE = { px: 76, py: 162, t: -90, h1: 145, k1: 10, h2: 145, k2: 10, s1: 80, e1: 88, s2: 80, e2: 88 };
  const HIGH_PLANK = { px: 90, py: 145, t: 114, h1: -66, k1: -66, h2: -66, k2: -66, s1: 0, e1: 0, s2: 0, e2: 0 };
  const FRONT_LEGS = { h1: 4, k1: 4, h2: -4, k2: -4 };
  const BURPEE_SQUAT = { px: 92, py: 142, t: 125, h1: 80, k1: -34, h2: 80, k2: -34, s1: -5, e1: -5, s2: -5, e2: -5 };
  const BICYCLE_A = { px: 80, py: 162, t: -115, h1: 195, k1: 95, h2: 105, k2: 100, s1: -170, e1: 40, s2: -170, e2: 40 };
  const RUSSIAN_C = { px: 90, py: 160, t: -155, h1: 125, k1: 55, h2: 125, k2: 55, s1: 60, e1: 110, s2: 60, e2: 110 };
  const SKATER_MID = { px: 100, py: 100, t: 180, h1: 10, k1: 10, h2: -10, k2: -10, s1: 20, e1: 20, s2: -20, e2: -20 };

  // frames: { p: pose, d: ms to move to next frame, h: ms hold before moving }
  // pins: { w1|w2|f1|f2: [x, y, bendSign] } keeps hands/feet planted using 2-bone IK
  const EXERCISE_ANIMATIONS = {
    upper_shoulder_press: {
      front: true, props: ['db1', 'db2'],
      frames: [
        { p: pose({ ...FRONT_LEGS, s1: 90, e1: 180, s2: -90, e2: 180 }), d: 900, h: 200 },
        { p: pose({ ...FRONT_LEGS, s1: 168, e1: 175, s2: -168, e2: 185 }), d: 900, h: 200 }
      ]
    },
    upper_seated_row: {
      props: ['band'],
      frames: [
        { p: pose({ px: 80, py: 163, t: 185, h1: 90, k1: 90, h2: 90, k2: 90, s1: 95, e1: 95, s2: 95, e2: 95 }), d: 800, h: 150 },
        { p: pose({ px: 80, py: 163, t: 178, h1: 90, k1: 90, h2: 90, k2: 90, s1: -35, e1: 75, s2: -35, e2: 75 }), d: 750, h: 400 }
      ]
    },
    upper_push_up: {
      pins: { w1: [128, 170, 1], w2: [128, 170, 1], f1: [35, 170, -1], f2: [35, 170, -1] },
      frames: [
        { p: pose(HIGH_PLANK), d: 1000, h: 150 },
        { p: pose({ ...HIGH_PLANK, px: 94.6, py: 161, t: 98 }), d: 800, h: 150 }
      ]
    },
    upper_tricep_dips: {
      props: ['chair'],
      pins: { w1: [66, 130, 1], w2: [66, 130, 1], f1: [118, 170, -1], f2: [118, 170, -1] },
      frames: [
        { p: pose({ px: 72, py: 131 }), d: 900, h: 200 },
        { p: pose({ px: 78, py: 151 }), d: 900, h: 200 }
      ]
    },
    lower_squat: {
      pins: { f1: [100, 170, -1], f2: [100, 170, -1] },
      frames: [
        { p: pose({ s1: 90, e1: 90, s2: 90, e2: 90 }), d: 1000, h: 200 },
        { p: pose({ px: 87, py: 140, t: 150, s1: 90, e1: 90, s2: 90, e2: 90 }), d: 900, h: 250 }
      ]
    },
    lower_lunge: {
      frames: [
        { p: pose(), d: 800, h: 200 },
        { p: pose({ py: 130, h1: 70, k1: 0, h2: -30, k2: -62 }), d: 800, h: 350 }
      ]
    },
    lower_bridge: {
      props: ['dbPelvis'],
      pins: { f1: [100, 170, -1], f2: [100, 170, -1] },
      frames: [
        { p: pose(SUPINE), d: 900, h: 200 },
        { p: pose({ ...SUPINE, px: 72, py: 143, t: -67 }), d: 900, h: 500 }
      ]
    },
    lower_1leg_deadlift: {
      props: ['db1'],
      pins: { f1: [100, 170, -1] },
      frames: [
        { p: pose(), d: 1100, h: 200 },
        { p: pose({ py: 112, t: 100, h2: -82, k2: -82 }), d: 1100, h: 350 }
      ]
    },
    core_crunch: {
      pins: { f1: [99, 170, -1], f2: [99, 170, -1] },
      frames: [
        { p: pose(SUPINE), d: 800, h: 200 },
        { p: pose({ ...SUPINE, t: -125, s1: 110, e1: 100, s2: 110, e2: 100 }), d: 700, h: 350 }
      ]
    },
    core_plank: {
      hold: true,
      pins: { w1: [172, 170, 1], w2: [172, 170, 1], f1: [49, 170, -1], f2: [49, 170, -1] },
      frames: [
        { p: pose({ px: 108, py: 157, t: 102 }), d: 1800 },
        { p: pose({ px: 108, py: 155, t: 102.5 }), d: 1800 }
      ]
    },
    core_plank_twist: {
      pins: { w2: [148, 170, 1], f1: [55, 170, -1], f2: [55, 170, -1] },
      frames: [
        { p: pose({ px: 110, py: 145, t: 114, s1: 180, e1: 180 }), d: 900, h: 250 },
        { p: pose({ px: 110, py: 148, t: 108, s1: 320, e1: 300 }), d: 900, h: 250 }
      ]
    },
    core_russian_twist: {
      props: ['db1', 'arrow'],
      frames: [
        { p: pose({ ...RUSSIAN_C, t: -150, s1: 25, e1: 75, s2: 25, e2: 75 }), d: 450, h: 150 },
        { p: pose(RUSSIAN_C), d: 450 },
        { p: pose({ ...RUSSIAN_C, t: -160, s1: 100, e1: 150, s2: 100, e2: 150 }), d: 450, h: 150 },
        { p: pose(RUSSIAN_C), d: 450 }
      ]
    },
    core_bicycle_crunch: {
      frames: [
        { p: pose(BICYCLE_A), d: 650, h: 120 },
        { p: pose({ ...BICYCLE_A, t: -120, h1: 105, k1: 100, h2: 195, k2: 95 }), d: 650, h: 120 }
      ]
    },
    cardio_mountain_climbers: {
      pins: { w1: [128, 170, 1], w2: [128, 170, 1] },
      frames: [
        { p: pose({ ...HIGH_PLANK, f1x: 100, f1y: 160, f2x: 35, f2y: 170 }), d: 260, h: 40 },
        { p: pose({ ...HIGH_PLANK, f1x: 35, f1y: 170, f2x: 100, f2y: 160 }), d: 260, h: 40 }
      ]
    },
    cardio_star_jumps: {
      front: true,
      frames: [
        { p: pose({ ...FRONT_LEGS, s1: 12, e1: 12, s2: -12, e2: -12 }), d: 380, h: 80 },
        { p: pose({ py: 100, h1: 24, k1: 24, h2: -24, k2: -24, s1: 150, e1: 155, s2: -150, e2: -155 }), d: 380, h: 60 }
      ]
    },
    cardio_high_knees: {
      frames: [
        { p: pose({ py: 108, h1: 95, k1: 0, s1: -40, e1: 60, s2: 45, e2: 150 }), d: 280, h: 30 },
        { p: pose({ py: 108, h2: 95, k2: 0, s1: 45, e1: 150, s2: -40, e2: 60 }), d: 280, h: 30 }
      ]
    },
    cardio_skater_jumps: {
      front: true,
      frames: [
        { p: pose({ px: 70, py: 113, t: 165, h1: -5, k1: 12, h2: 45, k2: 75, s1: -60, e1: -40, s2: -30, e2: -10 }), d: 360, h: 180 },
        { p: pose(SKATER_MID), d: 360 },
        { p: pose({ px: 130, py: 113, t: 195, h1: -45, k1: -75, h2: 5, k2: -12, s1: 30, e1: 10, s2: 60, e2: 40 }), d: 360, h: 180 },
        { p: pose(SKATER_MID), d: 360 }
      ]
    },
    cardio_burpees: {
      frames: [
        { p: pose({ f1x: 100, f1y: 170, f2x: 100, f2y: 170 }), d: 550, h: 150 },
        { p: pose({ ...BURPEE_SQUAT, f1x: 104, f1y: 170, f2x: 104, f2y: 170 }), d: 650, h: 100 },
        { p: pose({ ...HIGH_PLANK, f1x: 35, f1y: 170, f2x: 35, f2y: 170 }), d: 650, h: 250 },
        { p: pose({ ...BURPEE_SQUAT, f1x: 104, f1y: 170, f2x: 104, f2y: 170 }), d: 600, h: 100 },
        { p: pose({ py: 106, s1: 178, e1: 178, s2: 178, e2: 178, f1x: 100, f1y: 170, f2x: 100, f2y: 170 }), d: 600, h: 150 }
      ]
    },
    skipping_rope: {
      front: true, props: ['rope'], ropePeriod: 500,
      frames: [
        { p: pose({ py: 106, ...FRONT_LEGS, s1: 25, e1: 80, s2: -25, e2: -80 }), d: 250 },
        { p: pose({ py: 110, h1: 4, k1: -2, h2: -4, k2: 2, s1: 28, e1: 85, s2: -28, e2: -85 }), d: 250 }
      ]
    }
  };

  // ---- Kinematics ----
  const D2R = Math.PI / 180;
  const SEG = { torso: 44, neck: 13, thigh: 30, shin: 30, upper: 22, fore: 21 };
  const dirOf = a => [Math.sin(a * D2R), Math.cos(a * D2R)];
  const addV = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];

  function fkLimb(root, a1, a2, l1, l2) {
    const j = addV(root, dirOf(a1), l1);
    return [j, addV(j, dirOf(a2), l2)];
  }

  function ikLimb(root, target, l1, l2, bend) {
    const dx = target[0] - root[0], dy = target[1] - root[1];
    const dist = Math.hypot(dx, dy) || 0.001;
    const ux = dx / dist, uy = dy / dist;
    const d = Math.min(Math.max(dist, Math.abs(l1 - l2) + 0.01), l1 + l2 - 0.01);
    const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, l1 * l1 - along * along));
    const j = [root[0] + ux * along - uy * h * bend, root[1] + uy * along + ux * h * bend];
    const ex = target[0] - j[0], ey = target[1] - j[1];
    const el = Math.hypot(ex, ey) || 0.001;
    return [j, [j[0] + (ex / el) * l2, j[1] + (ey / el) * l2]];
  }

  function solveSkeleton(p, anim) {
    const pins = anim.pins || {};
    const front = !!anim.front;
    const P = [p.px, p.py];
    const td = dirOf(p.t);
    const N = addV(P, td, SEG.torso);
    const H = addV(N, td, SEG.neck);
    const S1 = front ? [N[0] + 10, N[1] + 4] : addV(N, td, -3);
    const S2 = front ? [N[0] - 10, N[1] + 4] : S1;
    const R1 = front ? [P[0] + 6, P[1]] : P;
    const R2 = front ? [P[0] - 6, P[1]] : P;
    const limb = (root, a1, a2, l1, l2, pin) => pin ? ikLimb(root, pin, l1, l2, pin[2]) : fkLimb(root, a1, a2, l1, l2);
    // Per-frame foot targets (f1x/f1y, f2x/f2y) let feet slide along the floor between keyframes
    const footPin1 = pins.f1 || (p.f1x !== undefined ? [p.f1x, p.f1y, -1] : null);
    const footPin2 = pins.f2 || (p.f2x !== undefined ? [p.f2x, p.f2y, -1] : null);
    const [K1, F1] = limb(R1, p.h1, p.k1, SEG.thigh, SEG.shin, footPin1);
    const [K2, F2] = limb(R2, p.h2, p.k2, SEG.thigh, SEG.shin, footPin2);
    const [E1, W1] = limb(S1, p.s1, p.e1, SEG.upper, SEG.fore, pins.w1);
    const [E2, W2] = limb(S2, p.s2, p.e2, SEG.upper, SEG.fore, pins.w2);
    return { P, N, H, S1, S2, R1, R2, K1, F1, K2, F2, E1, W1, E2, W2 };
  }

  const easeInOut = x => 0.5 - Math.cos(Math.PI * x) / 2;

  function poseAt(anim, ms) {
    const frames = anim.frames;
    const total = frames.reduce((s, f) => s + (f.h || 0) + f.d, 0);
    let tt = ms % total;
    for (let i = 0; i < frames.length; i++) {
      const seg = (frames[i].h || 0) + frames[i].d;
      if (tt < seg) {
        const local = Math.max(0, tt - (frames[i].h || 0)) / frames[i].d;
        const a = frames[i].p, b = frames[(i + 1) % frames.length].p;
        const k = easeInOut(Math.min(1, local));
        const out = {};
        for (const key in a) out[key] = a[key] + (b[key] - a[key]) * k;
        return { pose: out, rep: Math.floor(ms / total) + 1 };
      }
      tt -= seg;
    }
    return { pose: frames[0].p, rep: 1 };
  }

  // ---- SVG Stage Construction ----
  const SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(SVGNS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  const studioSvg = document.getElementById('studioSvg');
  const fig = {};
  (function buildStage() {
    if (!studioSvg) return;
    const defs = svgEl('defs', {}, studioSvg);
    const grad = svgEl('radialGradient', { id: 'stageGlow', cx: '50%', cy: '55%', r: '60%' }, defs);
    fig.glowStop = svgEl('stop', { offset: '0%', 'stop-color': '#38bdf8', 'stop-opacity': '0.16' }, grad);
    svgEl('stop', { offset: '100%', 'stop-color': '#38bdf8', 'stop-opacity': '0' }, grad);
    svgEl('rect', { x: 0, y: 0, width: 200, height: 185, fill: 'url(#stageGlow)' }, studioSvg);
    for (let x = 10; x <= 190; x += 15) {
      svgEl('line', { x1: x, y1: 171, x2: x - 6, y2: 182, stroke: 'rgba(255,255,255,0.05)', 'stroke-width': 0.6 }, studioSvg);
    }
    svgEl('line', { x1: 6, y1: 171, x2: 194, y2: 171, stroke: 'rgba(255,255,255,0.18)', 'stroke-width': 1 }, studioSvg);
    fig.shadow = svgEl('ellipse', { cx: 100, cy: 172, rx: 26, ry: 3, fill: 'rgba(0,0,0,0.45)' }, studioSvg);

    // Back props
    fig.chair = svgEl('g', { stroke: 'rgba(148,163,184,0.55)', 'stroke-width': 2.4, 'stroke-linecap': 'round', fill: 'none' }, studioSvg);
    svgEl('line', { x1: 30, y1: 132, x2: 68, y2: 132 }, fig.chair);
    svgEl('line', { x1: 34, y1: 132, x2: 34, y2: 170 }, fig.chair);
    svgEl('line', { x1: 64, y1: 132, x2: 64, y2: 170 }, fig.chair);
    svgEl('line', { x1: 31, y1: 132, x2: 31, y2: 98 }, fig.chair);
    fig.ropeBack = svgEl('path', { fill: 'none', stroke: '#e2e8f0', 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: 0.3 }, studioSvg);

    const limbAttrs = { fill: 'none', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    fig.far = svgEl('g', { opacity: 0.38 }, studioSvg);
    fig.leg2 = svgEl('polyline', limbAttrs, fig.far);
    fig.arm2 = svgEl('polyline', { ...limbAttrs, 'stroke-width': 6 }, fig.far);
    fig.body = svgEl('g', {}, studioSvg);
    fig.leg1 = svgEl('polyline', limbAttrs, fig.body);
    fig.torso = svgEl('line', { 'stroke-width': 10, 'stroke-linecap': 'round' }, fig.body);
    fig.head = svgEl('circle', { r: 8.5 }, fig.body);
    fig.arm1 = svgEl('polyline', { ...limbAttrs, 'stroke-width': 6 }, fig.body);

    // Front props
    const makeDb = () => {
      const g = svgEl('g', {}, studioSvg);
      svgEl('rect', { x: -7, y: -1.5, width: 14, height: 3, rx: 1.5, fill: '#cbd5e1' }, g);
      svgEl('rect', { x: -9, y: -5, width: 4, height: 10, rx: 1.5, fill: '#94a3b8' }, g);
      svgEl('rect', { x: 5, y: -5, width: 4, height: 10, rx: 1.5, fill: '#94a3b8' }, g);
      return g;
    };
    fig.db1 = makeDb();
    fig.db2 = makeDb();
    fig.dbPelvis = makeDb();
    fig.band = svgEl('line', { stroke: '#f59e0b', 'stroke-width': 1.6, 'stroke-dasharray': '3 2', opacity: 0.85 }, studioSvg);
    fig.ropeFront = svgEl('path', { fill: 'none', stroke: '#e2e8f0', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, studioSvg);
    fig.arrow = svgEl('g', { fill: 'none', stroke: '#f59e0b', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, studioSvg);
    svgEl('path', { d: 'M 86 96 Q 106 80 128 94' }, fig.arrow);
    svgEl('polyline', { points: '121,90 128,94 123,100' }, fig.arrow);
  })();

  const ptsStr = arr => arr.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const setVis = (node, on) => { if (node) node.style.display = on ? '' : 'none'; };

  function drawFigure(anim, ms) {
    const { pose: p, rep } = poseAt(anim, ms);
    const s = solveSkeleton(p, anim);
    fig.leg1.setAttribute('points', ptsStr([s.R1, s.K1, s.F1]));
    fig.leg2.setAttribute('points', ptsStr([s.R2, s.K2, s.F2]));
    fig.arm1.setAttribute('points', ptsStr([s.S1, s.E1, s.W1]));
    fig.arm2.setAttribute('points', ptsStr([s.S2, s.E2, s.W2]));
    fig.torso.setAttribute('x1', s.P[0]); fig.torso.setAttribute('y1', s.P[1]);
    fig.torso.setAttribute('x2', s.N[0]); fig.torso.setAttribute('y2', s.N[1]);
    fig.head.setAttribute('cx', s.H[0]); fig.head.setAttribute('cy', s.H[1]);

    // In front view both sides are visible, so draw far limbs at full strength
    fig.far.setAttribute('opacity', anim.front ? 1 : 0.38);

    const xs = [s.H, s.P, s.F1, s.F2, s.W1, s.W2].map(v => v[0]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const lowestFoot = Math.max(s.F1[1], s.F2[1], s.P[1]);
    const lift = Math.max(0, 170 - lowestFoot);
    fig.shadow.setAttribute('cx', (minX + maxX) / 2);
    fig.shadow.setAttribute('rx', Math.max(10, (maxX - minX) / 2 + 6 - lift * 0.6));
    fig.shadow.setAttribute('opacity', Math.max(0.25, 1 - lift / 25));

    const place = (node, pt, dx = 0, dy = 0) => node.setAttribute('transform', `translate(${(pt[0] + dx).toFixed(1)},${(pt[1] + dy).toFixed(1)})`);
    place(fig.db1, s.W1);
    place(fig.db2, s.W2);
    place(fig.dbPelvis, s.P, 4, -7);
    fig.band.setAttribute('x1', s.W1[0]); fig.band.setAttribute('y1', s.W1[1]);
    fig.band.setAttribute('x2', s.F1[0]); fig.band.setAttribute('y2', s.F1[1]);

    if ((anim.props || []).includes('rope')) {
      const phase = ((ms % anim.ropePeriod) / anim.ropePeriod) * Math.PI * 2;
      const targetY = 95 + 78 * Math.cos(phase);
      const handY = (s.W1[1] + s.W2[1]) / 2;
      const ctrlY = 2 * targetY - handY;
      const d = `M ${s.W2[0].toFixed(1)} ${s.W2[1].toFixed(1)} Q ${s.P[0].toFixed(1)} ${ctrlY.toFixed(1)} ${s.W1[0].toFixed(1)} ${s.W1[1].toFixed(1)}`;
      const behind = Math.sin(phase) > 0;
      fig.ropeBack.setAttribute('d', behind ? d : '');
      fig.ropeFront.setAttribute('d', behind ? '' : d);
    }
    if ((anim.props || []).includes('arrow')) {
      fig.arrow.setAttribute('opacity', (0.45 + 0.45 * Math.sin(ms / 300)).toFixed(2));
    }
    return rep;
  }

  // ---- Studio State ----
  const studioModal = document.getElementById('exerciseStudioModal');
  const studioList = document.getElementById('studioList');
  const studioStage = document.getElementById('studioStage');
  const studioPlayBtn = document.getElementById('studioPlayBtn');
  const studioSpeedBtn = document.getElementById('studioSpeedBtn');
  const studioRestBtn = document.getElementById('studioRestBtn');
  const stageRepBadge = document.getElementById('stageRepBadge');

  let studioOpen = false;
  let studioSelectedId = STUDIO_ITEMS[0].id;
  let studioRaf = null, studioLastTs = 0, studioElapsed = 0;
  let studioPaused = false, studioSpeed = 1;
  let restTimer = null, restRemaining = 0;

  function getDoneSets(item) {
    if (item.special === 'skipping') {
      return skippingRounds.map((done, i) => done ? i + 1 : null).filter(Boolean);
    }
    return completedSets[item.id] || [];
  }
  const isItemDone = item => getDoneSets(item).length >= item.sets;

  function toggleItemSet(item, setNum) {
    if (item.special === 'skipping') {
      skippingRounds[setNum - 1] = !skippingRounds[setNum - 1];
    } else {
      let list = completedSets[item.id] || [];
      list = list.includes(setNum) ? list.filter(n => n !== setNum) : [...list, setNum];
      completedSets[item.id] = list;
    }
    syncHabitsFromWorkouts();
  }

  function toggleItemComplete(item) {
    const markDone = !isItemDone(item);
    if (item.special === 'skipping') {
      skippingRounds = skippingRounds.map(() => markDone);
    } else {
      completedSets[item.id] = markDone ? Array.from({ length: item.sets }, (_, i) => i + 1) : [];
    }
    syncHabitsFromWorkouts();
  }

  function renderStudioLaunchProgress() {
    const node = document.getElementById('studioLaunchProgress');
    if (!node) return;
    const done = STUDIO_ITEMS.filter(isItemDone).length;
    node.textContent = `${done}/${STUDIO_ITEMS.length}`;
    node.classList.toggle('all-done', done === STUDIO_ITEMS.length);
  }

  function renderStudioList() {
    studioList.innerHTML = '';
    STUDIO_CAT_ORDER.forEach(cat => {
      const items = STUDIO_ITEMS.filter(i => i.category === cat);
      const doneCount = items.filter(isItemDone).length;
      const group = document.createElement('div');
      group.className = 'studio-cat';
      group.style.setProperty('--cat-color', STUDIO_COLORS[cat]);
      group.innerHTML = `
        <div class="studio-cat-head">
          <span class="studio-cat-dot"></span>
          <span>${STUDIO_CAT_LABELS[cat]}</span>
          <span class="studio-cat-count">${doneCount}/${items.length}</span>
        </div>`;

      items.forEach(item => {
        const doneSets = getDoneSets(item);
        const done = doneSets.length >= item.sets;
        const row = document.createElement('div');
        row.className = `studio-row ${done ? 'done' : ''} ${item.id === studioSelectedId ? 'active' : ''}`;
        row.setAttribute('role', 'button');
        row.tabIndex = 0;
        const dots = Array.from({ length: item.sets }, (_, i) => `<i class="${doneSets.includes(i + 1) ? 'on' : ''}"></i>`).join('');
        row.innerHTML = `
          <button type="button" class="studio-check" aria-label="Mark ${item.name} complete">✓</button>
          <span class="studio-row-main">
            <span class="studio-row-name">${item.name}</span>
            <span class="studio-row-meta">${item.sets} × ${item.reps} · ${item.rest.replace(' rest', '')}</span>
          </span>
          <span class="studio-row-dots">${dots}</span>`;
        row.querySelector('.studio-check').addEventListener('click', e => {
          e.stopPropagation();
          toggleItemComplete(item);
        });
        row.addEventListener('click', () => selectExerciseInStudio(item.id, true));
        row.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectExerciseInStudio(item.id, true); }
        });
        group.appendChild(row);
      });
      studioList.appendChild(group);
    });
  }

  function renderStudioDetail() {
    const item = STUDIO_ITEMS.find(i => i.id === studioSelectedId);
    if (!item) return;
    const color = STUDIO_COLORS[item.category];
    const doneSets = getDoneSets(item);
    const done = doneSets.length >= item.sets;

    document.getElementById('studioExName').textContent = item.name;
    document.getElementById('studioExTarget').textContent = item.target;
    document.getElementById('studioSpecVolume').textContent = `${item.sets} × ${item.reps}`;
    document.getElementById('studioSpecLoad').textContent = item.load;
    document.getElementById('studioSpecRest').textContent = item.rest.replace(' rest', '');
    document.getElementById('studioCue').innerHTML = `<strong>Form cue:</strong> ${item.cue}`;
    const catBadge = document.getElementById('stageCatBadge');
    catBadge.textContent = item.category.toUpperCase();
    catBadge.style.color = color;

    const flag = document.getElementById('studioFlag');
    const alt = IMPACT_ALTERNATIVES[item.id];
    if (alt) {
      flag.style.display = '';
      flag.innerHTML = `<strong>⚠ Impact flag:</strong> Uric Acid 8.4 mg/dL is above range in your report. Land softly on the balls of your feet; stop if any big-toe or ankle joint pain. <span class="studio-flag-alt">Safer swap: ${alt}</span>`;
    } else {
      flag.style.display = 'none';
    }

    const setsWrap = document.getElementById('studioSets');
    setsWrap.innerHTML = '';
    const label = item.special === 'skipping' ? 'R' : 'Set ';
    for (let s = 1; s <= item.sets; s++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      const on = doneSets.includes(s);
      btn.className = `studio-set-btn ${on ? 'on' : ''}`;
      btn.textContent = on ? `${label}${s} ✓` : `${label}${s}`;
      btn.addEventListener('click', () => toggleItemSet(item, s));
      setsWrap.appendChild(btn);
    }

    const completeBtn = document.getElementById('studioCompleteBtn');
    completeBtn.textContent = done ? '↺ Undo Complete' : '✓ Mark Complete';
    completeBtn.classList.toggle('is-done', done);

    if (!restTimer) {
      studioRestBtn.textContent = `⏱ Start ${parseInt(item.rest) || 30}s Rest`;
    }
  }

  function renderStudioHeader() {
    const done = STUDIO_ITEMS.filter(isItemDone).length;
    const total = STUDIO_ITEMS.length;
    document.getElementById('studioHeadSub').textContent = `${done} of ${total} movements complete`;
    document.getElementById('studioProgressFill').style.width = `${Math.round((done / total) * 100)}%`;
    const energy = calculateDynamicEnergy(steps);
    document.getElementById('studioBurnPill').textContent = `🔥 +${energy.workoutBurnKcal} kcal`;
  }

  function renderStudio() {
    renderStudioLaunchProgress();
    if (!studioOpen) return;
    renderStudioHeader();
    renderStudioList();
    renderStudioDetail();
  }

  function applyFigureTheme(item, anim) {
    const color = STUDIO_COLORS[item.category];
    [fig.leg1, fig.leg2, fig.arm1, fig.arm2].forEach(n => n.setAttribute('stroke', color));
    fig.torso.setAttribute('stroke', color);
    fig.head.setAttribute('fill', color);
    fig.glowStop.setAttribute('stop-color', color);
    const props = anim.props || [];
    setVis(fig.db1, props.includes('db1'));
    setVis(fig.db2, props.includes('db2'));
    setVis(fig.dbPelvis, props.includes('dbPelvis'));
    setVis(fig.chair, props.includes('chair'));
    setVis(fig.band, props.includes('band'));
    setVis(fig.arrow, props.includes('arrow'));
    setVis(fig.ropeBack, props.includes('rope'));
    setVis(fig.ropeFront, props.includes('rope'));
    studioStage.classList.toggle('isometric', !!anim.hold);
  }

  function selectExerciseInStudio(id, fromList) {
    studioSelectedId = id;
    studioElapsed = 0;
    const item = STUDIO_ITEMS.find(i => i.id === id);
    const anim = EXERCISE_ANIMATIONS[id];
    if (item && anim) applyFigureTheme(item, anim);
    stopRestTimer();
    studioStage.classList.remove('swap');
    void studioStage.offsetWidth; // restart CSS swap animation
    studioStage.classList.add('swap');
    renderStudio();
    if (fromList && window.matchMedia('(max-width: 760px)').matches) {
      studioModal.querySelector('.studio-shell').scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function stepSelection(delta) {
    const idx = STUDIO_ITEMS.findIndex(i => i.id === studioSelectedId);
    const next = STUDIO_ITEMS[(idx + delta + STUDIO_ITEMS.length) % STUDIO_ITEMS.length];
    selectExerciseInStudio(next.id, false);
  }

  function studioFrame(ts) {
    if (!studioOpen) return;
    if (!studioLastTs) studioLastTs = ts;
    const dt = Math.min(64, ts - studioLastTs);
    studioLastTs = ts;
    if (!studioPaused) studioElapsed += dt * studioSpeed;
    const anim = EXERCISE_ANIMATIONS[studioSelectedId];
    if (anim) {
      const rep = drawFigure(anim, studioElapsed);
      if (anim.hold) {
        const secs = Math.floor(studioElapsed / 1000) % 46;
        stageRepBadge.textContent = `Hold 0:${String(secs).padStart(2, '0')}`;
      } else if (anim.ropePeriod) {
        stageRepBadge.textContent = `Turn ${Math.floor(studioElapsed / anim.ropePeriod) + 1}`;
      } else {
        stageRepBadge.textContent = `Rep ${rep}`;
      }
    }
    studioRaf = requestAnimationFrame(studioFrame);
  }

  function stopRestTimer() {
    if (restTimer) clearInterval(restTimer);
    restTimer = null;
    studioRestBtn.classList.remove('running');
  }

  studioRestBtn.addEventListener('click', () => {
    const item = STUDIO_ITEMS.find(i => i.id === studioSelectedId);
    if (restTimer) {
      stopRestTimer();
      renderStudioDetail();
      return;
    }
    restRemaining = parseInt(item.rest) || 30;
    studioRestBtn.classList.add('running');
    studioRestBtn.textContent = `⏸ Resting… ${restRemaining}s`;
    restTimer = setInterval(() => {
      restRemaining -= 1;
      if (restRemaining <= 0) {
        stopRestTimer();
        studioRestBtn.textContent = '✅ Rest done — next set!';
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        setTimeout(() => { if (!restTimer) renderStudioDetail(); }, 2500);
      } else {
        studioRestBtn.textContent = `⏸ Resting… ${restRemaining}s`;
      }
    }, 1000);
  });

  document.getElementById('studioCompleteBtn').addEventListener('click', () => {
    const item = STUDIO_ITEMS.find(i => i.id === studioSelectedId);
    const wasDone = isItemDone(item);
    toggleItemComplete(item);
    // Auto-advance to the next unfinished movement after completing one
    if (!wasDone) {
      const idx = STUDIO_ITEMS.findIndex(i => i.id === studioSelectedId);
      const nextOpen = STUDIO_ITEMS.slice(idx + 1).concat(STUDIO_ITEMS.slice(0, idx)).find(i => !isItemDone(i));
      if (nextOpen) setTimeout(() => selectExerciseInStudio(nextOpen.id, false), 450);
    }
  });

  studioPlayBtn.addEventListener('click', () => {
    studioPaused = !studioPaused;
    studioPlayBtn.textContent = studioPaused ? '▶' : '❚❚';
    studioPlayBtn.setAttribute('aria-label', studioPaused ? 'Play' : 'Pause');
  });
  studioSpeedBtn.addEventListener('click', () => {
    studioSpeed = studioSpeed === 1 ? 0.5 : studioSpeed === 0.5 ? 0.25 : 1;
    studioSpeedBtn.textContent = `${studioSpeed}×`;
  });
  document.getElementById('studioPrevBtn').addEventListener('click', () => stepSelection(-1));
  document.getElementById('studioNextBtn').addEventListener('click', () => stepSelection(1));

  function openExerciseStudio(id) {
    studioOpen = true;
    studioModal.style.display = 'flex';
    studioModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('studio-lock');
    requestAnimationFrame(() => studioModal.classList.add('open'));
    selectExerciseInStudio(id || studioSelectedId, false);
    studioLastTs = 0;
    cancelAnimationFrame(studioRaf);
    studioRaf = requestAnimationFrame(studioFrame);
  }

  function closeExerciseStudio() {
    studioOpen = false;
    stopRestTimer();
    cancelAnimationFrame(studioRaf);
    studioModal.classList.remove('open');
    studioModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('studio-lock');
    setTimeout(() => { if (!studioOpen) studioModal.style.display = 'none'; }, 280);
  }

  document.getElementById('openStudioBtn').addEventListener('click', () => {
    const firstOpen = STUDIO_ITEMS.find(i => !isItemDone(i));
    openExerciseStudio(firstOpen ? firstOpen.id : STUDIO_ITEMS[0].id);
  });
  document.getElementById('studioCloseBtn').addEventListener('click', closeExerciseStudio);
  studioModal.addEventListener('click', e => { if (e.target === studioModal) closeExerciseStudio(); });
  document.addEventListener('keydown', e => {
    if (!studioOpen) return;
    if (e.key === 'Escape') closeExerciseStudio();
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); stepSelection(1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); stepSelection(-1); }
  });

  // --- 7. DIET & LOOP SYNC ---
  function renderDietBadges() {
    const waterPill = document.getElementById('nutritionWaterBadge');
    if (waterPill) {
      waterPill.textContent = waterMet ? '💧 3.5L Target Met ✓' : '💧 3.5L Water';
      waterPill.style.color = waterMet ? '#10b981' : '#38bdf8';
    }
    const loopCheck = document.getElementById('logWaterCheck');
    if (loopCheck) {
      loopCheck.checked = waterMet;
    }
  }

  // Nightly Loop Form & Clinical Metrics Storage
  const logPain = document.getElementById('logPain');
  const logPainTxt = document.getElementById('logPainTxt');
  const logGlucoseInput = document.getElementById('logGlucose');
  
  // Restore saved clinical inputs if previously logged
  const savedClinical = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLINICAL_LOGS));
  if (savedClinical) {
    if (logGlucoseInput && savedClinical.glucose !== undefined) {
      logGlucoseInput.value = savedClinical.glucose;
    }
    if (logPain && savedClinical.pain !== undefined) {
      logPain.value = savedClinical.pain;
    }
  }

  if (logPain && logPainTxt) {
    const updatePainDesc = (v) => {
      let desc = 'Joints Asymptomatic';
      if (v >= 1 && v <= 2) desc = 'Mild joint stiffness';
      else if (v >= 3 && v <= 5) desc = 'Moderate discomfort / Uric acid alert';
      else if (v >= 6) desc = 'Acute Pain Flare';
      logPainTxt.textContent = `${v} / 10 (${desc})`;
      logPainTxt.style.color = v > 2 ? '#ef4444' : '#38bdf8';
    };
    logPain.addEventListener('input', (e) => updatePainDesc(parseInt(e.target.value)));
    updatePainDesc(parseInt(logPain.value) || 0);
  }

  const patientLogForm = document.getElementById('patientLogForm');
  if (patientLogForm) {
    patientLogForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const g = parseFloat(document.getElementById('logGlucose').value) || 100;
      const p = parseInt(logPain.value) || 0;
      const logStepsVal = parseInt(document.getElementById('logStepsInput').value) || steps;
      if (logStepsVal !== steps) {
        steps = logStepsVal;
      }
      waterMet = document.getElementById('logWaterCheck').checked;

      // Persist clinical audit log
      localStorage.setItem(STORAGE_KEYS.CLINICAL_LOGS, JSON.stringify({
        glucose: g,
        pain: p,
        date: getTodayString()
      }));

      syncHabitsFromWorkouts();

      const energy = calculateDynamicEnergy(steps);
      const resBox = document.getElementById('adaptationResult');
      const items = document.getElementById('adItems');
      resBox.style.display = 'block';
      items.innerHTML = '';

      // 1. Dynamic Step & Caloric Adjustment
      if (steps < 4000) {
        items.innerHTML += `
          <div class="ad-pill warn">
            <strong>⚡ Low Step Volume Logged (${steps.toLocaleString()} steps):</strong> Step burn was only +${energy.stepBurnKcal} kcal. Daily TDEE adjusted down to ${energy.dynamicTdee.toLocaleString()} kcal. Tomorrow's calorie budget is reduced to <strong>${energy.targetCalories.toLocaleString()} kcal</strong> (Carbs lowered to ${energy.carbsG}g) to prevent insulin resistance and hepatic steatosis (ALT 74, Glucose 104).
          </div>
        `;
      } else if (steps >= 8000) {
        items.innerHTML += `
          <div class="ad-pill ok">
            <strong>🔥 High NEAT Burn (${steps.toLocaleString()} steps):</strong> You burned +${energy.stepBurnKcal} kcal through walking! TDEE raised to ${energy.dynamicTdee.toLocaleString()} kcal. Daily calorie budget dynamically scaled up to <strong>${energy.targetCalories.toLocaleString()} kcal</strong> (Carbs increased to ${energy.carbsG}g). You have earned an extra portion of complex carbs (quinoa/sweet potato) to replenish depleted glycogen without fat gain.
          </div>
        `;
      } else {
        items.innerHTML += `
          <div class="ad-pill ok">
            <strong>✓ Target NEAT Range (${steps.toLocaleString()} steps):</strong> Step burn +${energy.stepBurnKcal} kcal. Daily calories remain locked at baseline <strong>${energy.targetCalories.toLocaleString()} kcal</strong> (Carbs: ${energy.carbsG}g, Protein: ${energy.proteinG}g).
          </div>
        `;
      }

      if (g > 100) {
        items.innerHTML += `
          <div class="ad-pill warn">
            <strong>⚡ Glycemic Adjustment (Fasting: ${g} mg/dL):</strong> Reduce dinner sweet potato to 100g. Complete 2,500 of your 6,000 steps directly within 45 minutes after meals to activate GLUT4 non-insulin glucose uptake.
          </div>
        `;
      } else {
        items.innerHTML += `
          <div class="ad-pill ok">
            <strong>✓ Glycemic Target Met (${g} mg/dL):</strong> Fasting plasma glucose below prediabetes threshold. Maintain 1,950 kcal intake.
          </div>
        `;
      }

      if (p > 2) {
        items.innerHTML += `
          <div class="ad-pill warn">
            <strong>🛑 Uric Acid / Joint Safeguard (Pain: ${p}/10):</strong> Elevated joint sensitivity detected. Temporarily switch skipping rope and burpees to low-impact recumbent cycling or brisk walking. Drink 4.0L of water with fresh lemon juice.
          </div>
        `;
      } else {
        items.innerHTML += `
          <div class="ad-pill ok">
            <strong>✓ Joint Integrity Protected (0/10):</strong> No urate crystal irritation. Proceed with full skipping rope & dumbbell routine.
          </div>
        `;
      }

      if (!waterMet) {
        items.innerHTML += `
          <div class="ad-pill warn">
            <strong>💧 Hydration Deficit:</strong> Front-load 500ml water upon waking tomorrow before coffee or breakfast to assist kidney uric acid filtration.
          </div>
        `;
      }
    });
  }

  // --- 8. NAVIGATION & PWA INSTALL ---
  const appWrapper = document.getElementById('appWrapper');
  const toggleMobileView = document.getElementById('toggleMobileView');
  const toggleDesktopView = document.getElementById('toggleDesktopView');
  const dockItems = document.querySelectorAll('.dock-item');
  const tabViews = document.querySelectorAll('.tab-view');

  toggleMobileView.addEventListener('click', () => {
    appWrapper.className = 'app-wrapper mobile-layout';
    toggleMobileView.classList.add('active');
    toggleDesktopView.classList.remove('active');
  });

  toggleDesktopView.addEventListener('click', () => {
    appWrapper.className = 'app-wrapper desktop-layout';
    toggleDesktopView.classList.add('active');
    toggleMobileView.classList.remove('active');
  });

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.tab;
      dockItems.forEach(i => i.classList.toggle('active', i === item));
      tabViews.forEach(v => v.classList.toggle('active', v.id === target));
      document.getElementById('deviceContent').scrollTop = 0;
    });
  });

  // iPhone Install Modal
  const installGuideBtn = document.getElementById('installGuideBtn');
  const installModal = document.getElementById('installModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (installGuideBtn && installModal && closeModalBtn) {
    installGuideBtn.addEventListener('click', () => {
      installModal.style.display = 'flex';
    });
    closeModalBtn.addEventListener('click', () => {
      installModal.style.display = 'none';
    });
    installModal.addEventListener('click', (e) => {
      if (e.target === installModal) installModal.style.display = 'none';
    });
  }

  // --- 9. CELEBRATION PARTICLE & CONFETTI ENGINE ---
  const celebrationCanvas = document.getElementById('celebrationCanvas');
  const celebrationModal = document.getElementById('celebrationModal');
  const celebrationCloseBtn = document.getElementById('celebrationCloseBtn');
  const celebrationDesc = document.getElementById('celebrationDesc');
  let hasCelebratedToday = false;

  function triggerWorkoutCelebration(routineTitle) {
    if (!celebrationModal) return;

    if (celebrationDesc) {
      celebrationDesc.textContent = `You completed all prescribed movements for ${routineTitle || "today's workout"}!`;
    }
    celebrationModal.style.display = 'flex';

    if (navigator.vibrate) {
      navigator.vibrate([150, 80, 150, 80, 250]);
    }

    if (celebrationCanvas) {
      runConfettiBurst();
    }
  }

  if (celebrationCloseBtn) {
    celebrationCloseBtn.addEventListener('click', () => {
      celebrationModal.style.display = 'none';
    });
  }
  if (celebrationModal) {
    celebrationModal.addEventListener('click', (e) => {
      if (e.target === celebrationModal) celebrationModal.style.display = 'none';
    });
  }

  function runConfettiBurst() {
    const ctx = celebrationCanvas.getContext('2d');
    celebrationCanvas.width = window.innerWidth;
    celebrationCanvas.height = window.innerHeight;

    const colors = ['#10b981', '#38bdf8', '#f59e0b', '#fb7185', '#c084fc', '#ffffff'];
    const particles = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: celebrationCanvas.width / 2 + (Math.random() - 0.5) * 80,
        y: celebrationCanvas.height * 0.45 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 1.2) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
        alpha: 1,
        gravity: 0.38
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.007;

        if (p.alpha > 0 && p.y < celebrationCanvas.height + 20) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 220) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  // Initial Sync & Render
  syncUIAfterStateChange();
});
