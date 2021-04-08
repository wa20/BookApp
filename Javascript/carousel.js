/* Carousel Styling */

let swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    // spaceBetween: 40,

});

/* End of Carousel Styling */


/* Render Main Content */

//check to make sure local storage exists, if not (e.g. on first visit to the site) assign empty value to the arrays
let libraryArray = JSON.parse(localStorage.getItem("libraryBookInfo"));
if (libraryArray === null) libraryArray = [];
libraryArrayLength = libraryArray.length;

let wishlistArray = JSON.parse(localStorage.getItem("wishlistBookInfo"));
if (wishlistArray === null) wishlistArray = [];
wishlistArrayLength = wishlistArray.length;

let swaplistArray = JSON.parse(localStorage.getItem("swaplistBookInfo"));
if (swaplistArray === null) swaplistArray = [];
swaplistArrayLength = swaplistArray.length;


// Render library
if (libraryArrayLength > 0) {

    for (let i = 0; i < libraryArrayLength; i++) {
        document.getElementById("library-book-cover").appendChild(renderLibrary(i));
    }
}
else {
    //library is empty
}

function renderLibrary(i) {

    let bookCover;
    let thumbnail;
    let icon;
    try {
        thumbnail = libraryArray[i].imageLinks.thumbnail;
        /* Get book covers directly from Google book store at higher resolution */
        // let param = new URLSearchParams(libraryArray[i].canonicalVolumeLink);
        // let id = param.get("id");
        // console.log("Id is: " + id);
        bookCover = document.createElement("img");
        bookCover.src = thumbnail;
    }
    catch {
        bookCover = document.createElement("div");
        bookCover.textContent = libraryArray[i].title;
        bookCover.classList.add("no-image");
        icon = document.createElement("i");
        icon.setAttribute("class", "images icon");
        bookCover.appendChild(icon);
    }

    bookCover.classList.add("library-cover");

    let bookCoverContainer = document.createElement("div");
    bookCoverContainer.classList.add("swiper-slide");

    bookCoverContainer.appendChild(bookCover);
    return (bookCoverContainer);
    // document.getElementById("library-book-cover").appendChild(bookCoverContainer);

}


// Render wishlist
if (wishlistArrayLength > 0) {
    for (let i = 0; i < wishlistArrayLength; i++) {
        document.getElementById("wishlist-book-cover").appendChild(renderWishlist(i));
    }
}
else {
    //wishlist is empty
}

function renderWishlist(i) {

    let bookCover;
    let thumbnail;
    let icon;
    try {
        thumbnail = wishlistArray[i].imageLinks.thumbnail;
        bookCover = document.createElement("img");
        bookCover.src = thumbnail;
    }
    catch {
        bookCover = document.createElement("div");
        bookCover.textContent = wishlistArray[i].title;
        bookCover.classList.add("no-image");
        icon = document.createElement("i");
        icon.setAttribute("class", "images icon");
        bookCover.appendChild(icon);
    }

    bookCover.classList.add("wishlist-cover");

    let bookCoverContainer = document.createElement("div");
    bookCoverContainer.classList.add("swiper-slide");

    bookCoverContainer.appendChild(bookCover);
    return bookCoverContainer

}

// Render swaplist
if (swaplistArrayLength > 0) {


    for (let i = 0; i < swaplistArrayLength; i++) {
        // renderSwaplist(i);
        document.getElementById("swaplist-book-cover").appendChild(renderSwaplist(i));
    }
}
else {
    //swaplist is empty
}

function renderSwaplist(i) {

    let bookCover;
    let thumbnail;
    let icon;
    try {
        thumbnail = swaplistArray[i].imageLinks.thumbnail;
        bookCover = document.createElement("img");
        bookCover.src = thumbnail;
    }
    catch {
        bookCover = document.createElement("div");
        bookCover.textContent = swaplistArray[i].title;
        bookCover.classList.add("no-image");
        icon = document.createElement("i");
        icon.setAttribute("class", "images icon");
        bookCover.appendChild(icon);
    }

    bookCover.classList.add("swaplist-cover");

    let bookCoverContainer = document.createElement("div");
    bookCoverContainer.classList.add("swiper-slide");

    bookCoverContainer.appendChild(bookCover);
    return bookCoverContainer;
    // document.getElementById("swaplist-book-cover").appendChild(bookCoverContainer);

}



/* Modals */

//Library Modal
let libraryBookCoverEls = document.querySelectorAll(".library-cover");
let wishlistBookCoverEls = document.querySelectorAll(".wishlist-cover");
let swaplistBookCoverEls = document.querySelectorAll(".swaplist-cover");

function updateQueries() {
    libraryBookCoverEls = document.querySelectorAll(".library-cover");
    wishlistBookCoverEls = document.querySelectorAll(".wishlist-cover");
    swaplistBookCoverEls = document.querySelectorAll(".swaplist-cover");
}

function updateModalLists() {
    updateLibraryModal();
    updateWishlistModal();
    updateSwaplistModal();


}

let clickIndex;
let hoverIndex;


updateModalLists();

