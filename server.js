///////////
// SETUP //
///////////

const sqlite = require('sqlite3').verbose();
let db = my_database('./gallery.db');

var express = require("express");
var app = express();

app.use(express.json());


////////////
// ROUTES //
////////////

const router = express.Router();

router.get("/items/:id", function (req, res) {
    res.set('Content-Type', 'application/json');
    id = req.params.id
    console.log("\nRetrieving id " + id + "...")

    // gets first matching row only
    db.get("SELECT * FROM gallery WHERE id  = ?", [id], (err, row) => {
        if (err) {
            console.log("ERROR:");
            console.log(err.message);
            res.status(400).send(err);
        }
        else if (row) {
            console.log("...item retrieved.");
            return res.json(row)
        }
        else {
            console.log("ERROR: Item nonexistent.");
            res.status(404).send(err);
        }
    });
});

router.get("/items", function (req, res) {
    res.set('Content-Type', 'application/json');
    console.log("\nRetrieving all items...")

    db.all("SELECT * FROM gallery", function (err, rows) {
        if (err) {
            console.log("ERROR:");
            console.log(err.message);
            res.status(400).send(err);
        }
        else {
            console.log("...all items retrieved.")
            return res.json(rows);
        }
    });
});

router.post("/items", function (req, res) {
    res.set('Content-Type', 'application/json');
    const row = req.body;
    console.log("\nCreating item:");
    console.log(row);

    if(!validateJSON(row)){
        console.log("ERROR: Invalid JSON.");
        res.sendStatus(400);
        return;
    }

    var rowToAdd = [];
    for (var i in row) {
        rowToAdd.push([row[i]]);
    }

    db.run("INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)", rowToAdd, function (err) {
        if (err) {
            console.log("ERROR:");
            console.log(err.message);
            res.status(400).send(err);
        }
        else {
            console.log("Item created with ID " + this.lastID + ".");
            res.sendStatus(201);
        }
    });
});

router.put("/items/:id", function (req, res) {
    res.set('Content-Type', 'application/json');
    id = req.params.id;
    console.log("\nUpdating id " + id + "...");
    const row = req.body;
    console.log(row);

    if(!validateJSON(row)){
        console.log("ERROR: Invalid JSON.");
        res.sendStatus(400);
        return;
    }

    var data = [];
    for (var i in row) {
        data.push([row[i]]);
    }
    data.push(id);

    db.run("UPDATE gallery SET author = ?, alt = ?, tags = ?, image = ?, description = ? WHERE id = ?", data, function (err) {
        if (err) {
            console.log("ERROR:");
            console.log(err.message);
            res.status(400).send(err);
        }
        else if (this.changes < 1) {
            console.log("ERROR: ID " + id + " nonexistent.");
            res.sendStatus(404);
        }
        else {
            console.log("...updated item.");
            res.sendStatus(204);
        }
    });
});

router.delete("/items/:id", function (req, res) {
    res.set('Content-Type', 'application/json');
    id = req.params.id;
    console.log("\nDeleting id " + id + "...");

    db.run("DELETE FROM gallery WHERE id=(?)", id, function (err) {
        if (err) {
            console.log("ERROR:");
            console.log(err.message);
            res.status(400).send(err);
        }
        else if (this.changes < 1) {
            console.log("ERROR: ID " + id + " nonexistent.");
            res.sendStatus(404);
        }
        else {
            console.log("...item deleted.");
            res.sendStatus(204);
        }
    });
});

// All requests to API begin with /api
app.use("/api", router);

// This starts the server, after the routes have been defined, at port 3000:
app.listen(3000);
console.log("Web server up and running: http://localhost:3000/");

//////////////////////
// HELPER FUNCTIONS //
//////////////////////

function validateJSON(givenJSON){
    return givenJSON.author && givenJSON.alt && givenJSON.image && givenJSON.tags && givenJSON.description && Object.keys(givenJSON).length === 5;
}

function my_database(filename) {
    // Conncect to db by opening filename, create filename if it does not exist:
    var db = new sqlite.Database(filename, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    // Create our table if it does not exist already:
    db.serialize(() => {
        db.run(`
        	CREATE TABLE IF NOT EXISTS gallery
        	 (
                    id INTEGER PRIMARY KEY,
                    author CHAR(100) NOT NULL,
                    alt CHAR(100) NOT NULL,
                    tags CHAR(256) NOT NULL,
                    image char(2048) NOT NULL,
                    description CHAR(1024) NOT NULL
		 )
		`);
        db.all(`select count(*) as count from gallery`, function (err, result) {
            if (result[0].count == 0) {
                db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
                    "Tim Berners-Lee",
                    "Image of Berners-Lee",
                    "html,http,url,cern,mit",
                    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Sir_Tim_Berners-Lee.jpg",
                    "The internet and the Web aren't the same thing."
                ]);
                db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
                    "Grace Hopper",
                    "Image of Grace Hopper at the UNIVAC I console",
                    "programming,linking,navy",
                    "https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",
                    "Grace was very curious as a child; this was a lifelong trait. At the age of seven, she decided to determine how an alarm clock worked and dismantled seven alarm clocks before her mother realized what she was doing (she was then limited to one clock)."
                ]);
                console.log('Inserted dummy photo entry into empty database');
            } else {
                console.log("Database already contains", result[0].count, " item(s) at startup.");
            }
        });
    });
    return db;
}
