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

// modal iframe youTybe
const modals = {
    'vladimir-vavilov': 'https://www.youtube.com/embed/Oc6XOEOA6oI?si=lS9RAxCHD5TBxWee&autoplay=1',
    'andrey-nazarov': 'https://www.youtube.com/embed/538HPGAZiXg?si=J-t4bVlPrNWJYX7F&autoplay=1',
};

Object.entries(modals).forEach(function ([modalId, videoUrl]) {
    const modal = document.getElementById(modalId);
    const btn = document.querySelector(`[data-bs-target="#${modalId}"]`);

    // Создаем iframe по клику
    btn.addEventListener('click', function () {
        const iframeAdd = document.createElement('iframe');
        iframeAdd.width = "560";
        iframeAdd.height = "315";
        iframeAdd.src = modals[modalId];
        iframeAdd.allow = "autoplay";
        modal.querySelector('.video-youtube').appendChild(iframeAdd);
    });

    // Удаляем iframe при закрытии modal
    modal.addEventListener('hidden.bs.modal', function () {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.remove();
        }
    });
});

// youtube

const KEY = 'AIzaSyA3CRkcmQr4tWHX4Ned4IfQFXGSP3ADxYI';
const CHANNEL_ID = 'UCby9SHJ564ztNGcC3mUdRgA';

const RATINGS = [
    'PLC59yHF4Ixi9FQb8z8D5NlZOqwU1KkKaF',
    'PLC59yHF4Ixi9p_lgjh70kQe8uvBs1YIRk',
    'PLC59yHF4Ixi_MPQ1yzCe1WHc2S5RAv_IG',
    'PLC59yHF4Ixi8e0-Cvpaa6TFRArDxTgC48',
    'PLC59yHF4Ixi_Yfv9UWQGb8-m6zgFwXexu',
    'PLC59yHF4Ixi9gMk53jFHOgH-BQqt7K0dr',
    'PLC59yHF4Ixi8B3KQ5kXHXn1_7SZKU1lx1',
    'PLC59yHF4Ixi_smMw8dnB0FuDDww24Dna1',
    'PLC59yHF4Ixi8aVuCGbX4u0q-64PcQVLkh',
    'PLC59yHF4Ixi87I3ZEvs93lugULlTQbmHs',
];
const REVIEWS = [
    'PLC59yHF4Ixi9efJgoXfdzmNIFfXtX3DYe',
    'PLC59yHF4Ixi-UfCICDmahbE1RJq6r4CPo',
    'PLC59yHF4Ixi9ywF5P28zcSyqkICZuWz-Z',
    'PLC59yHF4Ixi835BiR9jUpDQ0m7OFRq18u',
    'PLC59yHF4Ixi8uhntBmBSOK0Z4Es3aSwpi',
    'PLC59yHF4Ixi-3cHoo1eq-h7DNrmPw9BUu',
];
const INTERVIEW = [
    'PLC59yHF4Ixi9l7m1IHVWj0GSlXkYnJHVN',
    'PLC59yHF4Ixi8VEOkHmc3CUe7aAjB78LEA',
    'PLC59yHF4Ixi8wJdQcDWkN3syg7sUgyqfC',
    'PLC59yHF4Ixi-Gzc7A-dKzJu5SQllZPDxo',
];

loadPlaylists(KEY, RATINGS, 'ratings');
loadPlaylists(KEY, REVIEWS, 'reviews');
loadPlaylists(KEY, INTERVIEW, 'interview');

loadShorts(KEY);

async function loadShorts(youtubeKey) {
    const $swiperContainer = document.querySelector(`.js-swiper-live .swiper-wrapper`);

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${KEY}&channelId=${CHANNEL_ID}&type=video&part=snippet&videoDuration=short&order=date&maxResults=20`);
    const playlists = await response.json();

    for (const el of playlists.items) {
        console.log(el);
        $swiperContainer.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide user-select-none">
                <a href="https://www.youtube.com/shorts/${el.id.videoId}" target="_blank" class="d-flex flex-column short js-short">
                    <img src="https://i.ytimg.com/vi/${el.id.videoId}/oar2.jpg" width="210" height="370">
                    <span>${el.snippet.title}</span>
                </a>
            </div>
        `);
    }

    const swiperShorts = new Swiper(`.js-swiper-live`, {
        // Optional parameters
        direction: 'horizontal',
        // Navigation arrows
        navigation: {
            nextEl: `.js-swiper-live-next`,
            prevEl: `.js-swiper-live-prev`,
        },
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1.5,
            },
            767: {
                slidesPerView: 4.5,
            },
            1024: {
                slidesPerView: 6.5,
            }
        }
    });
}

async function loadPlaylists(youtubeKey, plArray, prefix) {
    const $swiperContainer = document.querySelector(`.js-swiper-${prefix} .swiper-wrapper`);

    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${youtubeKey}&part=id,snippet,contentDetails&fields=items(id,contentDetails,snippet(title,channelId,channelTitle))&id=${plArray.join()}`);
    const playlists = await response.json();

    for (const el of playlists.items) {
        const playlistItemResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${youtubeKey}&part=id,snippet,contentDetails&playlistId=${el.id}`);
        const playlistItem = await playlistItemResponse.json();
        $swiperContainer.insertAdjacentHTML('afterbegin', `
            <div class="swiper-slide user-select-none">
                <a href="https://www.youtube.com/playlist?list=${el.id}" target="_blank">
                    <div class="slider-item">
                        <img class="w-100 img-position" src="${playlistItem.items[0].snippet.thumbnails.maxres.url}">
                        <div class="slider-item-quantity">${el.contentDetails.itemCount} видео</div>
                    </div>
                    <span>${el.snippet.title}</span>
                </a>
            </div>
        `);
    }

    const swiperReviews = new Swiper(`.js-swiper-${prefix}`, {
        // Optional parameters
        direction: 'horizontal',
        // Navigation arrows
        navigation: {
            nextEl: `.js-swiper-${prefix}-next`,
            prevEl: `.js-swiper-${prefix}-prev`,
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
}

