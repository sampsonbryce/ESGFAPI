from flask import Flask, render_template, request
from pyesgf.search import SearchConnection
import os

esgfapp = Flask(__name__)

CORE_LINK = 'http://pcmdi.llnl.gov/esg-search'


@esgfapp.route('/')
def index():
    conn = SearchConnection(CORE_LINK, distrib=True)
    ctx = conn.new_context(project='CMIP5', model='HadCM3', experiment='decadal2000', time_frequency='day')
    ctx = ctx.constrain(realm='ocean', ensemble='r1i2p1')
    # print dir(ctx)
    return render_template('index.html')


@esgfapp.route('/search')
def search():
    print "here"
    conn = SearchConnection(CORE_LINK, distrib=True)
    ctx = conn.new_context(project='CMIP5', model='HadCM3', experiment='decadal2000', time_frequency='day')
    ctx = ctx.constrain(realm='ocean', ensemble='r1i2p1')
    data = request.form
    return data


if __name__ == '__main__':
    esgfapp.debug = True
    esgfapp.run(host='ec2-52-37-75-79.us-west-2.compute.amazonaws.com')
