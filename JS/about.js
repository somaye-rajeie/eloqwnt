//  <!-- Initialize Expertise Swiper -->
let expertiseSwiper = new Swiper('.expertise-body', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 20,
    grabCursor: true,
    speed: 800,
    mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 1,
    },
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: "auto"
        },
        1200: {
            slidesPerView: "auto"
        }
    },
});

// حرکت اسکرول به پایین صفحه، اسلایدها به سمت چپ حرکت کنند
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const expertiseTrack = document.querySelector(".expertise-items");
    const expertiseSection = document.querySelector(".expertise");

    let mm = gsap.matchMedia();

    mm.add("(min-width:768px)", () => {
        const scrollAmount = () => -(expertiseTrack.scrollWidth - window.innerWidth + 120);
        gsap.to(expertiseTrack, {
            x: scrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: expertiseSection,
                start: "top top",
                end: () => `+=${expertiseTrack.scrollWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    });
    //  <!-- Initialize slide Expertise Swiper -->
    let expertistItemSwiper = new Swiper('.expertise-item__slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
        scrollbar: {
            el: '.expertise-item__slider .swiper-scrollbar',
            hide: false,
            draggable: false,
        },
    });

});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});