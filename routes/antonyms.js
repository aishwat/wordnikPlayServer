var request = require('supertest');
var error = require('./error');
var url = "http://api.wordnik.com:80/v4/word.json";
var api_key=require('./api_key');

var antonyms = {
    get: function(req, res) {
        var word = req.params.word.toLowerCase();
        console.log(word);
        request(url)
            .get('/' + word + '/relatedWords')
            .set({})
            .query({
                useCanonical: 'false',
                relationshipTypes: 'antonym',
                limitPerRelationshipType: '10',
                api_key: api_key
            })
            .end(function(err, response) {
               if (err || response.status != '200')
                    error(res, err, response);
                else if(response.body.length==0)
                    res.json({Antonyms:[]});
                else
                    res.json({Antonyms:response.body[0]['words']}); //check res status
            })
    }
}



module.exports = antonyms;
