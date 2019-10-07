var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;

/********************** GET *****************************/
exports.getperson = function (req, res) {
    select(req.body, 'persona', (documentos) => {
        res.send(documentos);
    })
}

exports.getblogs = function (req, res) {
    select(req.body, 'blog', (documentos) => {
        res.send(documentos);
    })
}

exports.getcomments = function (req, res) {
    select(req.body, 'comentario', (documentos) => {
        res.send(documentos);
    })
}

exports.getpublications = function (req, res) {
    select(req.body, 'publicacion', (documentos) => {
        res.send(documentos);
    })
}

/********************** POST *****************************/
exports.postSearch = function (req, res) {
    console.log("entra");

    console.log(req.params.id);
    search(req.params.id, 'publicacion', (documentos) => {
        res.send(documentos);
    });
}

exports.postPerson = function (req, res) {
    insert(req.body, 'persona', (documentos) => {
        res.send(documentos);
    });
}

exports.postBlogs = function (req, res) {
    insert(req.body, 'blog', (documentos) => {
        res.send(documentos);
    });
}

exports.postComments = function (req, res) {
    insert(req.body, 'comments', (documentos) => {
        res.send(documentos);
    });
}

exports.postPublications = function (req, res) {
    insert(req.body, 'publicacion', (documentos) => {
        res.send(documentos);
    });
}

/********************** REMOVE *****************************/
exports.removePerson = function (req, res) {
    var id_persona = parseInt(req.params.id);
    remove({ "id_persona": id_persona }, "persona", (documentos) => {
        res.send(documentos);
    });
}

exports.removeBlogs = function (req, res) {
    var id = parseInt(req.params.id);
    remove({ "id_blog": id }, 'blog', (documentos) => {
        res.send(documentos);
    });
}

exports.removeComments = function (req, res) {
    var id = parseInt(req.params.id);
    remove({ "id_comentario": id }, 'comentario', (documentos) => {
        res.send(documentos);
    });
}

exports.removePublications = function (req, res) {
    var id = parseInt(req.params.id);
    remove({ "id_publicacion": id }, 'publicacion', (documentos) => {
        res.send(documentos);
    });
}

// *************   consultas *********************

exports.allComments = function (req, res) {
    query(1, 'persona', (documentos) => {
        res.send(documentos);
    });
}

exports.blogCate = function (req, res) {
    select(" {categoria : { '$in' : ['Tecnologia','ciencia']}}", 'blog', (documentos) => {
        res.send(documentos);
    })
}

exports.numberBlogs = function (req, res) {
    query(3, 'persona', (documentos) => {
        res.send(documentos);
    });
}
exports.moreFive = function (req, res) {
    query(5, 'publicacion', (documentos) => {
        res.send(documentos);
    });
}

function query(number, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII"); //here
        switch (number) {
            case 1:
                aggregateOne(collection, dbase, callback);
                break;
            case 3:
                aggregateTwo(collection, dbase, callback);
                break;
            case 5:
                aggregateFive(collection, dbase, callback);
                break;
            default:

                break;
        }
    });
}

const aggregateOne = async function (col, db, callback) {
    const collection = db.collection(col);
    collection.aggregate([
        {
            $lookup:
            {
                from: "comentario",
                localField: "id_persona",
                foreignField: "id_persona",
                as: "personas"
            }
        },
        { $project: { nombre: 1 } }
    ]).toArray(function (err, docs) {
        callback(docs)
    });
}


const aggregateTwo = async function (col, db, callback) {
    const collection = db.collection(col);
    collection.aggregate([
        { $group: { _id: "$nombre", total: { $sum: "$amount" } } }
    ]).toArray(function (err, docs) {
        callback(docs)
    });
}

const aggregateFive = async function (col, db, callback) {
    const collection = db.collection(col);
    collection.aggregate([
        { $project: { _id: "$titulo", count: { $size: "$comentarios" } } },

        {
            $match: {
                count: {
                    $gte: 2
                }
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs)
    });
}

/********************** UPDATE *****************************/
exports.UpdatePerson = function (req, res) {
    Update({ "id_persona": req.body.id_persona }, req.body, 'persona', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdateBlogs = function (req, res) {
    Update({ "id_blog": req.body.id_blog }, req.body, 'blog', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdateComments = function (req, res) {
    Update({ "id_comment": req.body.id_comment }, req.body, 'comments', (documentos) => {
        res.send(documentos);
    });
}

exports.UpdatePublications = function (req, res) {
    Update({ "id_publicacion": req.body.id_publicacion }, req.body, 'publicacion', (documentos) => {
        res.send(documentos);
    });
}

function search(id, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII"); //here
        var query = `id_publicacion:${id}`
        selectData(query, collection, dbase, callback)
    });
}

function select(query, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII"); //here
        selectData(query, collection, dbase, callback)
    });
}

const selectData = async function (query, col, db, callback) {
    const collection = db.collection(col);
    collection.find(query).toArray(function (err, docs) {
        callback(docs)
    });
}

function insert(query, collection, callback) {
    mongoClient.connect(url, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII"); //here
        insertData(query, collection, dbase, callback)
    });
}

const insertData = async function (query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.insertOne(query);
        callback({ "status": 200, "message": "guardado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}

function remove(query, collection, callback) {
    console.log(query);

    mongoClient.connect(url, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII"); //here
        removeData(query, collection, dbase, callback)
    });
}

const removeData = async function (query, col, db, callback) {
    const collection = db.collection(col);
    try {
        collection.deleteOne(query);
        callback({ "status": 200, "message": "eliminado exitoso" });
    } catch (error) {
        callback({ "status": 400, "message": "Ocurrio un error al eliminar" });
    }
}

function Update(condition, set, collection, callback) {
    mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) { //here db is the client obj
        if (err) throw err;
        var dbase = db.db("electivaII");
        UpdateData(condition, set, collection, dbase, callback)
    });
}

const UpdateData = async function (condition, set, col, db, callback) {
    const collection = db.collection(col);
    console.log(set);

    try {
        collection.update(condition, set);
        callback({ "status": 200, "message": "actualizacion exitosa" });
    } catch (error) {
        callback({ "status": 400, "message": "upsss, ocurrio un error" });
    }
}