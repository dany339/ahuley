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

// 비주얼 이미지 나타나기~
gsap.registerPlugin(ScrollTrigger);

const mainPic = $(".main-pic");
const mainTitle = $(".main-title");
const mainTl = gsap.timeline({ defaults: { duration: 1, ease: "power4.inOut" } });

mainTl.from(mainPic, { scale: 0.3 });
mainTl.from(mainTitle, { y: 200, autoAlpha: 0 }, "-=0.3");

// 1. visual 영역 애니메이션
const visualPic = $(".visual-pic").get(0);

const visualTl = gsap.timeline({ defaults: { duration: 1, ease: "power4.inOut" } });
visualTl.from(visualPic, { scale: 3, filter: "blur(30px)", duration: 2 });

visualTl.from(".visual-title h2", { y: 100, autoAlpha: 0 }, "-=0.9");
visualTl.from(".visual-title p", { y: 100, autoAlpha: 0 }, "-=0.6");
visualTl.from(".bread", { y: 50, autoAlpha: 0 }, "-=0.6");

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
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2000,
        },
        pagination: {
            el: ".allergie-slider-wrap .swiper-pagination",
            type: "fraction",
        },

        breakpoints: {
            1100: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            700: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        },
    });
}
if ($(".menu-list li")) {
    const $menuList = $(".menu-list");
    $menuList.on("click", function () {
        $(this).toggleClass("on", 400);
    });
}

const $menuItem = $(".menu-list li");
const $menuList = $(".menu-list");

$menuItem.on("click", function () {
    $(menuList).toggleClass("on");

    $(menuList).siblings().find($menuItem).stop().slideUp(duration);

    // $(this).find($answer).slideDown(duration);
    // 선택한 놈의 자손중 답변을 찾아서 슬라이드 토글
    $(menuList).find($menuItem).stop().slideToggle(duration);
});

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

/* REWARDS!!!---------------------------------------------- */

const $snsTabMenu = $(".sns-tab > li");
const $snsTabCon = $(".sns .sns-list");

snsTabAction(1);

$snsTabMenu.on("click", function (e) {
    e.preventDefault();

    const snsTabIdx = $(this).index();
    console.log(snsTabIdx);

    snsTabAction(snsTabIdx);
});

// 공통의 동작을 함수로 정의
function snsTabAction(index) {
    // 탭메뉴 활성화
    $snsTabMenu.removeClass("on");
    $snsTabMenu.eq(index).addClass("on");

    // 인덱스에 해당하는 $tabCon 보이기
    $snsTabCon.hide();
    $snsTabCon.eq(index).show();
}

const $appTabMenu = $(".app-tab > li");
const $appTabCon = $(".app-con");

let currentAppIndex = 0; // 현재 인덱스를 추적하는 변수
appTabAction(currentAppIndex);

$appTabMenu.on("click", function (e) {
    e.preventDefault();

    const appTabIdx = $(this).index();
    console.log(appTabIdx);

    appTabAction(appTabIdx);
});

// btn-next 클릭 시 인덱스 증가 및 appTabAction 호출
$(".btn-next").on("click", function () {
    currentAppIndex = (currentAppIndex + 1) % $appTabMenu.length; // 인덱스를 증가시키고, 마지막 인덱스에서 다시 0으로 돌아감
    appTabAction(currentAppIndex);
});

function appTabAction(index) {
    $appTabMenu.removeClass("on");
    $appTabMenu.eq(index).addClass("on");

    $appTabCon.hide();
    $appTabCon.eq(index).show();
}

const $rewardTabMenu = $(".reward-tab > li");
const $rewardTabCon = $(".reward-list");

rewardTabAction(0);

$rewardTabMenu.on("click", function (e) {
    e.preventDefault();

    const rewardTabIdx = $(this).index();
    console.log(rewardTabIdx);

    rewardTabAction(rewardTabIdx);
});

function rewardTabAction(index) {
    $rewardTabMenu.find("a").removeClass("on");
    $rewardTabMenu.eq(index).find("a").addClass("on");

    $rewardTabCon.hide();
    $rewardTabCon.eq(index).show();
}

// rewards.html의 캐릭터 고정

const $footerSection = $("footer");

$footerSection.on("mouseenter", function () {
    $(".app-store figure").addClass("on");
});

$footerSection.on("mouseleave", function () {
    $(".app-store figure").removeClass("on");
});

/* MAP!!!---------------------------------------------- */

const $mapSearch = $(".map-search");
const $btnFold = $(".btn-fold");

$btnFold.on("click", function () {
    $mapSearch.toggleClass("on"); // Toggle the 'on' class for .map-search
});

// TOP 버튼
AOS.init();

const btnTop = document.querySelector(".btn-top");
const btnTalk = document.querySelector(".btn-talk");
const html = document.documentElement;
const htmlPos = html.scrollHeight / 2;

window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;

    if (scrollTop >= htmlPos) {
        btnTop.classList.add("active");
        btnTalk.classList.add("active");
    } else {
        btnTop.classList.remove("active");
        btnTalk.classList.remove("active");
    }
});
