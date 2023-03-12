"use strict";

var _react = _interopRequireDefault(require("react"));
var _fs = require("fs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var defaultState = {
  names: ["Apple", "Banana", "Cherry", ""],
  index: 0
};
var TurnForm = /*#__PURE__*/function (_React$Component) {
  _inherits(TurnForm, _React$Component);
  var _super = _createSuper(TurnForm);
  function TurnForm(props) {
    var _props$initialState;
    var _this;
    _classCallCheck(this, TurnForm);
    _this = _super.call(this, props);
    _this.state = (_props$initialState = props.initialState) !== null && _props$initialState !== void 0 ? _props$initialState : defaultState;
    _this.handleNameChange = _this.handleNameChange.bind(_assertThisInitialized(_this));
    _this.handleButtonChange = _this.handleButtonChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(TurnForm, [{
    key: "handleNameChange",
    value: function handleNameChange(index, event) {
      var names = this.state.names.slice();
      names[index] = event.target.value;
      names = names.filter(function (name) {
        return name.length > 0;
      });
      names.push("");
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        names: names
      }));
    }
  }, {
    key: "handleButtonChange",
    value: function handleButtonChange(index, event) {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        index: index
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var nameInputs = this.state.names.map(function (name, index) {
        return /*#__PURE__*/_react["default"].createElement("p", {
          key: "{index}"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          type: "radio",
          key: "radio{index}",
          value: index,
          checked: index === _this2.state.index,
          onChange: _this2.handleButtonChange.bind(_this2, index)
        }), /*#__PURE__*/_react["default"].createElement("input", {
          type: "text",
          key: "name{index}",
          value: name,
          onChange: _this2.handleNameChange.bind(_this2, index)
        }));
      });
      return /*#__PURE__*/_react["default"].createElement("html", null, /*#__PURE__*/_react["default"].createElement("body", null, /*#__PURE__*/_react["default"].createElement("form", {
        key: "form",
        onSubmit: this.handleSubmit
      }, nameInputs, /*#__PURE__*/_react["default"].createElement("textarea", {
        rows: "10",
        cols: "80",
        key: "debug",
        readOnly: true,
        value: JSON.stringify(this.state)
      }))));
    }
  }]);
  return TurnForm;
}(_react["default"].Component);
function decodeState(stateString64) {
  if (!stateString64) {
    return defaultState;
  }
  var stateString = Buffer.from(stateString64, 'base64').toString('utf-8');
  var _stateString$split = stateString.split(","),
    _stateString$split2 = _toArray(_stateString$split),
    index = _stateString$split2[0],
    names = _stateString$split2.slice(1);
  return {
    index: index,
    names: names
  };
}
function encodeState(turnState) {
  var stateString = [turnState.index].concat(_toConsumableArray(turnState.names)).join(",");
  return Buffer.from(stateString).toString('base64');
}
function nextTurn(turnState) {
  var names = turnState.names,
    index = turnState.index;
  index = Number(index);
  return {
    index: (index + 1) % names.length,
    names: names
  };
}
function renderState(oldState, baseUrl, event) {
  var newState = nextTurn(oldState);
  var newUrl = baseUrl + encodeState(newState);
  var lines = ["<html><body>", "<!-- <p>".concat(JSON.stringify(newState), "</p> -->"), "<h2>It's <b>".concat(newState.names[newState.index], "'s</b> turn.</h2>"), "<p>Next URL: <a href=\"".concat(newUrl, "\">").concat(newUrl, "</a></p>"), "</body></html>"];
  return lines.join("\n");
}
function buildResponse(event) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: (0, _fs.readFileSync)("src/index.html").toString()
  };
}
function main() {
  console.log(buildResponse(process.argv[2]).body);
}
if (typeof document !== 'undefined') {
  // called from html doc
  var rootNode = document.getElementById('like-button-root');
  var root = ReactDOM.createRoot(rootNode);
  root.render( /*#__PURE__*/_react["default"].createElement(TurnForm, props = {
    initialState: defaultState
  }));
} else {
  // local testing
  main();
}