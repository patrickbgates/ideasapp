const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoClient = require('mongodb').MongoClient();
const IdeaController = require('./controllers/ideaController');

let ideaController;

const server = express();

server.set('view engine', 'ejs');
server.use(express.static('css'));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => { 
    ideaController.getAll((ideas) => res.render('index.ejs', { ideas }));
});

server.post('/idea', (req, res) => {
    
    if (req.body.name.trim().length === 0 || req.body.idea.trim().length === 0) {
        return res.redirect('/');
    }

    ideaController.insert(req.body, () => res.redirect('/'));
});

mongoClient.connect(config.db.connectionString, (err, db) => {
    
    if (err) {
        return console.error(err);
        process.exit(1);
    }
    
    ideaController = new IdeaController(db);

    server.listen(config.server.port, (err) => {
        
        if (err) {
            return console.error(err);
        }
    
        return console.log(`Server listening on port ${config.server.port}`);
    });
});