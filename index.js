import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import fs from "fs";

const path = "./data.json";
const git = simpleGit();

const getAprilDates = () => {
  const dates = [];
  const start = moment("2025-04-01");
  const end = moment("2025-04-30");

  while (start.isSameOrBefore(end)) {
    dates.push(start.clone());
    start.add(1, "day");
  }

  return dates;
};

const commitApril = async () => {
  console.log("🚀 Генерация 70 коммитов за каждый день апреля 2025...");

  const dates = getAprilDates();

  for (let date of dates) {
    for (let j = 0; j < 70; j++) {
      const commitDate = date
        .clone()
        .hour(12)
        .minute(Math.floor(j / 60))
        .second(j % 60)
        .format();

      const data = { date: commitDate };
      fs.writeFileSync(path, JSON.stringify(data));

      await git.add([path]);
      await git.commit("YNTYMAK", { "--date": commitDate });
    }

    console.log(`✅ Готово: ${date.format("YYYY-MM-DD")}`);
  }

  await git.push();
  console.log("🎉 Все 30 дней апреля с 70 коммитами каждый — успешно отправлены!");
};

commitApril();
