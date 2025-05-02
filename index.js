import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Словарь с датами для каждой буквы
const letterDates = {
  Y: [
    moment().subtract(1, "year").add(1, "day").add(1, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(1, "weeks").add(2, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(2, "weeks").add(2, "days").format(),
  ],
  N: [
    moment().subtract(1, "year").add(1, "day").add(2, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(3, "weeks").add(2, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(3, "weeks").add(3, "days").format(),
  ],
  T: [
    moment().subtract(1, "year").add(1, "day").add(2, "weeks").add(3, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(3, "weeks").add(4, "days").format(),
  ],
  Y2: [
    moment().subtract(1, "year").add(1, "day").add(4, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(4, "weeks").add(2, "days").format(),
  ],
  M: [
    moment().subtract(1, "year").add(1, "day").add(5, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(5, "weeks").add(2, "days").format(),
  ],
  A: [
    moment().subtract(1, "year").add(1, "day").add(6, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(6, "weeks").add(2, "days").format(),
  ],
  K: [
    moment().subtract(1, "year").add(1, "day").add(7, "weeks").add(1, "days").format(),
    moment().subtract(1, "year").add(1, "day").add(7, "weeks").add(2, "days").format(),
  ],
};

const path = "./data.json";

// Функция для добавления коммита
const markCommit = (date) => {
  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit("YNTYMAK", { "--date": date }).push();
  });
};

// Функция для создания всех коммитов для "YNTYMAK"
const makeCommits = () => {
  console.log("Starting commit generation...");
  // Перебираем все буквы и даты
  for (const letter in letterDates) {
    const dates = letterDates[letter];
    for (const commitDate of dates) {
      markCommit(commitDate); // Создаем коммит для каждой даты
    }
  }
  console.log("Commits finished!");
};

// Запускаем создание коммитов
makeCommits();
