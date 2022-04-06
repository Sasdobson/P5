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
        qty.min = "0"
        qty.name = "itemQuantity"
        Conteneur3.appendChild(qte)
        Conteneur3.appendChild(qty)
        let Suppr = document.createElement('div') 
        Suppr.className = "cart__item__content__settings__delete"
        Conteneur2.appendChild(Suppr)
        let Supprimer = document.createElement('p') 
        Supprimer.className ='deleteItem'
        Supprimer.innerText = "Supprimer"
        Suppr.appendChild(Supprimer)

    
        const input = document.querySelectorAll('input')  
      input.forEach((input)=>{
        input.addEventListener("change", (e) => {
          let qty = JSON.parse(localStorage.getItem(key))
          console.log(e.target.value)
 
          
        })
      })
      function qtyupdate() { 
        console.log(e.target.value)
    }
    
  
    

      
    //         const Suppression = document.querySelector(".deleteItem");
    //         Suppression.addEventListener("click", () => {

    //           let panier = JSON.parse(localStorage.getItem(key));
    //           console.log(panier)

    //           if 
        
            
    //  })



        



        //  document.getElementById('cart__items').innerHTML +=
        //  `<article class="cart__item" data-id="${canape._id}" data-couleur="${ligne_de_panier.couleur}" > 
        //     <div class="cart__item__img">
        //       <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        //     </div>
        //     <div class="cart__item__content">
        //       <div class="cart__item__content__titlePrice">
        //         <h2>${canape.name}</h2>
        //         <p>${ligne_de_panier.couleur}</p>
        //         <p>${canape.price} €</p>
        //       </div>
        //       <div class="cart__item__content__settings">
        //         <div class="cart__item__content__settings__quantity">
        //           <p>Qté : </p>
        //           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ligne_de_panier.quantite}">
        //         </div>
        //        <div class="cart__item__content__settings__delete">
        //            <p class="deleteItem">Supprimer</p>
        //        </div>
        //       </div>
        //     </div>
        //   </article>`
 
 
         totalPrice += canape.price * ligne_de_panier.quantite
         totalQty += ligne_de_panier.quantite
 
         document.getElementById('totalQuantity').innerText = totalQty
         document.getElementById('totalPrice').innerText = totalPrice
 
     });
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