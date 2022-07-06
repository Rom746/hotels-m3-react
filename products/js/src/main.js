import { Cart } from './cart.js';
import { validate } from './validate.js'

class CartBlock extends React.Component {

    createBtn(id) {
        let path = `
            M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682
            11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646
            3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 
            5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z
        `;

        return (
            <button class="cart-item__remove" data-btn-id={id}
                onClick={this.props.delete}>
                <svg width="100%" height="100%" viewBox="0 0 16 16"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={path} fill="#B0B0B0" />
                </svg>
            </button>
        )
    }

    createCartItem(item) {
        const oldPrice = item.oldPrice ? item.oldPrice + '₽' : '';
        const key = 'cart-' + item.id;
        return (
            <li className="cart-item" key={key}>
                <div class="cart-item__left">
                    <h3 class="cart-item__title">{item.title}</h3>
                    <p class="cart-item__id">id: {item.id}</p>
                </div>
                <div class="cart-item__right">
                    <p class="cart-item__amount">
                        {item.count}
                    </p>
                    <p class="cart-item__price">
                        <span class="cart-item__old-price"> {oldPrice} </span>
                        <span class="price"> {item.price} ₽ </span>
                    </p>
                    {this.createBtn(item.id)}
                </div>
            </li>
        );
    }

    render() {
        let mes = this.props.data.length > 0 ? '' : 'Список товаров пуст';
        let list = this.props.data.length > 0 ?
            this.props.data.map(item => this.createCartItem(item)) : '';

        return (
            <div class="products__main">
                <div class="products__cart-block">
                    <div class="cart-block__header">
                        <h1 class="cart-block__title">Товары</h1>
                    </div>
                    <div class="cart-block__cart-items">
                        <ul class="cart-items__list"> {list} </ul>
                    </div>
                    <p class="cart-block__message">{mes}</p>
                </div>
            </div>
        );
    }
}

class FormBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idError: false,
            titleError: false,
            priceError: false,
            id: '',
            title: '',
            price: '',
        };
    }

    createInputs() {
        const tag = "form__item-input input-product";
        return ['id', 'title', 'price'].map(item => {
            const className = this.state[item + 'Error'] ?
                tag + ' input--error' :
                tag
                ;
            return (
                <div class="form__item">
                    <input
                        class={className}
                        placeholder={item}
                        id={'item-' + item}
                        value={this.state[item]}
                        onClick={this.clickInput.bind(this)}
                        onChange={this.updateInputValue.bind(this)}
                    />
                    <label class="form__item-label">{item}</label>
                </div>
            );
        });
    }

    updateInputValue(event) {
        this.setState({
            [event.target.id.substr(5)]: event.target.value,
        });
    }

    clickInput(event) {
        this.setState({
            [event.target.id.substr(5) + 'Error']: false,
        });
    }

    ckickBtnForm(event) {
        event.preventDefault();
        let errorTrue = false;

        [[{ value: this.state.id, placeholder: 'id' }, 'num'],
        [{ value: this.state.title, placeholder: 'title' }, 'textnum'],
        [{ value: this.state.price, placeholder: 'price' }, 'num']
        ].forEach(input => {
            let error = validate.testNow(input);
            if (error) {
                errorTrue = true;
                this.setState({
                    [input[0].placeholder + 'Error']: error,
                });
            }
        });

        if (errorTrue) { return; }

        this.setState({
            id: '',
            title: '',
            price: '',
        })

        const item = {
            "id": this.state.id,
            "title": this.state.title,
            "price": this.state.price,
            "count": 1
        }

        this.props.add(item);
    }

    render() {
        return (
            <div class="products__form-block">
                <form class="form-product form">
                    <h1 class="form__title">Добавить товар</h1>

                    {this.createInputs()}

                    <div class="form__error error-product">
                        <p>{this.state.idError}</p>
                        <p>{this.state.titleError}</p>
                        <p>{this.state.priceError}</p>
                    </div>
                    <div class="form__buttons">
                        <button
                            class="form-product__add form__btn"
                            onClick={this.ckickBtnForm.bind(this)}
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

class PrecheckBlock extends React.Component {
    render() {
        const d = this.props.data;
        return (
            <div class="products__precheck">
                <h1 class="precheck__title">Ваши товары</h1>
                <div class="precheck__row">
                    <p class="precheck__amount">Товары ({d.count}) </p>
                    <p class="precheck__price"> {d.price + d.discount} ₽ </p>
                </div>
                <div class="precheck__row">
                    <p class="">Скидка</p>
                    <p class="precheck__discount"> - {d.discount} ₽ </p>
                </div>
                <div class="precheck__summary">
                    <h2 class="precheck__summary-title">Итого:</h2>
                    <div class="precheck__row">
                        <p class="">Сумма</p>
                        <h2 class="precheck__summary-discount"> {d.price} ₽</h2>
                    </div>
                </div>
            </div>
        );
    }
}

class DiscountBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: props.discount || '',
            error: false,
        };
    }

    clickInput(event) {
        this.setState({
            error: false,
        });
    }

    updateInputValue(event) {
        this.setState({
            discount: event.target.value,
        });
    }

    setDiscount(event) {
        event.preventDefault();
        if (this.state.discount === '0' || event.target.id) {
            this.props.add(0);
            this.setState({ discount: '' });
        } else {

            let error = validate.testNow([
                {
                    value: this.state.discount,
                    placeholder: 'discount'
                },
                'num']
            );

            if (error) {
                this.setState({ error: error });
                return;
            }

            this.props.add(this.state.discount);
        }

    }

    render() {
        return (
            <div class="products__discount">
                <form class="form-discount form">
                    <h1 class="form__title">Скидка</h1>
                    <div class="form__item">
                        <input
                            class="form__item-input input-discount"
                            placeholder="(0% - 100%)"
                            id="input-discount"
                            value={this.state.discount}
                            onClick={this.clickInput.bind(this)}
                            onChange={this.updateInputValue.bind(this)}
                        />
                        <label class="form__item-label">(0% - 100%)</label>
                    </div>
                    <div class="form__error error-discount">
                        {this.state.error}
                    </div>
                    <div class="form__buttons">
                        <button
                            class="form-discount__add form__btn"
                            onClick={this.setDiscount.bind(this)}
                        >Добавить</button>
                        <button
                            class="form-discount__remove form__btn"
                            onClick={this.setDiscount.bind(this)}
                            id="rem-d"
                        >Удалить скидки</button>
                    </div>
                </form>
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.cart = new Cart();
        this.state = {
            data: this.cart.getData(),
            discount: this.cart.getDiscount()
        };

    }

    deleteItem(event) {
        event.preventDefault();
        let id = event.target.dataset.btnId;
        this.setState({ data: this.cart.remove(id) });
    }

    addItem(item) {
        if (this.state.discount) {
            this.cart.setDiscountItem(this.state.discount, item);
        }

        this.cart.add(item);
        this.setState({ data: this.cart.getData() });
    }

    addDiscount(discount) {
        this.setState({ discount: discount == 0 ? '' : discount });
        this.cart.setDiscount(Number(discount));
        this.setState({ data: this.cart.getData() });
    }

    render() {
        const precheckData = {
            count: this.cart.getCountAll(),
            price : this.cart.getSum(),
            discount : this.cart.getDiscountSum()
        }

        return (
            <div class="container">
                <section class="products">
                    <div class="products__main">
                        <CartBlock
                            data={this.state.data}
                            delete={this.deleteItem.bind(this)}
                        />
                    </div>
                    <aside class="products__aside">
                        <FormBlock add={this.addItem.bind(this)} />
                        <PrecheckBlock data={precheckData} />
                        <DiscountBlock
                            discount={this.state.discount}
                            add={this.addDiscount.bind(this)}
                        />
                    </aside>
                </section>

            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(<App />);

