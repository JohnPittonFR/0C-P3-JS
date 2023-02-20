const urlWorks = 'http://localhost:5678/api/works'; 
const urlCategories = 'http://localhost:5678/api/categories'; 


let afficheWorks = (urlWorks, filter) => {
    const div = document.querySelector(".gallery");
    div.innerHTML = ""
    fetch(urlWorks)
    .then(function(res){        
        if (res.ok){
            return res.json()
        }
    })
    .catch(function(err){
        console.log(err, "Impossible de récupérer les works")
    })
    .then(function(works){
        let filteredWorks = works;
        if(filter != 0) filteredWorks = works.filter(obj => obj.categoryId == filter)
        for (let work of filteredWorks){
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            img.setAttribute ("src", work.imageUrl);
            img.setAttribute ("alt", work.title);
            figure.appendChild(img);
            let figcaption = document.createElement("figcaption");
            figcaption.innerHTML = work.title
            figure.appendChild(figcaption);
            div.appendChild(figure);
        }
    })
    .catch(function(err){
        console.log(err, "Impossible d'afficher les works")
    })
}

let afficheCategories = (urlCategories) => {
    fetch(urlCategories)
    .then(function(res){        
        if (res.ok){
            return res.json()
        }
    })
    .catch(function(err){
        console.log(err, "Impossible de récupérer les categories")
    })
    .then(function(categories){
        const div = document.querySelector(".filtres");
        let bouton = document.createElement("button");
        bouton.textContent = "Tous les projets";
        bouton.setAttribute('id',0)
        bouton.setAttribute('class','filtre')
        div.appendChild(bouton);
        categories.map((categorie) => {
            let bouton = document.createElement("button");
            bouton.textContent = categorie.name
            bouton.setAttribute('id',categorie.id)
            bouton.setAttribute('class','filtre')
            div.appendChild(bouton);
        })
        boutons = document.querySelectorAll('.filtre');
        boutons.forEach(function(bouton) { 
            bouton.addEventListener('click', function() {
                const id = bouton.id;
                afficheWorks(urlWorks, id)
            });
        });


    })
    .catch(function(err){
        console.log(err, "Impossible d'afficher les categories")
    })
}



afficheWorks(urlWorks, 0)
afficheCategories(urlCategories)






