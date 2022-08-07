import http from "../http";

class NewslettersService {
  getAll() {
    return http.get("/newsletters");
  }

  getAllByTopic(topicId) {
    return http.get(`/newsletters/topic/${topicId}`);
  }

  getAllPublished() {
    return http.get("/newsletters/published");
  }

  get(id) {
    return http.get(`/newsletters/${id}`);
  }

  getCount() {
    return http.get("/newsletters/count");
  }

  create(newsletter) {
    return http.post("/newsletters", newsletter);
  }
}

export default new NewslettersService();
