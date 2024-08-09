import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

data = [
    {"expense_amount": 150.00, "future_expense_amount": 160.00},
    {"expense_amount": 1200.00, "future_expense_amount": 1250.00},
]

df = pd.DataFrame(data)
X = df[['expense_amount']]
y = df['future_expense_amount']
pyth
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'model.pkl')
