from flask import Flask, jsonify, make_response, render_template, request
import os
from scipy import signal
import json
import numpy as np
app = Flask(__name__)
app.secret_key = "s3cr3t"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")


@app.route ('/',methods = ['POST','GET'])
def main():
  return render_template("/layouts/page.html")

@app.route("/postmethod", methods=["POST"])
def post_javascript_data():
    jsdata1 = request.form["zeros_data"]
    jsdata2 = request.form["poles_data"]
    k  = 0.5
    z = []
    z = json.loads(jsdata1)
    p = json.loads(jsdata2)
    for i in range (len(z)):
      z[i] = z[i][0] + 1j*z[i][1]
    for i in range (len(p)):
      p[i] = p[i][0] + 1j*p[i][1]  
    print(z)
    # z, p, k = signal.butter(10, 100, output='zpk', fs=1000)
    w, h = signal.freqz_zpk(z, p, k, fs=2000)
    # print(len(w))
    h = 20*np.log10(np.abs(h))
    w = w.tolist()
    h = h.tolist()
    # print(w)
    # print(len(h))
    # print(h)
    # # unique_id = create_csv(jsdata)
    params = {"x": w,"y":h}
    # param = {"poles": p,"zeros":z}
    # print(params)
    return jsonify(params)

# @app.route ('/',methods = ['POST','GET'])
# def freqResponse ():
#   if request.method == 'POST':
      
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
