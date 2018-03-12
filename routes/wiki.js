const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res) {
  Page.findAll()
  .then((wikis) => {
    res.render('index', { pages: wikis });
  });
})

router.post('/', function(req, res) {
  ///// -------- 1) AUTHOR INITIALIZATION STUFF
  // if there's a user, find them; else create one
  User.findOrCreate({ where: {
    name: req.body.authorName,
    email: req.body.email
  }})
  .then((author) => {

  ///// -------- 2) NEW PAGE CREATION STUFF
    // regardless what's returned, now build a new page
    const page = Page.build({
      title: req.body.title,
      content: req.body.pageContent
    });
    // now save the page
    return page.save()
    // now associate that page with the author we've returned
    .then((savedPage => {
      return page.setAuthor(author[0]);
    }))
  })

  ///// -------- 3) PUT IT ALL TOGETHER...
  // now -- dealing with the page itself, which we'll get from page.save() -- redirect to this page
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
    },
    include: [{
     model: User,
     as: 'author'
    }]
  })
  .then(function(foundPage){
    console.log(foundPage);
    res.render('wikipage', {
      page: foundPage,
      author: foundPage.author
    });
  })
  .catch(next);

})
