const db = require("../models");
const User = db.users;
const Topic = db.topics;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a new user
    User.create({
        name: req.body.name,
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findAllByTopic = (req, res) => {
    if (!req.params.topic_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Find all users by topic id
    User.findAll({
        where: {
            topic_id: req.params.topic_id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while finding Users by Topic."
        });
    });
};

exports.createSubscription = (req, res) => {
    if (!req.params.topic_id && !req.params.user_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a new subscription
    return User.findByPk(req.params.user_id).then(user => {
        return Topic.findByPk(req.params.topic_id).then(topic => {
            user.addTopic(topic);
            res.send(user);
            return user
        })
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating subscription."
        });
    });
}

exports.deleteSubscription = (req, res) => {
    if (!req.params.topic_id && !req.params.user_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Delete a subscription
    return User.findByPk(req.params.user_id).then(user => {
        return Topic.findByPk(req.params.topic_id).then(topic => {
            user.removeTopic(topic);
            res.send(user);
            return user
        })
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting subscription."
        });
    });
}

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
