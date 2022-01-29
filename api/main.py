import threading
from flask import (
    Flask,
    render_template,
    Response,
    request,
    send_from_directory,
    send_file,
)
from flask_cors import CORS
import os
from askee import convert

app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = os.path.join(app.root_path, "static")
UPLOAD = os.path.join(app.root_path, "static")


@app.route("/upload", methods=["POST"])
def save_img():
    print("Upload endpoint hit")
    convert(request.files["file"])
    return Response(status=200)


@app.route("/download")
def download():
    root = os.path.dirname(os.getcwd())
    filename = "new.png"
    return send_from_directory(
        UPLOAD, filename, as_attachment=True, mimetype="image/png"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
