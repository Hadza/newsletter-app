import { defineStore } from "pinia";
import NewslettersService from "@/services/NewslettersService";
import { useQuasar } from "quasar";

export const useNewslettersStore = defineStore("newsletters", {
  state: () => ({
    newsletters: [],
  }),
  getters: {
    getNewslettersCount: (state) => state.newsletters.length,
  },
  actions: {
    getAll() {
      NewslettersService.getAll()
        .then((data) => {
          this.newsletters = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
