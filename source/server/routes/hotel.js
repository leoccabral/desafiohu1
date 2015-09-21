module.exports = function(app) {
    var hotel = app.controllers.hotel;
    app.post('/hotel/listar', hotel.list);
    app.post('/hotel/buscar', hotel.buscar);
};