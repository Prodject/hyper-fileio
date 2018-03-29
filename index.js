(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.decorateTerm = decorateTerm;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import third party modules
	var clipboardy = __webpack_require__(1);

	function decorateTerm(Term, _ref) {
	  var React = _ref.React,
	      notify = _ref.notify;

	  return function (_React$Component) {
	    _inherits(_class, _React$Component);

	    _createClass(_class, null, [{
	      key: 'displayName',
	      value: function displayName() {
	        return 'Hyper File.io';
	      }
	    }]);

	    function _class(props) {
	      _classCallCheck(this, _class);

	      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

	      _this.state = {
	        message: 'Drop files here',
	        link: ''
	      };

	      _this._processData = _this._processData.bind(_this);
	      _this._uploadFile = _this._uploadFile.bind(_this);
	      _this._onSuccess = _this._onSuccess.bind(_this);
	      _this._onError = _this._onError.bind(_this);
	      return _this;
	    }

	    _createClass(_class, [{
	      key: '_processData',
	      value: function _processData(files) {
	        var data = new FormData();
	        data.append('file', files[0]);

	        this.setState({
	          message: 'Uploading...'
	        });

	        this._uploadFile(data);
	      }
	    }, {
	      key: '_uploadFile',
	      value: function _uploadFile(data) {
	        var _this2 = this;

	        fetch('https://file.io', {
	          method: 'POST',
	          body: data
	        }).then(function (response) {
	          return response.json();
	        }).then(function (data) {
	          return _this2._onSuccess(data);
	        }).then(function () {
	          return _this2.setState({ message: 'Drop files here' });
	        });
	      }
	    }, {
	      key: '_onSuccess',
	      value: function _onSuccess(data) {
	        var _this3 = this;

	        var link = data.link;


	        this.setState({ link: link }, function () {
	          clipboardy.writeSync(_this3.state.link);
	          notify('🔗 Link copied to clipboard');
	        });
	      }
	    }, {
	      key: '_onError',
	      value: function _onError() {
	        notify('😧 Something went wrong');
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _this4 = this;

	        return React.createElement(Term, _extends({}, this.props, {
	          customChildren: React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'label',
	              { style: style.container },
	              this.state.message,
	              React.createElement('input', {
	                type: 'file',
	                id: 'file',
	                name: 'file',
	                style: style.input,
	                onChange: function onChange(e) {
	                  return _this4._processData(e.target.files);
	                }
	              })
	            )
	          )
	        }));
	      }
	    }]);

	    return _class;
	  }(React.Component);
	}

	var style = {
	  container: {
	    border: '1px dashed #fff',
	    borderRadius: '4px',
	    position: 'absolute',
	    right: '20px',
	    bottom: '20px',
	    padding: '8px'
	  },
	  input: {
	    opacity: 0,
	    appearance: 'none',
	    position: 'absolute',
	    'z-index': 1,
	    width: '100%'
	  },
	  label: {
	    position: 'relative'
	  }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("clipboardy");

/***/ })
/******/ ])));