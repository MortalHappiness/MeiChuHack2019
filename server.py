#!/usr/bin/env python3
import os
from flask import Flask, render_template, jsonify, request

from src.server.utils.data_loader import DataLoader
# ===============================

app = Flask(__name__, static_folder = 'static', template_folder = 'templates')
app.config["JSON_AS_ASCII"] = False

loader = DataLoader("./data", "roadlamp")

# ===============================

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/position")
def get_position_by_datatype():
    datatype = request.args["type"]
    return jsonify(loader.get_position_by_datatype(datatype))

@app.route("/ndata")
def get_n_lateset_data():
    device_id = request.args["id"]
    datatypes = request.args.getlist("type[]")
    n = int(request.args["n"])
    return jsonify(loader.get_n_lateset_data(device_id, datatypes, n))

@app.route("/download")
def get_download_file():
    device_id = request.args["id"]
    datatypes = request.args.getlist("type[]")
    n = int(request.args["n"])
    fmt = request.args["fmt"]
    return jsonify(loader.get_download_file(device_id, datatypes, n, fmt))

# To prevent caching
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

# ================================

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8080), debug=True)
