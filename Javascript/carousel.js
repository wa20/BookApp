let swiper = new Swiper('.swiper-container', {
    slidesPerView: 6,
    spaceBetween: 30,
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

//set local storage with dummy books

let dummyBook = {

    title: "Harry Potter",
    authorFirstName: "JK",
    authorSurname: "Rowling",
    description: "Yer a wizard, Harry."
}

let libraryArray = [];
for (let i = 0; i < 20; i++) {

    libraryArray.push(dummyBook);

}
localStorage.setItem("libraryArray", JSON.stringify(libraryArray));




let bookCoverEls = document.querySelectorAll(".book-cover");
bookCoverEls.forEach(book => {
    book.addEventListener("click", function (event) {
        clickIndex = (Array.from(bookCoverEls).indexOf(event.target));
        console.log("Clicked on: " + clickIndex);

        // document.getElementById("modal-title").textContent = libraryArray[clickIndex].title;
        document.getElementById("modal-title").textContent = `Book no. ${clickIndex + 1}`;
        document.getElementById("modal-description").textContent = libraryArray[clickIndex].description;

        $('.ui.modal')
            .modal('show');

    })
    book.addEventListener("mouseover", function (event) {
        hoverIndex = (Array.from(bookCoverEls).indexOf(event.target));
        console.log("Hovered over: " + hoverIndex);

    })
});



