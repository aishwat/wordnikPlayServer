var request = require('supertest');
var error = require('./error');
var url = "http://api.wordnik.com:80/v4/word.json";
var api_key=require('./api_key');

var examples = {
    get: function(req, res) {
        var word = req.params.word.toLowerCase();
        console.log(word);
        request(url)
            .get('/' + word + '/examples')
            .set({})
            .query({
                includeDuplicates:'false',
                useCanonical: 'false',
                skip: '0',
                limit: '5',
                api_key: api_key
            })
            .end(function(err, response) {
                if (err || response.status != '200')
                    error(res, err, response);
                else
                {
                    var result=response.body.examples;
                    var exmpls=[];
                    
                    for(i in result)
                    {
                        //console.log(result[i]['text']);
                        exmpls.push(result[i]['text']);
                    }
                    res.send({Examples:exmpls});
                    //check res status
                }
            })
    }
}



module.exports = examples;
