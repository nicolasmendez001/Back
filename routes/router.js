var body_parser = require('body-parser');
var db = require('../persistence/db');
exports.assignRoutes = function (app) {
    app.use(body_parser.urlencoded({ extended: true }));

    //*************SOLICITUDES GET******************
    app.get('/personas', db.getperson);
    app.get('/blogs', db.getblogs);
    app.get('/comentarios', db.getcomments);
    app.get('/publicaciones', db.getpublications);
    app.get('/publicaciones/:id', db.postSearch);

    // 1. Mostrar todas las personas que han comentado un blog.
    app.get('/allComments', db.allComments);

    // 2. Mostrar todos los blogs de categorías tecnología y ciencia
    app.get('/blogCate', db.blogCate);

    // 3. Mostar la cantidad de blogs que ha escrito cada persona.
    app.get('/numberBlogs', db.numberBlogs);

    // 5. Mostrar las publicaciones que tienen más de 5 respuestas
    app.get('/moreFive', db.moreFive);

    //*************SOLICITUDES POST******************
    app.post('/personas', db.postPerson);
    app.post('/blogs', db.postBlogs);
    app.post('/comentarios', db.postComments);
    app.post('/publicaciones', db.postPublications);

    //*************SOLICITUDES REMOVE******************
    app.delete('/personas/:id', db.removePerson);
    app.delete('/blogs/:id', db.removeBlogs);
    app.delete('/comentarios/:id', db.removeComments);
    app.delete('/publicaciones/:id', db.removePublications);

    //*************SOLICITUDES PUT******************
    app.put('/personas', db.UpdatePerson);
    app.put('/blogs', db.UpdateBlogs);
    app.put('/comentarios', db.UpdateComments);
    app.put('/publicaciones', db.UpdatePublications);
}