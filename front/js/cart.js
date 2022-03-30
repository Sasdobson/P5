const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
fetch('http://localhost:3000/api/products')


.then(function(res) {
    if(res.ok) { 
        console.log(res)
        return res.json() 
    }

})


    let panier = localStorage.getItem("kanap")
    console.log(panier)

 function affiche(page) {
 let affichage = document.querySelector("cart__items");
 affichage.innerHTML += page.map((kanap) => 
 `<article class="cart__item" data-id="${kanap._id}" data-couleur="${kanap.couleur}" data-quantité="${kanap.quantité}"> 
   <div class="cart__item__img">
     <img src="${kanap.image}" alt="${kanap.alt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__titlePrice">
       <h2>${kanap.name}</h2>
       <span>couleur : ${kanap.couleur}</span>
       <p data-prix="${kanap.prix}">${kanap.prix} €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantité}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem" data-id="${kanap._id}" data-couleur="${kanap.couleur}">Supprimer</p>
       </div>
     </div>
   </div>
 </article>`  ).join(""); 
 totalProduit();}


// if (function (canape) {
//     console.log(canape.name) 
//     console.log(canape.price)
//     console.log(canape.imageUrl)
//     console.log(canape.description)
//     console.log(canape._id)
//     console.log(canape.colors)
    
//     let article = document.createElement('article')
//         article.className = 'cart__item'
//         article.innerHTML = panier
//         console.log(panier)
//         cart__items.appendChild(article)

//         let img = document.createElement('cart__item__img')
//         img.className ='cart__item__img'
//         article.appendChild(img)
//         img.src = canape.imageUrl
//         console.log(img)
       
// });



        

      
         



//  1.Parcourir le localStorage
//  pour chaque ligne du panier
//  appeler l'api afin de récupérer les infos du produit que l'on a pas dans le localStorage pour des raison de securité (prix + images)
//  Dynamiser l'HTML avec les infos
//  Calculer et afficher les totaux du panier (quantité + prix)
//  Gérer le bouton de suppression + l'input de modification de la quantite