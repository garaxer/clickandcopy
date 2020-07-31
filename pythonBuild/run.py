import os
import webbrowser
from flask import Flask, send_from_directory, request
from src.visionParagraghReader import render_doc_text
from werkzeug.utils import secure_filename
app = Flask(__name__, static_folder='build')


@app.route('/planUpload', methods=['POST'])
def show_results():
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
    render_doc_text('filein', 'fileout')
    return 'success'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    webbrowser.open("http://127.0.0.1:5000/")

    app.run(use_reloader=True, port=5000, threaded=True)
