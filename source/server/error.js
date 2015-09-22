exports.notFound = function(req, res, next) {
    res.status(404);
    res.sendfile('./client/not_found.html');
};