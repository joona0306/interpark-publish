// 모든 js 는 html 태그를 로드 완료하고 실행해야 안전하다.
// 그런데 현재 .js 파일을 head 태그에서 불러들이므로 불완전하다.
// 오류가 날 확률이 무척 높다.
// 아래의 window 는 웹브라우저를 의미한다.
// onload는 절대로 소문자로 작성하도록 약속 되어 있다.
// 아래문장 해석
// 웹브라우저에 html, css, js, image... 로드완료하면
// function 을 한다라고 약속하였다.
// window.onload = function () {};

window.addEventListener("load", function () {
  // console.log("추천상품코딩");
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "recommend.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();

  // 외부의 파일을 열어라
  // GET 방식으로 파일을 열어준다.
  xhr.open("GET", fileName);

  // 실제로 실행하자.
  xhr.send();

  // 데이터의 전송 상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);
      // 코드가 가독성이 떨어지므로 변수에 담는다.
      // 규칙은 const 부터 작성하자.
      // const 가 문제가 된다면 let 으로 변경한다.
      const res = event.target.response;
      // res 를 전달해서 html 태그를 만든다.
      // 데이터를 전달해서 정리해서 전달하는 것이 관례
      // 전달 받은 문자열을
      // js 에서 사용하도록
      // JSON 데이터로 해석 (parse)하여
      // 객체화 {원시데이터 묶음} 한다.
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  // 기능 작성
  function makeHtmlTag(_res) {
    // console.log(_res);
    // html 태그를 백틱을 이용해서 만든다.
    let htmlRecommendTag = ``;

    // _res 에 담겨진 객체에서 total 을 보관한다
    // 우리가 몇번 반복(total)해야 하는 지 안다.
    // for (초기값; 조건; 증감) {
    //     // 반복하고 싶은 일
    // }
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      // _res"good_" + 1;
      // _res["good_2"];
      // _res["good_" +3];
      const obj = _res["good_" + index];
      // console.log(index);

      let tempTag = ``;

      // 마지막 json 에서는 url 만 읽어 들인다.
      // 그렇지 않으면 일반적으로 모두 출력한다.
      if (i === _res.total - 1) {
        tempTag = `
          <div class="swiper-slide">
            <a href="${obj.url}">
              <img src="images/btn_moreproduct.svg" art=""/>
              전체보기
            </a>  
          </div>
        `;
      } else {
        tempTag = `
          <div class="swiper-slide">
                          
            <div class="recommend-slide-item">
              <a href="${obj.url}" class="recommend-link">
                <div class="recommend-img">
                  <img src="${obj.image}" alt="${obj.desc}"/>
                </div>
                <div class="recommend-info">
                  
                  <ul class="recommend-good-list">
                    <li>
                      <span class="recommend-good-info-price">
                        <b>${obj.discount === 0 ? "" : obj.discount + "%"}</b>
                        <em>${formatPriceWithCommas(obj.price)}</em>
                        원
                      </span>
                    </li>
                    <li>
                      <!-- 한줄짜리는 span, 두줄이상이면 p -->
                      <p class="recommend-good-info-desc">
                      ${obj.desc}
                      </p>
                    </li>
                  </ul>
                
                </div>
              </a>
            </div>

          </div>
        `;
      }

      // console.log(tempTag);
      htmlRecommendTag += tempTag;
    }
    // 몇번 반복해야 하는지 몰라
    // while

    // console.log(htmlRecommendTag);
    showHtmlTag(htmlRecommendTag);
  }

  // 가격 콤마적용 기능
  function formatPriceWithCommas(price) {
    // if 조건문
    // 가격을 숫자로 변환
    // price = parseFloat(price);

    // 가격이 숫자가 아니면 그대로 반환
    // if (isNaN(price)) {
    //   return price;
    // } else {
    //   return price.toLocaleString();
    // }

    // 삼항연산
    price = parseFloat(price);
    return price ? price.toLocaleString() : price;
  }

  // html 출력 전용 기능을 만들자.
  function showHtmlTag(_html) {
    // console.log(_html);
    // swiper 태그에 백틱을 배치 한다.
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;
    // console.log(_html);
    // swiper 만들고 실행하기
    makeSwiper();
  }

  function makeSwiper() {
    // swiper 작동시킨다.
    const swiperRecommend = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌우 버튼
      navigation: {
        nextEl: ".recommend-slide-wrap .slide-next-btn",
        prevEl: ".recommend-slide-wrap .slide-prev-btn",
      },
      // 4장씩 이동
      slidesPerGroup: 4,
    });
  }
});
