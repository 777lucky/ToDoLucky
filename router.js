const express = require('express');
const router = express.Router();

const task = require('./controllers/tasksController.js');
const user = require('./controllers/userscontroller.js');
const authenticate = require('./middlewares/authenticate.js');

//Create Task
router.post('/tasks/create', authenticate, task.create)

//Show Task
router.get('/tasks/show', authenticate, task.show_all)
router.get('/tasks/show/uncomplete', authenticate, task.show_uncomplete)
router.get('/tasks/show/completed', authenticate, task.show_completed)
router.get('/tasks/show/unimportance', authenticate, task.show_unimportance)
router.get('/tasks/show/importance', authenticate, task.show_importance)

//Update Task
router.put('/tasks/update/:_id', authenticate, task.update)

//Delete Task
router.delete('/tasks/delete/:_id', authenticate, task.remove)


router.post('/users/register', user.create)
router.post('/users/login', user.login)

module.exports = router;