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
	
	String.prototype.capitalize = function () {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	var Container = React.createClass({
	    displayName: 'Container',
	    getInitialState: function getInitialState() {
	        return { 'datasets': {} };
	    },
	    submit: function submit(event) {
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
	            xhr: function xhr() {
	                var options = {
	                    classname: 'my-class',
	                    id: 'my-id'
	                };
	
	                var nanobar = new Nanobar(options);
	                var xhr = new window.XMLHttpRequest();
	                xhr.upload.addEventListener("progress", function (evt) {
	                    if (evt.lengthComputable) {
	                        var percentComplete = evt.loaded / evt.total * 100 / 2;
	                        nanobar.go(percentComplete);
	                    }
	                }, false);
	                xhr.addEventListener("progress", function (evt) {
	                    if (evt.lengthComputable) {
	                        var percentComplete = evt.loaded / evt.total * 100 / 2 + 50;
	                        nanobar.go(percentComplete);
	                    }
	                }, false);
	                return xhr;
	            },
	
	            url: 'http://localhost:5000/search', //TODO: Remove this
	            data: JSON.stringify(filters),
	            type: 'POST',
	            contentType: 'application/json;charset=UTF-8',
	            success: function success(response) {
	                console.log('checking state', that.state);
	                console.log('response', response);
	                var tempstate = that.state;
	                tempstate['constraints'] = response['constraints'];
	                delete response['constraints'];
	                tempstate['datasets'] = response;
	                that.setState(tempstate);
	            },
	            error: function error(response) {
	                console.log('fail');
	            }
	        });
	    },
	    checkEnter: function checkEnter(event) {
	        if (event.keyCode === 13) {
	            this.submit(event);
	        }
	    },
	    render: function render() {
	
	        console.log('render state', this.state);
	        return React.createElement(
	            'div',
	            { onKeyUp: this.checkEnter },
	            React.createElement(
	                'h3',
	                { style: {
	                        'display': "inline-block"
	                    } },
	                'Query'
	            ),
	            React.createElement('input', { className: 'search-bar', ref: 'query' }),
	            React.createElement(Filter, { ref: 'filter', onKeyUp: this.checkEnter }),
	            React.createElement(
	                'button',
	                { onClick: this.submit },
	                'Submit'
	            ),
	            React.createElement(ResultsContainer, { results: this.state.datasets })
	        );
	    }
	});
	
	var Filter = React.createClass({
	    displayName: 'Filter',
	    getInitialState: function getInitialState() {
	        this.filters = {};
	        return {
	            'filters': [],
	            'possible_filters': ['Select a filter...', 'project', 'model', 'realm', 'ensemble']
	        }; //TODO: get possible from esgf api
	    },
	    handleChange: function handleChange(key, event) {
	        this.filters[key] = event.target.value;
	    },
	    removePossibleFilter: function removePossibleFilter(event) {
	        var state = this.state;
	        delete state.possible_filters[state.possible_filters.indexOf(event.target.value)];
	        this.state.filters.push(event.target.value);
	        this.setState(state);
	        console.log(this.state);
	    },
	    render: function render() {
	        var filters = [];
	
	        console.log('in render adding filters', this.state.filters);
	        for (var i = 0; i < this.state.filters.length; i++) {
	            console.log('adding filter');
	            var name = 'filter' + i;
	            filters.push(React.createElement(
	                'div',
	                { key: i },
	                React.createElement(
	                    'h3',
	                    { key: i, style: {
	                            'display': 'inline-block'
	                        } },
	                    this.state.filters[i].capitalize()
	                ),
	                React.createElement('input', { className: 'filter-bar', key: i, ref: name, onChange: this.handleChange.bind(this, this.state.filters[i]) })
	            ));
	        }
	
	        return React.createElement(
	            'div',
	            null,
	            filters,
	            React.createElement(
	                'select',
	                { onChange: this.removePossibleFilter, className: 'filter-dropdown', ref: 'dropdown' },
	                this.state.possible_filters.map(function (value, index) {
	                    return React.createElement(
	                        'option',
	                        { key: index, value: value },
	                        value
	                    );
	                })
	            )
	        );
	    }
	});
	
	var ResultsContainer = React.createClass({
	    displayName: 'ResultsContainer',
	    render: function render() {
	        var _this = this;
	
	        console.log('resutls', this.props.results);
	        return React.createElement(
	            'ul',
	            { style: {
	                    'listStyle': 'none'
	                } },
	            Object.keys(this.props.results).map(function (result, i) {
	                return React.createElement(Result, { key: i, obj: _this.props.results[result] });
	            })
	        );
	    }
	});
	
	var Result = React.createClass({
	    displayName: 'Result',
	    render: function render() {
	        return React.createElement(
	            'li',
	            null,
	            this.props.obj.title
	        );
	    }
	});
	ReactDOM.render(React.createElement(Container, null), document.getElementById('search-container'));

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map