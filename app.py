from flask import Flask
#Flask=tool

app = Flask(__name__)
#create a website server, and save in variable

@app.route("/") #when user goes to the home page, run the function below
def home(): #def=function in python, home=functionName
    return "Hello, To-do list!"

@app.route("/about") #when user goes to the about page, run the function below
def about():
    return "You can use this website to track your habits and to-do list!"

if __name__ == "__main__":
    app.run(debug=True) #start the server,
    #debug=True means it will automatically restart when code changes