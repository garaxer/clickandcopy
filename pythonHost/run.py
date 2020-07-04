import os
import webbrowser
from flask import Flask, send_from_directory
from src.visionParagraghReader import render_doc_text

app = Flask(__name__, static_folder='build')


@app.route('/planUpload', methods=['GET'])
def show_results():
    print('hello')
    # Save file inside build.
    # Google vision file.
    # Send back file name path and the google vision json (as data not path)
    # For now you can just replace the testJson and Image after running this route manually
    render_doc_text('filein', 'fileout')


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
