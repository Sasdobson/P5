

let totalPrice = 0
let totalQty = 0
const order = document.getElementById('order');
order.addEventListener('click', postForm);

// On affiche un message si le localstorage/panier est vide
if (localStorage.length == 0){
    const titre = document.querySelector("h1");
    const Section = document.querySelector(".cart");

    titre.innerHTML = "Votre panier est vide.";
    Section.style.display = "none";
}
// Si le localstorage/panier a bien stocker des article alors on crée les elements html
 else {

// On parcour le localStorage pour recuperer les informations des produits

 for (let i = 0; i < localStorage.length; i++) {
     let key = localStorage.key(i)
 
     let ligne_de_panier = JSON.parse(localStorage.getItem(key))
 
     fetch('http://localhost:3000/api/products/' + ligne_de_panier.id)
     .then(function(res) {
         if(res.ok) {
             return res.json()
         }
     })
     .then(function (canape) {
        let section = document.getElementById('cart__items')
        let article = document.createElement('article')
            article.className = 'cart__item'
            article.dataset.id = canape._id
            article.dataset.color = ligne_de_panier.couleur
            article.id= key
                section.appendChild(article)

        let Conteneur0 = document.createElement("div")
            Conteneur0.className ='cart__item__img'
                let img = document.createElement('img')
                img.src = canape.imageUrl
                img.className = 'cart__item__img'
                article.appendChild(Conteneur0)
                    Conteneur0.appendChild(img)
        
        let Conteneur = document.createElement("div")
            Conteneur.className= 'cart__item__content'
                article.appendChild(Conteneur)
                let Conteneur1 = document.createElement("div")
                Conteneur1.className = "cart__item__content__description"
                    Conteneur.appendChild(Conteneur1)

        let h2 = document.createElement('h2')
        let p = document.createElement('p')
        let price = document.createElement('p')
            p.innerText = ligne_de_panier.couleur
            price.innerText = canape.price+'€'
            h2.innerText = canape.name
                Conteneur1.appendChild(h2)
                Conteneur1.appendChild(p)
                Conteneur1.appendChild(price)
        

        let Conteneur2 = document.createElement('div')
            Conteneur2.className ="cart__item__content__settings"
            Conteneur.appendChild(Conteneur2)
                let Conteneur3 = document.createElement('div')
                    Conteneur3.className ="cart__item__content__settings__quantity"
                    Conteneur2.appendChild(Conteneur3)
                    let qte = document.createElement('p')

        let qty = document.createElement('input')
            qte.innerText = 'Qté :'
            qte.className = "cart__item__content__settings__quantity"
            qty.setAttribute('type', 'number')
            qty.className = "itemQuantity"
            qty.value = ligne_de_panier.quantite
            qty.max = "100"
            qty.min = "1"
            qty.name = "itemQuantity"
            qty.ligne_de_panier_key = key
            qty.price = canape.price

         qty.dataset.ligne_de_panier_key = key
         qty.dataset.price = canape.price


        Conteneur3.appendChild(qte)
        Conteneur3.appendChild(qty)
        let Suppr = document.createElement('div') 
        Suppr.className = "cart__item__content__settings__delete"
        Conteneur2.appendChild(Suppr)
        let Supprimer = document.createElement('p') 
        Supprimer.className ='deleteItem'
        Supprimer.innerText = "Supprimer"
        Supprimer.ligne_de_panier_key = key

        Supprimer.addEventListener('click', supprimerLigne)
        Suppr.appendChild(Supprimer)
        qty.addEventListener('change', updateAll)
  
        totalPrice += canape.price * ligne_de_panier.quantite
        totalQty += ligne_de_panier.quantite
 
        document.getElementById('totalQuantity').innerText = totalQty
        document.getElementById('totalPrice').innerText = totalPrice
 
     });
 }
}

// Fonction pour le changement de quantite/prix
 function updateAll(event){

     let input = event.target
     let key   = input.ligne_de_panier_key;

     let ligne_de_panier = JSON.parse(localStorage.getItem(key));
        ligne_de_panier.quantite = input.valueAsNumber
            localStorage.setItem(key, JSON.stringify(ligne_de_panier))

                var elemsQty = document.getElementsByClassName('itemQuantity');
                var myLength = elemsQty.length,
// On recupere les quantite
    totalQty = 0;
    for (var i = 0; i < myLength; ++i) {
        totalQty += elemsQty[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQty;
// On recupere les prix et on multiplie par la quantitée
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQty[i].valueAsNumber * elemsQty[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;

     console.log('updateAll')
}

// Fonction pour la suppresion d'article 

 function supprimerLigne(event)
{
    let input = event.target
    let key = input.ligne_de_panier_key;
    let panier = JSON.parse(localStorage.getItem(key));
        localStorage.removeItem(key)
            document.querySelector('article[data-id="'+panier.id+'"][data-color="'+panier.couleur+'"]').remove()

            location.reload();
}


function postForm(event) {
    event.preventDefault()

    let form = document.querySelector(".cart__order__form");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    let inputFirstName = document.getElementById('firstName')
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    let hasError = false;

    if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner correctement ce champ.';
        hasError = true;
    }

    let inputLastName = document.getElementById('lastName')
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        hasError = true;
    }

    let inputAddress = document.getElementById('address')
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        hasError = true;
    }


    let inputCity = document.getElementById('city')
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        hasError = true;
    }

    let inputEmail = document.getElementById('email')
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        hasError = true;
    }

    if(hasError)
        return;

    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }

    let products = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        
        let ligne_de_panier = JSON.parse(localStorage.getItem(key));
        products.push(ligne_de_panier.id);

    }

    let sendForm = {
        contact,
        products,
    }

    console.log(products)
    console.log(sendForm)

    let options = {
        method: 'POST',
        body: JSON.stringify(sendForm),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:3000/api/products/order", options)
        .then(function(res) {
            if(res.ok) {
                return res.json()
            }
        })
        .then(function (order_response) {
            // console.log(order_response)
             for (let i = 0; i < localStorage.length; i= 0) {
                let key = localStorage.key(i)
                localStorage.removeItem(key)
             }
            

            document.location.href = 'confirmation.html?id=' + order_response.orderId;
        })
        .catch(function (error) {
            alert(error)
        })
}

 
