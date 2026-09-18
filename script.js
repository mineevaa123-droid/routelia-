let selectedCountries = [];
let selectedCities = {};
let budgetMode = "";
let selectedSeason = "";

const seasons = {
  spring: "весна",
  summer: "лето",
  autumn: "осень",
  winter: "зима"
};

const cityData = {

  "Германия": {
    "Берлин": [75,35,10],
    "Мюнхен": [90,40,11],
    "Кёльн": [70,35,10],
    "Гамбург": [80,37,10]
  },

  "Франция": {
    "Париж": [105,45,12],
    "Ницца": [100,45,10],
    "Лион": [75,38,9],
    "Страсбург": [70,35,8]
  },

  "Испания": {
    "Барселона": [90,38,9],
    "Мадрид": [75,35,8],
    "Валенсия": [65,32,7],
    "Севилья": [60,30,6]
  },

  "Италия": {
    "Рим": [80,38,8],
    "Милан": [90,40,9],
    "Флоренция": [85,40,8],
    "Венеция": [105,45,10]
  },

  "Нидерланды": {
    "Амстердам": [110,45,12],
    "Роттердам": [80,38,10],
    "Гаага": [75,37,9],
    "Утрехт": [80,38,9]
  },

  "Австрия": {
    "Вена": [75,35,9],
    "Зальцбург": [90,40,9],
    "Инсбрук": [90,40,9]
  },

  "Чехия": {
    "Прага": [55,28,5],
    "Брно": [45,25,4],
    "Чески-Крумлов": [55,27,4]
  },

  "Португалия": {
    "Лиссабон": [70,32,7],
    "Порту": [60,30,6],
    "Фару": [65,30,6]
  },

  "Швейцария": {
    "Цюрих": [130,55,15],
    "Женева": [135,55,14],
    "Люцерн": [140,55,14]
  },

  "Бельгия": {
    "Брюссель": [75,35,8],
    "Брюгге": [85,38,7],
    "Антверпен": [70,35,7]
  }

};


/* СЕЗОННЫЕ КОЭФФИЦИЕНТЫ */

const seasonRates = {

  "Барселона": [1,.95,1.2,1,.85],
  "Ницца": [1,.95,1.2,.95,.85],
  "Валенсия": [1,.95,1.15,.95,.85],
  "Фару": [1,.95,1.15,.95,.8],

  "Амстердам": [1,1.1,1.15,.95,.9],
  "Мюнхен": [1,.95,1.1,1.15,1],
  "Зальцбург": [1,.95,1.1,1,1.05],
  "Инсбрук": [1,.95,1.05,.95,1.15],

  "Париж": [1,1,1.15,1,.9],
  "Рим": [1,1,1.15,1,.9],
  "Венеция": [1,1,1.2,.95,.85],

  "Прага": [1,1,1.1,.95,1],
  "Лиссабон": [1,1,1.15,.95,.85],

  "Берлин": [1,.95,1.1,.95,.9],
  "Кёльн": [1,.95,1.05,.95,1],
  "Гамбург": [1,.95,1.05,.9,.9],

  "Лион": [1,.95,1.05,.95,.9],
  "Страсбург": [1,.95,1.05,.95,1.1],

  "Мадрид": [1,1,1.05,.95,.9],
  "Севилья": [1,1.05,1,.95,.85],

  "Милан": [1,1,1.1,1,.9],
  "Флоренция": [1,1,1.15,.95,.85],

  "Роттердам": [1,.95,1.05,.9,.85],
  "Гаага": [1,1,1.1,.9,.85],
  "Утрехт": [1,.95,1.05,.9,.85],

  "Вена": [1,.95,1.05,.95,1.05],

  "Брно": [1,.95,1,.9,.85],
  "Чески-Крумлов": [1,.95,1.1,.9,.8],

  "Порту": [1,1,1.1,.95,.85],

  "Цюрих": [1,.95,1.05,.95,1],
  "Женева": [1,.95,1.05,.9,.95],
  "Люцерн": [1,.95,1.1,.95,1.1],

  "Брюссель": [1,.95,1.05,.9,1],
  "Брюгге": [1,1,1.15,.95,1.05],
  "Антверпен": [1,.95,1.05,.9,.9]

};


/* КОРОТКИЕ ОПИСАНИЯ */

const seasonText = {
  spring: "Весной обычно комфортно гулять и посещать достопримечательности.",
  summer: "Летом больше светового дня и активностей на улице, но спрос может быть выше.",
  autumn: "Осенью становится прохладнее и обычно спокойнее.",
  winter: "Зимой прохладнее, зато можно сделать акцент на музеях, кафе и зимней атмосфере."
};


/* ОТКРЫТЬ */

