const products = [
  {id: 1, title: 'Notebook', price: 1000},
  {id: 2, price: 100},
  {id: 3, title: 'Keyboard', price: 250},
  {id: 4, title: 'Gamepad'},
];

const renderProduct = (title = 'NoName', price = 0) => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;
};

const renderProducts = (list) => {
  const productList = list.map((item) => {
    return renderProduct(item.title, item.price);
  });

  console.log(productList);
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);

/* корзина */
class basket {
  constructor(basketStyle = '.basket') {
    this.basketStyle = basketStyle;
    this.basketItemsMas = [];
    this.basketItemsEl = [];

    this.basketItems();
    this.render();
  }

  basketItems() {
    this.basketItemsMas = [
      {id: 1, title: 'Notebook', price: 1000},
      {id: 3, title: 'Keyboard', price: 250},
    ];
  }

  sumPriceBasket() {
    return this.basketItemsEl.reduce((sumPriceBasket, { price }) => sumPriceBasket + price, 0);
  }

  render() {
    const block = document.querySelector(this.basketStyle);

    for (const itemBasket of this.basketItemsMas) {
      const basketEl = new BasketItem(itemBasket);
      this.basketItemsEl.push(basketEl);

      block.insertAdjacentHTML('beforeend', basketEl.renderBasketEl())
    }
    block.insertAdjacentHTML('beforeend', 'Сумма корзины: ' + this.sumPriceBasket());
  }
}

class BasketItem {
  constructor(item) {
    this.id = item.id;
    this.title = item.title;
    this.price = item.price;
  }

  renderBasketEl() {
    return `<div class="basket-item" data-id="${this.id}">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button class="buy-btn">Удалить</button>
              </div>
          </div>`;
  }
}

const catalog = new basket();
