import http.server
import socketserver
import json
import os

PORT = 8080

class HealthAppHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/audit':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                response = self.calculate_clinical_audit(data)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return
        elif self.path == '/api/adjust':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                response = self.calculate_adjustments(data)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return
        else:
            self.send_response(404)
            self.end_headers()

    def calculate_clinical_audit(self, data):
        age = float(data.get('age', 30))
        gender = str(data.get('gender', 'male')).lower()
        height_cm = float(data.get('height_cm', 179))
        weight_kg = float(data.get('weight_kg', 92))

        # Mifflin-St Jeor
        if gender == 'female':
            bmr = round((10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161)
        else:
            bmr = round((10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5)

        tdee = round(bmr * 1.4) # Light-moderate with 6k steps
        target_calories = max(1600, tdee - 700) # Safe 700 kcal deficit for 92kg fat burn

        protein_g = round((target_calories * 0.30) / 4)
        fat_g = round((target_calories * 0.31) / 9)
        carbs_g = round((target_calories - (protein_g * 4) - (fat_g * 9)) / 4)
        water_litres = 3.5

        return {
            'metrics': {
                'age': age,
                'gender': gender,
                'height_cm': height_cm,
                'weight_kg': weight_kg,
                'bmi': round(weight_kg / ((height_cm/100)**2), 1),
                'bmr': bmr,
                'tdee': tdee,
                'target_calories': target_calories,
                'macros': {
                    'protein_g': protein_g,
                    'carbs_g': carbs_g,
                    'fat_g': fat_g,
                    'fiber_g': 38
                },
                'water_litres': water_litres
            }
        }

    def calculate_adjustments(self, data):
        glucose = float(data.get('glucose', 100))
        pain = int(data.get('pain', 0))
        adjustments = []

        if glucose > 100:
            adjustments.append({
                'title': 'Glycemic Elevation Alert',
                'severity': 'warning',
                'recommendation': 'Reduce dinner complex carbs to 100g. Complete 2,500 steps directly 20 minutes post-dinner.'
            })
        if pain > 2:
            adjustments.append({
                'title': f'Joint Strain (Score: {pain}/10)',
                'severity': 'danger',
                'recommendation': 'Switch skipping rope and burpees to low-impact walking. Drink 4.0L water with fresh lemon.'
            })

        return {'status': 'processed', 'adjustments': adjustments}

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), HealthAppHandler) as httpd:
        print(f"Health Clinical App Server running at http://localhost:{PORT}")
        httpd.serve_forever()
