import { defineStore } from "pinia";
import TopicsService from "@/services/TopicsService";

export const useTopicsStore = defineStore("topics", {
  state: () => ({
    topics: [],
  }),
  getters: {
    getTopicsCount: (state) => state.topics.length,
  },
  actions: {
    getAll() {
      TopicsService.getAll()
        .then((data) => {
          this.topics = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // create topic
    async createTopic(topic) {
      console.log("topic", topic);
      return await TopicsService.create(topic).catch((err) => {
        console.log(err);
      });
    },
  },
});
