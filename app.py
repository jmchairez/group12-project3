import os
from flask import Flask, flash, render_template, redirect, request, url_for, send_file, jsonify
from flask import send_from_directory
from keras.models import load_model
from tensorflow import keras
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras import layers
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
import numpy as np
from pathlib import Path

#Define a flask app
app = Flask(__name__)
app.secret_key = 'this is a random string'
UPLOAD_FOLDER = 'UPLOAD_FOLDER'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['jpg','jpeg','png','tiff', 'bmp','gif'])
image_size = (128,128)

#model saved 
harvey_model3 = load_model('model/harvey_model3.h5')

def allowed_image(imagename):
    return '.' in imagename and \
           imagename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#flask routes#
@app.route('/', methods=['GET', 'POST'])
def upload_file():

    return render_template("index.html")  

@app.route('/predict', methods=['GET', 'POST'])
def predict():
        if request.method == 'POST':
            #filename= file.filename
            # check if the post request has the file part
            # print(request.data)

            file = request.data
            
            # if user does not select file, browser also
            # submit an empty part without filename
            
            if True and allowed_image('file.jpg'):
                if not Path(app.config['UPLOAD_FOLDER']).exists(): Path(app.config['UPLOAD_FOLDER']).mkdir()
                with open(os.path.join(app.config['UPLOAD_FOLDER'], 'file.jpg'), 'wb') as f:
                    f.write(file)
                img = load_img(os.path.join(app.config['UPLOAD_FOLDER'], 'file.jpg'), target_size = image_size)
                img = img_to_array(img)
                img = tf.expand_dims(img, axis=0)
                probs = harvey_model3.predict(img)[0][0]
                print("-"*25,f"\n{probs}\n","-"*25)

                # output = {0:"Damage", 1:"No Damage"}[probs]
                # return render_template("model.html", output=output)
                output = {'damaged': f"{probs}"}
                return jsonify(output)
        # return render_template("model.html")

@app.route('/model', methods=['GET'])
def model():
    return render_template("model.html")

# @app.route('/predict/<filename>', methods =['POST'])
# def predict(filename):
#     img = load_img(filename, target_size = image_size)
#     img = img_to_array(img)/225.0
#     img = np.expand_dims(img, axis=0)
#     probs = harvey_model3.predict(img)[0]
#     output = {'damage': probs[0], 'no damage': probs[1]}
#     return output
@app.route("/team")
def team():
    return render_template("team.html")

@app.route("/map")
def map():
    return render_template("map.html")


    
if __name__ == "__main__":
    app.run(debug=True)