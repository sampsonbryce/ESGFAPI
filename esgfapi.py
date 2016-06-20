from flask import Flask, render_template, request, jsonify
# from flask.ext.api import status
from pyesgf.search import SearchConnection
import json
import os

esgfapp = Flask(__name__)

CORE_LINK = 'http://pcmdi.llnl.gov/esg-search'
HOST = 'ec2-52-37-75-79.us-west-2.compute.amazonaws.com'


@esgfapp.route('/')
def index():
    return render_template('index.html')


@esgfapp.route('/search', methods=['POST'])
def search():
    conn = SearchConnection(CORE_LINK, distrib=True)
    constraints = dict(request.json)
    results_count = constraints['results_count']
    del constraints['results_count']
    ctx = conn.new_context(**constraints)
    results = ctx.search()
    response = {'constraints': constraints}
    for index in range(results_count):
        try:
            response[index] = results[index].json
        except IndexError:
            break
    return jsonify(response)

if __name__ == '__main__':
    print "running server"
    esgfapp.run(host=HOST, port=5000, debug=1)
