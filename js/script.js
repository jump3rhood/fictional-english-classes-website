/*SMOOTH SCROLLING */
const links = document.querySelectorAll(".nav-menu li a");
for (const link of links) {
  link.addEventListener("click", scrollHandler);
}
function scrollHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}

/* NAVIGATION */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
/* VALIDATION */
const API_KEY = 'y6nTWiixuaQYiJ8hxXslCtP5mlwEpA4W';
const url = 'https://api.apilayer.com/number_verification/validate?number'
const url2= 'https://api.apilayer.com/number_verification/validate?number=14158586273'

async function verifyPhone(number){
  const response = await fetch(`${url}=91${number}`, {
    headers: {
      apiKey: API_KEY
    }
  })
  const data = await response.json()
  return data.valid
}

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lasstname = document.getElementById('lastname');

const email = document.getElementById('email');
const phone = document.getElementById('phone');
const native = document.getElementById('native');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = async () => {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const nativeValue = native.value.trim();

    if(firstnameValue === '') {
        setError(firstname, 'First name is required');
    } else {
        setSuccess(firstname);
    }
    if(lastnameValue === '') {
      setError(lastname, 'Last name is required');
  } else {
      setSuccess(lastname);
  }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    const verified = await verifyPhone(phoneValue);


    if(phoneValue === '') {
        setError(phone, 'Phone is required');
    } else if (phoneValue.length < 10 ) {
        setError(phone, 'Phone must be at least 10 digits.')
    } else if(!verified){
      setError(phone, 'Phone number you entered is not registered')
    }
    else {
        setSuccess(phone);
    }

    if(nativeValue === '') {
        setError(native, 'Native language is required.');
    } else {
        setSuccess(native);
    }

};
/* SLIDER */
const buttons = document.querySelectorAll("[data-carousel-button]")
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
    .closest("[data-carousel]")
    .querySelector("[data-slides]")
    const activeSlide = slides.querySelector('[data-active]')
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if(newIndex < 0) newIndex = slides.children.length - 1
    if(newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})