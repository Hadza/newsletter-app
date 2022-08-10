const db = require("../models");
const Newsletter = db.newsletter;
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require('util');


exports.create = async (req, res) => {
    if (!req.body.topic) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    console.log(req.body)

    let {topic, users, title, send, file, newTopic} = req.body;

    // parse all body fields
    console.log(users)

    topic = JSON.parse(topic);
    users = JSON.parse(users);
    send = JSON.parse(send);
    newTopic = JSON.parse(newTopic);
    file = await req.file;

    // filter existing users outside this topic
    console.log(users);
    let usersToCreate = users.filter((user) => {
        return !user.topics
    });
    console.log("usersToCreate", usersToCreate);

    // users to add to this topic
    let usersToAdd = users.filter((user) => {
        return user.topics
    });
    console.log("usersToAdd", usersToAdd);

    fs.rename('./uploads/' + file.filename, './uploads/' + file.originalname, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    const fileUrl = file.destination + "/" + file.originalname;

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
        console.log(topic);
        console.log(usersToAdd);
        await topic.addUsers(usersToAdd.map((user) => {
            return user.id;
        }));

        if (send) {
            await sendEmail(topic.newsletters[0].id);
        }
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

                if (send) {
                    await sendEmail(newsletter.id);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    res.sendStatus(200);
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

// Function to send newsletter by email to all users in a topic with nodemailer
exports.sendNewsletter = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const result = await sendEmail(req.params.id);

    res.sendStatus(200);
}

async function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            return callback(null, html);
        }
    });
}

async function sendEmail(id){
    const newsletter = await Newsletter.findByPk(id);
    const topic = await newsletter.getTopic();
    const users = await topic.getUsers();

    // Hack para analytics ¯\_(ツ)_/¯
    users.push({ id: -1, email: 'isaac.dexc@gmail.com'});

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "eddieisaac@gmail.com",
            pass: "xqokqxqujiqtuqfs",
        },
    });
    const html = await promisify(readHTMLFile)('./app/assets/email.html');

    console.log(html)


    const template = handlebars.compile(html);

    for await (const user of users) {
        // data for template with unsubscribe link to topic
        let data = {
            unsubscribe_url: `http://localhost:8080/#/topic/unsubscribe/${topic.id}/${user.id}`,
        }

        let htmlToSend = template(data);

        const mailOptions = {
            from: '"Isaac" <eddieisaac@gmail.com>"',
            to: user.email,
            subject: newsletter.title,
            text: "Theres a new newsletter!",
            html: htmlToSend,
            attachments: [
                {
                    filename: newsletter.content_url.split("/").pop(),
                    path: newsletter.content_url,
                },
            ],
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }

    // update status to sent
    db.newsletter.update({
        status: 'sent',
    },{
        where: {
            id: id,
        }
    });



}

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
