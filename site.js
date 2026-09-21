/* 카카오톡 채널 주소. 채널 관리자센터의 채널 URL(http://pf.kakao.com/_XXXXX)을 넣으면
   홈의 카카오 상담 버튼이 자동으로 나타난다. 비워두면 버튼은 숨겨진 채로 남는다. */
const KAKAO_CHANNEL_URL = "";

(function () {
  var toggle = document.querySelector(".navToggle");
  var nav = document.getElementById("siteNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("isOpen");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("isOpen");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "메뉴 열기");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("isOpen")) {
        nav.classList.remove("isOpen");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  var tabs = [].slice.call(document.querySelectorAll('.benefitNav [role="tab"]'));

  if (tabs.length) {
    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(i);
      });
      tab.addEventListener("keydown", function (e) {
        var step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1
          : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        select((i + step + tabs.length) % tabs.length, true);
      });
    });
  }

  if (KAKAO_CHANNEL_URL) {
    document.querySelectorAll("[data-kakao]").forEach(function (el) {
      el.href = KAKAO_CHANNEL_URL;
      el.hidden = false;
    });
  }
})();
