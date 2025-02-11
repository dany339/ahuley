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

AOS.init({
    once: true,
});
