const db = require("../models");
const Newsletter = db.newsletter;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.topic_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a new newsletter
  Newsletter.create({
    topic_id: req.body.topic_id,
    content_url: req.body.content_url,
    status: req.body.status,
    title: req.body.title,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Newsletter.",
      });
    });
};

exports.findAll = (req, res) => {
  // Find all newsletters sorted by createdAt desc
  Newsletter.findAll({
    order: [["createdAt", "DESC"]],
    include: "Topic",
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the Newsletter.",
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

  //Find a single newsletter with id
  Newsletter.findByPk(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the Newsletter.",
      });
    });
};

exports.findAllByTopic = (req, res) => {
  if (!req.params.topic_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Find all newsletters by topic id
  Newsletter.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      topic_id: req.params.topic_id,
    },
    include: "Topic",
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the Newsletter.",
      });
    });
};

exports.count = (req, res) => {
  Newsletter.count()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting the Newsletters.",
      });
    });
};

exports.delete = (req, res) => {};

exports.findAllPublished = (req, res) => {
  //Find all published newsletters
  Newsletter.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      status: "published",
    },
    include: "Topic",
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the Newsletter.",
      });
    });
};