function updateLibraryModal() {
    libraryBookCoverEls.forEach(book => {
        book.addEventListener("click", function (event) {
            let remove = document.getElementById("modal-remove-btn");
            let swap = document.getElementById("modal-swap-btn");
            clickIndex = (Array.from(libraryBookCoverEls).indexOf(event.target));
            console.log("Clicked on: " + clickIndex);

            // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
            remove.textContent = "Delete from library";
            swap.style.display = "";
            swap.textContent = "Add to swaplist";
            document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
            document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${libraryArray[clickIndex].authors}
        <h3>Description:</h3>${libraryArray[clickIndex].description}
        `;

            $('.ui.modal')
                .modal('show');

            remove.onclick = function () {

                libraryArray.splice(clickIndex, 1)
                localStorage.setItem("libraryBookInfo", JSON.stringify(libraryArray));
                console.log("Book removed at index " + clickIndex);
                let element = document.getElementById("library-book-cover");
                element.removeChild(element.children[clickIndex]);
                updateQueries();
                updateModalLists();

            }
            swap.onclick = function () {
                console.log("clicked swap button in library");
                swaplistArray.unshift(libraryArray[clickIndex]);
                localStorage.setItem("swaplistBookInfo", JSON.stringify(swaplistArray));
                document.getElementById("swaplist-book-cover").prepend(renderSwaplist(0));
                updateQueries();
                updateModalLists();
            }
        })
        book.addEventListener("mouseover", function (event) {
            hoverIndex = (Array.from(libraryBookCoverEls).indexOf(event.target));
            console.log("Hovered over: " + hoverIndex);

        })
    })
};


//Wishlist Modal
function updateWishlistModal() {
    wishlistBookCoverEls.forEach(book => {

        book.addEventListener("click", function (event) {
            let remove = document.getElementById("modal-remove-btn");
            let swap = document.getElementById("modal-swap-btn");
            clickIndex = (Array.from(wishlistBookCoverEls).indexOf(event.target));
            console.log("Clicked on: " + clickIndex);

            // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
            remove.textContent = "Delete from wishlist";
            swap.style.display = "";
            swap.textContent = "Move to library";
            document.getElementById("modal-title").textContent = wishlistArray[clickIndex].title;
            document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${wishlistArray[clickIndex].authors}
        <h3>Description:</h3>${wishlistArray[clickIndex].description}
        `;


            $('.ui.modal')
                .modal('show');

            remove.onclick = function () {

                wishlistArray.splice(clickIndex, 1)
                localStorage.setItem("wishlistBookInfo", JSON.stringify(wishlistArray));
                console.log("book removed at index " + clickIndex);
                //close modal to prevent remove button being clicked again;
                let element = document.getElementById("wishlist-book-cover");
                element.removeChild(element.children[clickIndex]);
                updateQueries();
                updateModalLists();
            }
            swap.onclick = function () {
                console.log("clicked swap button in wishlist");
                libraryArray.unshift(wishlistArray[clickIndex]);
                localStorage.setItem("libraryBookInfo", JSON.stringify(libraryArray));
                document.getElementById("library-book-cover").prepend(renderLibrary(0));

                ////// This is just the same code as for remove.onClick --> make it into a separate callable function?
                wishlistArray.splice(clickIndex, 1)
                localStorage.setItem("wishlistBookInfo", JSON.stringify(wishlistArray));
                console.log("book removed at index " + clickIndex);
                //close modal to prevent remove button being clicked again;
                let element = document.getElementById("wishlist-book-cover");
                element.removeChild(element.children[clickIndex]);
                /////////
                updateQueries();
                updateModalLists();
                //////
            }
        })

        book.addEventListener("mouseover", function (event) {
            hoverIndex = (Array.from(wishlistBookCoverEls).indexOf(event.target));
            console.log("Hovered over: " + hoverIndex);

        })

    })
};


//Swaplist Modal
function updateSwaplistModal() {
    swaplistBookCoverEls.forEach(book => {
        book.addEventListener("click", function (event) {
            let remove = document.getElementById("modal-remove-btn");
            let swap = document.getElementById("modal-swap-btn");
            clickIndex = (Array.from(swaplistBookCoverEls).indexOf(event.target));
            console.log("Clicked on: " + clickIndex);

            // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
            remove.textContent = "Delete from swaplist";
            swap.style.display = "none";
            document.getElementById("modal-title").textContent = swaplistArray[clickIndex].title;
            document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${swaplistArray[clickIndex].authors}
        <h3>Description:</h3>${swaplistArray[clickIndex].description}
        `;

            $('.ui.modal')
                .modal('show');

            remove.onclick = function () {

                swaplistArray.splice(clickIndex, 1)
                localStorage.setItem("swaplistBookInfo", JSON.stringify(swaplistArray));
                console.log("book removed at index " + clickIndex);
                //close modal to prevent remove button being clicked again;
                let element = document.getElementById("swaplist-book-cover");
                element.removeChild(element.children[clickIndex]);
                updateQueries();
                updateModalLists();
            }
        })

        book.addEventListener("mouseover", function (event) {
            hoverIndex = (Array.from(swaplistBookCoverEls).indexOf(event.target));
            console.log("Hovered over: " + hoverIndex);

        })
    })
};


/* Modals for // Add to Swaplist // Add to library */



//wrapping in functions stops the click and hover event listeners from working
// renderLibrary();
// renderWishlist();

//use js to add Id to the modal that has been triggered to differentiate between library/wishlist etc.