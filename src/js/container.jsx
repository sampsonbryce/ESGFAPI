var Container = React.createClass({
    getInitialState() {
        this.state = {
            'filter_count': 1
        };
        return this.state
    },
    submit(event) {
        console.log('state', this.state);
        //TODO: add catch for empty object
    },
    checkEnter(event) {
        if (event.keyCode === 13) {
            this.submit(event);
        }
    },
    updateState(key, value) {
        var state = this.state;
        if (!value && Object.keys(state).indexOf(key) !== -1) {
            delete state[key];
        } else if (value){
            state[key] = value;
        }
        this.setState(state);
    },
    incrementFilterCount(){
      var state = this.state;
      state.filter_count += 1;
      this.setState(state);
    },
    render() {
        return (
            <div onKeyUp={this.checkEnter}>
                <Search onChangeFunc={this.updateState}/>
                <Filter ref='filter' onKeyUp={this.checkEnter} onChangeFunc={this.updateState} count={this.state.filter_count}></Filter>
                <button onClick={this.incrementFilterCount}>+</button>
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
});

var Search = React.createClass({
    render() {
        return (
            <input className="search-bar" onChange={(event) => (this.props.onChangeFunc('query', event.target.value))}></input>
        );
    }
});

var Filter = React.createClass({
    handleChange() {
        this.props.onChangeFunc(this.refs.dropdown.value, this.refs.input.value);
    },

    checkForDuplicates(name){
      for (var i = 0; i < this.props.count; i++) {
        var n = 'filter'+i;
        if (n !== name){
          if (this.refs[name].value === this.refs[n].value){
            this.refs[n].value = '';
          }

        }
      }
    },

    render() {
        var filters = [];
        for (var i = 0; i < this.props.count; i++) {
            var name = 'filter' + i;
            filters.push(
                <div key={i} >
                    <select ref={name} onChange={this.checkForDuplicates.bind(this, name)} className="filter-dropdown" ref='dropdown' onChange={this.handleChange}>
                        <option value="project">Project</option>
                        <option value="model">Model</option>
                        <option value="realm">Realm</option>
                        <option value="ensemble">Ensemble</option>
                        <option value="time frequency">Time Frequency</option>
                        <option value="experiment">Experiment</option>
                        <option value="experiment-family">Experiment Family</option>
                        <option value="from-timestamp">From Timestamp</option>
                        <option value="to-timestamp">To Timestamp</option>
                    </select>
                    <input className="filter-bar" ref='input' onChange={this.handleChange}></input>
                </div>
            );
        }
        return (
            <div>
                {filters}
            </div>
        )
    }
});

ReactDOM.render(
    <Container/>, document.getElementById('search-container'));
