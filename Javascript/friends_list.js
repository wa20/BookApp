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

let friendslistArray = JSON.parse(localStorage.getItem("friendslistBookInfo"));
let friendslistArrayLength = friendslistArray.length;

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

//Friendslist Modal
friendslistBookCoverEls.forEach(book => {
    book.addEventListener("click", function (event) {
        clickIndex = (Array.from(friendslistBookCoverEls).indexOf(event.target));
        console.log("Clicked on: " + clickIndex);

        // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
        document.getElementById("modal-title").textContent = friendslistArray[clickIndex].title;
        document.getElementById("modal-description").innerHTML = `
        <h3>Author:</h3>${friendslistArray[clickIndex].authors}
        <h3>Description:</h3>${friendslistArray[clickIndex].description}
        `;

        $('.ui.modal')
            .modal('show');

        document.getElementById("modal-remove-btn").onclick = function () {

            friendslistArray.splice(clickIndex, 1)
            localStorage.setItem("friendslistBookInfo", JSON.stringify(friendslistArray));
            console.log("book removed at index " + clickIndex);
            //close modal to prevent remove button being clicked again;
            let element = document.getElementById("friendslist-book-cover");
            element.removeChild(element.children[clickIndex]);
            friendslistBookCoverEls = document.querySelectorAll(".friend1-list-cover", ".friend2-list-cover");
        }
    })

    book.addEventListener("mouseover", function (event) {
        hoverIndex = (Array.from(friendslistBookCoverEls).indexOf(event.target));
        console.log("Hovered over: " + hoverIndex);

    })
});



function removeElement(index) {


}