import { defineStore } from "pinia/dist/pinia";

export const useStore = defineStore("main", {
  state: () => ({
    topics: [],
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
