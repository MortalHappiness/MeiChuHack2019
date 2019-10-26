#!/usr/bin/env python3
import os
from flask import Flask, render_template
app = Flask(__name__, static_folder = 'static', template_folder = 'templates')


@app.route("/")
def index():
    return render_template('index.html')

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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8080), debug=True)
