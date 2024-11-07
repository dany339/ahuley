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

appTabAction(0);

$appTabMenu.on("click", function (e) {
    e.preventDefault();

    const appTabIdx = $(this).index();
    console.log(appTabIdx);

    appTabAction(appTabIdx);
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

/* BRAND!!!---------------------------------------------- */

// 돌려돌려 돌림판~~~!!

const ideologyTl = gsap.timeline({
    defaults: { autoAlpha: 0, duration: 3, ease: "none" },

    scrollTrigger: {
        trigger: ".ideology",
        // markers: true,
        start: "67% 50%",
        end: "bottom+=9000 0%", // wrap 애니메이션의 지속 시간에 맞게 조정
        scrub: 1,
        pin: true,
    },
});

const wrapTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".wrap",
        start: "bottom 10%",
        ease: "none",
    },
});

// 초기 회전 상태를 45도로 설정
gsap.set(".wrap", { rotation: -27 });

wrapTl.to(".wrap", {
    rotation: "360deg",
    ease: "none",
    scrollTrigger: {
        start: "top top",
        scrub: 1,
    },
});

const sliders = document.querySelectorAll(".ideology-txt"); // 모든 슬라이드 선택
let currentIndex = 0; // 현재 슬라이드 인덱스

function showSlide(index) {
    sliders.forEach((slider, i) => {
        // 슬라이드 이동을 자연스러운 트렌지션 효과로 변경
        slider.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
        slider.style.transform = `translateX(${(i - index) * 100}%)`; // 슬라이드 이동
    });
}

window.addEventListener("scroll", () => {
    const ideologyOffset = document.querySelector(".ideology").offsetTop + 1000; // ideology 섹션의 시작 위치
    const scrollY = window.scrollY - ideologyOffset; // ideology 섹션부터의 스크롤 위치
    const slideHeight = 2000; // 슬라이드가 나타나는 높이 (1000px)

    // 스크롤 위치에 따라 슬라이드 인덱스 업데이트
    if (scrollY >= slideHeight * (currentIndex + 1)) {
        if (currentIndex === 2) {
            // 3번째 인덱스를 건너뛰고 4번째 인덱스로 이동
            currentIndex = 3;
        } else {
            currentIndex++; // 다음 슬라이드로 이동
        }
        console.log(currentIndex);
    } else if (scrollY < slideHeight * currentIndex) {
        if (currentIndex === 3) {
            // 4번째 인덱스에서 이전으로 이동하면 2번째 인덱스로 이동
            currentIndex = 2;
        } else {
            currentIndex--; // 이전 슬라이드로 이동
        }
    }

    // 인덱스가 범위를 초과하지 않도록 제한
    currentIndex = Math.max(0, Math.min(currentIndex, 4)); // 인덱스 범위를 4까지로 확장

    showSlide(currentIndex); // 슬라이드 표시
});

// 초기 슬라이드 표시
showSlide(currentIndex);

// 브랜드 스토리!!!---

const storyTl = gsap.timeline({
    defaults: { autoAlpha: 0, duration: 3, ease: "none" },

    scrollTrigger: {
        trigger: ".story",
        // markers: true,
        start: "60% 60%",
        end: "bottom+=1000 0%" /* 바닥에서 1000px 이동한 지점이 끝나는 지점 */,
        scrub: 1, // 스크롤바를 따라잡는데 걸리는 시간 1초

        pin: true, // 트리거(영역)를 고정, 애니메이션 끝날 때까지 뷰포트 고정시키는 그거!!!!!
    },
});

storyTl.from(".story .sec-title", { x: 200 });
storyTl.from(".p1", { x: 200 });
storyTl.from(".p2", { x: 200 });
storyTl.from(".p3", { x: 200 });
storyTl.from(".p4", { x: 200 });
storyTl.from(".p5", { x: 200 });
storyTl.from(".p6", { x: 200 });

storyTl.to(".fake", { x: 1, duration: 10 });
