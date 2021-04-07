/* Carousel Styling */

let swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    // slidesPerGroup: 6,
    // loop: true,
    // loopFillGroupWithBlank: true,
    // freeMode: true,
    // if we want to put page number or number of books:
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // breakpoints: {

    //     0: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //     },
    //     768: {
    //         slidesPerView: 4,
    //         spaceBetween: 40,
    //     },
    //     1224: {
    //         slidesPerView: 6,
    //         spaceBetween: 50,
    //     },
    //     1400: {

    //         slidesPerView: 8,
    //         spaceBetween: 50,
    //     }
    // }
});

/* End of Carousel Styling */


/* Render Main Content */

let libraryArray = JSON.parse(localStorage.getItem("libraryBookInfo"));
let libraryArrayLength = libraryArray.length;
let wishlistArray = JSON.parse(localStorage.getItem("wishlistBookInfo"));
let wishlistArrayLength = wishlistArray.length;
let swaplistArray = JSON.parse(localStorage.getItem("swaplistBookInfo"));
let friendslistArray = JSON.parse(localStorage.getItem("friendslistBookInfo"));
let friendslistArrayLength = friendslistArray.length;


// Render library
//clear elements first for when remove button is triggered. 

if ((libraryArray !== null) && libraryArrayLength > 0) {

    for (let i = 0; i < libraryArrayLength; i++) {

        let bookCover = document.createElement("img");
        try {
            bookCover.src = libraryArray[i].imageLinks.thumbnail;
        }
        catch {
            bookCover.src = "./Assets/no-book-cover.png";
            //need to create div and use the book's title instead of placeholder image
        }
        bookCover.classList.add("library-cover");

        let bookCoverContainer = document.createElement("div");
        bookCoverContainer.classList.add("swiper-slide");

        bookCoverContainer.appendChild(bookCover);
        document.getElementById("library-book-cover").appendChild(bookCoverContainer);
    }
    console.log(document.getElementById("library-book-cover").children);
}
else {

    //library is empty
}


// Render wishlist
if (wishlistArray !== null && wishlistArrayLength > 0) {


    for (let i = 0; i < wishlistArrayLength; i++) {

        let bookCover = document.createElement("img");
        try {
            bookCover.src = wishlistArray[i].imageLinks.thumbnail;
        }
        catch {
            bookCover.src = "./Assets/no-book-cover.png";
        }
        bookCover.classList.add("wishlist-cover");

        let bookCoverContainer = document.createElement("div");
        bookCoverContainer.classList.add("swiper-slide");

        bookCoverContainer.appendChild(bookCover);
        document.getElementById("wishlist-book-cover").appendChild(bookCoverContainer);
    }
}

// Render friendslist
if (friendslistArray !== null && friendslistArrayLength > 0) {


    for (let i = 0; i < friendslistArrayLength; i++) {

        let bookCover = document.createElement("img");
        try {
            bookCover.src = friendslistArray[i].imageLinks.thumbnail;
        }
        catch {
            bookCover.src = "./Assets/no-book-cover.png";
        }
        bookCover.classList.add("friend1-list-cover");

        let bookCoverContainer = document.createElement("div");
        bookCoverContainer.classList.add("swiper-slide");

        bookCoverContainer.appendChild(bookCover);
        document.getElementById("friend1-book-cover").appendChild(bookCoverContainer);
    }
}


/* Modals */

//Library Modal
let libraryBookCoverEls = document.querySelectorAll(".library-cover");
let wishlistBookCoverEls = document.querySelectorAll(".wishlist-cover");

libraryBookCoverEls.forEach(book => {
    book.addEventListener("click", function (event) {
        clickIndex = (Array.from(libraryBookCoverEls).indexOf(event.target));
        console.log("Clicked on: " + clickIndex);

        // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
        document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
        document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${libraryArray[clickIndex].authors}
        <h3>Description:</h3>${libraryArray[clickIndex].description}
        `;

        $('.ui.modal')
            .modal('show');

        document.getElementById("modal-remove-btn").onclick = function () {

            libraryArray.splice(clickIndex, 1)
            localStorage.setItem("libraryBookInfo", JSON.stringify(libraryArray));
            console.log("book removed at index " + clickIndex);
            //close modal to prevent remove button being clicked again
            let element = document.getElementById("library-book-cover");
            element.removeChild(element.children[clickIndex]);
            libraryBookCoverEls = document.querySelectorAll(".library-cover");
            //clickIndex--;
        }

    })
    book.addEventListener("mouseover", function (event) {
        hoverIndex = (Array.from(libraryBookCoverEls).indexOf(event.target));
        console.log("Hovered over: " + hoverIndex);

    })
});


//Wishlist Modal
wishlistBookCoverEls.forEach(book => {
    book.addEventListener("click", function (event) {
        clickIndex = (Array.from(wishlistBookCoverEls).indexOf(event.target));
        console.log("Clicked on: " + clickIndex);

        // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
        document.getElementById("modal-title").textContent = wishlistArray[clickIndex].title;
        document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${wishlistArray[clickIndex].authors}
        <h3>Description:</h3>${wishlistArray[clickIndex].description}
        `;

        $('.ui.modal')
            .modal('show');

        document.getElementById("modal-remove-btn").onclick = function () {

            wishlistArray.splice(clickIndex, 1)
            localStorage.setItem("wishlistBookInfo", JSON.stringify(wishlistArray));
            console.log("book removed at index " + clickIndex);
            //close modal to prevent remove button being clicked again;
            let element = document.getElementById("wishlist-book-cover");
            element.removeChild(element.children[clickIndex]);
            wishlistBookCoverEls = document.querySelectorAll(".wishlist-cover");
        }
    })

    book.addEventListener("mouseover", function (event) {
        hoverIndex = (Array.from(wishlistBookCoverEls).indexOf(event.target));
        console.log("Hovered over: " + hoverIndex);

    })
});



function removeElement(index) {


}



//wrapping in functions stops the click and hover event listeners from working
// renderLibrary();
// renderWishlist();

//use js to add Id to the modal that has been triggered to differentiate between library/wishlist etc.