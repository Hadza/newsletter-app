import { defineStore } from "pinia";
import UsersService from "@/services/UsersService";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsersCount: (state) => state.users.length,
  },
  actions: {
    getAll() {
      UsersService.getAll()
        .then((data) => {
          this.users = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // create user
    createUser(user) {
      UsersService.create(user)
        .then((data) => {
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // create users by bulk
    createUsers(users) {
      UsersService.createUsers(users)
        .then((data) => {
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
