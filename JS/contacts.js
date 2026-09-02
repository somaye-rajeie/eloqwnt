// پیاده سازی آیتم های بنر به صورت اسلایدر
let swiper = new Swiper('.mySwiper', {
    direction: 'vertical',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    loop: true,
});

// اجرای book a time
const timeSlotsContainer = document.querySelector('#timeSlots')
const bookingDate = document.querySelector('#booking-date')
const datePicker = document.querySelector('#datePicker')
const selectionSummary = document.querySelector('#selectionSummary')
const timezoneSelect = document.querySelector('#timezone-select')
const bookingTimezone = document.querySelector('#booking-timezone')
let selectedDate = null;
let selectedTime = null;

const availableSlots = [
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM"
];

flatpickr(datePicker, {
    inline: true,
    minDate: "today",
    dateFormat: "Y-m-d",
    disable: [
        function (date) {
            return date.getDay() === 5;
        }
    ],

    onChange: function (selectedDates) {
        selectedDate = selectedDates[0];
        selectedTime = null;

        renderTimeSlots();
        updateBookingInfo();
    }
});

function renderTimeSlots() {
    timeSlotsContainer.innerHTML = "";

    availableSlots.forEach((time) => {
        const button = document.createElement("button")
        button.type = "button";
        button.className = "time-slot";
        button.textContent = time;

        button.addEventListener('click', () => {
            selectedTime = time;

            document.querySelectorAll('.time-slot').forEach((slot) => {
                slot.classList.remove('selected')
            });
            button.classList.add('selected');
            updateBookingInfo();
        });
        timeSlotsContainer.append(button);
    });
}
function updateBookingInfo() {
    if (!selectedDate) {
        bookingDate.textContent = "Select a Date";
        selectionSummary.textContent = "The date and time of the meeting have not yet been selected.";
        return;
    }
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    bookingDate.textContent = `${formattedDate}`;
    if (!selectedTime) {
        selectionSummary.textContent = `Date ${formattedDate} Selected.Now select a time.`;
        return;
    }
    selectionSummary.textContent = `30-minute Session:${formattedDate}-${selectedTime}`;
}
// گرفتن تمام تایم زون های رسمی دنیا از مرورگر
const allTimezones = Intl.supportedValuesOf("timeZone");

// تشخیص خودکار تایم زون فعلی کاربر
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// پر کردن داینامیک select با optionها
allTimezones.forEach(tz => {
    const option = document.createElement("option")
    option.value = tz;
    option.textContent = tz;

    if (tz === userTimezone) {
        option.selected = true;
    }
    timezoneSelect.appendChild(option);
})

// ذخیره وضعیت انخاب اولیه
let selectedTimezone = timezoneSelect.value;

// شنیدن رویداد تغییر تایم زون توسط کاربر
timezoneSelect.addEventListener('change', (event) => {
    selectedTimezone = event.target.value;
    bookingTimezone.textContent = selectedTimezone;
    updateBookingInfo();
});
