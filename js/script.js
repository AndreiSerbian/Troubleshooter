let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}


function showForm(formType) {
    const clientForm = document.getElementById('client-form');
    const partnerForm = document.getElementById('partner-form');
    const clientBtn = document.getElementById('client-btn');
    const partnerBtn = document.getElementById('partner-btn');

    if (formType === 'client') {
        clientForm.classList.add('active');
        partnerForm.classList.remove('active');
        clientBtn.classList.add('active');
        partnerBtn.classList.remove('active');
    } else {
        partnerForm.classList.add('active');
        clientForm.classList.remove('active');
        partnerBtn.classList.add('active');
        clientBtn.classList.remove('active');
    }
}