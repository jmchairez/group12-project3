import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, redirect,url_for, send_from_directory, jsonify, render_template
from tensorflow import keras
from keras.preprocessing import imageDataGenerator, load_img, img_to_array
from keras import backend as k
from tensorflow.keras.models import load_model

ALLOWED_EXTENSIONS = set(['jpg','jpeg','png','tiff'])
IMAGE_SIZE = (180,180)
UPLOAD_IMAGE = 'uploads'

#h5 = load_model('model')
##vgg16 = load_model('model/vgg16.h5')##

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS

def predict(file):
    img = load_img(file, target_size = IMAGE_SIZE)
    img = img_to_array(img)/225.0
    img = np.expand_dims(img, axis=0)
    probs = h5.predict(img)[0]
    output = {'damage': probs[0], 'no damage': probs[1]}
    return output

app = Flask(__name__)
app.config['UPLOAD_IMAGE'] = 'uploads'

#flask routes#
@app.route("/")
def index_template():
    return render_template('index.html', label = '')

@app.route('/', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files["file"]
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_IMAGE'],filename)
        file.save(filepath)
        output = predict(file_path)
    return render_template(index.html, label = output, imagesource = file_path)

@app.route('/uploads/<filename>')
def upload_file(filename):
    return send_from_directory(app.config ['UPLOAD_IMAGE'], filename)

# @app.route("/photo", methods = ["GET", "POST"])
# def predict():
#     model = load_model("data/final_model.h5")

#     data = {"Success": False}

#     if request.method == "POST":
#         if request.files.get("file"):
#             file = request.files["file"]
#             filename = file.filename
#             filepath = f"{app.config['UPLOAD_IMAGE']}/{filename}"
#             file.save(filepath)

#             image_size = (180,180)
#             im = image.load_img(filepath,target_size=image_size)
#             image_array = prepare_image(im)
if __name__ == "__main__":
    load_model()
    app.run(debug=True)