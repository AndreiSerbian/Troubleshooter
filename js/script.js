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
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function showForm(formType) {
    const clientForm = document.getElementById('client-form');
    const partnerForm = document.getElementById('partner-form');
    const clientBtn = document.getElementById('client-btn');
    const partnerBtn = document.getElementById('partner-btn');

    if (formType === 'client') {
        clientForm?.classList.add('active');
        partnerForm?.classList.remove('active');
        clientBtn?.classList.add('active');
        partnerBtn?.classList.remove('active');
    } else {
        partnerForm?.classList.add('active');
        clientForm?.classList.remove('active');
        partnerBtn?.classList.add('active');
        clientBtn?.classList.remove('active');
    }
}

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.querySelector('.close-menu');

// Логика для открытия/закрытия основного меню
if (menuToggle && navMenu) {
  menuToggle.addEventListener('change', () => {
    navMenu.classList.toggle('open', menuToggle.checked);
    });
  }

  // Обработчик для принудительного закрытия меню при клике на "X"
  closeMenu?.addEventListener('click', (event) => {
    event.preventDefault();
    menuToggle.checked = false; // Снимаем чекбокс, чтобы закрыть меню
    navMenu.classList.remove('open'); // Удаляем класс 'open' для скрытия меню
  });


// Логика для выпадающего меню "О нас"
document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    const dropdownMenu = toggle.nextElementSibling;
    dropdownMenu?.classList.toggle('show');
  });
});

// Логика для выпадающего меню "Язык"
document.querySelectorAll('.lang-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    const langMenu = toggle.nextElementSibling;
    langMenu?.classList.toggle('show');
  });
});

 // Упрощенный скрипт переключения темы
 const themeToggle = document.querySelector('.theme-toggle');
 const html = document.documentElement;
 
 themeToggle.addEventListener('click', () => {
     const currentTheme = html.getAttribute('data-theme');
     const newTheme = currentTheme === 'dark' ? '' : 'dark';
     html.setAttribute('data-theme', newTheme);
 });
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', async function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Определяем, какая форма активна
    const activeForm = document.querySelector('.form-content.active');
    let formData = {};
    
    if (activeForm.id === 'client-form') {
      // Если это форма клиента
      const clientForm = new FormData(document.querySelector('#client-form form'));
      formData = {
        type: 'client', // Тип формы
        name: clientForm.get('client-name'),
        district: clientForm.get('district'),
        adress: clientForm.get('client-adress'),
        category: clientForm.get('category'),
        description: clientForm.get('client-request'),
        phone: clientForm.get('client-phone'),
        datetime: clientForm.get('meeting-time'),
      };

      // Обработка загружаемых файлов (если есть)
      const fileInput = document.getElementById('images');
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        formData.fileBase64 = await toBase64(file);
      }
    } else if (activeForm.id === 'partner-form') {
      // Если это форма мастера
      const partnerForm = new FormData(document.querySelector('#partner-form form'));
      formData = {
        type: 'partner', // Тип формы
        name: partnerForm.get('partner-name'),
        age: partnerForm.get('partner-age'),
        district: partnerForm.get('district'),
        experience: partnerForm.get('partner-experience'),
        tools: partnerForm.get('partner-tools'),
        phone: partnerForm.get('partner-phone'),
        hasWork: partnerForm.get('work'), // Да/Нет
      };
    }

    // Отправка данных в Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycby93678OWEyazhNWrZe8GS02OvQaTOSR40SN650n5rbNfzM4wQzxwpY4O_NCDJVoqc/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Данные успешно отправлены!');
    } else {
      alert(`Ошибка: ${result.message}`);
    }
  });

  // Функция конвертации файла в Base64
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
