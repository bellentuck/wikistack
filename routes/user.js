const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', (req, res, next) => {
  User.findAll()
  .then(users => {
    res.render('users', { users })
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  const pagePromise = Page.findAll({ where: { authorId: req.params.id }})
  const userPromise = User.findById(req.params.id);
  Promise.all([ pagePromise, userPromise ])
  .then(values => {
    res.render('userpage', {
      pages: values[0],
      user: values[1]
    });
  })
  .catch(next);
});
