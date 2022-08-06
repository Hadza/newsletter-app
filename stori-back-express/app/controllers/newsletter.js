const db = require("../models");
const Newsletter = db.newsletter;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.topic_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a new newsletter
    Newsletter.create({
        topic_id: req.body.topic_id,
        content_url: req.body.content_url,
        status: 'pending'
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Newsletter."
        });
    });
};

exports.findAll = (req, res) => {
    // Find all newsletters
    Newsletter.findAll({
        attributes: ['id', 'topic_id', 'content_url', 'status']
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while finding the Newsletter."
        });
    });
};

exports.findOne = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Find a single newsletter with id
    Newsletter.findByPk(req.params.id).then(data => {
        res.send(data);
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while finding the Newsletter."
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

    //Find all newsletters by topic id
    Newsletter.findAll({
        where: {
            topic_id: req.params.topic_id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while finding the Newsletter."
        });
    });
};

exports.delete = (req, res) => {

};

exports.findAllPublished = (req, res) => {
    //Find all published newsletters
    Newsletter.findAll({
        where: {
            status: 'published'
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while finding the Newsletter."
        });
    });
};
