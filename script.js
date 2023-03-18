let modalQt
let modalKey = 0
let modalSize = 2
let cart = []

//Listagem das pizzas
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
        modalQt = 1;
        modalKey = key;

        //Preenchendo os dados no Modal
        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        
        //Percorrendo os tamanhos das pizzas
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
        })
        
        //Preenchendo a quantidade das pizzas
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

        //Colocando a div pai no body
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        
    })

    //Click no botão cancelar - Fechar o modal
    document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    })

    document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    })

    //Inserir os clones no body da página - Cards de pizza
    document.querySelector('.pizza-area').append(pizza);

});

//>>>>>> EVENTOS DO MODAL <<<<<<<

//Botão menos
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
    e.preventDefault();
    
    if(modalQt > 1){
        modalQt--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

//Botão Mais
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', e =>{
    e.preventDefault();
    modalQt++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
})

//Selecionar tamanhos
document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{
    size.addEventListener('click', (e) =>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');    
        size.classList.add('selected');
        modalSize = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    })
})


//Botão Adicionar ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', (e) => {
    e.preventDefault()

    let indentifier = parseInt(modalKey) + 1+"@"+parseInt(modalSize);

    let key = cart.findIndex((item)=>{
        return item.indentifier == indentifier
    })

    if(key > -1){
        cart[key].qtde += modalQt
    }else{
        cart.push({
            id: parseInt(modalKey) + 1,
            size: parseInt(modalSize),
            qtde: modalQt,
            indentifier
        })
    }

    document.querySelector('.pizzaWindowArea').style.display = 'none';
    
})