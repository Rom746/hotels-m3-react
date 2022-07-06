var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Cart } from './cart.js';
import { validate } from './validate.js';

var CartBlock = function (_React$Component) {
    _inherits(CartBlock, _React$Component);

    function CartBlock() {
        _classCallCheck(this, CartBlock);

        return _possibleConstructorReturn(this, (CartBlock.__proto__ || Object.getPrototypeOf(CartBlock)).apply(this, arguments));
    }

    _createClass(CartBlock, [{
        key: 'createBtn',
        value: function createBtn(id) {
            var path = '\n            M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682\n            11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646\n            3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 \n            5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z\n        ';

            return React.createElement(
                'button',
                { 'class': 'cart-item__remove', 'data-btn-id': id,
                    onClick: this.props.delete },
                React.createElement(
                    'svg',
                    { width: '100%', height: '100%', viewBox: '0 0 16 16',
                        fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    React.createElement('path', { d: path, fill: '#B0B0B0' })
                )
            );
        }
    }, {
        key: 'createCartItem',
        value: function createCartItem(item) {
            var oldPrice = item.oldPrice ? item.oldPrice + '₽' : '';
            var key = 'cart-' + item.id;
            return React.createElement(
                'li',
                { className: 'cart-item', key: key },
                React.createElement(
                    'div',
                    { 'class': 'cart-item__left' },
                    React.createElement(
                        'h3',
                        { 'class': 'cart-item__title' },
                        item.title
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'cart-item__id' },
                        'id: ',
                        item.id
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'cart-item__right' },
                    React.createElement(
                        'p',
                        { 'class': 'cart-item__amount' },
                        item.count
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'cart-item__price' },
                        React.createElement(
                            'span',
                            { 'class': 'cart-item__old-price' },
                            ' ',
                            oldPrice,
                            ' '
                        ),
                        React.createElement(
                            'span',
                            { 'class': 'price' },
                            ' ',
                            item.price,
                            ' \u20BD '
                        )
                    ),
                    this.createBtn(item.id)
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var mes = this.props.data.length > 0 ? '' : 'Список товаров пуст';
            var list = this.props.data.length > 0 ? this.props.data.map(function (item) {
                return _this2.createCartItem(item);
            }) : '';

            return React.createElement(
                'div',
                { 'class': 'products__main' },
                React.createElement(
                    'div',
                    { 'class': 'products__cart-block' },
                    React.createElement(
                        'div',
                        { 'class': 'cart-block__header' },
                        React.createElement(
                            'h1',
                            { 'class': 'cart-block__title' },
                            '\u0422\u043E\u0432\u0430\u0440\u044B'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'cart-block__cart-items' },
                        React.createElement(
                            'ul',
                            { 'class': 'cart-items__list' },
                            ' ',
                            list,
                            ' '
                        )
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'cart-block__message' },
                        mes
                    )
                )
            );
        }
    }]);

    return CartBlock;
}(React.Component);

