import { getRepositories } from '../api.js';

function App() {
    var _this2 = this;

    this.input = document.querySelector('.input-search');
    this.input.addEventListener('input', function (event) {
        event.preventDefault();
        _this2.debounce(_this2.search.bind(_this2, 3))();
    });

    var btn = document.querySelector('.form-search__add');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        _this2.debounce(_this2.search.bind(_this2, 10))();
    });
}

App.prototype.debounce = function (func) {

    var throttle = false,
        saved = void 0,
        _this = void 0;

    function wrapper() {

        if (throttle) {
            saved = arguments;
            _this = this;
            return;
        }

        func.apply(this, saved);

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

App.prototype.search = function (amount) {
    var _this3 = this;

    if (this.input.value.length == 0) {
        this.view(false, amount);
        return;
    }

    getRepositories(this.input.value, amount).then(function (response) {
        return _this3.view(response, amount);
    });
};

App.prototype.view = function (res, amount) {

    var tag = amount < 5 ? '.search__result' : '.result';
    var result = document.querySelector(tag);
    var list = result.querySelector('.list');

    result.classList.remove('disable');
    list.innerHTML = '';

    if (!res) {
        result.classList.add('disable');
        return;
    }

    if (res.message) {
        result.querySelector('.error__mesage').textContent = res.message;
        return;
    }

    if (res.total_count == 0) {
        result.querySelector('.error__mesage').textContent = 'Ничего не найдено';
        return;
    }

    res.items.forEach(function (item) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var language = document.createElement('p');
        if (amount < 5) {
            li.className = 'search__result-item';
            a.className = 'search__result-link';
            a.textContent = item.owner.login + ': ' + item.name.slice(0, 30);
            a.href = item.html_url;

            language.className = 'search__result-language';
            language.textContent = item.language;

            li.addEventListener('click', function (event) {
                event.preventDefault();
                window.open(a.href, '_blank');
            });

            li.append(a);
            li.append(language);
        } else {
            li.className = 'result__item';
            a.className = 'result__link';
            a.textContent = item.full_name;
            a.href = item.html_url;

            var description = document.createElement('p');
            description.className = 'result__description';
            description.textContent = item.description;

            var topics = document.createElement('p');
            topics.className = 'result__topics';
            topics.textContent = item.topics.join('  ');

            language.className = 'result__language';
            language.textContent = item.language;

            li.append(a);
            li.append(description);
            li.append(language);
            li.append(topics);

            a.addEventListener('click', function (event) {
                event.preventDefault();
                window.open(a.href, '_blank');
            });
        }

        list.append(li);
    });

    if (amount > 5) {
        document.querySelector('.search__result').classList.add('disable');
        document.querySelector('.result__title').textContent = '\u041D\u0430\u0439\u0434\u0435\u043D\u043E ' + res.total_count + ' \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0435\u0432';
        this.input.value = '';
    }
};
new App();