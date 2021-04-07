var searchEl = document.getElementById("search-bar");
var searchBtnEl = document.getElementById("search-btn"); 
var resultEl = document.getElementById("main-body");
var resultHeaderEl = document.getElementById("results-header");

var searchedBook = JSON.parse(localStorage.getItem("input"));

var wishlist = JSON.parse(localStorage.getItem("wishlistBookInfo")) || [];
var library = JSON.parse(localStorage.getItem("libraryBookInfo")) || [];


const APIKey = "AIzaSyC2xEWKYLtmXP4EC1KSovcnRSpX9h3NSTs";

function printResults(searchedBook) {
    resultHeaderEl.textContent = "Search results for: " + searchedBook;
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=15" + "&key=" + APIKey;
    fetch(requestUrl)
        .then(function(response){
            /* console.log(response);
            console.log(response.url); */
            return response.json();
        })
        .then(function(data){
            console.log(data)
            for(var i = 0; i < data.items.length; i++){


                const resultCardEl = document.createElement("div");
                resultCardEl.setAttribute("class", "ui card fluid container");
                

                const topBtns = document.createElement("div");
                topBtns.setAttribute("class", "ui two top attached basic buttons");

                const wishlistBtn = document.createElement("div");
                wishlistBtn.innerHTML = "Add to wishlist";
                wishlistBtn.setAttribute("class", "ui green button wishlistButton")
                topBtns.appendChild(wishlistBtn);

                const LibraryBtn = document.createElement("div");
                LibraryBtn.innerHTML = "Add to library";
                LibraryBtn.setAttribute("class", "ui green button libraryButton");
                topBtns.appendChild(LibraryBtn);
                
                const bookInfoEl = document.createElement("div");
                bookInfoEl.setAttribute("class", "ui grid content");

                const imgEl = document.createElement("div");
                imgEl.setAttribute("class", "six wide column center")
                bookInfoEl.appendChild(imgEl);

                var imgTrueOrFalse = data.items[i].volumeInfo.imageLinks;
                if(imgTrueOrFalse != undefined){
                    const bookImg = document.createElement("img");
                    bookImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.thumbnail);
                    bookImg.setAttribute("alt", data.items[i].volumeInfo.description);
                    bookImg.setAttribute("class", "center bookImg");
                    bookImg.setAttribute("width", "100%");
                    bookImg.style.alignContent = "center";
                    imgEl.appendChild(bookImg);
                } else {
                    const noBookImg = document.createElement("div");
                    noBookImg.innerHTML = "No img available";
                    imgEl.appendChild(noBookImg);
                }

                const content = document.createElement("div");
                content.setAttribute("class", "ten wide column");
                bookInfoEl.appendChild(content);

                const bookTitle = document.createElement("h1");
                bookTitle.setAttribute("class", "ui bookHeader black")
                bookTitle.innerHTML = data.items[i].volumeInfo.title;
                content.appendChild(bookTitle);
                
                var categoryTrueOrFalse = data.items[i].volumeInfo.categories;
                
                if(categoryTrueOrFalse != undefined) {
                    const bookCategory = document.createElement("h2");
                    bookCategory.setAttribute("class", "ui bookCategory black");
                    bookCategory.innerHTML = data.items[i].volumeInfo.categories[0];
                    content.appendChild(bookCategory); 
                } else {
                    const noBookCategory = document.createElement("h2");
                    noBookCategory.setAttribute("class", "ui bookCategory black");
                    noBookCategory.innerHTML = "No category available";
                    content.appendChild(noBookCategory); 
                }

                var descriptionTrueOrFalse = data.items[i].volumeInfo.description;
                if(descriptionTrueOrFalse != undefined){
                    const descriptionEl = document.createElement("p");
                    descriptionEl.setAttribute("class", "bookDescription");
                    descriptionEl.style.maxHeight ="150px";
                    descriptionEl.style.overflow ="hidden";
                    descriptionEl.textContent = data.items[i].volumeInfo.description;
                    content.appendChild(descriptionEl); 
                } else {
                    const noDescriptionEl = document.createElement("p");
                    noDescriptionEl.setAttribute("class", "bookDescription");
                    noDescriptionEl.style.maxHeight ="150px";
                    noDescriptionEl.style.overflow ="hidden";
                    noDescriptionEl.textContent = "No description available";
                    content.appendChild(noDescriptionEl); 
                }

                var averageRatingTrueOrFalse = data.items[i].volumeInfo.averageRating;
                /* console.log(averageRatingTrueOrFalse); */
                if(averageRatingTrueOrFalse != undefined) {
                    const ratingEl = document.createElement("p");
                    ratingEl.textContent = "Average rating:" + data.items[i].volumeInfo.averageRating + "/5";
                    ratingEl.setAttribute("class", "black bookRating")
                    content.appendChild(ratingEl);
                } else {
                    const noRatingEl = document.createElement("p");
                    noRatingEl.textContent = "No rating available";
                    noRatingEl.setAttribute("class", "black bookRating")
                    content.appendChild(noRatingEl);
                }
                const bottomBtn = document.createElement("div");
                bottomBtn.setAttribute("class", "ui one bottom attached basic buttons");


  
                if(data.items[i].saleInfo.isEbook){
                    const purchaseLink = document.createElement("a");

                    purchaseLink.textContent = "Purchase Link";
                    purchaseLink.setAttribute("class", "ui button purchaseLinkButton");
                    console.log(data.items[i].saleInfo.buyLink)
                    /* purchaseLink.setAttribute('href', "data.items[i].saleInfo.buyLink"); */
                    bottomBtn.appendChild(purchaseLink);
                } else {
                    const purchaseLink = document.createElement("a");

                    purchaseLink.textContent = "No purchase link available";
                    purchaseLink.setAttribute("class", "ui button purchaseLinkButton");
                    bottomBtn.appendChild(purchaseLink);
                }
                
                resultCardEl.appendChild(topBtns);
                resultCardEl.appendChild(bookInfoEl);
                resultCardEl.appendChild(bottomBtn);
                resultEl.appendChild(resultCardEl);
                
                

            }

            var wishlistButtons = document.querySelectorAll(".wishlistButton")
            console.log(wishlistButtons);
            wishlistButtons.forEach(element => {
                element.addEventListener("click", function(event){
                    clickIndex1 = (Array.from(wishlistButtons).indexOf(event.target));
                    console.log("Clicked on: " + clickIndex1);
                    wishlist.push(data.items[clickIndex1].volumeInfo);
                    localStorage.setItem("wishlistBookInfo", JSON.stringify(wishlist))
                })
            })

            var libraryButtons = document.querySelectorAll(".libraryButton")
            console.log(libraryButtons);
            libraryButtons.forEach(element => {
                element.addEventListener("click", function(event){
                    clickIndex2 = (Array.from(libraryButtons).indexOf(event.target));
                    console.log("Clicked on: " + clickIndex2);
                    library.push(data.items[clickIndex2].volumeInfo);
                    localStorage.setItem("libraryBookInfo", JSON.stringify(library));
                })
            })

            var purchaseLinkButtons = document.querySelectorAll(".purchaseLinkButton")
            purchaseLinkButtons.forEach(element => {
                element.addEventListener("click", function(event){
                    clickIndex3 = (Array.from(purchaseLinkButtons).indexOf(event.target));
                    console.log("Clicked on: " + clickIndex3);
                    var purchaseUrl = data.items[clickIndex3].saleInfo.buyLink;
                    var newWindow = window.open(purchaseUrl, "_blank");
                    newWindow.focus();
                })
            })
        })
}




printResults(searchedBook);

searchBtnEl.addEventListener("click",function(){
    console.log("hi")
    const searchedBook = searchEl.value;
    
    printResults(searchedBook);

}) 