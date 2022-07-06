import { getRepositories } from './api.js';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    updateInputValue(event) {
        const value = event.target.value
        this.setState({
            value: value,
        });

        this.props.search(value, 3);
    }

    result() {
        const r = this.props.result;

        if (!r) {
            return '';
        }

        const res = () => {

            if (r.message) {
                return <p class="error__mesage">{r.message}</p>
            }

            if (r.total_count == 0) {
                return <p class="error__mesage">Ничего не найдено</p>
            }

            const list = r.items.map(item => {
                return (
                    <li key={item.node_id}
                        class="search__result-item"
                        onClick={(event => {
                            event.preventDefault();
                            window.open(item.html_url, '_blank');
                        })}
                    >
                        <a class="search__result-link" href={item.html_url}>
                            {item.owner.login + ': ' + item.name.slice(0, 30)}
                        </a>
                        <p class="search__result-language">{item.language}</p>
                    </li>
                );
            })

            return <ul class="search__result-list list"> {list} </ul>
        }

        return <div class="search__result">{ res()}</div>
    }

    btnClick(event) {
        event.preventDefault();
        this.props.search(this.state.value, 10);
        this.setState({ value: '', });
    }

    render() {
        return (
            <section class="search">
                <form class="search__form form">
                    <div class="search__form-row">
                        <div class="form__item search__form-item">
                            <input
                                class="form__item-input input-search"
                                placeholder="search"
                                id="input-search"
                                value={this.state.value}
                                onChange={this.updateInputValue.bind(this)}
                            />
                            <label class="form__item-label">search</label>
                        </div>
                        <div class="form__buttons">
                            <button
                                class="form-search__add form__btn"
                                onClick={this.btnClick.bind(this)}
                            >Искать</button>
                        </div>
                    </div>
                    {this.result()}
                </form>

            </section>
        );
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    result() {
        const r = this.props.result;
        if (!r) {
            return 'rgreg';
        }

        if (r.message) {
            return <p class="error__mesage">{r.message}</p>
        }

        if (r.total_count == 0) {
            return <p class="error__mesage">Ничего не найдено</p>
        }

        const list = r.items.map(item => {
        
            return (
                <li
                    key={item.node_id}
                    class="result__item"
                >
                    <a
                        class="result__link"
                        href={item.html_url}
                        onClick={(event => {
                            event.preventDefault();
                            window.open(item.html_url, '_blank');
                        })}
                    >{item.full_name}
                    </a>
                    <p class="result__description">{item.description}</p>
                    <p class="result__language">{item.language}</p>
                    <p class="result__topics">{item.topics.join(`  `)}</p>
                </li>
            );
        });
        return <ul class="search__result-list list"> {list} </ul>
    }




    render() {
        return (this.props.result) ? (
            <section class="result">
                <h1 class="result__title">
                    Найдено {this.props.result.total_count} репозиториев
                </h1>
                {this.result()}
            </section>
        ) : '';
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            'result-3': false,
            'result-10': false
        };
    }

    search(value, amount) {
        if (value.length == 0) {
            this.setState({ ['result-3']: false, });
            return;
        }
        if (amount == 10) {
            this.setState({ ['result-3']: false, });
        }
        getRepositories(value, amount)
            .then(response => {
                this.setState({ [`result-${amount}`]: response });
            });
    }



    debounce = function (func) {

        let throttle = false,
            saved,
            _this;

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
    }

    render() {

        return (
            <div class="container">
                <Search
                    search={this.debounce(this.search.bind(this))}
                    result={this.state['result-3']}

                />
                <Result
                    result={this.state['result-10']}
                />

            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector('.app'));
root.render(<App />);


