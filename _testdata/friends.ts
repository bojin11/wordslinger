import { faker } from "@faker-js/faker";
export type FriendList = {
  username: string;
  status: string;
  avatar_url: string;
};
let friendsListData: FriendList[] = [];

for (let i = 0; i < 50; i++) {
  const username = faker.internet.username();
  const avatar_url = faker.image.avatar();
  const status = faker.helpers.arrayElement(["friend"]);
  const friendObj: FriendList = {
    username: username,
    avatar_url: avatar_url,
    status: status,
  };
  friendsListData.push(friendObj);
}

export default friendsListData;
