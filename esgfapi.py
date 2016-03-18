from flask import Flask, render_template, request
from pyesgf.search import SearchConnection
import json
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


@esgfapp.route('/search', methods=['POST'])
def search():

    # Get Data from POST
    args = ['project', 'query', 'model', 'experiment']

    function = "conn.new_context("
    for i, arg in enumerate(args):
        if arg == "project":
            value = request.json[arg].upper()
        else:
            value = request.json[arg]
        if value:
            function += "{0}='{1}',".format(arg, value)
    if function[:-1] != "(":
        function = function[:-1]
    function += ')'

    # SEARCH
    conn = SearchConnection(CORE_LINK, distrib=True)
    print "FUNC:", function
    ctx = eval(function)
    print "CTX:", ctx
    d = ctx.__dict__
    print ctx.hit_count
    del d['facet_constraints']
    del d['connection']
    print "D:", d

    print ctx.constrain.__code__.co_varnames
    
    j = json.dumps(d)
    return j


@esgfapp.route('/constrain', methods=['POST'])
def constrain():
    # Get Data from POST
    args = ['project', 'query', 'model', 'experiment']

    function = "conn.new_context("
    for i, arg in enumerate(args):
        if arg == "project":
            value = request.json[arg].upper()
        else:
            value = request.json[arg]
        if value:
            function += "{0}='{1}',".format(arg, value)
    if function[:-1] != "(":
        function = function[:-1]
    function += ')'

    # SEARCH
    conn = SearchConnection(CORE_LINK, distrib=True)
    ctx = eval(function)
    d = ctx.__dict__
    del d['facet_constraints']
    del d['connection']

    # CONSTRAIN
    print ctx.constrain.__code__.co_varnames

    j = json.dumps(d)
    return j


if __name__ == '__main__':
    esgfapp.debug = True
    esgfapp.run(host='ec2-52-37-75-79.us-west-2.compute.amazonaws.com')
