const db = require("../models");
const Topic = db.topics;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Topic.create({
    name: req.body.name,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Topic.",
      });
    });
};

exports.findAll = (req, res) => {
  // Find all topics
  Topic.findAll({
    attributes: ["id", "name", "createdAt", "updatedAt"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the Topics.",
      });
    });
};

exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Find a single topic with id
  Topic.findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the Topics.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Update a topic with id
  Topic.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the Topic.",
      });
    });
};

exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Delete a topic with id
  Topic.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Topic.",
      });
    });
};
