var express = require('express');
var definitions=require('./definitions');
var synonyms=require('./synonyms');
var antonyms=require('./antonyms');
var examples=require('./examples');
var full_dict=require('./full_dict');
var play=require('./play');
var router = express.Router();


router.get('/def/:word', definitions.get);
router.get('/syn/:word', synonyms.get);
router.get('/ant/:word', antonyms.get);
router.get('/ex/:word', examples.get);
router.get('/full_dict/:word', full_dict.get);
router.get('/full_dict/', full_dict.getWordOfDay);
router.get('/play', play.get);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WordnikPlay' });
});



module.exports = router;
