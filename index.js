import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Буквы и их координаты (примерные дни для каждой буквы)
const letterDates = {
  Y: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 3 },
  ],
  N: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ],
  T: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
  ],
  M: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
    { x: 4, y: 0 },
  ],
  A: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 1 },
    { x: 4, y: 0 },
  ],
  K: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ],
};

// Функция для добавления коммитов
const markCommit = async (x, y) => {
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };

  await jsonfile.writeFile(path, data); // Пишем файл с новой датой
  await git.add([path]).commit(date, { "--date": date }).push(); // Делаем коммит
};

// Функция для создания всех коммитов
const makeCommits = async (letters) => {
  for (const letter of letters) {
    for (const { x, y } of letterDates[letter]) {
      await markCommit(x, y);
    }
  }
  git.push(); // Отправляем все изменения
};

// Запуск генерации коммитов для "YNTYMAK"
makeCommits(["Y", "N", "T", "Y", "M", "A", "K"]);
