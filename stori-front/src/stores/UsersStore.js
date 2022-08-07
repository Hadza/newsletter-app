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
  },
});
