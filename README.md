# Разработка заготовки под корзину и поиск репозиториев гитхаба с применением React

## Демо - [rom746.github.io/hotels-m3-react/](https://rom746.github.io/hotels-m3-react/)

[Модуль без использования react](https://github.com/Rom746/hotels-m3)

### Заготовка под корзину

#### Блок с формы добавлением товара

Форма содержит:

1. поля:

- id
- title
- price

2. кнопка Добавить

Если добавляется товар с уже существующим id, то товары сумируются по первоначальной цене и названию

#### Блок с добавленными товарами

Содержит:

- id товара
- название товара
- цену товара
- кнопку Удалить товар

Если список пуст, отображается надпись "список пуст".

#### Блок со статистикой

Содержит:

- количество товаров и их стоимость (без скидки)
- общую скидку
- стоимость (со скидкой)

#### Блок с добавлением скидки

Содержит:

- поле для числового значения скидки (0-100)
- кнопку Добавить
- Кнопку Удалить скидку

Скидку можно не обнулять, а просто перезаписать, например с 50 на 20.



### Заготовка поиск репозиториев гитхаб

#### Блок с формы поиска

Форма содержит:

- поле ввода
- кнопку поиска

При вводе в поле открывается блок (2) с результатом

При нажатии кнопки открывается блок (3)

#### Блок со списком результатов (мини)

Содержит:

- имя владельца репозитория
- название репозитория
- ссылку на репозиторий
- используемый язык (если есть)

Выводится три первых найденных репозитория, либо сообщение об ошибке (не найдено, проблема с поиском)

#### Блок со списком результатов (полный)

Содержит:

- имя владельца репозитория
- название репозитория
- ссылку на репозиторий
- описание репозитория (если есть)
- используемый язык (если есть)
- теги (если есть)

Выводится 10 первых найденных репозиториев, либо сообщение об ошибке (не найдено, проблема с поиском)
