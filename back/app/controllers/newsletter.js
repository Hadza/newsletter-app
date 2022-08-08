const db = require("../models");
const Newsletter = db.newsletter;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.topic) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let { content, topic, status, users, title, send, file, newTopic } = req.body;
  let newTopicData = {};

  console.log(users);
  let parsedUsers = users.map((user) => {
    return {
      ...user,
      subscription: {
        active: true,
      },
    };
  });
  console.log(parsedUsers);
  if (newTopic) {
    topic = await db.topics
      .create(
        {
          name: topic,
          users: parsedUsers,
          newsletters: [
            {
              title,
              content_url: "",
              status,
            },
          ],
        },
        {
          include: [
            { model: db.users, as: "users", ignoreDuplicates: true },
            { model: db.newsletter },
          ],
        }
      )
      .catch((err) => {
        console.log(err);
      });
  } else {
    await db.topics
      .findByPk(topic.id)
      .then((topic) => {
        topic.addUsers(parsedUsers).catch((err) => {
          console.log(err);
        });
        topic
          .addNewsletters({
            title,
            content_url: "",
            status,
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.sendStatus(200);

  // Create a new newsletter
};

exports.findAll = (req, res) => {
  // Find all newsletters sorted by createdAt desc
  Newsletter.findAll({
    order: [["createdAt", "DESC"]],
    include: "topic",
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
