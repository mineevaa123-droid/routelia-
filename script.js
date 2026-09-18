let selectedCountries = [];
let selectedCities = {};
let selectedSeason = "";
let budgetMode = "";

const seasonNames = {
  spring: "🌸 Весна",
  summer: "☀️ Лето",
  autumn: "🍂 Осень",
  winter: "❄️ Зима"
};

const cityData = {
  "Германия": {
    "Берлин": { price: 75 },
    "Мюнхен": { price: 85 },
    "Кёльн": { price: 70 },
    "Гамбург": { price: 75 }
  },

  "Франция": {
    "Париж": { price: 100 },
    "Ницца": { price: 95 },
    "Лион": { price: 75 },
    "Страсбург": { price: 70 }
  },

  "Испания": {
    "Барселона": { price: 90 },
    "Мадрид": { price: 80 },
    "Валенсия": { price: 70 },
    "Севилья": { price: 65 }
  },

  "Италия": {
    "Рим": { price: 90 },
    "Милан": { price: 95 },
    "Флоренция": { price: 85 },
    "Венеция": { price: 100 }
  },

  "Нидерланды": {
    "Амстердам": { price: 100 },
    "Роттердам": { price: 80 },
    "Гаага": { price: 80 },
    "Утрехт": { price: 85 }
  },

  "Австрия": {
    "Вена": { price: 80 },
    "Зальцбург": { price: 85 },
    "Инсбрук": { price: 90 }
  },

  "Чехия": {
    "Прага": { price: 65 },
    "Брно": { price: 55 },
    "Чески-Крумлов": { price: 60 }
  },

  "Португалия": {
    "Лиссабон": { price: 75 },
    "Порту": { price: 65 },
    "Фару": { price: 60 }
  },

  "Швейцария": {
    "Цюрих": { price: 130 },
    "Женева": { price: 125 },
    "Люцерн": { price: 120 }
  },

  "Бельгия": {
    "Брюссель": { price: 80 },
    "Брюгге": { price: 85 },
    "Антверпен": { price: 75 }
  }
};

const allowedDepartureCities = [
  "новосибирск",
  "москва",
  "санкт-петербург",
  "спб",
  "екатеринбург",
  "казань",
  "омск",
  "самара",
  "ростов-на-дону",
  "нижний новгород",
  "уфа",
  "красноярск",
  "пермь",
  "воронеж",
  "волгоград",
  "сочи",
  "калининград",
  "минск",
  "алматы",
  "астана"
];


/* =========================
   ПЛАНИРОВЩИК
========================= */

