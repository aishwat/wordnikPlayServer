var async = require('async');
var request = require('supertest');
var error = require('./error');
var definitions = require('./definitions');
var synonyms = require('./synonyms');
var antonyms = require('./antonyms');
var examples = require('./examples');
var url = "http://api.wordnik.com:80/v4/words.json";
var api_key=require('./api_key');
//words.json not word

var full_dict = {
    get: function(req, res) {
        var word = req.params.word.toLowerCase();
        var result = {};

        function create_mock_res(callback) { //creating object on every call
            var mock_res = {
                status_code: null,
                send: function(data) { //res collector
                    for (var key in data)
                        value = data[key];
                    callback(null, value);
                },
                status: function(code) {
                    status_code = code;
                    return this;
                },
                json: function(data) { //res collector
                    // result[this.caller] = data;
                    // callback(null, data);
                    for (var key in data)
                        value = data[key];
                    callback(null, value);
                }
            };
            return mock_res;
        }

        async.parallel({
                Definitions: function(callback) {
                    definitions.get(req, create_mock_res(callback));
                },
                Synonyms: function(callback) {
                    synonyms.get(req, create_mock_res(callback));
                },
                Antonyms: function(callback) {
                    antonyms.get(req, create_mock_res(callback));
                },
                Examples: function(callback) {
                    examples.get(req, create_mock_res(callback));
                },
            },
            function(err, results) {
                console.log(results);
                results.word = [];
                results.word.push(word);
                res.send(results);
            });

    },
    getWordOfDay: function(req, res) {
        console.log('in get word of day ');
        var dateString=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10)
        request(url)
            .get('/wordOfTheDay')
            .query({
                date: dateString,
                api_key: api_key
            })
            .end(function(err, response) {
                if (err || response.status != '200')
                    error(res, err, response);
                else {
                    console.log(response.body.word);
                    req.params.word = response.body.word;
                    full_dict.get(req, res);
                }
            })
    }
}

module.exports = full_dict;
