var config = require('../lib/config');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {name: 'SolderByte', title: 'SolderByte', page: 'home'});
});

router.get('/about', function(req, res) {
  res.render('about', {name: 'SolderByte', title: 'About', page: 'about'});
});

router.get('/contact', function(req, res) {
  res.render('contact', {name: 'SolderByte', title: 'Contact', page: 'contact'});
});

router.get('/privacy', function(req, res) {
  res.render('privacy', {name: 'SolderByte', title: 'Privacy policy', page: 'privacy'});
});

router.get('*', function(req, res) {
  res.status(404).render('error', {name: 'SolderByte', title: 'Error', code: '404', text: 'Page not found'});
});

module.exports = router;
