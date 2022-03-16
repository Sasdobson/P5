fetch('http://localhost:3000/api/products')

.then(function(res) {
    if(res.ok) { 
        console.log(res)
        return res.json() 
    }
})

.then(function (canapes) {
    console.log(canapes)
    canapes.forEach(function (canape) { 
        console.log(canape.name) 
        console.log(canape.price)
        console.log(canape.imageUrl)
        console.log(canape.description)
        console.log(canape._id)

        let items = document.getElementById('items')
        

        let price = document.createElement('price')
        price.className = 'price'
        price.innerText = canape.price
        items.appendChild(price)
    })
})