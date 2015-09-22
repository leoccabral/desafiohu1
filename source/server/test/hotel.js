var app = require('../server');
var should = require('should');
var request = require('supertest')(app);

describe('Testando rotas e buscas do sistema', function() {
    it('deve retornar status 200 ao fazer GET /', function(done) {
        request.get('/')
            .end(function(err, res) {
                res.status.should.eql(200);
                done();
            });
    });
    it('deve retornar a lista dos 500 hoteis cadastrados', function(done) {
        request.post('/hotel/listar')
            .end(function(err, res) {
                res.body.length.should.eql(500);
                done();
            });
    });
    it('deve retornar o hotel "Araruama, Mercatto Casa Hotel" na busca', function(done) {
        var entity = {
            valor: "Araruama, Mercatto Casa Hotel",
            nodata: "S"
        };
        request.post('/hotel/buscar')
            .send(entity)
            .end(function(err, res) {
                var lista = res.body;
                lista.length.should.eql(1);
                lista[0].localidade.should.eql("Araruama");
                lista[0].nome.should.eql("Mercatto Casa Hotel");
                done();
            });
    });
    it('deve retornar que o hotel "Araruama, Mercatto Casa Hotel" está disponível para a data 06/05 até 09/05 ', function(done) {
        var entity = {
            valor: "Araruama, Mercatto Casa Hotel",
            nodata: "N",
            entrada: '06/05/2015',
            saida: '09/05/2015'
        };
        request.post('/hotel/buscar')
            .send(entity)
            .end(function(err, res) {
                var lista = res.body;
                lista.length.should.eql(1);
                lista[0].disponivel.should.eql("S");
                done();
            });
    });
    it('deve retornar que o hotel "Araruama, Mercatto Casa Hotel" NÃO está disponível para a data 05/05 até 08/05 ', function(done) {
        var entity = {
            valor: "Araruama, Mercatto Casa Hotel",
            nodata: "N",
            entrada: '05/05/2015',
            saida: '08/05/2015'
        };
        request.post('/hotel/buscar')
            .send(entity)
            .end(function(err, res) {
                var lista = res.body;
                lista.length.should.eql(1);
                lista[0].disponivel.should.eql("N");
                done();
            });
    });
    it('deve retornar todos hoteis de "Araruama"', function(done) {
        var entity = {
            valor: "Araruama",
            nodata: "S"
        };
        request.post('/hotel/buscar')
            .send(entity)
            .end(function(err, res) {
                var lista = res.body;
                lista.length.should.eql(12);
                done();
            });
    });
    it('deve retornar todos hoteis que possuiem "Ara" em sua localidade ou no seu nome', function(done) {
        var entity = {
            valor: "Ara",
            nodata: "S"
        };
        request.post('/hotel/buscar')
            .send(entity)
            .end(function(err, res) {
                var lista = res.body;
                lista.length.should.eql(57);
                done();
            });
    });
});