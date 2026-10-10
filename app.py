from flask import Flask, jsonify #python list->JSON, so Js can read it
#import the Flask class-blueprint 4 create a web app

app = Flask(__name__)
#create a website server, and save in variable

#when user goes to the home page, run the function below
@app.route("/") #@=decorator, route=URL, /=home page
def home(): #def=function in python, home=functionName
    return "Hello, To-do list!"

@app.route("/about") #when user goes to the about page, run the function below
def about():
    return "You can use this website to track your habits and to-do list!"

@app.route("/tasks")
def get_tasks():
    tasks = [
        {"id": 1, "text": "Buy groceries", "completed": False},
        {"id": 2, "text": "Walk the dog", "completed": True},
        {"id":3, "text":"Building my project", "completed":False},
    ] #each task has an id, text, and completed status
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