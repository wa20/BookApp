const searchBtnEl = document.getElementById("search-btn");
const searchEl = document.getElementById("search-bar");
const redirectEl = document.getElementById("redirectEl");

console.log(searchBtnEl);
/* console.log(searchEl); */
const resultsUrl = "./results.html";
const APIKey = "AIzaSyAV4WnTD1SBTUokHDh8EUM4TtrOMs81Dig";

var formSubmitHandler = function(event) {
/*     event.preventDefault(); */
    var userInput = searchEl.value;
    localStorage.setItem("input", JSON.stringify(userInput))
    if (userInput) {
        bookSearch(userInput);
    } else {
        alert("Please enter a book");
    }
};

var bookSearch = function(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=40" + "&key=" + APIKey;
    fetch(requestUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    pageRedirect();    
                });
            } else {
                alert('Error: ' + response.statusText)
            }
        });
};

function bookSearch(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=40" + "&key=" + APIKey;
    fetch(requestUrl)
        .then(function(response){
            
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.items);
            pageRedirect();
        })    
}

function pageRedirect() {
    redirectEl.setAttribute('href', './results.html');
    searchBtnEl.innerHTML = "Are you sure?";
    console.log(searchBtnEl);   
    console.log(redirectEl);  
}

searchBtnEl.addEventListener("click", function(){
    console.log("hi");
    formSubmitHandler();
});


