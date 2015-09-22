var app = require('../server');
var should = require('should');
var request = require('supertest')(app);

describe('Testando rota principal', function() {
    it('deve retornar status 200 ao fazer GET /', function(done) {
        request.get('/')
            .end(function(err, res) {
                res.status.should.eql(200);
                done();
            });
    });
});