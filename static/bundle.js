/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var Container = React.createClass({
	    displayName: 'Container',
	    submit: function submit(event) {
	        console.log('state', this.state);
	    },
	    checkEnter: function checkEnter(event) {
	        if (event.keyCode === 13) {
	            this.submit(event);
	        }
	    },
	    updateState: function updateState(key, value) {
	        console.log('updateing state', key, value);
	        var state = this.state ? this.state : {};
	        state[key] = value;
	        this.setState(state);
	    },
	    render: function render() {
	        var test = this.updateState.bind(this);
	        console.log(test);
	        return React.createElement(
	            'div',
	            { onKeyUp: this.checkEnter.bind(this) },
	            React.createElement(Search, { onChangeFunc: this.updateState.bind(this) }),
	            React.createElement(Filter, { onKeyUp: this.checkEnter, onChangeFunc: this.updateState.bind(this) }),
	            React.createElement(
	                'button',
	                { onClick: this.submit },
	                'Submit'
	            )
	        );
	    }
	});
	
	var Search = React.createClass({
	    displayName: 'Search',
	    render: function render() {
	        var _this = this;
	
	        console.log('props', this.props);
	        console.log(this.props.onChangeFunc);
	        return React.createElement('input', { className: 'search-bar', onChange: function onChange(event) {
	                return _this.props.onChangeFunc('query', event.target.value);
	            } });
	    }
	});
	
	var Filter = React.createClass({
	    displayName: 'Filter',
	    handleChange: function handleChange() {
	        console.log('handleChange');
	        this.props.onChangeFunc(this.refs.dropdown.value, this.refs.input.value);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'select',
	                { className: 'filter-dropdown', ref: 'dropdown', onChange: this.handleChange },
	                React.createElement(
	                    'option',
	                    { value: 'project' },
	                    'Project'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'model' },
	                    'Model'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'realm' },
	                    'Realm'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'ensemble' },
	                    'Ensemble'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'time frequency' },
	                    'Time Frequency'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'experiment' },
	                    'Experiment'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'experiment-family' },
	                    'Experiment Family'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'from-timestamp' },
	                    'From Timestamp'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'to-timestamp' },
	                    'To Timestamp'
	                )
	            ),
	            React.createElement('input', { className: 'filter-bar', ref: 'input', onChange: this.handleChange })
	        );
	    }
	});
	
	ReactDOM.render(React.createElement(Container, null), document.getElementById('search-container'));

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map