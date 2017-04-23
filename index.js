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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.decorateTerm = decorateTerm;

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _reactDropzone = __webpack_require__(2);

	var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

	var _glamor = __webpack_require__(3);

	var _request = __webpack_require__(4);

	var _request2 = _interopRequireDefault(_request);

	var _clipboardy = __webpack_require__(5);

	var _clipboardy2 = _interopRequireDefault(_clipboardy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Hyper File.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	// Import third party modules


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

	    function _class() {
	      _classCallCheck(this, _class);

	      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	      _this.state = {
	        message: 'Drop files here',
	        files: ''
	      };

	      // Methods
	      _this.onFileDrop = _this.onFileDrop.bind(_this);
	      _this.handleError = _this.handleError.bind(_this);
	      _this.sendFile = _this.sendFile.bind(_this);
	      return _this;
	    }

	    _createClass(_class, [{
	      key: 'onFileDrop',
	      value: function onFileDrop(acceptedFiles) {
	        var _this2 = this;

	        this.setState({
	          message: 'Uploading...',
	          files: acceptedFiles[0]
	        }, function () {
	          _this2.sendFile();
	        });
	      }
	    }, {
	      key: 'handleError',
	      value: function handleError(code) {
	        switch (code) {
	          case 'ENOENT':
	            notify('Error n\xBA: ' + code, 'No such file or directory');
	            break;
	          case 'EISDIR':
	            notify('Error n\xBA: ' + code, 'Illegal operation on a directory');
	            break;
	          default:
	            notify('Some error occurred, try again.');
	        }
	      }
	    }, {
	      key: 'sendFile',
	      value: function sendFile() {
	        var _this3 = this;

	        var req = _request2.default.post('https://file.io', function (error, response, body) {
	          if (error) {
	            _this3.handleError(error);
	          } else {
	            var responseBody = JSON.parse(body);

	            if (responseBody.success) {
	              notify('Success upload', 'URL ' + responseBody.link + ' copied to clipboard');
	              _clipboardy2.default.writeSync(responseBody.link);
	              _this3.setState({
	                message: 'Drop files here'
	              });
	            }
	          }
	        });
	        var form = req.form();

	        form.append('file', _fs2.default.createReadStream(this.state.files.path));
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return React.createElement(Term, _extends({}, this.props, { customChildren: React.createElement(
	            'div',
	            { className: 'hyper-fileio' },
	            React.createElement(
	              _reactDropzone2.default,
	              {
	                className: '' + box,
	                multiple: false,
	                disableClick: true,
	                onDrop: this.onFileDrop },
	              this.state.message
	            )
	          ) }));
	      }
	    }]);

	    return _class;
	  }(React.Component);
	}

	var box = (0, _glamor.css)({
	  bottom: '20px',
	  border: '2px dashed #ffffff',
	  borderRadius: '3px',
	  color: '#ffffff',
	  fontFamily: 'sans-serif',
	  marginBottom: '10px',
	  marginRight: '10px',
	  opacity: '0.2',
	  padding: '10px',
	  position: 'absolute',
	  right: '0',
	  transition: '.2s all',
	  ':hover': {
	    opacity: 1
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dropzone");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("glamor");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("clipboardy");

/***/ }
/******/ ])));