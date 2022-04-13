/**
 * 1.Parcourir le localStorage
 * pour chaque ligne du panier
 * appeler l'api afin de récupérer les infos du produit que l'on a pas dans le localStorage pour des raison de securité (prix + images)
 * Dynamiser l'HTML avec les infos
 * Calculer et afficher les totaux du panier (quantité + prix)
 * Gérer le bouton de suppression + l'input de modification de la quantité
 */

 let totalPrice = 0
 let totalQty = 0
 
 for (let i = 0; i < localStorage.length; i++) {
     let key = localStorage.key(i)
 
     let ligne_de_panier = JSON.parse(localStorage.getItem(key))
     //console.log(ligne_de_panier)
 
     fetch('http://localhost:3000/api/products/' + ligne_de_panier.id)
     .then(function(res) {
         if(res.ok) {
             return res.json()
         }
     })
     .then(function (canape) {
 
         /**
          * Attention le innerHtml est interdit, utiliser createelement(), appendChild(), comme sur script.js
          */
        let section = document.getElementById('cart__items')
        let article = document.createElement('article')
        article.className = 'cart__item'
        article.dataset.id = canape._id
        article.dataset.color = ligne_de_panier.couleur
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
        totalQty += ligne_de_panier.quantite
        qty.addEventListener("change", updateQty)

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
  
    //     const input = document.querySelectorAll('input')  
    //   input.forEach((input)=>{
    //     input.addEventListener("change", (e) => {
    //       let qty = JSON.parse(localStorage.getItem(key))
    //       console.log(e.target.value)
 
          
    //     })
    //   })
    //   function qtyupdate() { 
    //     console.log(e.target.value)
    // }
    
  
    

      
    //         const Suppression = document.querySelector(".deleteItem");
    //         Suppression.addEventListener("click", () => {

    //           let panier = JSON.parse(localStorage.getItem(key));
    //           console.log(panier)

    //           if 
        
            
    //  })
        
        //  totalPrice += canape.price * ligne_de_panier.quantite
        //  totalQty += ligne_de_panier.quantite
 
        //  document.getElementById('totalQuantity').innerText = totalQty
        //  document.getElementById('totalPrice').innerText = totalPrice
 
     });
 }

 function updateQty(event) {
     let input = event.target
     let value = input.value
     let key = input.ligne_de_panier_key;
     // console.log(input.key)
     //console.log(value)
     let panier = JSON.parse(localStorage.getItem(key));

     panier.quantite = parseInt(value)
     //1 + 1 = 2
     //"1" + 1 = "11"

     localStorage.setItem(key, JSON.stringify(panier))
     document.getElementById('totalQuantity').innerText = totalQty
    
     //mettre a jour le calcul et l'affichage des totaux
 }
 function updateAll(){
    let key = localStorage.key(i)
    let canape = JSON.parse(localStorage.getItem(key.price))
    var elemsQty = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQty.length,
    totalQty = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQty += elemsQty[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQty;
    
    totalPrice = 0;
    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQty[i].valueAsNumber * canape);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}


 function supprimerLigne(event)
{
    let input = event.target
    let key = input.ligne_de_panier_key;
    let panier = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key)
    //console.log('article[data-id="'+panier.id+'"][data-color="'+panier.couleur+'"]')
    document.querySelector('article[data-id="'+panier.id+'"][data-color="'+panier.couleur+'"]').remove()

    //mettre a jour le calcul et l'affichage des totaux
}
function Form() {
    
    let form = document.querySelector(".cart__order__form");

    
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    form.address.addEventListener('change', function() {
        validAddress(this);
    });
    form.city.addEventListener('change', function() {
        validCity(this);
    });
    form.email.addEventListener('change', function() {
        validEmail(this);
    });
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }

//  document.getElementById('cart') //retourne un element
//  document.getElementsByClassName() //retourne un tableau d'élement
//  document.querySelector('article .banniere #cart') //retourne un element (le premier résultat) ou null
//  document.querySelectorAll()  //retourne un tableau d'élement
 
 /**
  * RESTE A FAIRE
  * Modification de la quantité
  * Suppression
  *
  * Il faut attacher un eventListener a l'input quantité et a la balise p supprimer
  * Au changement de la quantité
  * - mettre à jour le localstorage (pour garde ton panier à jour)
  * - calculer/mettre à jour le prix total et la quantité total sur la page
  *
  * A la suppression
  * - supprimer la ligne du panier du localStorage
  * - supprimer la balise html article
  * - calculer/mettre à jour le prix total et la quantité total sur la page
  */