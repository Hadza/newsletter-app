import http from "../http";

class UsersService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  // get user by email
  findByEmail(email) {
    return http.get(`/users/email/${email}`);
  }
  create(user) {
    return http.post("/users", user);
  }

  createUsers(users) {
    return http.post("/users/bulk", users);
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

  deleteSubscription(user, topic) {
    return http.delete(`/users/${user}/${topic}`);
  }
}

export default new UsersService();
