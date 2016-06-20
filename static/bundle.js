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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var Container = React.createClass({
	    displayName: 'Container',
	    getInitialState: function getInitialState() {
	        this.state = {
	            'filter_count': 1
	        };
	        return this.state;
	    },
	    submit: function submit(event) {
	        console.log('state', this.state);
	        //TODO: add catch for empty object
	    },
	    checkEnter: function checkEnter(event) {
	        if (event.keyCode === 13) {
	            this.submit(event);
	        }
	    },
	    updateState: function updateState(key, value) {
	        var state = this.state;
	        if (!value && Object.keys(state).indexOf(key) !== -1) {
	            delete state[key];
	        } else if (value) {
	            state[key] = value;
	        }
	        this.setState(state);
	    },
	    incrementFilterCount: function incrementFilterCount() {
	        var state = this.state;
	        state.filter_count += 1;
	        this.setState(state);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { onKeyUp: this.checkEnter },
	            React.createElement(Search, { onChangeFunc: this.updateState }),
	            React.createElement(Filter, { ref: 'filter', onKeyUp: this.checkEnter, onChangeFunc: this.updateState, count: this.state.filter_count }),
	            React.createElement(
	                'button',
	                { onClick: this.incrementFilterCount },
	                '+'
	            ),
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
	
	        return React.createElement('input', { className: 'search-bar', onChange: function onChange(event) {
	                return _this.props.onChangeFunc('query', event.target.value);
	            } });
	    }
	});
	
	var Filter = React.createClass({
	    displayName: 'Filter',
	    handleChange: function handleChange() {
	        this.props.onChangeFunc(this.refs.dropdown.value, this.refs.input.value);
	    },
	    checkForDuplicates: function checkForDuplicates(name) {
	        for (var i = 0; i < this.props.count; i++) {
	            var n = 'filter' + i;
	            if (n !== name) {
	                if (this.refs[name].value === this.refs[n].value) {
	                    this.refs[n].value = '';
	                }
	            }
	        }
	    },
	    render: function render() {
	        var filters = [];
	        for (var i = 0; i < this.props.count; i++) {
	            var _React$createElement;
	
	            var name = 'filter' + i;
	            filters.push(React.createElement(
	                'div',
	                { key: i },
	                React.createElement(
	                    'select',
	                    (_React$createElement = { ref: name, onChange: this.checkForDuplicates.bind(this, name), className: 'filter-dropdown' }, _defineProperty(_React$createElement, 'ref', 'dropdown'), _defineProperty(_React$createElement, 'onChange', this.handleChange), _React$createElement),
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
	            ));
	        }
	        return React.createElement(
	            'div',
	            null,
	            filters
	        );
	    }
	});
	
	ReactDOM.render(React.createElement(Container, null), document.getElementById('search-container'));

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map