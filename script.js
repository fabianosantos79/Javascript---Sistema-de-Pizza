pizzaJson.map((item, index) => {
    //Clonando o modelo com a quantidade do pizzas.js
    let pizza = document.querySelector('.models .pizza-item').cloneNode(true);

    //Preenchedo os dados do card
    pizza.setAttribute('data-key', index);
    pizza.querySelector('.pizza-item--name').innerHTML = item.name;
    pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizza.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizza.querySelector('.pizza-item--img img').src = item.img;

    //Click no botão + ou imagem - Abrir o modal
    pizza.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        //variavel para armazenar a consulta da API
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        
    })

    //Click no botão cancelar - Fechar o modal
    document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    })

    //Inserir os clones no body da página - Cards de pizza
    document.querySelector('.pizza-area').append(pizza);

});