// Booking System JavaScript
let currentStep = 1;
let currentMonth = new Date();
let selectedDate = null;

document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    initFormSubmit();
});

// Step Navigation
function nextStep() {
    if (validateStep(currentStep)) {
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
        currentStep++;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }
}

function prevStep() {
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep--;
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    window.scrollTo({ top: 200, behavior: 'smooth' });
}

function validateStep(step) {
    if (step === 1) {
        const service = document.querySelector('input[name="service"]:checked');
        if (!service) { alert('Please select a service type'); return false; }
    }
    if (step === 2) {
        const provider = document.querySelector('input[name="provider"]:checked');
        if (!provider) { alert('Please select a provider'); return false; }
    }
    if (step === 3) {
        if (!selectedDate || !document.getElementById('selectedTime').value) {
            alert('Please select both a date and time');
            return false;
        }
    }
    return true;
}

// Calendar
function initCalendar() {
    currentMonth = new Date(2026, 1, 1); // Feb 2026
    renderCalendar();
}

function renderCalendar() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendarMonth').textContent = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const today = new Date();
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        daysContainer.appendChild(empty);
    }
    
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dayEl = document.createElement('div');
        dayEl.className = 'cal-day';
        dayEl.textContent = day;
        
        // Disable past dates and weekends
        const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isWeekend = dateObj.getDay() === 0;
        
        if (isPast || isWeekend) {
            dayEl.classList.add('disabled');
        } else {
            dayEl.onclick = () => selectDate(dateObj, dayEl);
        }
        
        daysContainer.appendChild(dayEl);
    }
}

function changeMonth(delta) {
    currentMonth.setMonth(currentMonth.getMonth() + delta);
    renderCalendar();
}

function selectDate(date, element) {
    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    element.classList.add('selected');
    selectedDate = date;
    document.getElementById('selectedDate').value = date.toISOString().split('T')[0];
    generateTimeSlots();
}

function generateTimeSlots() {
    const container = document.getElementById('timeSlots');
    const times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];
    
    // Randomly mark some as unavailable for realism
    const unavailable = [2, 5, 8, 11];
    
    container.innerHTML = times.map((time, i) => {
        const isUnavailable = unavailable.includes(i);
        return `<button type="button" class="time-slot ${isUnavailable ? 'unavailable' : ''}" 
                        ${isUnavailable ? 'disabled' : `onclick="selectTime('${time}', this)"`}>
                    ${time}
                </button>`;
    }).join('');
}

function selectTime(time, element) {
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('selectedTime').value = time;
}

// Form Submission
function initFormSubmit() {
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Format confirmation
        const serviceNames = {
            'initial-consultation': 'Initial Consultation',
            'pain-management': 'Pain Management',
            'anxiety-treatment': 'Anxiety Treatment',
            'follow-up': 'Follow-Up Visit',
            'telehealth': 'Telehealth Consultation'
        };
        
        const providerNames = {
            'any': 'First Available Provider',
            'dr-sandhu': 'Dr. Harmanjit Singh Harry Sandhu',
            'dr-chen': 'Dr. Michael Chen',
            'dr-williams': 'Dr. Sarah Williams',
            'dr-park': 'Dr. James Park'
        };
        
        const dateStr = new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        document.getElementById('confirmationDetails').innerHTML = `
            <div class="detail-row"><span>Service:</span><strong>${serviceNames[data.service]}</strong></div>
            <div class="detail-row"><span>Provider:</span><strong>${providerNames[data.provider]}</strong></div>
            <div class="detail-row"><span>Date:</span><strong>${dateStr}</strong></div>
            <div class="detail-row"><span>Time:</span><strong>${data.time}</strong></div>
            <div class="detail-row"><span>Patient:</span><strong>${data.firstName} ${data.lastName}</strong></div>
            <div class="detail-row"><span>Location:</span><strong>Sherway Medical Centre, Etobicoke</strong></div>
            <div class="confirmation-ref">Reference #: VSMC-${Date.now().toString(36).toUpperCase()}</div>
        `;
        
        // Show confirmation
        document.querySelector('.booking-form').style.display = 'none';
        document.getElementById('bookingConfirmation').style.display = 'block';
        window.scrollTo({ top: 200, behavior: 'smooth' });
    });
}
