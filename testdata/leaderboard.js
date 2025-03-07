import { faker } from "@faker-js/faker";

let leaderboardData = [];

for (let i = 0; i < 150; i++) {
  const username = faker.internet.displayName();
  const avatar_url = faker.image.avatar();
  const language = faker.helpers.arrayElement(["Spanish", "French", "German"]);
  const rank = faker.number.int({ max: 3000 });
  const userObj = {
    username: username,
    avatar_url: avatar_url,
    language: language,
    rank: rank,
  };
  leaderboardData.push(userObj);
}

module.exports = leaderboardData;
