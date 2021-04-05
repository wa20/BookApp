const searchEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");
const ResultsEl = document.getElementById("main-body");

const APIKey = "AIzaSyAV4WnTD1SBTUokHDh8EUM4TtrOMs81Dig";

function bookSearch(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=40" + "&key=" + APIKey;
//RESULTS WITH ONE COLUMN    
    fetch(requestUrl)
        .then(function(response){
            
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.items);
            //For loop that loops through array of results and creates a result card for each item in the array
            for(var i = 0; i < data.items.length; i++){
                
                const resultCardEl = document.createElement("div");
                resultCardEl.setAttribute("class", "ui fluid card column");
                resultCardEl.textContent = data.items[i].volumeInfo.title;
              /*const bookImg = document.createElement("img");
                bookImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.smallThumbnail);
                bookImg.setAttribute("alt", data.items[i].volumeInfo.description);
                resultCardEl.appendChild(bookImg); */
                
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

                ResultsEl.appendChild(resultCardEl);
                
            }
        })
}

searchBtnEl.addEventListener("click",function(){
    const userInput = searchEl.value;
    bookSearch(userInput);
    ResultsEl.innerHTML = "";
    const resultHeader = document.createElement("h1");
    resultHeader.textContent = "Search Results: " + userInput;
    ResultsEl.appendChild(resultHeader);

    const resultColumnsEl = document.createElement("div")
    resultColumnsEl.setAttribute("class", "ui two column grid")
    ResultsEl.appendChild(resultColumnsEl);
})


//RESULTS WITH TWO COLUMNS
/* fetch(requestUrl)
        .then(function(response){
            
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.items);

            ResultsEl.innerHTML = "";
            const resultHeader = document.createElement("h1");
            resultHeader.textContent = "Search Results: " + searchedBook;
            ResultsEl.appendChild(resultHeader);

            const resultColumnsEl = document.createElement("div")
            resultColumnsEl.setAttribute("class", "ui two column grid")
            ResultsEl.appendChild(resultColumnsEl);

            for(var i = 0; i < data.items.length; i++){
                const column = document.createElement("div");
                column.setAttribute("class", "column")
                
                
                const resultCardEl = document.createElement("div");
                resultCardEl.setAttribute("class", "ui fluid card");

                resultCardEl.textContent = data.items[i].volumeInfo.title;

             const bookImg = document.createElement("img");
                bookImg.setAttribute("src", data.items[i].volumeInfo.imageLinks.smallThumbnail);
                bookImg.setAttribute("alt", data.items[i].volumeInfo.description);
                resultCardEl.appendChild(bookImg);
                
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
                
                column.appendChild(resultCardEl);
                resultColumnsEl.appendChild(column);
            }
        })
}

searchBtnEl.addEventListener("click",function(){
    const userInput = searchEl.value;
    bookSearch(userInput);
    ResultsEl.innerHTML = "";
    const resultHeader = document.createElement("h1");
    resultHeader.textContent = "Search Results: " + userInput;
    ResultsEl.appendChild(resultHeader);

    const resultColumnsEl = document.createElement("div")
    resultColumnsEl.setAttribute("class", "ui two column grid")
    ResultsEl.appendChild(resultColumnsEl);
}) */

