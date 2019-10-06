var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function(app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //*************SOLICITUDES GET******************
    app.get('/personas', db.getperson);
    app.get('/blogs', db.getblogs);
    app.get('/comentarios', db.getcomments);
    app.get('/publicaciones', db.getpublications);
    app.get('publicaciones/:id', db.postSearch);

    //*************SOLICITUDES POST******************
    app.post('/personas', db.postPerson);
    app.post('/blogs', db.postBlogs);
    app.post('/comentarios', db.postComments);
    app.post('/publicaciones', db.postPublications);

    //*************SOLICITUDES REMOVE******************
    app.delete('/personas', db.removePerson);
    app.delete('/blogs', db.removeBlogs);
    app.delete('/comentarios', db.removeComments);
    app.delete('/publicaciones', db.removePublications);

    //*************SOLICITUDES PUT******************
    app.put('/personas', db.UpdatePerson);
    app.put('/blogs', db.UpdateBlogs);
    app.put('/comentarios', db.UpdateComments);
    app.put('/publicaciones', db.UpdatePublications);
}