var FormBlock = function (_React$Component2) {
    _inherits(FormBlock, _React$Component2);

    function FormBlock(props) {
        _classCallCheck(this, FormBlock);

        var _this3 = _possibleConstructorReturn(this, (FormBlock.__proto__ || Object.getPrototypeOf(FormBlock)).call(this, props));

        _this3.state = {
            idError: false,
            titleError: false,
            priceError: false,
            id: '',
            title: '',
            price: ''
        };
        return _this3;
    }

    _createClass(FormBlock, [{
        key: 'createInputs',
        value: function createInputs() {
            var _this4 = this;

            var tag = "form__item-input input-product";
            return ['id', 'title', 'price'].map(function (item) {
                var className = _this4.state[item + 'Error'] ? tag + ' input--error' : tag;
                return React.createElement(
                    'div',
                    { 'class': 'form__item' },
                    React.createElement('input', {
                        'class': className,
                        placeholder: item,
                        id: 'item-' + item,
                        value: _this4.state[item],
                        onClick: _this4.clickInput.bind(_this4),
                        onChange: _this4.updateInputValue.bind(_this4)
                    }),
                    React.createElement(
                        'label',
                        { 'class': 'form__item-label' },
                        item
                    )
                );
            });
        }
    }, {
        key: 'updateInputValue',
        value: function updateInputValue(event) {
            this.setState(_defineProperty({}, event.target.id.substr(5), event.target.value));
        }
    }, {
        key: 'clickInput',
        value: function clickInput(event) {
            this.setState(_defineProperty({}, event.target.id.substr(5) + 'Error', false));
        }
    }, {
        key: 'ckickBtnForm',
        value: function ckickBtnForm(event) {
            var _this5 = this;

            event.preventDefault();
            var errorTrue = false;

            [[{ value: this.state.id, placeholder: 'id' }, 'num'], [{ value: this.state.title, placeholder: 'title' }, 'textnum'], [{ value: this.state.price, placeholder: 'price' }, 'num']].forEach(function (input) {
                var error = validate.testNow(input);
                if (error) {
                    errorTrue = true;
                    _this5.setState(_defineProperty({}, input[0].placeholder + 'Error', error));
                }
            });

            if (errorTrue) {
                return;
            }

            this.setState({
                id: '',
                title: '',
                price: ''
            });

            var item = {
                "id": this.state.id,
                "title": this.state.title,
                "price": this.state.price,
                "count": 1
            };

            this.props.add(item);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'products__form-block' },
                React.createElement(
                    'form',
                    { 'class': 'form-product form' },
                    React.createElement(
                        'h1',
                        { 'class': 'form__title' },
                        '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440'
                    ),
                    this.createInputs(),
                    React.createElement(
                        'div',
                        { 'class': 'form__error error-product' },
                        React.createElement(
                            'p',
                            null,
                            this.state.idError
                        ),
                        React.createElement(
                            'p',
                            null,
                            this.state.titleError
                        ),
                        React.createElement(
                            'p',
                            null,
                            this.state.priceError
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'form__buttons' },
                        React.createElement(
                            'button',
                            {
                                'class': 'form-product__add form__btn',
                                onClick: this.ckickBtnForm.bind(this)
                            },
                            '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                        )
                    )
                )
            );
        }
    }]);

    return FormBlock;
}(React.Component);

var PrecheckBlock = function (_React$Component3) {
    _inherits(PrecheckBlock, _React$Component3);

    function PrecheckBlock() {
        _classCallCheck(this, PrecheckBlock);

        return _possibleConstructorReturn(this, (PrecheckBlock.__proto__ || Object.getPrototypeOf(PrecheckBlock)).apply(this, arguments));
    }

    _createClass(PrecheckBlock, [{
        key: 'render',
        value: function render() {
            var d = this.props.data;
            return React.createElement(
                'div',
                { 'class': 'products__precheck' },
                React.createElement(
                    'h1',
                    { 'class': 'precheck__title' },
                    '\u0412\u0430\u0448\u0438 \u0442\u043E\u0432\u0430\u0440\u044B'
                ),
                React.createElement(
                    'div',
                    { 'class': 'precheck__row' },
                    React.createElement(
                        'p',
                        { 'class': 'precheck__amount' },
                        '\u0422\u043E\u0432\u0430\u0440\u044B (',
                        d.count,
                        ') '
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'precheck__price' },
                        ' ',
                        d.price + d.discount,
                        ' \u20BD '
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'precheck__row' },
                    React.createElement(
                        'p',
                        { 'class': '' },
                        '\u0421\u043A\u0438\u0434\u043A\u0430'
                    ),
                    React.createElement(
                        'p',
                        { 'class': 'precheck__discount' },
                        ' - ',
                        d.discount,
                        ' \u20BD '
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'precheck__summary' },
                    React.createElement(
                        'h2',
                        { 'class': 'precheck__summary-title' },
                        '\u0418\u0442\u043E\u0433\u043E:'
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'precheck__row' },
                        React.createElement(
                            'p',
                            { 'class': '' },
                            '\u0421\u0443\u043C\u043C\u0430'
                        ),
                        React.createElement(
                            'h2',
                            { 'class': 'precheck__summary-discount' },
                            ' ',
                            d.price,
                            ' \u20BD'
                        )
                    )
                )
            );
        }
    }]);

    return PrecheckBlock;
}(React.Component);

