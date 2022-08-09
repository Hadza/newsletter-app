const db = require("../models");
const Newsletter = db.newsletter;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

    // Function to locally store file from api and get the URL
    console.log(req.body, req.file)
    if (!req.body.topic) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    console.log(req)

    let {topic, users, title, send, file, newTopic} = req.body;

    // parse all body fields

    topic = JSON.parse(topic);
    users = JSON.parse(users);
    send = JSON.parse(send);
    newTopic = JSON.parse(newTopic);
    file = await req.file;


    console.log(file);
    // filter existing users outside this topic
    let usersToCreate = users.filter((user) => {
        return !user.topics
    });

    // users to add to this topic
    let usersToAdd = users.filter((user) => {
        return user.topics
    });

    const fileUrl = file.destination + "/" + file.filename;
    console.log('fileUrl ',fileUrl);

    if (newTopic) {
        topic = await db.topics
            .create(
                {
                    name: topic,
                    users: usersToCreate,
                    newsletters: [
                        {
                            title,
                            content_url: fileUrl,
                        },
                    ],
                },
                {
                    include: [
                        {model: db.users, as: "users", ignoreDuplicates: true},
                        {model: db.newsletter},
                    ],
                }
            )
            .catch((err) => {
                console.log(err);
            });
        await topic.addUsers(usersToAdd.map((user) => {
            return user.id;
        }));
    } else {
        await db.topics
            .findByPk(topic.value)
            .then( async (topic) => {
                usersToCreate = usersToCreate.map((user) => {
                    return {
                        ...user,
                    };
                });
                const createdUsers = await db.users.bulkCreate(usersToCreate).catch((err) => {
                    console.log('bulk error', err);
                });

                const result = await topic.addUsers(usersToAdd.concat(createdUsers).map((item)=> {
                    return item.id
                })).catch((err) => {
                    console.log('add users error', err);
                })

                const newsletter = await topic.createNewsletter({
                    title,
                    content_url: fileUrl,
                })
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

exports.delete = (req, res) => {
};

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
