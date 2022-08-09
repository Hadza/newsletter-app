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

  // send newsletter
  sendNewsletter(id) {
    return http.post(`/newsletters/send/${id}`);
  }

  create(newsletter) {
    // Create form data with all newsletter fields and files stringified
    const formData = new FormData();
    formData.append("title", newsletter.title);
    formData.append("topic", JSON.stringify(newsletter.topic));
    formData.append("users", JSON.stringify(newsletter.users));
    formData.append("file", newsletter.file);
    formData.append("send", newsletter.send);
    formData.append("newTopic", newsletter.newTopic);

    console.log(formData);

    return http.post("/newsletters", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new NewslettersService();
