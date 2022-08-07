import http from "../http";

class UsersService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(user) {
    return http.post("/users", user);
  }

  update(id, user) {
    return http.put(`/users/${id}`, user);
  }

  findAllByTopic(topicId) {
    return http.get(`/users/topic/${topicId}`);
  }

  createSubscription(id, subscription) {
    return http.post(`/users/${id}/subscriptions`, subscription);
  }
}

export default new UsersService();
