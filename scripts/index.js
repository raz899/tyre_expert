const $menu = document.querySelector('.burger__body');
const $menuBtn = document.querySelector('.js-burger__icon');
const body = document.body;

$menuBtn.addEventListener('click', function (e) {
    $menu.classList.toggle('active');
    $menuBtn.classList.toggle('active');
    body.classList.toggle('lock');
});

$menu.addEventListener('click', function (e) {
    if (!e.target.classList.contains('burger__list')) {
        if (e.target.classList.contains('burger__body')) {
            $menu.classList.remove('active');
            $menuBtn.classList.remove('active');
            body.classList.remove('lock');
        } else {
            $menu.classList.remove('active');
            $menuBtn.classList.remove('active');
            body.classList.remove('lock');
        }
    }
});


// Рейтинг
const swiperRatings = new Swiper('.js-swiper-ratings', {
    // Optional parameters
    direction: 'horizontal',
    // Navigation arrows
    navigation: {
        nextEl: '.js-swiper-ratings-next',
        prevEl: '.js-swiper-ratings-prev',
    },
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {

        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },

        767: {
            slidesPerView: 2.5,
            spaceBetween: 30
        },

        1024: {
            slidesPerView: 2.5,
            spaceBetween: 80
        }
    }
});
// Обзоры
const swiperReviews = new Swiper('.js-swiper-reviews', {
    // Optional parameters
    direction: 'horizontal',
    // Navigation arrows
    navigation: {
        nextEl: '.js-swiper-reviews-next',
        prevEl: '.js-swiper-reviews-prev',
    },
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        767: {
            slidesPerView: 2.5,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 80
        }
    }
});

// Обзоры
const swiperInterview = new Swiper('.js-swiper-interview', {
    // Optional parameters
    direction: 'horizontal',
    // Navigation arrows
    navigation: {
        nextEl: '.js-swiper-interview-next',
        prevEl: '.js-swiper-interview-prev',
    },
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
        320: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        767: {
            slidesPerView: 2.5,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 80
        }
    }
});
//  параллакс эффект для фото
document.addEventListener('scroll', function (e) {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 1025) {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.content .img-position');
        const speed = 100 / document.body.offsetHeight; // Скорость параллакс эффекта

        parallaxElements.forEach(function (el) {
            const position = scrolled * speed;
            el.style.transform = 'translateY(' + position + 'px)';
        });
    }
});