function openPlanner() {

  document
    .getElementById("planner")
    .classList.add("active");

  document
    .getElementById("planner")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* ЗАКРЫТЬ */

function closePlanner() {

  document
    .getElementById("planner")
    .classList.remove("active");

  document
    .getElementById("result")
    .classList.remove("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* СТРАНА */

function toggleCountry(button, country) {

  if (selectedCountries.includes(country)) {

    selectedCountries =
      selectedCountries.filter(
        x => x !== country
      );

    delete selectedCities[country];

    button.classList.remove("selected");

    const section =
      document.getElementById("cities-" + country);

    if (section) section.remove();

  } else {

    selectedCountries.push(country);
    selectedCities[country] = [];

    button.classList.add("selected");

    createCitySection(country);
  }

  updateSelectedCountries();
}


/* ГОРОДА */

function createCitySection(country) {

  const section =
    document.createElement("div");

  section.className =
    "city-section active";

  section.id =
    "cities-" + country;

  const title =
    document.createElement("div");

  title.className =
    "city-title";

  title.textContent =
    "Города — " + country;

  const grid =
    document.createElement("div");

  grid.className =
    "city-grid";

  const cities =
    Object.keys(cityData[country]);

  cities.forEach((city,index) => {

    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "city-button";
    button.textContent = city;

    if (index >= 2) {
      button.classList.add("extra-city");
    }

    button.onclick = () => {
      toggleCity(button,country,city);
    };

    grid.appendChild(button);

  });


  if (cities.length > 2) {

    const show =
      document.createElement("button");

    show.className =
      "show-all";

    show.textContent =
      "Показать все";

    show.onclick = () => {

      grid.classList.toggle("show-all");

      show.textContent =
        grid.classList.contains("show-all")
          ? "Скрыть"
          : "Показать все";
    };

    section.appendChild(title);
    section.appendChild(grid);
    section.appendChild(show);

  } else {

    section.appendChild(title);
    section.appendChild(grid);
  }


  /*
    Подсказка оставляем,
    но больше НЕ показываем
    "Выбрано: город".
  */

  const selected =
    document.createElement("div");

  selected.className =
    "selected-cities";

  selected.id =
    "selected-" + country;

  selected.textContent =
    "Выбери один или несколько городов";

  section.appendChild(selected);

  document
    .getElementById("citySections")
    .appendChild(section);
}


/* ГОРОД */

function toggleCity(button,country,city) {

  if (
    selectedCities[country].includes(city)
  ) {

    selectedCities[country] =
      selectedCities[country].filter(
        x => x !== city
      );

    button.classList.remove("selected");

  } else {

    selectedCities[country].push(city);

    button.classList.add("selected");
  }

  updateSelectedCities(country);
  updateSeasonInfo();
}


function updateSelectedCities(country) {

  const element =
    document.getElementById(
      "selected-" + country
    );

  const cities =
    selectedCities[country];

  /*
    Если город выбран — ничего не выводим.
    Поэтому "Выбрано: Барселона" исчезает.
  */

  if (!cities.length) {

    element.textContent =
      "Выбери один или несколько городов";

    return;
  }

  element.textContent = "";
}


/* СТРАНЫ */

function updateSelectedCountries() {

  const element =
    document.getElementById(
      "selectedCountries"
    );

  const reset =
    document.getElementById(
      "resetCountries"
    );

  if (!selectedCountries.length) {

    element.textContent =
      "Сначала выбери страны";

    reset.classList.remove("active");

    return;
  }

  element.textContent =
    "Страны: " +
    selectedCountries.join(", ");

  reset.classList.add("active");
}


/* СБРОС */

function resetCountries() {

  selectedCountries = [];
  selectedCities = {};

  document
    .querySelectorAll(".country-button")
    .forEach(button => {
      button.classList.remove("selected");
    });

  document
    .getElementById("citySections")
    .innerHTML = "";

  updateSelectedCountries();
  updateSeasonInfo();
}


/* СЕЗОН */

function selectSeason(season) {

  selectedSeason = season;

  document
    .querySelectorAll(".season-button")
    .forEach(button => {
      button.classList.remove("selected");
    });

  const buttons =
    document.querySelectorAll(
      ".season-button"
    );

  const index = {
    spring: 0,
    summer: 1,
    autumn: 2,
    winter: 3
  }[season];

  buttons[index].classList.add("selected");

  updateSeasonInfo();
}


function updateSeasonInfo() {

  const info =
    document.getElementById("seasonInfo");

  if (!selectedSeason) {

    info.textContent =
      "Выбери сезон, чтобы увидеть особенности поездки.";

    return;
  }

  if (!selectedCountries.length) {

    info.textContent =
      seasonText[selectedSeason];

    return;
  }

  let text = "";

  selectedCountries.forEach(country => {

    const cities =
      selectedCities[country] || [];

    cities.forEach(city => {

      text +=
        city +
        " — " +
        getCitySeasonText(city) +
        " ";

    });

  });

  info.textContent =
    text ||
    seasonText[selectedSeason];
}


function getCitySeasonText(city) {

  const special = {

    "Барселона": {
      spring: "море и город уже комфортны для прогулок",
      summer: "пляжи, море и много туристов",
      autumn: "тепло и спокойнее, чем летом",
      winter: "мягкая погода и меньше туристов"
    },

    "Париж": {
      spring: "парки и прогулки особенно приятны",
      summer: "длинные дни и высокий туристический спрос",
      autumn: "музеи и прогулки без летней жары",
      winter: "музеи и городская атмосфера"
    },

    "Амстердам": {
      spring: "каналы, велосипеды и сезон тюльпанов",
      summer: "длинные дни и прогулки по каналам",
      autumn: "прохладнее и спокойнее",
      winter: "холодно, зато красивый праздничный центр"
    },

    "Рим": {
      spring: "комфортно осматривать достопримечательности",
      summer: "жарко и много туристов",
      autumn: "приятно гулять по историческому центру",
      winter: "прохладнее и спокойнее"
    },

    "Прага": {
      spring: "приятно гулять по историческому центру",
      summer: "тепло и много туристов",
      autumn: "уютно и прохладнее",
      winter: "рождественская атмосфера"
    }

  };

  if (
    special[city] &&
    special[city][selectedSeason]
  ) {
    return special[city][selectedSeason];
  }

  return seasonText[selectedSeason];
}


/* БЮДЖЕТ */

function selectBudget(mode) {

  budgetMode = mode;

  document
    .querySelectorAll(".budget-button")
    .forEach(button => {
      button.classList.remove("selected");
    });

  const button =
    document.getElementById(
      mode === "have"
        ? "budgetHave"
        : "budgetCalculate"
    );

  if (button) {
    button.classList.add("selected");
  }

  document
    .getElementById("budgetInput")
    .classList.toggle(
      "active",
      mode === "have"
    );
}


/* СЛОВО ДЕНЬ */

function dayWord(number) {

  if (number === 1) return "день";

  if (
    number >= 2 &&
    number <= 4
  ) return "дня";

  return "дней";
}


/* РАСЧЁТ */

function createTrip() {

  const from =
    document.getElementById("from")
      .value.trim();

  const days =
    Number(
      document.getElementById("days").value
    );


  if (!from) {
    alert("Укажи город отправления");
    return;
  }

  if (!selectedCountries.length) {
    alert("Выбери хотя бы одну страну");
    return;
  }

  if (!selectedSeason) {
    alert("Выбери сезон");
    return;
  }

  if (!days || days < 1 || days > 90) {
    alert("Количество дней должно быть от 1 до 90");
    return;
  }

  if (!budgetMode) {
    alert("Выбери вариант бюджета");
    return;
  }

  if (
    budgetMode === "have" &&
    !Number(
      document.getElementById("budget").value
    )
  ) {
    alert("Укажи свой бюджет");
    return;
  }


  for (const country of selectedCountries) {

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


  let tripCities = [];

  selectedCountries.forEach(country => {

    selectedCities[country].forEach(city => {

      tripCities.push({
        country,
        city
      });

    });

  });


  const baseDays =
    Math.floor(
      days / tripCities.length
    );

  const extraDays =
    days % tripCities.length;


  if (baseDays < 1) {

    alert(
      "Для такого количества городов нужно больше дней."
    );

    return;
  }


  tripCities.forEach((item,index) => {

    item.days =
      baseDays +
      (index < extraDays ? 1 : 0);

  });


  /* ДОРОГА */

  let flightCost;

  if (
    from.toLowerCase()
      .includes("новосибир")
  ) {

    flightCost =
      selectedCountries.length === 1
        ? 350
        : 450;

  } else {

    flightCost =
      selectedCountries.length === 1
        ? 180
        : 280;
  }


  /* ПРОЖИВАНИЕ */

  let hotelCost = 0;

  tripCities.forEach(item => {

    const data =
      cityData[item.country][item.city];

    const rates =
      seasonRates[item.city] || [1,1,1,1,1];

    const seasonIndex = {
      spring: 1,
      summer: 2,
      autumn: 3,
      winter: 4
    }[selectedSeason];

    hotelCost +=
      data[0] *
      rates[seasonIndex] *
      item.days;

  });


  hotelCost =
    Math.round(hotelCost);


  /* ЕДА */

  let foodCost = 0;

  tripCities.forEach(item => {

    foodCost +=
      cityData[item.country][item.city][1] *
      item.days;

  });


  /* ТРАНСПОРТ */

  let localTransport = 0;

  tripCities.forEach(item => {

    localTransport +=
      cityData[item.country][item.city][2] *
      item.days;

  });


  const intercityTrips =
    Math.max(
      0,
      tripCities.length - 1
    );

  const intercityCost =
    intercityTrips * 65;

  const transportCost =
    localTransport +
    intercityCost;


  /* РАЗВЛЕЧЕНИЯ */

  const funCost =
    days * 15;


  /* ИТОГ */

  const total =
    flightCost +
    hotelCost +
    transportCost +
    foodCost +
    funCost;


  const lower =
    Math.round(
      total * .9 / 10
    ) * 10;

  const upper =
    Math.round(
      total * 1.15 / 10
    ) * 10;


  /* МАРШРУТ */

  const route =
    document.getElementById("route");

  route.innerHTML = "";


  addRouteCity(from);


  tripCities.forEach(item => {

    addRouteArrow();
    addRouteCity(item.city);

  });


  /* ТЕКСТ */

  document.getElementById(
    "resultText"
  ).textContent =

    "Поездка на " +
    days +
    " " +
    dayWord(days) +
    " · " +
    seasons[selectedSeason] +
    " · " +
    selectedCountries.length +
    " " +
    (
      selectedCountries.length === 1
        ? "страна"
        : "страны"
    ) +
    " · " +
    tripCities.length +
    " " +
    (
      tripCities.length === 1
        ? "город"
        : "города"
    ) +
    ".";


  /* СТОИМОСТЬ */

  document.getElementById(
    "totalCost"
  ).textContent =

    "€" +
    lower.toLocaleString("ru-RU") +
    "–€" +
    upper.toLocaleString("ru-RU");


  document.getElementById(
    "flightCost"
  ).textContent =
    "≈ €" + flightCost;

  document.getElementById(
    "hotelCost"
  ).textContent =
    "≈ €" +
    hotelCost.toLocaleString("ru-RU");

  document.getElementById(
    "transportCost"
  ).textContent =
    "≈ €" +
    transportCost.toLocaleString("ru-RU");

  document.getElementById(
    "foodCost"
  ).textContent =
    "≈ €" +
    foodCost.toLocaleString("ru-RU");

  document.getElementById(
    "funCost"
  ).textContent =
    "≈ €" +
    funCost.toLocaleString("ru-RU");


  /* БЮДЖЕТ */

  const budgetResult =
    document.getElementById(
      "budgetResult"
    );


  if (budgetMode === "have") {

    const budget =
      Number(
        document.getElementById("budget").value
      );

    if (budget < lower) {

      budgetResult.textContent =
        "Указанный бюджет ниже ориентировочной стоимости маршрута. Можно уменьшить количество городов или дней.";

    } else if (budget >= upper) {

      budgetResult.textContent =
        "Указанного бюджета ориентировочно достаточно для этого маршрута. Дополнительный запас всё равно пригодится.";

    } else {

      budgetResult.textContent =
        "Бюджет близок к ориентировочной стоимости поездки. Лучше оставить небольшой запас.";
    }

  } else {

    budgetResult.textContent =
      "Расчёт выполнен без заданного бюджета — используй сумму как ориентир.";
  }


  /* ПЛАН */

  const plan =
    document.getElementById(
      "countryPlan"
    );

  plan.innerHTML = "";


  tripCities.forEach(item => {

    const data =
      cityData[item.country][item.city];

    const rates =
      seasonRates[item.city] || [1,1,1,1,1];

    const seasonIndex = {
      spring: 1,
      summer: 2,
      autumn: 3,
      winter: 4
    }[selectedSeason];

    const hotel =
      Math.round(
        data[0] *
        rates[seasonIndex] *
        item.days
      );


    const block =
      document.createElement("div");

    block.className =
      "country-item";


    block.innerHTML =

      '<div class="country-name">' +
      item.country +
      " · " +
      item.city +
      "</div>" +

      '<div class="country-info">' +
      item.days +
      " " +
      dayWord(item.days) +
      " · проживание ≈ €" +
      hotel.toLocaleString("ru-RU") +
      " · еда ≈ €" +
      (
        data[1] *
        item.days
      ).toLocaleString("ru-RU") +
      "</div>" +

      '<div class="season-result">' +
      seasons[selectedSeason] +
      " — " +
      getCitySeasonText(item.city) +
      "</div>";


    plan.appendChild(block);

  });


  document
    .getElementById("result")
    .classList.add("active");

  document
    .getElementById("result")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* МАРШРУТ */

function addRouteCity(name) {

  const route =
    document.getElementById("route");

  const span =
    document.createElement("span");

  span.className = "city";
  span.textContent = name;

  route.appendChild(span);
}


function addRouteArrow() {

  const route =
    document.getElementById("route");

  const span =
    document.createElement("span");

  span.className = "city";
  span.textContent = "→";

  route.appendChild(span);
}


/* ASSISTANT */

function toggleAssistant() {

  document
    .getElementById("assistantBox")
    .classList.toggle("active");

}
