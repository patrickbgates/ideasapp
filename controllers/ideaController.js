function IdeaController(db) {        
    this.db = db;   
}

IdeaController.prototype.getAll = function (callback) {
    
    this.db.collection('ideas').find({}).toArray((err, result) => {
        
        if (err) {
            return console.error(err);
        }

        callback(result);        
    });
}

IdeaController.prototype.insert = function (idea, callback) {
    
    this.db.collection('ideas').insert(idea, (err, result) => {
        
        if (err) {
            return console.error(err);
        }

        callback();
    });
}

module.exports = IdeaController;