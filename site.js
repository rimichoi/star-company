/* 카카오톡 채널 주소. 채널 관리자센터의 채널 URL(http://pf.kakao.com/_XXXXX)을 넣으면
   홈의 카카오 상담 버튼이 자동으로 나타난다. 비워두면 버튼은 숨겨진 채로 남는다. */
const KAKAO_CHANNEL_URL = "";

/* web3forms.com 에서 수신 메일 주소로 발급받는 access key. 비워두면 지사 문의 폼이
   숨겨지고 전화 안내만 나온다. 수신함은 call7173326@daum.net. */
const WEB3FORMS_ACCESS_KEY = "9a56692d-d2ec-491d-afc2-a0395027098b";

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

  var forms = [].slice.call(document.querySelectorAll(".inquiryForm"));

  if (forms.length) {
    var fallback = document.querySelector(".inquiryFallback");
    var itabs = [].slice.call(document.querySelectorAll(".inquiryTabs [role=\"tab\"]"));

    if (!WEB3FORMS_ACCESS_KEY) {
      document.querySelector(".inquiryTabs").hidden = true;
      forms.forEach(function (f) { f.hidden = true; });
      if (fallback) fallback.hidden = false;
    } else {
      document.querySelectorAll("select[data-hours]").forEach(function (sel) {
        sel.insertAdjacentHTML("beforeend", "<option value=\"\">시간 선택</option>");
        for (var h = 0; h < 24; h++) {
          var v = ("0" + h).slice(-2) + "시";
          sel.insertAdjacentHTML("beforeend", "<option value=\"" + v + "\">" + v + "</option>");
        }
      });

      itabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          itabs.forEach(function (t, j) {
            var on = i === j;
            t.setAttribute("aria-selected", String(on));
            t.tabIndex = on ? 0 : -1;
            document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
          });
        });
      });

      forms.forEach(function (form) {
        /* Web3Forms 는 botcheck 가 채워져 오면 스팸으로 버린다 */
        form.insertAdjacentHTML("afterbegin", "<input type=\"checkbox\" name=\"botcheck\" tabindex=\"-1\" hidden>");

        var submit = form.querySelector(".formSubmit");
        var note = form.querySelector(".formNote");
        var idle = note.textContent;

        var sync = function () {
          submit.disabled = !form.checkValidity();
        };
        form.addEventListener("input", sync);
        form.addEventListener("change", sync);
        sync();

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (!form.checkValidity()) return;

          var payload = { access_key: WEB3FORMS_ACCESS_KEY, subject: form.dataset.subject, from_name: "스타컴퍼니 홈페이지" };
          new FormData(form).forEach(function (value, key) {
            payload[key] = value;
          });

          submit.disabled = true;
          note.className = "formNote";
          note.textContent = "보내는 중입니다…";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          })
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (!data.success) throw new Error(data.message || "전송 실패");
              form.reset();
              note.className = "formNote formNote--done";
              note.textContent = "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.";
            })
            .catch(function () {
              note.className = "formNote formNote--error";
              note.textContent = "전송에 실패했습니다. 고객센터 1544-9777 로 연락해주세요.";
            })
            .then(function () {
              sync();
              setTimeout(function () {
                note.className = "formNote";
                note.textContent = idle;
              }, 8000);
            });
        });
      });
    }
  }

  if (KAKAO_CHANNEL_URL) {
    document.querySelectorAll("[data-kakao]").forEach(function (el) {
      el.href = KAKAO_CHANNEL_URL;
      el.hidden = false;
    });
  }
})();
