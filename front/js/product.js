const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
fetch('http://localhost:3000/api/products/' + id)

.then(function(res) {
    if(res.ok) { 
        console.log(res)
        return res.json() 
    }
})

.then(function (canape) {
        console.log(canape.name) 
        console.log(canape.price)
        console.log(canape.imageUrl)
        console.log(canape.description)
        console.log(canape._id)
        console.log(canape.colors)
        
        var img = document.createElement("img");
        img.src = canape.imageUrl;
    
        var div = document.getElementsByClassName('item__img')
        [0].appendChild(img)
        
        var titre = document.getElementById('title')
        titre.innerHTML = canape.name

        var prix = document.getElementById('price')
        prix.innerHTML = canape.price

        var description = document.getElementById('description')
        description.innerHTML = canape.description
       
        let select = document.getElementById('colors')
       
    canape.colors.forEach((couleur) => {
    let option = document.createElement('option')

        option.innerHTML = couleur
        option.value     = couleur
        select.appendChild(option)
           
    });
       

    let addToCart = document.getElementById("addToCart")
    console.log(addToCart)
    addToCart.addEventListener("click", () => { //function() { }

        let quantityInput = document.getElementById('quantity');
        let select = document.getElementById("colors")
        if(quantityInput.value > 100 || quantityInput.value <= 0) {
            alert('Choisir quantitée entre 1-100');
            return;
        }

        if(select.value === '') {
            alert('Veuillez choisir une couleur');
            return;
        }


        const kanap = canape._id + '_' + select.value;
        

        let ligne_de_panier = localStorage.getItem(kanap);
        if(ligne_de_panier === null) {
            let nouvelle_ligne_de_panier = {
                id :canape._id,
                couleur:  select.value,
                quantite: parseInt(quantityInput.value)
                
            }

            localStorage.setItem(kanap, JSON.stringify(nouvelle_ligne_de_panier));
        } else {
            //string '1' + '1' = '11'
            //integer 1 + 1 = 2
            ligne_de_panier = JSON.parse(ligne_de_panier)
            ligne_de_panier.quantite += parseInt(quantityInput.value)

            localStorage.setItem(kanap, JSON.stringify(ligne_de_panier))
        }
        alert("Ajouté au panier !")

    })
   
})
    
               
        
