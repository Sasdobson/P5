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
        let h3 = document.createElement('h3')
        let article = document.createElement('article')
        h3.innerText = canape.name
        h3.className = 'productName'
        
        
        article.appendChild(h3)

        
            let img = document.createElement('img')
            img.src = canape.imageUrl
            img.alt = canape.altTxt

        article.appendChild(img)
        
    
       
        let p =document.createElement('p')
        p.innerText = canape.description
        p.className ='productDescription'

        article.appendChild(p)

        let a = document.createElement('a')
        a.href ="product.html?id=" + canape._id
        a.appendChild(article)
        items.appendChild(a)
        

     
    
    })
})

