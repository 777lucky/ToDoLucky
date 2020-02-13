const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const succes = require('../helpers/response.js').succes
const error = require('../helpers/response.js').error



let create = (req, res) => {
    let { name, email, password } = req.body;
    let encryptedPassword = bcrypt.hashSync(password, 10)
    //password = bcrypt.hashSync...
    //req.body.password = bcrypt.hashSync...

    let user = new User({
        name, email, encryptedPassword
    });


    user.save()
        .then((data) => {
            succes(res, data, 201)
//            res.status(201).json({
//               status: true,
//               data: user
//            })
        })
        .catch(err => {
            error(res, err, 422)
 //           res.status(422).json({
 //               status: false,
 //               errors: err
 //           })
        })
}

let find = (req,res) => {
    User.find()
        .then(data => {
            succes(res, data, 200)
 //           res.status(200).json({
 //               status: true,
 //               data
 //           })
        })
        .catch(err => {
            error(res, err, 404)
//            res.status(404).json({
//                status: false,
//                errors: err
//            })
        })
}

let findID = (req, res) => {
    User.find({ _id: req.params._id})
        .then(data => {
            succes(res, data, 200)
//            res.status(200).json({
//                status: true,
//                data
//            })
        })
        .catch(err => {
            error(res, err, 404)
//            res.status(404).json({
//                status: false,
//                errors: err
//            })
        })

}

let update = (req, res) => {
    User.update({ _id: req.params._id }, req.body)
        .then(data => {
            succes(res, data, 200)
 //           res.status(200).json({
 //               status: true,
 //               data
 //           })
        })
        .catch(err => {
            error(res, err, 404)
//            res.status(404).json({
//                status: false,
//                errors: err
//            })
        })
}

let remove = (req, res) => {
    User.deleteOne({ _id: req.params._id})
        .then(data => {
            succes(res, data, 200)
//            res.status(200).json({
//                status: true,
//                data
//            })
        })
        .catch(err => {
            error(res, err, 404)
//            res.status(404).json({
//                status: false,
//                errors: err
//            })
        })
}

let login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(data => {
            let {password} = req.body
            let loginPass = bcrypt.compareSync(password, data.encryptedPassword)
            if (loginPass === true) {
                let payload = jwt.sign({_id: data._id, email: data.email}, process.env.SECRET_KEY)
                res.status(200).json({
                    status: true,
                    data: {_id: data._id, email: data.email, token: payload}
                })
            } else {
                res.status(400).json({
                    status: false,
                    data: "Wrong Passsword!"
                })
            }
            

        })
        .catch(err => {
            res.status(404).json({
                status: false,
                errors: err
            })
        })


}

function uploadPhoto(req, res) {
    res.status(200).json(req)
}

module.exports = {
    create,
    find,
    findID,
    update,
    remove,
    login,
    uploadPhoto
}