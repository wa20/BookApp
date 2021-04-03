const searchEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");

const APIKey = "AIzaSyAV4WnTD1SBTUokHDh8EUM4TtrOMs81Dig";

function bookSearch(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&key=" + APIKey;

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
}

searchBtnEl.addEventListener("click",function(){
    const userInput = searchEl.value;
    bookSearch(userInput);
})