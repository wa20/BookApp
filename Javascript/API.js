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
                resultCardEl.setAttribute("class", "ui card fluid");
                

                const topBtns = document.createElement("div");
                topBtns.setAttribute("class", "ui two top attached basic buttons");

                const wishlistBtn = document.createElement("div");
                wishlistBtn.innerHTML = "Add to wishlist";
                wishlistBtn.setAttribute("class", "ui green button")
                topBtns.appendChild(wishlistBtn);

                const LibraryBtn = document.createElement("div");
                LibraryBtn.innerHTML = "Add to library";
                LibraryBtn.setAttribute("class", "ui green button");
                topBtns.appendChild(LibraryBtn);
                
                const bookInfoEl = document.createElement("div");
                bookInfoEl.setAttribute("class", "ui grid content");

                const imgEl = document.createElement("div");
                imgEl.setAttribute("class", "two wide column center")
                bookInfoEl.appendChild(imgEl);

                var imgTrueOrFalse = data.items[i].volumeInfo.imageLinks;
                if(imgTrueOrFalse != undefined){
                    const bookImg = document.createElement("img");
                    bookImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.thumbnail);
                    bookImg.setAttribute("alt", data.items[i].volumeInfo.description);
                    bookImg.setAttribute("class", "center");
                    /* bookImg.setAttribute("width", "100vw"); */
                    imgEl.appendChild(bookImg);
                } else {
                    const noBookImg = document.createElement("div");
                    noBookImg.innerHTML = "No img available";
                    imgEl.appendChild(noBookImg);
                }

                const content = document.createElement("div");
                content.setAttribute("class", "fourteen wide column");
                bookInfoEl.appendChild(content);

                const bookTitle = document.createElement("h1");
                bookTitle.setAttribute("class", "ui header")
                bookTitle.innerHTML = data.items[i].volumeInfo.title;
                content.appendChild(bookTitle);
                
                var categoryTrueOrFalse = data.items[i].volumeInfo.categories;
                
                if(categoryTrueOrFalse != undefined) {
                    const bookCategory = document.createElement("h2");
                    bookCategory.setAttribute("class", "ui medium header");
                    bookCategory.innerHTML = data.items[i].volumeInfo.categories[0];
                    content.appendChild(bookCategory); 
                } else {
                    const noBookCategory = document.createElement("h2");
                    noBookCategory.setAttribute("class", "ui medium header");
                    noBookCategory.innerHTML = "No category available";
                    content.appendChild(noBookCategory); 
                }

                var descriptionTrueOrFalse = data.items[i].volumeInfo.description;
                if(descriptionTrueOrFalse != undefined){
                    const descriptionEl = document.createElement("p");
                    descriptionEl.textContent = data.items[i].volumeInfo.description;
                    content.appendChild(descriptionEl); 
                } else {
                    const noDescriptionEl = document.createElement("p");
                    noDescriptionEl.textContent = "No description available";
                    content.appendChild(noDescriptionEl); 
                }

                var averageRatingTrueOrFalse = data.items[i].volumeInfo.averageRating;
                console.log(averageRatingTrueOrFalse);
                if(averageRatingTrueOrFalse != undefined) {
                    const ratingEl = document.createElement("p");
                    ratingEl.textContent = "Average rating:" + data.items[i].volumeInfo.averageRating + "/5";
                    ratingEl.setAttribute("class", "black")
                    content.appendChild(ratingEl);
                } else {
                    const noRatingEl = document.createElement("p");
                    noRatingEl.textContent = "No rating available";
                    noRatingEl.setAttribute("class", "black")
                    content.appendChild(noRatingEl);
                }
                const bottomBtn = document.createElement("div");
                bottomBtn.setAttribute("class", "ui one bottom attached basic buttons");

                const purchaseLink = document.createElement("div");
                purchaseLink.innerHTML = "Purchase Link";
                purchaseLink.setAttribute("class", "ui button");
                bottomBtn.appendChild(purchaseLink);

                resultCardEl.appendChild(topBtns);
                resultCardEl.appendChild(bookInfoEl);
                resultCardEl.appendChild(bottomBtn);
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