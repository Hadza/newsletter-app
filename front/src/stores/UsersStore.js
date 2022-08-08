import { defineStore } from "pinia";
import UsersService from "@/services/UsersService";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsersCount: (state) => state.users.length,
    getUsersByTopic: (state) => (topic_id) => {
      return state.users.filter((user) => {
        return user.topics.some((topic) => {
          return topic.id === topic_id;
        });
      });
    },
  },
  actions: {
    getAll() {
      return UsersService.getAll()
        .then((data) => {
          this.users = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // create user
    createUser(user) {
      return UsersService.create(user)
        .then((data) => {
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // create users by bulk
    createUsers(users) {
      return UsersService.createUsers(users)
        .then((data) => {
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