var DiscountBlock = function (_React$Component4) {
    _inherits(DiscountBlock, _React$Component4);

    function DiscountBlock(props) {
        _classCallCheck(this, DiscountBlock);

        var _this7 = _possibleConstructorReturn(this, (DiscountBlock.__proto__ || Object.getPrototypeOf(DiscountBlock)).call(this, props));

        _this7.state = {
            discount: props.discount || '',
            error: false
        };
        return _this7;
    }

    _createClass(DiscountBlock, [{
        key: 'clickInput',
        value: function clickInput(event) {
            this.setState({
                error: false
            });
        }
    }, {
        key: 'updateInputValue',
        value: function updateInputValue(event) {
            this.setState({
                discount: event.target.value
            });
        }
    }, {
        key: 'setDiscount',
        value: function setDiscount(event) {
            event.preventDefault();
            if (this.state.discount === '0' || event.target.id) {
                this.props.add(0);
                this.setState({ discount: '' });
            } else {

                var error = validate.testNow([{
                    value: this.state.discount,
                    placeholder: 'discount'
                }, 'num']);

                if (error) {
                    this.setState({ error: error });
                    return;
                }

                this.props.add(this.state.discount);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'products__discount' },
                React.createElement(
                    'form',
                    { 'class': 'form-discount form' },
                    React.createElement(
                        'h1',
                        { 'class': 'form__title' },
                        '\u0421\u043A\u0438\u0434\u043A\u0430'
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'form__item' },
                        React.createElement('input', {
                            'class': 'form__item-input input-discount',
                            placeholder: '(0% - 100%)',
                            id: 'input-discount',
                            value: this.state.discount,
                            onClick: this.clickInput.bind(this),
                            onChange: this.updateInputValue.bind(this)
                        }),
                        React.createElement(
                            'label',
                            { 'class': 'form__item-label' },
                            '(0% - 100%)'
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'form__error error-discount' },
                        this.state.error
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'form__buttons' },
                        React.createElement(
                            'button',
                            {
                                'class': 'form-discount__add form__btn',
                                onClick: this.setDiscount.bind(this)
                            },
                            '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                        ),
                        React.createElement(
                            'button',
                            {
                                'class': 'form-discount__remove form__btn',
                                onClick: this.setDiscount.bind(this),
                                id: 'rem-d'
                            },
                            '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043A\u0438\u0434\u043A\u0438'
                        )
                    )
                )
            );
        }
    }]);

    return DiscountBlock;
}(React.Component);

var App = function (_React$Component5) {
    _inherits(App, _React$Component5);

    function App(props) {
        _classCallCheck(this, App);

        var _this8 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this8.cart = new Cart();
        _this8.state = {
            data: _this8.cart.getData(),
            discount: _this8.cart.getDiscount()
        };

        return _this8;
    }

    _createClass(App, [{
        key: 'deleteItem',
        value: function deleteItem(event) {
            event.preventDefault();
            var id = event.target.dataset.btnId;
            this.setState({ data: this.cart.remove(id) });
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            if (this.state.discount) {
                this.cart.setDiscountItem(this.state.discount, item);
            }

            this.cart.add(item);
            this.setState({ data: this.cart.getData() });
        }
    }, {
        key: 'addDiscount',
        value: function addDiscount(discount) {
            this.setState({ discount: discount == 0 ? '' : discount });
            this.cart.setDiscount(Number(discount));
            this.setState({ data: this.cart.getData() });
        }
    }, {
        key: 'render',
        value: function render() {
            var precheckData = {
                count: this.cart.getCountAll(),
                price: this.cart.getSum(),
                discount: this.cart.getDiscountSum()
            };

            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'section',
                    { 'class': 'products' },
                    React.createElement(
                        'div',
                        { 'class': 'products__main' },
                        React.createElement(CartBlock, {
                            data: this.state.data,
                            'delete': this.deleteItem.bind(this)
                        })
                    ),
                    React.createElement(
                        'aside',
                        { 'class': 'products__aside' },
                        React.createElement(FormBlock, { add: this.addItem.bind(this) }),
                        React.createElement(PrecheckBlock, { data: precheckData }),
                        React.createElement(DiscountBlock, {
                            discount: this.state.discount,
                            add: this.addDiscount.bind(this)
                        })
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

var root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(React.createElement(App, null));