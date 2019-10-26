from argparse import ArgumentParser
from flask import Flask, send_file, request, jsonify

app = Flask(
    __name__, 
    template_folder = "public", 
    static_folder = "public",
    static_url_path = ''
)

app.
if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', type = int, help = "Serving on port ...")
    args = parser.parse_args()
    app.run(host = '0.0.0.0', port = args.port)