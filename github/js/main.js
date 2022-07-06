var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { getRepositories } from './api.js';

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this2 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

        _this2.state = {
            value: ''
        };
        return _this2;
    }

    _createClass(Search, [{
        key: 'updateInputValue',
        value: function updateInputValue(event) {
            var value = event.target.value;
            this.setState({
                value: value
            });

            this.props.search(value, 3);
        }
    }, {
        key: 'result',
        value: function result() {
            var r = this.props.result;

            if (!r) {
                return '';
            }

            var res = function res() {

                if (r.message) {
                    return React.createElement(
                        'p',
                        { 'class': 'error__mesage' },
                        r.message
                    );
                }

                if (r.total_count == 0) {
                    return React.createElement(
                        'p',
                        { 'class': 'error__mesage' },
                        '\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E'
                    );
                }

                var list = r.items.map(function (item) {
                    return React.createElement(
                        'li',
                        { key: item.node_id,
                            'class': 'search__result-item',
                            onClick: function onClick(event) {
                                event.preventDefault();
                                window.open(item.html_url, '_blank');
                            }
                        },
                        React.createElement(
                            'a',
                            { 'class': 'search__result-link', href: item.html_url },
                            item.owner.login + ': ' + item.name.slice(0, 30)
                        ),
                        React.createElement(
                            'p',
                            { 'class': 'search__result-language' },
                            item.language
                        )
                    );
                });

                return React.createElement(
                    'ul',
                    { 'class': 'search__result-list list' },
                    ' ',
                    list,
                    ' '
                );
            };

            return React.createElement(
                'div',
                { 'class': 'search__result' },
                res()
            );
        }
    }, {
        key: 'btnClick',
        value: function btnClick(event) {
            event.preventDefault();
            this.props.search(this.state.value, 10);
            this.setState({ value: '' });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'section',
                { 'class': 'search' },
                React.createElement(
                    'form',
                    { 'class': 'search__form form' },
                    React.createElement(
                        'div',
                        { 'class': 'search__form-row' },
                        React.createElement(
                            'div',
                            { 'class': 'form__item search__form-item' },
                            React.createElement('input', {
                                'class': 'form__item-input input-search',
                                placeholder: 'search',
                                id: 'input-search',
                                value: this.state.value,
                                onChange: this.updateInputValue.bind(this)
                            }),
                            React.createElement(
                                'label',
                                { 'class': 'form__item-label' },
                                'search'
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'form__buttons' },
                            React.createElement(
                                'button',
                                {
                                    'class': 'form-search__add form__btn',
                                    onClick: this.btnClick.bind(this)
                                },
                                '\u0418\u0441\u043A\u0430\u0442\u044C'
                            )
                        )
                    ),
                    this.result()
                )
            );
        }
    }]);

    return Search;
}(React.Component);

var Result = function (_React$Component2) {
    _inherits(Result, _React$Component2);

    function Result(props) {
        _classCallCheck(this, Result);

        var _this3 = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this, props));

        _this3.state = {};

        return _this3;
    }

    _createClass(Result, [{
        key: 'result',
        value: function result() {
            var r = this.props.result;
            if (!r) {
                return 'rgreg';
            }

            if (r.message) {
                return React.createElement(
                    'p',
                    { 'class': 'error__mesage' },
                    r.message
                );
            }

            if (r.total_count == 0) {
                return React.createElement(
                    'p',
                    { 'class': 'error__mesage' },
                    '\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E'
                );
            }

            var list = r.items.map(function (item) {

                return React.createElement(
                    'li',
                    {
                        key: item.node_id,
                        'class': 'result__item'
                    },
                    React.createElement(
                        'a',
                        {
                            'class': 'result__link',
                            href: item.html_url,
                            onClick: function onClick(event) {
                                event.preventDefault();
                                window.open(item.html_url, '_blank');
                            }
                        },
                        item.full_name
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'result__description' },
                        item.description
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'result__language' },
                        item.language
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'result__topics' },
                        item.topics.join('  ')
                    )
                );
            });
            return React.createElement(
                'ul',
                { 'class': 'search__result-list list' },
                ' ',
                list,
                ' '
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.result ? React.createElement(
                'section',
                { 'class': 'result' },
                React.createElement(
                    'h1',
                    { 'class': 'result__title' },
                    '\u041D\u0430\u0439\u0434\u0435\u043D\u043E ',
                    this.props.result.total_count,
                    ' \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0435\u0432'
                ),
                this.result()
            ) : '';
        }
    }]);

    return Result;
}(React.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
        _classCallCheck(this, App);

        var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this4.debounce = function (func) {

            var throttle = false,
                saved = void 0,
                _this = void 0;

            function wrapper() {

                if (throttle) {
                    saved = arguments;
                    _this = this;
                    return;
                }

                func.apply(this, arguments);

                throttle = true;

                setTimeout(function () {
                    throttle = false;
                    if (saved) {
                        wrapper.apply(_this, saved);
                        saved = _this = null;
                    }
                }, 1000);
            }
            return wrapper;
        };

        _this4.state = {
            data: '',
            'result-3': false,
            'result-10': false
        };
        return _this4;
    }

    _createClass(App, [{
        key: 'search',
        value: function search(value, amount) {
            var _this5 = this;

            if (value.length == 0) {
                this.setState(_defineProperty({}, 'result-3', false));
                return;
            }
            if (amount == 10) {
                this.setState(_defineProperty({}, 'result-3', false));
            }
            getRepositories(value, amount).then(function (response) {
                _this5.setState(_defineProperty({}, 'result-' + amount, response));
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(Search, {
                    search: this.debounce(this.search.bind(this)),
                    result: this.state['result-3']

                }),
                React.createElement(Result, {
                    result: this.state['result-10']
                })
            );
        }
    }]);

    return App;
}(React.Component);

var root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(React.createElement(App, null));