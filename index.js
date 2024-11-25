const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 1,
            title: 'League of Legends',
            year: 2009,
            price: 25
        },
        {
            id: 2,
            title: 'Counter-Strike: Global Offensive',
            year: 2012,
            price: 15
        },
        {
            id: 3,
            title: 'Dota 2',
            year: 2013,
            price: 10
        },
        {
            id: 4,
            title: 'Hearthstone',
            year: 2014,
            price: 24
        }
    ]
}

app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});


app.get("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
       res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post("/game", (req, res) => {
    var {id, title, year, price} = req.body;
    DB.games.push({
        id,
        title,
        year,
        price
    });
  
    if (DB.games.length == 0) {
        res.send("Nao foi possivel cadastrar o jogo!");
        res.sendStatus(400);
    } else {
        res.send("Jogo cadastrado com sucesso!");
        res.sendStatus(200);
    }
});

app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
        
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
            
        } else {
            DB.games.splice(index, 1);
            res.send("Jogo excluido com sucesso!");
            res.sendStatus(200);
            
        }
    }
});

app.put("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            var {title, year, price} = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (year != undefined) {
                game.year = year;
            }

            if (price != undefined) {
                game.price = price;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});