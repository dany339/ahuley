/* 공통!!!---------------------------------------------- */

const btnMenu = $(".btn-menu");
const btnClose = $(".btn-close");
const gnb = $(".gnb");

btnMenu.on("click", function () {
    gnb.addClass("on");
});

btnClose.on("click", function () {
    gnb.removeClass("on");
});

// foot family 기능
if ($(".btn-family").length && $(".family-list").length) {
    const family = $(".btn-family");
    const familyList = $(".family-list");
    const duration = 300;

    family.on("click", function () {
        familyList.toggleClass("on");
        familyList.slideToggle(duration);
    });
}

/* MAIN!!!---------------------------------------------- */

// cursor 기능(MAIN)
function handleMouseMove(e) {
    const cursor = document.querySelector(".cursor");
    const menuConSliderWrap = document.querySelector(".menu-con-slider-wrap");
    const eventSwipers = document.querySelectorAll(".event-swiper");

    if (cursor && menuConSliderWrap && eventSwipers) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

        const menuRect = menuConSliderWrap.getBoundingClientRect();
        let isCursorVisible = false;

        eventSwipers.forEach((eventSwiper) => {
            const eventRect = eventSwiper.getBoundingClientRect();
            if (
                (mouseX >= eventRect.left &&
                    mouseX <= eventRect.right &&
                    mouseY >= eventRect.top &&
                    mouseY <= eventRect.bottom) ||
                (mouseX >= menuRect.left &&
                    mouseX <= menuRect.right &&
                    mouseY >= menuRect.top &&
                    mouseY <= menuRect.bottom)
            ) {
                isCursorVisible = true;
            }
        });

        if (isCursorVisible) {
            cursor.style.opacity = "1";
        } else {
            cursor.style.opacity = "0";
        }
    }
}

window.addEventListener("mousemove", handleMouseMove);

// menu swiper(MAIN)
if ($(".menu-con-slider").length) {
    const $menuConSlider = new Swiper(".menu-con-slider", {
        loop: true,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 5000,
        },
    });

    const $menuTxtSlider = new Swiper(".menu-txt-slider", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
        },
        thumbs: {
            swiper: $menuConSlider,
        },
    });
}
// event swiper(MAIN)
if ($(".event-swiper").length) {
    const $eventSwiper = new Swiper(".event-swiper", {
        loop: true,
        slidesPerView: "1",
        spaceBetween: 20,
        autoplay: {
            delay: 1000,
        },

        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            800: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1300: {
                slidesPerView: 4.9,
                spaceBetween: 20,
            },
        },
    });
}

// map-filter 기능(MAIN)
if ($(".map-filter").length) {
    const $input = $(".map-filter li input");
    $input.on("click", function () {
        $(this).toggleClass("on");
    });
}

// event tab(MAIN)

const $eventTabMenu = $(".event-tab > li");
const $eventTabCon = $(".event-list");

$eventTabCon.hide();
$eventTabCon.eq(0).show();
$eventTabMenu.eq(0).find("a").addClass("on");

$eventTabMenu.on("click", function (e) {
    e.preventDefault();

    const eventTabIdx = $(this).index();

    $eventTabMenu.find("a").removeClass("on");
    $(this).find("a").addClass("on");

    $eventTabCon.hide();
    $eventTabCon.eq(eventTabIdx).show();

    if (eventTabIdx === 0 && window.eventSwiper) {
        window.eventSwiper.update();
    }
});

/* MENU!!!---------------------------------------------- */

// menu-tab(MENU)
const $menuTabMenu = $(".menu-tab > li");
const $menuTabCon = $(".menu-con");

menuTabAction(0);

$menuTabMenu.on("click", function (e) {
    e.preventDefault();

    const menuTabIdx = $(this).index();
    console.log(menuTabIdx);

    menuTabAction(menuTabIdx);
});

// 공통의 동작을 함수로 정의
function menuTabAction(index) {
    // 탭메뉴 활성화
    $menuTabMenu.removeClass("on");
    $menuTabMenu.eq(index).addClass("on");

    // 인덱스에 해당하는 $tabCon 보이기
    $menuTabCon.hide();
    $menuTabCon.eq(index).show();
}

// allergie swiper(MENU)
if ($(".allergie-slider").length) {
    const allergieSwiper = new Swiper(".allergie-slider", {
        slidesPerView: 6,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2000,
        },
        pagination: {
            el: ".allergie-slider-wrap .swiper-pagination",
            type: "fraction",
        },
    });
}

// price tab(MENU)
const $priceTabMenu = $(".price-tab > li");
const $priceTabCon = $(".price-con-item");

$priceTabCon.hide();
$priceTabCon.eq(0).show();
$priceTabMenu.eq(0).find("a").addClass("on");

$priceTabMenu.on("click", function (e) {
    e.preventDefault();

    const idx = $(this).index();

    $priceTabMenu.find("a").removeClass("on");
    $(this).find("a").addClass("on");

    $priceTabCon.hide();
    $priceTabCon.eq(idx).show();
});

/* INQUIRY!!!---------------------------------------------- */
const $faqTabMenu = $(".faq-tab > li");
const $faqTabCon = $(".info-wrap > ul");

faqTabAction(0);

$faqTabMenu.on("click", function (e) {
    e.preventDefault();

    const faqTabIdx = $(this).index();
    console.log(faqTabIdx);

    faqTabAction(faqTabIdx);
});

// 공통의 동작을 함수로 정의
function faqTabAction(index) {
    // 탭메뉴 활성화
    $faqTabMenu.removeClass("on");
    $faqTabMenu.eq(index).addClass("on");

    // 인덱스에 해당하는 $tabCon 보이기
    $faqTabCon.hide();
    $faqTabCon.eq(index).show();
}

const $question = $(".info-wrap > ul > li");
const $answer = $(".answer-wrap");
const duration = 300;

$question.on("click", function () {
    // 🚩 $(this)로 구별, siblings()

    // 선택한 놈을 기준으로, 다른 놈들은 on클래스 삭제
    $(this).siblings().removeClass("on");

    // $(this).addClass("on");
    // 선택한 놈을 기준으로 on클래스를 토글
    $(this).toggleClass("on");

    // 선택한 놈의 형제, 하위에 있는 답변은 올리고
    // stop()  <-- 여러개 예약되어 있어도 한 번만 작동
    $(this).siblings().find($answer).stop().slideUp(duration);

    // $(this).find($answer).slideDown(duration);
    // 선택한 놈의 자손중 답변을 찾아서 슬라이드 토글
    $(this).find($answer).stop().slideToggle(duration);
});
