from flask import Flask, jsonify, make_response, render_template, request
import os
from scipy import signal
import json
import numpy as np
app = Flask(__name__)
app.secret_key = "s3cr3t"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")


@app.route('/', methods=['POST', 'GET'])
def main():
    return render_template("/layouts/page.html")


@app.route("/postmethod", methods=["POST"])
def post_javascript_data():
    jsdata1 = request.form["zeros_data"]
    jsdata2 = request.form["poles_data"]
    k = 1
    z = json.loads(jsdata1)
    p = json.loads(jsdata2)
    for i in range(len(z)):
        z[i] = round(z[i][0], 2) + 1j*round(z[i][1], 2)
    for i in range(len(p)):
        p[i] = round(p[i][0], 2) + 1j*round(p[i][1], 2)
    w, h = signal.freqz_zpk(z, p, k)
    w = np.round(w,2)
    _, h2 = signal.freqz([-0.1 , 1.0], [1.0,-0.1 ])
    angles = np.unwrap(np.angle(h))
    angles2 = np.unwrap(np.angle(h2))
    h = 20*np.log10(np.abs(h))
    w = w.tolist()
    h = h.tolist()
    angles3 = np.add(angles , angles2)
    angles = angles.tolist()
    angles2 = angles2.tolist()
    angles3 = angles3.tolist()
    params = {"magnitudeX": w, "magnitudeY": h, "angles": angles,
              "angles2": angles2, "angles3": angles3}
    return jsonify(params)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
