const Task = require('../models/task.js');
const User = require('../models/user.js')
const succes = require('../helpers/response.js').succes
const error = require('../helpers/response.js').error

let create = (req, res) => {
    let { name, description, due_date } = req.body;
    let owner = req.headers.authorization;

    let task = new Task({
        owner, name, description, due_date
    });

    task.save()
        .then((data) => {
            succes(res, data, 201)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let show_all = (req, res) => {
    Task.find({owner: req.headers.authorization})
    // const pageCount = Math.ceil(tasks.length / 10);
    // let page = parseInt(req.query.p);
    // if (!page) { page = 1;}
    // if (page > pageCount {
    //     page = pageCount
    //     }
        .then(data => {
            succes(res, data, 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let show_uncomplete = (req, res) => {
    Task.find({owner: req.headers.authorization})
        .then(data => {
            succes(res, data.filter(i => !i.completion), 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let show_completed = (req, res) => {
    Task.find({owner: req.headers.authorization})
        .then(data => {
            succes(res, data.filter(i => i.completion), 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let show_unimportance = (req, res) => {
    Task.find({owner: req.headers.authorization})
        .then(data => {
            succes(res, data.filter(i => !i.importance), 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let show_importance = (req, res) => {
    Task.find({owner: req.headers.authorization})
        .then(data => {
            succes(res, data.filter(i => i.importance), 200)
        })
        .catch(err => {
            error(res, err, 422)
        })
}

let update = (req, res) => {
    Task.update({owner: req.headers.authorization, _id: req.params._id }, req.body, {new: true})
        .then(data => {
            succes(res, data, 200)
        })
        .catch(err => {
            error(res, err, 404)
        })
}

let remove = (req, res) => {
    Task.deleteOne({owner: req.headers.authorization, _id: req.params._id})
        .then(data => {
            succes(res, data, 200)
        })
        .catch(err => {
            error(res, err, 404)
        })
}

module.exports = {
    create,
    show_all,
    show_uncomplete,
    show_completed,
    show_unimportance,
    show_importance,
    update,
    remove
}