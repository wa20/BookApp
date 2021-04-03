let swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    // if we want to put page number or number of books:
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});