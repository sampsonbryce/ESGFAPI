String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var Container = React.createClass({
    getInitialState() {
        return {'datasets': {}};
    },
    submit(event) {
        console.log('submit state', this.state);
        var filters = this.refs.filter.filters;
        filters['query'] = this.refs.query.value;
        if (filters['query'] === '') {
            console.log('empty query'); //TODO: display message to user
            return;
        }
        filters['results_count'] = 50;
        var that = this;
        $.ajax({
            xhr: function() {
                var options = {
                    classname: 'my-class',
                    id: 'my-id'
                };

                var nanobar = new Nanobar(options);
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100) / 2;
                        nanobar.go(percentComplete);
                    }
                }, false);
                xhr.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (((evt.loaded / evt.total) * 100) / 2) + 50;
                        nanobar.go(percentComplete);
                    }
                }, false);
                return xhr;
            },

            url: 'http://localhost:5000/search', //TODO: Remove this
            data: JSON.stringify(filters),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
                console.log('checking state', that.state);
                console.log('response', response);
                var tempstate = that.state;
                tempstate['constraints'] = response['constraints'];
                delete response['constraints'];
                tempstate['datasets'] = response;
                that.setState(tempstate);
            },
            error: function(response) {
                console.log('fail');
            }
        });
    },
    checkEnter(event) {
        if (event.keyCode === 13) {
            this.submit(event);
        }
    },
    render() {

        console.log('render state', this.state);
        return (
            <div onKeyUp={this.checkEnter}>
                <h3 style={{
                    'display': "inline-block"
                }}>Query</h3>
                <input className="search-bar" ref='query'></input>
                <Filter ref='filter' onKeyUp={this.checkEnter}></Filter>
                <button onClick={this.submit}>Submit</button>
                <ResultsContainer results={this.state.datasets}/>
            </div>
        );
    }
});

var Filter = React.createClass({
    getInitialState() {
        this.filters = {};
        return {
            'filters': [],
            'possible_filters': ['Select a filter...', 'project', 'model', 'realm', 'ensemble']
        }; //TODO: get possible from esgf api
    },
    handleChange(key, event) {
        this.filters[key] = event.target.value;
    },

    removePossibleFilter(event) {
        let state = this.state;
        delete state.possible_filters[state.possible_filters.indexOf(event.target.value)];
        this.state.filters.push(event.target.value);
        this.setState(state);
        console.log(this.state);
    },

    render() {
        var filters = []

        console.log('in render adding filters', this.state.filters);
        for (var i = 0; i < this.state.filters.length; i++) {
            console.log('adding filter');
            let name = 'filter' + i;
            filters.push(
                <div key={i}>
                    <h3 key={i} style={{
                        'display': 'inline-block'
                    }}>{this.state.filters[i].capitalize()}</h3>
                    <input className="filter-bar" key={i} ref={name} onChange={this.handleChange.bind(this, this.state.filters[i])}></input>
                </div>
            );
        }

        return (
            <div>
                {filters}
                <select onChange={this.removePossibleFilter} className="filter-dropdown" ref='dropdown'>
                    {this.state.possible_filters.map((value, index) => {
                        return (
                            <option key={index} value={value}>{value}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
});

var ResultsContainer = React.createClass({
    render() {
        console.log('resutls', this.props.results);
        return (
            <ul style={{
                'listStyle': 'none'
            }}>
                {Object.keys(this.props.results).map((result, i) => {
                    return (
                        <Result key={i} obj={this.props.results[result]}></Result>
                    )
                })}
            </ul>
        )
    }
})

var Result = React.createClass({
    render() {
        return (
            <li>{this.props.obj.title}</li>
        )
    }
})
ReactDOM.render(
    <Container/>, document.getElementById('search-container'));
