from flask import flask
from flask import render_template

app = Flask(__name__)

@app.route("/", methods =["GET","POST"])
def upload_predict():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(port =12000, debug = True)
    
