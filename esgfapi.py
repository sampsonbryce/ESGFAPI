from flask import Flask, render_template, request
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


# @esgfapp.route('/search', methods=['POST'])
# def search():
if __name__ == '__main__':
    esgfapp.run(host=HOST, port=5000, debug=1)
    print "running server"
