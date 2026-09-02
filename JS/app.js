const questionsList = document.querySelectorAll('.questions-cases__item')
const contactUsFormSelectionsListItems = document.querySelectorAll('.contact-us-form-selections-list__item')

// Play/Pause About us Video

document.addEventListener('DOMContentLoaded', () => {
    const aboutusVideo = document.querySelector('.about-us__video')
    const toggleBtn = document.querySelector('#video-toggle-btn')

    if (aboutusVideo && toggleBtn) {
        const togglePlay = () => {
            if (aboutusVideo.paused) {
                aboutusVideo.play();
                toggleBtn.classList.add('is-playing')
            } else {
                aboutusVideo.pause()
                toggleBtn.classList.remove('is-playing')
            }
        }
        toggleBtn.addEventListener('click', togglePlay);
        aboutusVideo.addEventListener('click', togglePlay);
    }

})

// پیاده سازی ظاهر یا بسته شدن دراپ داون مربوط به هر سوال

questionsList.forEach(question => {
    question.addEventListener('click', (event) => {
        event.preventDefault();
        const isOpen = question.classList.contains('questions-cases__item--show')


        const questionTitle = question.querySelector('.questions-cases__link-text')


        console.log(question);

        questionsList.forEach(item => {
            item.classList.remove('questions-cases__item--show')
            const dropdown = item.querySelector('.questions-cases__item-dropdown');
            if (dropdown) {
                dropdown.style.maxHeight = null;
            }
        })
        if (!isOpen) {
            question.classList.add('questions-cases__item--show')
            const dropdown = question.querySelector('.questions-cases__item-dropdown')
            if (dropdown) {
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            }
        }

    })
})

// پیاده سازی اسلایدهای Testimonials

const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
    loopedSlides: 4,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        clickable: true,
    },
    spaceBetween: 20,
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4
        }
    }
});

// پیاده سازی انتخاب لیبل های فرم contact us
contactUsFormSelectionsListItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log(item);
        item.classList.toggle('contact-us-form-selections-list__item--selected')
    })
})