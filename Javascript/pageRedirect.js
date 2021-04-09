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
    var userInput = searchEl.value;
    localStorage.setItem("input", JSON.stringify(userInput))
    
    var dropdownEL = document.getElementById("dropdown");
    var selectedOption = dropdownEL.options[dropdownEL.selectedIndex].value;
    localStorage.setItem("dropdown", JSON.stringify(selectedOption))
    console.log(typeof selectedOption);
    if (userInput) {
        pageRedirect(userInput);
    } else {
        alert("Please enter a book");
        
    }
};

var formSubmitHandlerNav = function() {
        var userInput = searchNavEl.value;
        localStorage.setItem("input", JSON.stringify(userInput))

        var dropdownNavEL = document.getElementById("dropdownNav");
        var selectedOption = dropdownNavEL.options[dropdownNavEL.selectedIndex].value;
        localStorage.setItem("dropdown", JSON.stringify(selectedOption))
        console.log(typeof selectedOption);
        if (userInput) {
            pageRedirectNav(userInput);
        } else {
            alert("Please enter a book");
        }
    };

function pageRedirect() {
    redirectEl.setAttribute('href', './results.html');
}

function pageRedirectNav() {
    redirectNavEl.setAttribute('href', './results.html');
}


searchBtnEl.addEventListener("click", function(){
    formSubmitHandler();
    
});

searchBtnNavEl.addEventListener("click", function(){
    formSubmitHandlerNav();
})


