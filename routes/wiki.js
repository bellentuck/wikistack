const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res) {
  // res.send('Get TEST');
  res.redirect('/');
})

router.post('/', function(req, res) {
  // res.json(req.body);
    const page = Page.build({
    title: req.body.title,
    content: req.body.pageContent
  });

    page.save()
    .then(function(savedPage) {
      res.redirect(savedPage.route);
    })
})

router.get('/add', function(req, res) {
  // res.send('GET add TEST');
  res.render('addpage')
})

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {page: foundPage});
  })
  .catch(next);

})
