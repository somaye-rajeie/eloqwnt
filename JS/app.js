const questionsList = document.querySelectorAll(".questions-cases__item");
const contactUsFormSelectionsListItems = document.querySelectorAll(
  ".contact-us-form-selections-list__item",
);

// Play/Pause About us Video

document.addEventListener("DOMContentLoaded", () => {
  const aboutusVideo = document.querySelector(".about-us__video");
  const toggleBtn = document.querySelector("#video-toggle-btn");

  if (aboutusVideo && toggleBtn) {
    const togglePlay = () => {
      if (aboutusVideo.paused) {
        aboutusVideo.play();
        toggleBtn.classList.add("is-playing");
      } else {
        aboutusVideo.pause();
        toggleBtn.classList.remove("is-playing");
      }
    };
    toggleBtn.addEventListener("click", togglePlay);
    aboutusVideo.addEventListener("click", togglePlay);
  }
});

// پیاده سازی ظاهر یا بسته شدن دراپ داون مربوط به هر سوال

questionsList.forEach((question) => {
  question.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = question.classList.contains("questions-cases__item--show");

    const questionTitle = question.querySelector(".questions-cases__link-text");

    console.log(question);

    questionsList.forEach((item) => {
      item.classList.remove("questions-cases__item--show");
      const dropdown = item.querySelector(".questions-cases__item-dropdown");
      if (dropdown) {
        dropdown.style.maxHeight = null;
      }
    });
    if (!isOpen) {
      question.classList.add("questions-cases__item--show");
      const dropdown = question.querySelector(
        ".questions-cases__item-dropdown",
      );
      if (dropdown) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
      }
    }
  });
});

// پیاده سازی اسلایدهای Testimonials

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  loopedSlides: 4,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    clickable: true,
  },
  spaceBetween: 20,
  breakpoints: {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

// پیاده سازی انتخاب لیبل های فرم contact us
contactUsFormSelectionsListItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("contact-us-form-selections-list__item--selected");
  });
});

// فعال سازی انیمیشن
document.addEventListener("DOMContentLoaded", () => {
  // تنظیمات ناظر اسکرول
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.15,
  };
  // تعریف عملکرد ناظر
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // انتخاب تمام المان هایی که کلاس reveal دارند و شروع نظارت روی انها
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => revealObserver.observe(el));
});

// اجرای فیکس کردن هدر زمانی که کاربر به سمت بالا اسکرول میکند
const header = document.querySelector(".header-nav");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else {
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }

  if (currentScrollY <= 0) {
    header.classList.remove("scroll-up", "scroll-down");
  }

  lastScrollY = currentScrollY;
});

// Menu Modal appearing
const btnMenu = document.querySelector("#btn-menu");
const closeBtnMenu = document.querySelector("#close-btn-menu");
const modalMenuItems = document.querySelectorAll(".modal-menu-items__item");
const modalMenu = document.querySelector("#modal-menu");
btnMenu.addEventListener("click", () => {
  modalMenu.classList.add("modal-menu--show");
  document.body.classList.add("modal-menu--show");
});
closeBtnMenu.addEventListener("click", () => {
  modalMenu.classList.remove("modal-menu--show");
  document.body.classList.remove("modal-menu--show");
});
modalMenuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    // چک کردن عرض پنجره مرورگر
    const isMobile = window.innerWidth < 768;

    const dropdown = item.querySelector(".modal-menu-item-dropdown");
    const modalMenuIcon = item.querySelector(".modal-menu-items__link-icon");
    // اگر موبایل بود و این آیتم زیرمنو داشت
    if (isMobile && dropdown) {
      // جلوگیری از رفتن به لینک در حالت موبایل وقتی زیرنو دارد
      event.preventDefault();

      const isOpen = dropdown.classList.contains(
        "modal-menu-item-dropdown--show",
      );

      // بستن بقیه زیر منوها
      document.querySelectorAll(".modal-menu-item-dropdown").forEach((menu) => {
        menu.classList.remove("modal-menu-item-dropdown--show");
      });
      // بستن بقیه آیکن ها
      document
        .querySelectorAll(".modal-menu-items__link-icon")
        .forEach((icon) => {
          icon.style.transform = "rotate(0deg)";
        });
      // باز یا بسته کردن زیرمنوی فعلی
      if (isOpen) {
        dropdown.classList.remove("modal-menu-item-dropdown--show");
        modalMenuIcon.style.transform = "rotate(0deg)";
      } else {
        dropdown.classList.add("modal-menu-item-dropdown--show");
        modalMenuIcon.style.transform = "rotate(180deg)";
      }
    }

    //  در حالت دسکتاپ یا اگر زیرمنو وجود نداشت، کد اجرا نمی شود و لینک کار می کند
  });
});