function openPlanner() {

  const planner =
    document.getElementById("planner");

  if (!planner) {

    alert(
      "Планировщик не найден. Проверь id=\"planner\" в index.html"
    );

    return;
  }

  planner.style.display = "block";

  setTimeout(function() {

    planner.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 100);
}


function closePlanner() {

  const planner =
    document.getElementById("planner");

  if (!planner) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   СТРАНЫ
========================= */

function toggleCountry(button, country) {

  if (selectedCountries.includes(country)) {

    selectedCountries =
      selectedCountries.filter(
        c => c !== country
      );

    delete selectedCities[country];

    button.classList.remove("selected");

  } else {

    selectedCountries.push(country);

    selectedCities[country] = [];

    button.classList.add("selected");
  }

  updateSelectedCountries();
  updateCitySections();
  updateSeasonInfo();
}


function updateSelectedCountries() {

  const element =
    document.getElementById("selectedCountries");

  if (!element) return;

  if (!selectedCountries.length) {

    element.textContent =
      "Сначала выбери страны";

    return;
  }

  element.textContent =
    "Страны: " +
    selectedCountries.join(", ");
}


/* =========================
   ГОРОДА
========================= */

function updateCitySections() {

  const container =
    document.getElementById("citySections");

  if (!container) return;

  container.innerHTML = "";

  selectedCountries.forEach(country => {

    const section =
      document.createElement("div");

    section.className =
      "city-section";


    const title =
      document.createElement("h3");

    title.textContent =
      "Города — " + country;

    section.appendChild(title);


    const grid =
      document.createElement("div");

    grid.className =
      "city-grid";


    Object.keys(cityData[country]).forEach(city => {

      const button =
        document.createElement("button");

      button.className =
        "city-button";

      button.type = "button";

      button.textContent =
        city;


      if (
        selectedCities[country] &&
        selectedCities[country].includes(city)
      ) {

        button.classList.add("selected");
      }


      button.addEventListener(
        "click",
        function() {

          toggleCity(
            country,
            city,
            button
          );

        }
      );


      grid.appendChild(button);

    });


    section.appendChild(grid);


    const selected =
      document.createElement("div");

    selected.className =
      "selected-cities";

    selected.id =
      "selected-" + country;

    section.appendChild(selected);


    container.appendChild(section);

  });
}


function toggleCity(country, city, button) {

  if (!selectedCities[country]) {

    selectedCities[country] = [];
  }


  if (
    selectedCities[country].includes(city)
  ) {

    selectedCities[country] =
      selectedCities[country].filter(
        c => c !== city
      );

    button.classList.remove("selected");

  } else {

    selectedCities[country].push(city);

    button.classList.add("selected");
  }

  updateSeasonInfo();
}


function resetCountries() {

  selectedCountries = [];

  selectedCities = {};


  document
    .querySelectorAll(".country-button")
    .forEach(button => {

      button.classList.remove("selected");

    });


  updateSelectedCountries();
  updateCitySections();
  updateSeasonInfo();
}


/* =========================
   СЕЗОН
========================= */

function selectSeason(season) {

  selectedSeason =
    season;


  document
    .querySelectorAll(".season-button")
    .forEach(button => {

      button.classList.remove("selected");

    });


  const seasonWords = {

    spring: "Весна",
    summer: "Лето",
    autumn: "Осень",
    winter: "Зима"

  };


  document
    .querySelectorAll(".season-button")
    .forEach(button => {

      if (
        button.textContent.includes(
          seasonWords[season]
        )
      ) {

        button.classList.add("selected");
      }

    });


  updateSeasonInfo();
}


function updateSeasonInfo() {

  const element =
    document.getElementById("seasonInfo");

  if (!element) return;


  if (!selectedSeason) {

    element.textContent =
      "Выбери сезон, чтобы увидеть особенности поездки.";

    return;
  }


  if (!selectedCountries.length) {

    element.textContent =
      "Сначала выбери страны.";

    return;
  }


  const blocks = [];


  selectedCountries.forEach(country => {

    const cities =
      selectedCities[country] || [];


    if (!cities.length) {

      blocks.push(
        "<strong>" +
        country +
        "</strong><br>" +
        "Выбери город, чтобы увидеть особенности сезона."
      );

      return;
    }


    cities.forEach(city => {

      let text = "";


      if (
        typeof seasonInfo !== "undefined" &&
        seasonInfo[country] &&
        seasonInfo[country][city]
      ) {

        text =
          seasonInfo[country][city]
            [selectedSeason];

      }


      if (!text) {

        text =
          "Информация о сезоне пока недоступна.";
      }


      blocks.push(

        "<strong>" +
        country +
        " — " +
        city +
        "</strong><br>" +
        text

      );

    });

  });


  element.innerHTML =

    "<div class='season-result'>" +

      "<div class='season-result-title'>" +
        "Особенности: " +
        seasonNames[selectedSeason] +
      "</div>" +

      blocks.join(
        "<div class='season-divider'></div>"
      ) +

    "</div>";
}


/* =========================
   БЮДЖЕТ
========================= */

function selectBudget(mode) {

  budgetMode =
    mode;


  document
    .querySelectorAll(".budget-button")
    .forEach(button => {

      button.classList.remove("selected");

    });


  const input =
    document.getElementById("budgetInput");


  if (mode === "have") {

    const button =
      document.getElementById("budgetHave");

    if (button) {

      button.classList.add("selected");
    }


    if (input) {

      input.classList.add("active");
    }

  } else {

    const button =
      document.getElementById("budgetCalculate");

    if (button) {

      button.classList.add("selected");
    }


    if (input) {

      input.classList.remove("active");
    }

  }
}


/* =========================
   ПРОВЕРКА ОТПРАВЛЕНИЯ
========================= */

function validateDepartureCity(value) {

  const city =
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  return allowedDepartureCities.includes(city);
}


/* =========================
   СОЗДАНИЕ ПОЕЗДКИ
========================= */

function createTrip() {

  const fromElement =
    document.getElementById("from");

  const daysElement =
    document.getElementById("days");


  const from =
    fromElement
      ? fromElement.value
      : "";


  const days =
    daysElement
      ? Number(daysElement.value)
      : 0;


  if (!validateDepartureCity(from)) {

    alert(
      "Укажи реальный город отправления из списка."
    );

    return;
  }


  if (!selectedCountries.length) {

    alert(
      "Выбери хотя бы одну страну."
    );

    return;
  }


  for (
    const country of selectedCountries
  ) {

    if (
      !selectedCities[country] ||
      !selectedCities[country].length
    ) {

      alert(
        "Выбери хотя бы один город в стране: " +
        country
      );

      return;
    }
  }


  if (
    !days ||
    days < 1 ||
    days > 90
  ) {

    alert(
      "Количество дней должно быть от 1 до 90."
    );

    return;
  }


  if (!selectedSeason) {

    alert(
      "Выбери сезон."
    );

    return;
  }


  if (!budgetMode) {

    alert(
      "Выбери вариант бюджета."
    );

    return;
  }


  if (budgetMode === "have") {

    const budgetElement =
      document.getElementById("budget");


    const budget =
      budgetElement
        ? Number(budgetElement.value)
        : 0;


    if (!budget || budget < 1) {

      alert(
        "Укажи свой бюджет."
      );

      return;
    }
  }


  createRoute(days);

  createCosts(days);

  createCountryPlan();


  const result =
    document.getElementById("result");


  if (result) {

    result.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================
   МАРШРУТ
========================= */

function createRoute(days) {

  const route =
    document.getElementById("route");

  if (!route) return;


  route.innerHTML = "";


  selectedCountries.forEach(
    (country, index) => {

      const block =
        document.createElement("div");

      block.className =
        "route-item";


      block.innerHTML =

        "<div class='route-number'>" +

          String(index + 1)
            .padStart(2, "0") +

        "</div>" +

        "<div>" +

          "<strong>" +
            country +
          "</strong>" +

          "<p>" +
            selectedCities[country]
              .join(" · ") +
          "</p>" +

        "</div>";


      route.appendChild(block);

    }
  );


  const resultText =
    document.getElementById("resultText");


  if (resultText) {

    resultText.textContent =

      "Поездка на " +
      days +
      " " +
      getDayWord(days) +
      " · " +
      selectedCountries.join(" → ") +
      ".";

  }
}


/* =========================
   СТОИМОСТЬ
========================= */

function createCosts(days) {

  const countryCount =
    selectedCountries.length;


  const cityCount =
    Object.values(selectedCities)
      .flat()
      .length;


  const fromElement =
    document.getElementById("from");


  const from =
    fromElement
      ? fromElement.value.toLowerCase()
      : "";


  let flight;


  if (
    from.includes("новосибирск")
  ) {

    flight =
      countryCount === 1
        ? 350
        : 450;

  } else {

    flight =
      countryCount === 1
        ? 180
        : 280;
  }


  let hotelPerNight = 0;


  selectedCountries.forEach(country => {

    selectedCities[country]
      .forEach(city => {

        hotelPerNight +=
          cityData[country][city].price;

      });

  });


  const hotel =
    Math.round(
      hotelPerNight *
      (days / cityCount)
    );


  const transport =
    days *
    (
      countryCount > 1
        ? 18
        : 12
    );


  const food =
    days * 35;


  const fun =
    days * 18;


  const total =
    flight +
    hotel +
    transport +
    food +
    fun;


  const elements = {

    flightCost: flight,
    hotelCost: hotel,
    transportCost: transport,
    foodCost: food,
    funCost: fun,
    totalCost: total

  };


  Object.keys(elements).forEach(id => {

    const element =
      document.getElementById(id);

    if (element) {

      element.textContent =
        "€" + elements[id];

    }
  });


  const budgetResult =
    document.getElementById("budgetResult");


  if (!budgetResult) return;


  if (budgetMode === "have") {

    const budgetElement =
      document.getElementById("budget");

    const budget =
      budgetElement
        ? Number(budgetElement.value)
        : 0;


    if (budget >= total) {

      budgetResult.textContent =
        "Ваш бюджет покрывает ориентировочную стоимость поездки.";

    } else {

      budgetResult.textContent =
        "Ориентировочная стоимость выше указанного бюджета.";

    }

  } else {

    budgetResult.textContent =
      "Routelia рассчитала примерный бюджет поездки.";

  }
}


/* =========================
   ПЛАН ПО СТРАНАМ
========================= */

function createCountryPlan() {

  const container =
    document.getElementById("countryPlan");

  if (!container) return;


  container.innerHTML = "";


  selectedCountries.forEach(country => {

    const countryBlock =
      document.createElement("div");

    countryBlock.className =
      "country-plan-block";


    const title =
      document.createElement("h4");

    title.textContent =
      country;


    countryBlock.appendChild(title);


    selectedCities[country]
      .forEach(city => {

        const item =
          document.createElement("div");

        item.className =
          "city-plan-item";


        let description = "";


        if (
          typeof seasonInfo !== "undefined" &&
          seasonInfo[country] &&
          seasonInfo[country][city]
        ) {

          description =
            seasonInfo[country][city]
              [selectedSeason] || "";

        }


        if (!description) {

          description =
            "Информация о сезоне пока недоступна.";

        }


        item.innerHTML =

          "<strong>" +
            city +
          "</strong>" +

          "<p>" +
            description +
          "</p>";


        countryBlock.appendChild(item);

      });


    container.appendChild(countryBlock);

  });
}


/* =========================
   ДЕНЬ / ДНЯ / ДНЕЙ
========================= */

function getDayWord(days) {

  if (
    days % 10 === 1 &&
    days % 100 !== 11
  ) {

    return "день";
  }


  if (
    days % 10 >= 2 &&
    days % 10 <= 4 &&
    (
      days % 100 < 10 ||
      days % 100 >= 20
    )
  ) {

    return "дня";
  }


  return "дней";
}


/* =========================
   ASSISTANT
========================= */

function toggleAssistant() {

  const box =
    document.getElementById("assistantBox");

  if (!box) return;

  box.classList.toggle("active");
}


/* =========================
   ЗАПУСК
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateSelectedCountries();
    updateCitySections();
    updateSeasonInfo();

  }
);
