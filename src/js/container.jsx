var Container = React.createClass({
    submit(event) {
        console.log('state', this.state);
    },
    checkEnter(event) {
        if (event.keyCode === 13) {
            this.submit(event);
        }
    },
    updateState(key, value){
        console.log('updateing state', key, value);
        var state = (this.state ? this.state: {});
        state[key] = value;
        this.setState(state);
    },
    render() {
        var test = this.updateState.bind(this);
        console.log(test);
        return (
            <div onKeyUp={this.checkEnter.bind(this)}>
                <Search onChangeFunc={this.updateState.bind(this)}/>
                <Filter onKeyUp={this.checkEnter} onChangeFunc={this.updateState.bind(this)}></Filter>
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
});

var Search = React.createClass({
    render() {
        console.log('props', this.props);
        console.log(this.props.onChangeFunc);
        return (
            <input className="search-bar" onChange={(event) => (this.props.onChangeFunc('query', event.target.value))}></input>
        );
    }
});

var Filter = React.createClass({
    handleChange(){
        console.log('handleChange')
        this.props.onChangeFunc(this.refs.dropdown.value, this.refs.input.value);
    },
    render() {
        return (
            <div>
                <select className="filter-dropdown" ref='dropdown' onChange={this.handleChange}>
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
});

ReactDOM.render(
    <Container/>, document.getElementById('search-container'));
