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
    k = 0.5
    # z, p, k = signal.butter(4, 160, output='zpk', fs=1500)
    # print(z)
    # print(p)
    # z = [(-0.4175-0.55921875j), (-0.4175+0.55921875j)]
    # p = [(-0.4175-0.55921875j), (-0.4175+0.55921875j)]
    z = json.loads(jsdata1)
    p = json.loads(jsdata2)
    for i in range(len(z)):
        # comp = z[i][0] - 1j*z[i][1]
        z[i] = round(z[i][0],2) + 1j*round(z[i][1],2)
        # z.append(comp)
    for i in range(len(p)):
        # comp = p[i][0] - 1j*p[i][1]
        p[i] = round(p[i][0],2) + 1j*round(p[i][1],2)
        # p.append(comp)
    print(z)
    print(p)
    w, h = signal.freqz_zpk(z, p, k, fs=1000)
    w2, h2 = signal.freqz([0.7, 1.0], [1.0, 0.7])
    # print(len(w))
    angles = np.unwrap(np.angle(h))
    angles2 = np.unwrap(np.angle(h2))
    angles += angles2
    h = 20*np.log10(np.abs(h))
    w = w.tolist()
    h = h.tolist()
    angles = angles.tolist()
    params = {"magnitudeX": w, "magnitudeY": h,"angles":angles}
    # param = {"poles": p,"zeros":z}
    # print(params)
    return jsonify(params)



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
