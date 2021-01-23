import os
from flask import Flask, flash, render_template, redirect, request, url_for, send_file
from flask import send_from_directory
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow import keras
import tensorflow as tf
from keras.preprocessing import imageDataGenerator, load_img, img_to_array

#Define a flask app
app = Flask(__name__)

UPLOAD_FOLDER = '/path/to/the/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['jpg','jpeg','png','tiff', 'bmp','gif'])
image_size = (128,128)

#model saved 
harvey_model3 = load_model(modelgroup2/model/harvey_model3.h5)

def allowed_image(imagename):
    return '.' in imagename and \
           imagename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#flask routes#
@app.route('/', methods=['GET', 'POST'])
def upload_predict():
    return render_template("index.html")

    if request.method == 'POST':
        # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],filename)

@app.route('/predict/<filename>', methods =['GET'])
def predict(filename):
    img = load_img(file, target_size = image_size)
    img = img_to_array(img)/225.0
    img = np.expand_dims(img, axis=0)
    probs = harvey_model3.predict(img)[0]
    output = {'damage': probs[0], 'no damage': probs[1]}
    return output
    
if __name__ == "__main__":
    load_model()
    app.run(debug=True)