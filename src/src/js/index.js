const swiper = new Swiper('.classes__carousel', {
    spaceBetween: 30,
    // modules: [EffectFade, Navigation],
    effect: 'fade',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const header = document.getElementById('header');
function scrollHeader() {
    if (window.scrollY < 5) {
        header.classList.remove('header_background');
    } else {
        header.classList.add('header_background');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    scrollHeader();
});

window.addEventListener('scroll', function () {
    scrollHeader();
    header.classList.add('header_scrolling');
})

const navLinks = document.querySelectorAll("a.header__link");
const sections = [...navLinks].map(link => {
    return document.querySelector('#' + link.getAttribute("href").split('#').at(-1))
});

function navHighlighter () {
    let scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 246;
        const sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".header__nav .header__link[href*=" + sectionId + "]").classList.add("active");
            document.querySelector(".header__mobile-nav .header__link[href*=" + sectionId + "]").classList.add("active");

        }
        else {
            document.querySelector(".header__nav .header__link[href*=" + sectionId + "]").classList.remove("active");
            document.querySelector(".header__mobile-nav .header__link[href*=" + sectionId + "]").classList.remove("active");
        }
    })
}
window.addEventListener("scroll", navHighlighter);

const accCheckboxes = document.getElementsByClassName("faq__checkbox");

[...accCheckboxes].forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        const answer = this.nextElementSibling.nextElementSibling;
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
})

//Lazy constructor map
const map_container = document.getElementById('map_container');
const options_map = {
    once: true,
    passive: true,
    capture: true
};
map_container.addEventListener('click', start_lazy_map, options_map);
map_container.addEventListener('mouseover', start_lazy_map, options_map);
map_container.addEventListener('touchstart', start_lazy_map, options_map);
map_container.addEventListener('touchmove', start_lazy_map, options_map);

let isMapLoaded = false;
function start_lazy_map() {
    if (!isMapLoaded) {
        const script   = document.createElement("script");
        script.type  = "text/javascript";
        script.src   = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A64069117aa43ac5ce8af3f0c6a8c3091eef9786be9067472613eea73e6da8429&width=100%25&height=512&lang=ru_RU&scroll=true';
        document.getElementById("map_container").appendChild(script);
        isMapLoaded = true;
    }
}

