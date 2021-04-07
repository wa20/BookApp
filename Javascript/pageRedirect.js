const searchBtnEl = document.getElementById("search-btn");
const searchEl = document.getElementById("search-bar");
const redirectEl = document.getElementById("redirectEl"); 

const searchBtnNavEl = document.getElementById("search-btn-nav");
const searchNavEl = document.getElementById("search-bar-nav");
const redirectNavEl = document.getElementById("redirectNavEl"); 

/* console.log(searchBtnEl);
console.log(searchEl); */
const resultsUrl = "./results.html";
const APIKey = "AIzaSyC2xEWKYLtmXP4EC1KSovcnRSpX9h3NSTs";

var formSubmitHandler = function() {
/*     event.preventDefault(); */
    var userInput = searchEl.value;
    localStorage.setItem("input", JSON.stringify(userInput))
    if (userInput) {
        bookSearch(userInput);
    } else {
        alert("Please enter a book");
    }
};

var formSubmitHandlerNav = function() {
    /*     event.preventDefault(); */
        var userInput = searchNavEl.value;
        localStorage.setItem("input", JSON.stringify(userInput))
        if (userInput) {
            bookSearchNav(userInput);
        } else {
            alert("Please enter a book");
        }
    };

var bookSearch = function(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=15" + "&key=" + APIKey;
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

var bookSearchNav = function(searchedBook) {
    var requestUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchedBook + "&maxResults=15" + "&key=" + APIKey;
    fetch(requestUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    pageRedirectNav();    
                });
            } else {
                alert('Error: ' + response.statusText)
            }
        });
};

function pageRedirect() {
    redirectEl.setAttribute('href', './results.html');
    searchBtnEl.innerHTML = "Are you sure?";
    console.log(searchBtnEl);   
    console.log(redirectEl);  
}

function pageRedirectNav() {
    redirectNavEl.setAttribute('href', './results.html');
    console.log(searchBtnNavEl);   
    console.log(redirectNavEl);  
}


searchBtnEl.addEventListener("click", function(){
    console.log("hi");
    formSubmitHandler();
});

searchBtnNavEl.addEventListener("click", function(){
    console.log("hi");
    searchBtnNavEl.classList.remove("search");
    searchBtnNavEl.setAttribute("class", "arrow right icon");
    formSubmitHandlerNav();
})


