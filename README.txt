STAR COMPANY LTD. 홈페이지

구성
- index.html      홈 (히어로 / 바로가기 / 배달 생태계 / 파트너 로고 / 문의)
- about.html      회사소개
- partners.html   파트너브랜드 (연동사 13 · 프랜차이즈 22)
- branch.html     지사 문의 (지점 개설·배달대행·라이더 폼 3종, Web3Forms 로 메일 발송)
- benefits.html   혜택 (지사장·라이더 대상 본사 지원 6종)
- customer.html   고객센터
- download.html   프로그램 다운로드 (설치파일 직접 다운로드 9종)
- style.css       전 페이지 공통 스타일. 헤더·히어로·contactBand·푸터는 다크,
                  본문 .band 섹션은 라이트 (파일 끝 "본문 섹션 라이트 톤")
- site.js         모바일 메뉴 토글, 혜택/문의 탭 전환, 문의 폼 발송, 카카오톡 채널 버튼 설정

에셋 (assets/)
- hero-bg.jpg / .webp   홈 히어로 배경. 원본 home.png 에서 사진만 남기고 재가공
- logo.png              헤더·히어로·푸터 공용 로고 (투명)
- favicon.png           파비콘
- tagline.png           "함께 만드는 더 나은 내일, 스타컴퍼니!" 손글씨
- partners/*.png        파트너 브랜드 로고 35종
- benefits/*.jpg        혜택 페이지 패널 배경 6종 + 프로모션 카드 2종

설정이 필요한 곳
- site.js 의 KAKAO_CHANNEL_URL — 채널 주소를 넣으면 카카오톡 상담 버튼이 나타난다.
  비어 있으면 버튼은 숨겨진 채로 남는다.
- site.js 의 WEB3FORMS_ACCESS_KEY — web3forms.com 에서 수신 메일 주소로 발급받은 키.
  비어 있으면 지사 문의 폼이 숨겨지고 전화 안내만 나온다.
- 푸터의 사업자정보 — 상호·대표자·사업자등록번호·주소가 아직 비어 있다.

브랜드를 추가하려면
assets/partners/<슬러그>.png (배경 투명) 를 넣고 partners.html 에 카드를 추가한다.
<div class="brandCard"><img src="assets/partners/<슬러그>.png" alt="<브랜드명>" width="W" height="H" loading="lazy"></div>
흰색 단색 로고는 흰 카드에서 보이지 않으므로 brandCard--dark 를 함께 준다.
(현재 대상: 배달의민족 · 대구로 · 투썸플레이스 · 스파이더크래프트 · GS더프레시 · 뚜레쥬르)
