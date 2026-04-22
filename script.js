const form = document.getElementById("palette-survey");
const message = document.getElementById("survey-message");
const messageText = document.getElementById("survey-message-text");

if (form && message && messageText) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const palette = formData.get("palette");
    const email = formData.get("email");

    messageText.textContent = "Ответ для " + email + " принят. Ваш выбор: " + palette + ".";
    message.hidden = false;
    form.reset();
  });
}
