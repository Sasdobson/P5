
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
        
        
        var img = document.createElement("img");
        img.src = canape.imageUrl;
    
        var div = document.getElementById("item__img").appendChild(img)
       
})