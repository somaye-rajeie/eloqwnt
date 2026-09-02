// اجرای فیکس کردن هدر زمانی که کاربر به سمت بالا اسکرول میکند
const header = document.querySelector('.header-nav')
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else {
        header.classList.add('scroll-up');
        header.classList.remove('scroll-down');
    }

    if (currentScrollY <= 0) {
        header.classList.remove('scroll-up', 'scroll-down')
    }

    lastScrollY = currentScrollY;
});

// فعال سازی انیمیشن
document.addEventListener('DOMContentLoaded', () => {
    // تنظیمات ناظر اسکرول
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.15
    };
    // تعریف عملکرد ناظر
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // انتخاب تمام المان هایی که کلاس reveal دارند و شروع نظارت روی انها
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
})

// Menu Modal appearing
const btnMenu = document.querySelector('#btn-menu')
const closeBtnMenu = document.querySelector('#close-btn-menu')
const modalMenuItems = document.querySelectorAll('.modal-menu-items__item')
const modalMenu = document.querySelector('#modal-menu')
btnMenu.addEventListener('click', () => {
    modalMenu.classList.add('modal-menu--show')
    document.body.classList.add('modal-menu--show')
})
closeBtnMenu.addEventListener('click', () => {
    modalMenu.classList.remove('modal-menu--show')
    document.body.classList.remove('modal-menu--show')
})
modalMenuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // چک کردن عرض پنجره مرورگر
        const isMobile = window.innerWidth < 768;

        const dropdown = item.querySelector('.modal-menu-item-dropdown')
        const modalMenuIcon = item.querySelector('.modal-menu-items__link-icon')
        // اگر موبایل بود و این آیتم زیرمنو داشت
        if (isMobile && dropdown) {
            // جلوگیری از رفتن به لینک در حالت موبایل وقتی زیرنو دارد
            event.preventDefault();

            const isOpen = dropdown.classList.contains('modal-menu-item-dropdown--show')

            // بستن بقیه زیر منوها
            document.querySelectorAll('.modal-menu-item-dropdown').forEach((menu) => {
                menu.classList.remove('modal-menu-item-dropdown--show')
            })
            // بستن بقیه آیکن ها
            document.querySelectorAll('.modal-menu-items__link-icon').forEach((icon) => {
                icon.style.transform = 'rotate(0deg)'
            })
            // باز یا بسته کردن زیرمنوی فعلی
            if (isOpen) {
                dropdown.classList.remove('modal-menu-item-dropdown--show')
                modalMenuIcon.style.transform = 'rotate(0deg)';
            } else {
                dropdown.classList.add('modal-menu-item-dropdown--show')
                modalMenuIcon.style.transform = 'rotate(180deg)';
            }
        }

        //  در حالت دسکتاپ یا اگر زیرمنو وجود نداشت، کد اجرا نمی شود و لینک کار می کند

    })
})

// پیاده سازی انتخاب لیبل های فرم contact us
const contactUsFormSelectionsListItems = document.querySelectorAll('.contact-us-form-selections-list__item')
contactUsFormSelectionsListItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log(item);
        item.classList.toggle('contact-us-form-selections-list__item--selected')
    })
})
