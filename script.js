let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slider__item-wrapper');
let slideItems = document.querySelectorAll('.slider__item');
let next = document.getElementById('next-btn');
let prev = document.getElementById('prev-btn');

// ToDO
// 1. + Автодобавление точек  
// 2. + Управление точками
// 3. + Переключение классов active при клике
// 4. ++++++++ Исправить проблему съезжания слайдов при масштабировании (можно 
// пробовать определять ширину слайда при window.onload)
// 4.1. Проблема при первом клике
// 5. Деактивировать стрелки при достижении конца
// 6. Сделать бесконечным
// 7. Автовоспроизведение
// 8. + Уникальный ID для слайда 


// 
window.onload = function() {
    addDots();
    addIDs();
    function addIDs() {
        for (var i=0; i< slides.length; i) {
            slides.forEach(slide => {
                slide.setAttribute('id', 'slide'+ i++ +'')
            });
        }
    }
    function addDots() {
        for (var i = 0; i < slides.length; i++) {
            let s = '<span class="slider__dot" id="dot' + i + '" />';
            let dotArea = document.querySelector('.slider__dots');
            dotArea.innerHTML += s;
        }
    }
    let dots = document.querySelectorAll('.slider__dot');

    slides[0].classList.add('slider__item-wrapper-active');
    dots[0].classList.add('slider__dot-active');

    dots.forEach(dot => {
        dot.addEventListener('click', changeActive);
        function changeActive(params) {
            const slideNum = this.getAttribute('id').replace('dot', '');
            dots.forEach(dot => {dot.classList.remove('slider__dot-active')});
            slides.forEach(slide => {slide.classList.remove('slider__item-wrapper-active')});
            this.classList.add('slider__dot-active');
            const chosenSlide = document.getElementById('slide'+ slideNum +'');
            chosenSlide.classList.add('slider__item-wrapper-active');

            window.addEventListener('resize', windowResize);
            function windowResize(params) {
                slides.forEach(slide => {
                    const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
                    let sliderAlign = slideWidth*slideNum;
                    slider.style.left = `${-sliderAlign}px`;
                });
            }
            slides.forEach(slide => {

                const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
                let sliderAlign = slideWidth*slideNum;
                slider.style.left = `${-sliderAlign}px`;
            });
        }
    });

slides.forEach(slide => {                                      // начало перебора слайдов


slideItems.forEach(slideItem => {
    const slideItemWidth = getComputedStyle(slideItem).width.replace('px', '');

    const sliderWidth = getComputedStyle(slider).width;        // ширина слайдера



let sliderAlign = getComputedStyle(slider).left.replace('px', '');     // положение слайдера (left)



prev.onclick = prevSlide;
next.onclick = nextSlide;

function nextSlide() {                                   // следующий слайд

    let activeSlide = document.querySelector('.slider__item-wrapper-active');
    let points = activeSlide.getAttribute('id').replace('slide', '');
    let passivePoint = Number(points);
    let activePoint = Number(points)+1;
    let nextActive = document.getElementById('slide'+ activePoint +'');
    let prevActive = document.getElementById('slide'+ passivePoint +'');

        nextActive.classList.add('slider__item-wrapper-active');
        prevActive.classList.remove('slider__item-wrapper-active');

    let dots = document.querySelectorAll('.slider__dot');
    dots.forEach(dot => {
        dot.classList.remove('slider__dot-active');
        document.getElementById('dot'+ activePoint +'').classList.add('slider__dot-active');
    });

        const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
        let sliderAlign = slideWidth*activePoint;
        slider.style.left = `${-sliderAlign}px`;

        window.addEventListener('resize', windowResizeOne);
        function windowResizeOne(params) {
            slides.forEach(slide => {
                const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
                let sliderAlign = slideWidth*activePoint;
                slider.style.left = `${-sliderAlign}px`;
            });
        }

}

function prevSlide(params) {                                     // предыдущий слайд

    let activeSlide = document.querySelector('.slider__item-wrapper-active');
    let points = activeSlide.getAttribute('id').replace('slide', '');
    let passivePoint = Number(points)-1;
    let activePoint = Number(points);
    let nextActive = document.getElementById('slide'+ passivePoint +'');
    let prevActive = document.getElementById('slide'+ activePoint +'');

        nextActive.classList.add('slider__item-wrapper-active');
        prevActive.classList.remove('slider__item-wrapper-active');

    let dots = document.querySelectorAll('.slider__dot');
    dots.forEach(dot => {
        dot.classList.remove('slider__dot-active');
        document.getElementById('dot'+ passivePoint +'').classList.add('slider__dot-active');
    });
    const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
    let sliderAlign = slideWidth*passivePoint;
    slider.style.left = `${-sliderAlign}px`;

    window.addEventListener('resize', windowResizeOne);
    function windowResizeOne(params) {
        slides.forEach(slide => {
            const slideWidth = getComputedStyle(slide).width.replace('px', '');      // ширина слайда
            let sliderAlign = slideWidth*passivePoint;
            slider.style.left = `${-sliderAlign}px`;
        });
    }
}

});
});                                                            // конец перебора слайдов
}
