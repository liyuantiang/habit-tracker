from flask import Flask, jsonify #python list->JSON, so Js can read it
#import the Flask class-blueprint 4 create a web app
from database import get_connection, init_db

app = Flask(__name__)
#create a website server, and save in variable
init_db() # Initialize the database

#when user goes to the home page, run the function below
@app.route("/") #@=decorator, route=URL, /=home page
def home(): #def=function in python, home=functionName
    return "Hello, To-do list!"

@app.route("/about") #when user goes to the about page, run the function below
def about():
    return "You can use this website to track your habits and to-do list!"

@app.route("/tasks")
def get_tasks():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM tasks").fetchall()
    conn.close()

    tasks = []
    for row in rows:
        tasks.append({
            "id": row["id"],
            "text": row["text"],
            "completed": bool(row["completed"])
        })
        #each task has an id, text, and completed status
        #[{},{},...]: Pythonlist of dictionaries
    return jsonify(tasks) #return the tasks in JSON format

@app.route("/habits")
def habits():
    habits = [
        {"habit_id": 1, "name": "Exercise", "completedDates": ["2026-10-08", "2026-10-09"]},
    ]
    return jsonify(habits)

if __name__ == "__main__":
    app.run(debug=True) #start the server,
    #debug=True means it will automatically restart when code changes