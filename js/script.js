// // Less 3.1 - Promise
// let getRequest = (url) => {
//   return new Promise((resolve, reject) => {
    
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200) {
//           reject('Error');
//         } else {
//           resolve(xhr.responseText);
//         }
//       }
//     };
//   })
  
//   xhr.send();
// };

class Products {
  constructor(Basket, productsStyle = '.products') {
    this.productsStyle = productsStyle;
    this.productsItemsMas = [];
    this.productsItemsEl = [];
    this.Basket = Basket;
    this.productsItems();
    this.renderProducts();
    this.initProducts();
  }

  productsItems() {
    this.productsItemsMas = [
      {id: 1, title: 'Notebook', price: 1000},
      {id: 2, price: 100},
      {id: 3, title: 'Keyboard', price: 250},
      {id: 4, title: 'Gamepad', price: 500},
    ];
  }

  renderProducts() {
    const pBlock = document.querySelector('.products');

    for (const itemProducts of this.productsItemsMas) {
      const productEl = new ProductsItem(itemProducts);
      this.productsItemsEl.push(productEl);

      pBlock.insertAdjacentHTML('beforeend', productEl.renderProductsEl())
    }
  }

  initProducts() {
    document.querySelector(this.productsStyle).addEventListener('click', ev => {
      if(ev.target.classList.contains('by-btn')) {
        this.Basket.addToBasket(ev.target);
        
      }
    });
  }
};

class ProductsItem {
  constructor(item) {
    this.id = item.id;
    this.title = item.title;
    this.price = item.price;
  }

  renderProductsEl() {
    return `<div class="product-item" data-id="${this.id}">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                  <button data-id="${this.id}" data-title="${this.title}" data-price="${this.price}" class="by-btn">Добавить</button>
              </div>
          </div>`;
  }
};

/* корзина */
class Basket {
  constructor(Products, basketStyle = '.basket') {
    this.basketStyle = basketStyle;
    this.basketItemsMas = [];
    this.basketItemsEl = [];
    this.Products = Products;
    // this.basketItems();
    this.render();
    this.initBasket();
  }

  // basketItems() {
  //   this.basketItemsMas = [
  //   ];
  // }

  sumPriceBasket() {
    return this.basketItemsEl.reduce((sumPriceBasket, { price }) => sumPriceBasket + price, 0);
  }

  render() {
    let block = document.querySelector(this.basketStyle);
    block.innerHTML = '';
    for (let itemBasket of this.basketItemsMas) {
      const basketEl = new BasketItem(itemBasket);
      this.basketItemsEl.push(basketEl);
      block.insertAdjacentHTML('beforeend', basketEl.renderBasketEl())
    }
  }

  addToBasket(elToBasket) {
      if (elToBasket) {
        let elId = +elToBasket.dataset['id'];
        
        let newItemBasket = this.basketItemsMas.find(el => el.id === elId);

        if (newItemBasket) {
          newItemBasket.quantity++;
          this.updateBasket(newItemBasket);
        } else {
          let el = {
              id: +elToBasket.dataset['id'],
              title: elToBasket.dataset['title'],
              price: +elToBasket.dataset['price'],
              quantity: 1,
            };
    
          this.basketItemsMas.push(el);
          // console.log(this.basketItemsMas);
          this.render();
        }
        
    }
  }

  updateBasket(item){
    let block = document.querySelector(`.basket-item[data-id="${item.id}"]`);
    block.querySelector('.basket-quantity').textContent = `${item.quantity}`;
    block.querySelector('.basket-price').textContent = `${item.quantity * item.price}`;
  }

  removeBasket(item) {
    console.log(item);
    let elId = +item.dataset['id'];
    let find = this.basketItemsMas.find(el => el.id === elId);
    
    
    this.basketItemsMas.splice(this.basketItemsMas.indexOf(find), 1);
    document.querySelector(`.basket-item[data-id="${elId}"]`).remove();
  }

  initBasket() {
    document.querySelector(this.basketStyle).addEventListener('click', ev => {
      if(ev.target.classList.contains('del-btn')) {
        this.removeBasket(ev.target);  
        console.log(ev.target);
      }
    });
  }
}

class BasketItem {
  constructor(item) {
    this.id = item.id;
    this.title = item.title;
    this.price = item.price;
    this.quantity = item.quantity;
  }

  renderBasketEl() {
    return `<div class="basket-item" data-id="${this.id}">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p class="basket-price">${this.price}</p>
                  <p class="basket-quantity">${this.quantity}</p>
                  <button data-id="${this.id}" data-title="${this.title}" data-price="${this.price}" class="del-btn">Удалить</button>
              </div>
          </div>`;
  }
}

new Products(new Basket());