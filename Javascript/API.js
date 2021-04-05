var searchEl = document.getElementById("search-bar");
var searchBtnEl = document.getElementById("search-btn"); 
var resultEl = document.getElementById("main-body");
var resultHeaderEl = document.getElementById("results-header");

var searchedBook = JSON.parse(localStorage.getItem("input"));

console.log(typeof searchedBook);

console.log(resultEl);
console.log(searchEl);
console.log(resultHeaderEl);



const APIKey = "AIzaSyAV4WnTD1SBTUokHDh8EUM4TtrOMs81Dig";

function printResults(searchedBook) {
    resultHeaderEl.textContent = "Search results for: " + searchedBook;
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=40" + "&key=" + APIKey;
    fetch(requestUrl)
        .then(function(response){
            console.log(response);
            console.log(response.url);
            return response.json();
        })
        .then(function(data){
            console.log(data)
            for(var i = 0; i < data.items.length; i++){
                const resultCardEl = document.createElement("div");
                resultCardEl.setAttribute("class", "ui fluid card column");
                resultCardEl.textContent = data.items[i].volumeInfo.title;


                var imgTrueOrFalse = data.items[i].volumeInfo.imageLinks;

                if(imgTrueOrFalse != undefined){
                    const bookImg = document.createElement("img");
                    bookImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.thumbnail);
                    bookImg.setAttribute("alt", data.items[i].volumeInfo.description);
                    bookImg.setAttribute("width", "100px");
                    resultCardEl.appendChild(bookImg);
                }

                const descriptionEl = document.createElement("div");
                descriptionEl.textContent = data.items[i].volumeInfo.description;
                resultCardEl.appendChild(descriptionEl);
        
                const wishlistBtn = document.createElement("btn");
                wishlistBtn.innerHTML = "Add to wishlist";
                wishlistBtn.setAttribute("class", "ui inverted green button")
                resultCardEl.appendChild(wishlistBtn);
        
                const LibraryBtn = document.createElement("btn");
                LibraryBtn.innerHTML = "Add to library";
                LibraryBtn.setAttribute("class", "ui inverted green button")
                resultCardEl.appendChild(LibraryBtn);
        
                resultEl.appendChild(resultCardEl);
            }
        })
}




printResults(searchedBook);

searchBtnEl.addEventListener("click",function(){
    console.log("hi")
    const searchedBook = searchEl.value;
    
    printResults(searchedBook);

})  
