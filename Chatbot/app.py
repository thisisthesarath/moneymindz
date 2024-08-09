from flask import Flask, request, jsonify
from datetime import datetime
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('model.pkl')

# Sample dataset
expenses = [
    {"expense_date": "2024-08-01", "expense_name": "Groceries", "expense_amount": 150.00, "expense_category": "Food"},
    {"expense_date": "2024-08-03", "expense_name": "Rent", "expense_amount": 1200.00, "expense_category": "Housing"},
    {"expense_date": "2024-08-05", "expense_name": "Gym Membership", "expense_amount": 50.00, "expense_category": "Health & Fitness"},
    {"expense_date": "2024-08-02", "expense_name": "Electricity Bill", "expense_amount": 100.00, "expense_category": "Utilities"},
    {"expense_date": "2024-08-06", "expense_name": "Movie Tickets", "expense_amount": 25.00, "expense_category": "Entertainment"},
    {"expense_date": "2024-08-04", "expense_name": "Coffee Shop", "expense_amount": 10.00, "expense_category": "Food"},
    {"expense_date": "2024-08-07", "expense_name": "Internet Bill", "expense_amount": 60.00, "expense_category": "Utilities"},
    {"expense_date": "2024-08-09", "expense_name": "Dining Out", "expense_amount": 80.00, "expense_category": "Food"},
    {"expense_date": "2024-08-01", "expense_name": "Gasoline", "expense_amount": 40.00, "expense_category": "Transportation"},
    {"expense_date": "2024-08-05", "expense_name": "Office Supplies", "expense_amount": 30.00, "expense_category": "Miscellaneous"},
    {"expense_date": "2024-08-03", "expense_name": "Online Shopping", "expense_amount": 200.00, "expense_category": "Shopping"},
    {"expense_date": "2024-08-08", "expense_name": "Rent", "expense_amount": 1100.00, "expense_category": "Housing"}
]

@app.route('/expense', methods=['GET'])
def get_expenses():
    category = request.args.get('category')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    filtered_expenses = [expense for expense in expenses]
    
    if category:
        filtered_expenses = [expense for expense in filtered_expenses if expense['expense_category'].lower() == category.lower()]
    
    if start_date:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        filtered_expenses = [expense for expense in filtered_expenses if datetime.strptime(expense['expense_date'], '%Y-%m-%d') >= start_date]
    
    if end_date:
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
        filtered_expenses = [expense for expense in filtered_expenses if datetime.strptime(expense['expense_date'], '%Y-%m-%d') <= end_date]
    
    return jsonify(filtered_expenses)

@app.route('/predict', methods=['POST'])
def predict_expense():
    data = request.json
    expense_amount = data.get('expense_amount')
    
    if expense_amount is None:
        return jsonify({"error": "expense_amount is required"}), 400
    
    # Predict future expense
    expense_amount = np.array([[expense_amount]])
    prediction = model.predict(expense_amount)
    
    return jsonify({"predicted_future_expense": prediction[0]})

@app.route('/')
def home():
    return "Welcome to the Financial Chatbot API! Use /expense endpoint to query your expenses and /predict endpoint to predict future expenses."

if __name__ == '__main__':
    app.run(debug=True, port=5004)
