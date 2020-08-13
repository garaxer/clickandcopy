import os
import webbrowser
from flask import Flask, send_from_directory, request, jsonify
# from src.visionParagraghReader import render_doc_text
from src.tesseractReader import render_doc_text

from werkzeug.utils import secure_filename
from flask_cors import CORS
import cv2

app = Flask(__name__, static_folder='build')

app.config['API_URL'] = "http://127.0.0.1:5000/planUpload"
print(app.config['API_URL'])
# export API_URL=http://127.0.0.1:5000/planUpload
# http://127.0.0.1:5000/planUpload
CORS(app, resources={r'/*': {'origins': '*'}})


def tifftoPng(imageLocation):
    Images = []
    multiBoolean, Images = cv2.imreadmulti(imageLocation, Images)
    imageNames = []
    for i, image in enumerate(Images):
        cv2.imwrite(f'{imageLocation}_{i}.png', image)
        imageNames = [*imageNames, f'{imageLocation}_{i}.png']
    return imageNames

@app.route('/planUpload', methods=['POST'])
def upload():
    print('hello')
    # Save file inside build.

    f = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if f.filename == '':
        return 'Error empty file received'
    filename = secure_filename(f.filename)
    print('filename')
    filePath = os.path.join('build', filename)
    f.save(filePath)
    print(filename)
    print(filePath)

    if filePath.split('.')[-1] == 'tif':
        print('tif uploaded')
        filePath = tifftoPng(filePath)[0]
        filename = os.path.basename(filePath)
        print(filePath)
        print(filename)



    try:
        data = render_doc_text(filePath, fileout=0)
        print('success')
        return jsonify({'data': data, 'url': filename})
    except:
        return jsonify({'error': 'OCRing plan failed'})


@app.route('/test', methods=['GET'])
def show_results():
    print('hello')
    return jsonify({'data': 'success'})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # webbrowser.open("http://127.0.0.1:5000/")

    app.run(use_reloader=True, port=5000, threaded=True)
