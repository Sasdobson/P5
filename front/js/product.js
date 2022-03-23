
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
        price.innerHTML = canape.price

        var description = document.getElementById('description')
        description.innerHTML = canape.description
       
        let select = document.getElementById('colors')
       
       
    canape.colors.forEach((couleur)=> {
    let option = document.createElement('option')

    option.innerHTML=`${couleur}`
    option.value=`${couleur}`
    select.appendChild(option)
           
        });
       

var input = document.getElementById('quantity');
var n = input.value;
n = Number(n);
if (n < 0) {
    alert('Choisir quantitée entre 0-100');
    input.value = 0;
} else if (n > 100) {
    alert('Choisir quantitée entre 0-100');
    input.value = 100;
}

    let addToCart = document.getElementById("addToCart")
    console.log(addToCart)
    addToCart.addEventListener("click", () => {
        let select = document.getElementById("colors")
        console.log(select.value)
        localStorage.setItem("canape", canape._id)
        localStorage.setItem("canape", canape.name)
        localStorage.setItem("canape", canape.price)

    })
   


})
               
        
