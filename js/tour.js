// html 태그 로그 완료하고 실행
window.addEventListener("load", function () {
  // 가격 콤마적용 기능
  function formatPriceWithCommas(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 외부 데이터 불러옴 : 외부 데이터 파일명.json
  const filName = "tour.json";

  // 외부 데이터 가져올때 작성법 (XMLHttpRequst)
  const xhr = new XMLHttpRequest();

  // GET 방식으로 파일을 열어준다.
  xhr.open("GET", filName);

  // 실제로 실행
  xhr.send();

  // 데이터의 전송 상태 체크
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 코드가 가독성이 떨어지므로 변수에 담는다.
      const res = event.target.response;
      // js 에서 사용하도록  JSON 데이터로 해석(parse) 후 객체화{원시데이터 묶음}
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  // 기능 작성
  function makeHtmlTag(_res) {
    // html 태그를 백틱을 이용해서 만든다.
    let htmlTourTag = ``;

    // _res에 담겨진 객체에서 total을 보관한다.
    // for (초기값; 조건; 증감) {}
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = `
        <div class="swiper-slide">                        
            <div class="tour-slide-item">
                <a href="${obj.url}" class="tour-link">
                    <div class="tour-img">
                        <img src="${obj.image}" alt="${obj.benefit}"/>
                    </div>
                    <div class="tour-info">
                    
                        <div class="tour-badge">
                            <i>${obj.badge}</i>
                        </div>
                        
                        <div class="tour-benefit">
                            ${obj.benefit}
                        </div>
                        
                        <div class="tour-place">
                            ${obj.place}
                        </div>
                        
                        <div class="tour-price">
                            <em>${formatPriceWithCommas(obj.price)}</em> 
                            <span>원~</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        `;

      htmlTourTag += tempTag;
    }

    showHtmlTag(htmlTourTag);
  }

  // html 출력 전용 기능
  function showHtmlTag(_html) {
    // swiper 태그에 백틱 배치
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;
    // console.log(_html);

    // swiper 만들고 실행
    makeSwiper();
  }

  function makeSwiper() {
    // swiper 작동
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 28,
      // 좌우 버튼
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-btn",
        prevEl: ".tour-slide-wrap .slide-prev-btn",
      },
      // 3장씩 이동
      slidesPerGroup: 3,
    });
  }
});
