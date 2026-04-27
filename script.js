const form = document.getElementById("palette-survey");
const message = document.getElementById("survey-message");
const messageText = document.getElementById("survey-message-text");
const navLinks = Array.from(document.querySelectorAll(".site-nav__link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

if (navLinks.length && sections.length) {
  const setActiveLink = function (id) {
    navLinks.forEach(function (link) {
      const isCurrent = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    function (entries) {
      const visibleEntry = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        })[0];

      if (visibleEntry) {
        setActiveLink(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const targetId = link.getAttribute("href").replace("#", "");
      setActiveLink(targetId);
    });
  });
}

if (form && message && messageText) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const palette = formData.get("palette");
    const email = formData.get("email");

    messageText.textContent = "Ответ " + email + " принят. Ваш выбор (не осуждаю): " + palette + ".";
    message.hidden = false;
    form.reset();
  });
}
