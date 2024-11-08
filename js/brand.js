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
