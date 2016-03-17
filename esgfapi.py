from flask import Flask

esgfapp = Flask(__name__)

@esgfapp.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    esgfapp.debug = True
    esgfapp.run(host='ec2-52-37-75-79.us-west-2.compute.amazonaws.com')
