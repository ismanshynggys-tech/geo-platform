const quizQuestions = [
  {
    q: "Ең үлкен мұхит қайсы?",
    options: ["Атлант", "Тынық", "Үнді", "Солтүстік Мұзды"],
    answer: "Тынық",
  },
  {
    q: "Қазақстан қай материкте орналасқан?",
    options: ["Африка", "Еуразия", "Оңтүстік Америка", "Аустралия"],
    answer: "Еуразия",
  },
  {
    q: "Атмосфераның төменгі қабаты:",
    options: ["Стратосфера", "Тропосфера", "Мезосфера", "Термосфера"],
    answer: "Тропосфера",
  },
  {
    q: "Экватор нені білдіреді?",
    options: ["0° ендік", "0° бойлық", "90° ендік", "180° бойлық"],
    answer: "0° ендік",
  },
  {
    q: "Ең ұзын өзендердің бірі:",
    options: ["Жайық", "Ніл", "Есіл", "Іле"],
    answer: "Ніл",
  },
  {
    q: "Жердің жасанды серігі:",
    options: ["Күн", "Ай", "Марс", "Шолпан"],
    answer: "Ай",
  },
  {
    q: "Климатқа әсер ететін фактор:",
    options: ["Ендік", "Әліпби", "Мұражай", "Хат"],
    answer: "Ендік",
  },
  {
    q: "Литосфера дегеніміз:",
    options: ["Су қабығы", "Тіршілік қабығы", "Жер қыртысы мен мантияның жоғарғы бөлігі", "Ауа қабығы"],
    answer: "Жер қыртысы мен мантияның жоғарғы бөлігі",
  },
  {
    q: "Глобустағы меридиандар:",
    options: ["Параллель сызықтар", "Полюстен полюске баратын сызықтар", "Тек экватор", "Тау жоталары"],
    answer: "Полюстен полюске баратын сызықтар",
  },
  {
    q: "Қазақстанның астанасы:",
    options: ["Шымкент", "Астана", "Қарағанды", "Түркістан"],
    answer: "Астана",
  },
];

const matchingPairs = [
  ["Амазонка", "Ең сулы өзен"],
  ["Эверест", "Ең биік тау шыңы"],
  ["Сахара", "Ең үлкен ыстық шөл"],
  ["Байкал", "Ең терең көл"],
  ["Гренландия", "Ең үлкен арал"],
  ["Ніл", "Африкадағы ірі өзен"],
];

const nomenclatureTasks = [
  { object: "Каспий теңізі", answer: "Батыс Қазақстан" },
  { object: "Алтай", answer: "Шығыс Қазақстан" },
  { object: "Арал теңізі", answer: "Оңтүстік-батыс" },
  { object: "Сарыарқа", answer: "Орталық Қазақстан" },
  { object: "Іле Алатауы", answer: "Оңтүстік-шығыс" },
];

const regionOptions = [
  "Батыс Қазақстан",
  "Шығыс Қазақстан",
  "Оңтүстік-батыс",
  "Орталық Қазақстан",
  "Оңтүстік-шығыс",
  "Солтүстік Қазақстан",
];

const studentForm = document.getElementById("student-form");
const welcome = document.getElementById("welcome");
const platform = document.getElementById("platform");
const studentBadge = document.getElementById("student-badge");
const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".tab-panel"));

const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
const matchingForm = document.getElementById("matching-form");
const matchingResult = document.getElementById("matching-result");
const mapGrid = document.getElementById("map-grid");
const nomenclatureResult = document.getElementById("nomenclature-result");

function renderQuiz() {
  quizForm.innerHTML = "";

  quizQuestions.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "quiz-item";

    const title = document.createElement("p");
    title.textContent = `${index + 1}. ${item.q}`;

    const options = document.createElement("div");
    options.className = "quiz-options";

    item.options.forEach((option) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${index}" value="${option}" /> ${option}`;
      options.appendChild(label);
    });

    wrapper.append(title, options);
    quizForm.appendChild(wrapper);
  });
}

function renderMatching() {
  matchingForm.innerHTML = "";
  const shuffledRight = matchingPairs.map(([, right]) => right).sort(() => Math.random() - 0.5);

  matchingPairs.forEach(([left, correct], index) => {
    const row = document.createElement("div");
    row.className = "matching-row";

    const leftCol = document.createElement("strong");
    leftCol.textContent = `${index + 1}. ${left}`;

    const select = document.createElement("select");
    select.name = `match-${index}`;
    select.innerHTML = `<option value="">Таңдаңыз</option>`;

    shuffledRight.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });

    select.dataset.correct = correct;
    row.append(leftCol, select);
    matchingForm.appendChild(row);
  });
}

function renderNomenclature() {
  mapGrid.innerHTML = "";

  nomenclatureTasks.forEach((task, idx) => {
    const item = document.createElement("div");
    item.className = "nomenclature-item";

    const title = document.createElement("strong");
    title.textContent = `${idx + 1}. ${task.object}`;

    const select = document.createElement("select");
    select.name = `nomenclature-${idx}`;
    select.dataset.correct = task.answer;
    select.innerHTML = `<option value="">Аймақты таңдаңыз</option>`;

    regionOptions.forEach((region) => {
      const opt = document.createElement("option");
      opt.value = region;
      opt.textContent = region;
      select.appendChild(opt);
    });

    item.append(title, select);
    mapGrid.appendChild(item);
  });
}

function showResult(element, message, isSuccess) {
  element.textContent = message;
  element.classList.remove("ok", "bad");
  element.classList.add(isSuccess ? "ok" : "bad");
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("student-name").value.trim();
  const className = document.getElementById("student-class").value.trim();

  if (!name || !className) return;

  studentBadge.textContent = `Оқушы: ${name} | Сыныбы: ${className}`;
  welcome.classList.add("hidden");
  platform.classList.remove("hidden");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.add("hidden"));

    tab.classList.add("active");
    document.getElementById(target).classList.remove("hidden");
  });
});

document.getElementById("check-quiz").addEventListener("click", () => {
  let score = 0;

  quizQuestions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === question.answer) {
      score += 1;
    }
  });

  showResult(
    quizResult,
    `Нәтиже: ${score}/10. ${score >= 7 ? "Тамаша!" : "Қайталап оқып, қайта тексеріңіз."}`,
    score >= 7,
  );
});

document.getElementById("reset-quiz").addEventListener("click", () => {
  quizForm.reset();
  quizResult.textContent = "";
});

document.getElementById("check-matching").addEventListener("click", () => {
  const selects = Array.from(matchingForm.querySelectorAll("select"));
  let correctCount = 0;

  selects.forEach((select) => {
    if (select.value === select.dataset.correct) {
      correctCount += 1;
    }
  });

  showResult(
    matchingResult,
    `Дұрыс сәйкестік: ${correctCount}/6`,
    correctCount >= 4,
  );
});

document.getElementById("check-nomenclature").addEventListener("click", () => {
  const selects = Array.from(mapGrid.querySelectorAll("select"));
  let correctCount = 0;

  selects.forEach((select) => {
    if (select.value === select.dataset.correct) {
      correctCount += 1;
    }
  });

  showResult(
    nomenclatureResult,
    `Дұрыс жауап: ${correctCount}/${nomenclatureTasks.length}`,
    correctCount >= 3,
  );
});

renderQuiz();
renderMatching();
renderNomenclature();
