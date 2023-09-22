const apiKey = "-Ku8UwwkLAi0I7QbQDuiEAfLrq53slYkiw3Sz-xXHQ8";
let inputText = document.querySelector('#search-box');
let getInputBtn = document.querySelector('.btn');
let searchResults = document.querySelector('.image-container');
var page = 1;


async function searchImage() {

    inputData= localStorage.getItem('inputData');

    let dataUrl =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`
    let response = await fetch(dataUrl);
    let image = await response.json();
    let data = image.results;
    console.log(data);
    if (page === 1) { 
        searchResults.innerHTML = "";
    }
    for (let i = 0; i < data.length; i++) { 
        searchResults.innerHTML += `
        <div class="image-card">
            <img src="${data[i].urls.small}" alt="">  
            <div class="image-info">
                <a href="${data[i].urls.small}" target="_blank">${data[i].alt_description}</a>
            </div>  
        </div>`;

    }
    page++;
    if (image.total_pages > 1) {
        
        document.querySelector('.show-more').style.display = 'block';
        var inputData = inputText.value;
        inputData = " ";
    }
    
   
}
getInputBtn.addEventListener('click', (event) => { 
    event.preventDefault();
    page += 1;
    searchImage();
    location.reload();
    localStorage.setItem('inputData',inputText.value);

})
document.querySelector('.show-more').addEventListener('click', () => { 
    page += 1;
    searchImage();
    
})
window.onload = () => { 
    searchImage();
}


