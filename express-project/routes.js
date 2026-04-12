const express = require("express");

const router = express.Router();

router.get('/hello-world', (req, res) => {
    res.send({message: "Hello World"});
});

router.get('/teams/epic', (req, res) => {
    res.send([
        {
            name: "49ers",
            location: "San Fransisco"
        },
        {
            name: "Patriots", 
            location: "Boston"
        }
    ]);
});

router.get('/teams/:teamName', (req, res) => {
    
    const team = req.params.teamName;

    if (team.toLowerCase() === 'arsenal') {
        res.send({massage: team + " are the best team in PL"})
    }else {
        res.send({massage: team + " are okay i guess"})
    }

});

router.get('/fruits/:fruitId', (req, res) => {
    
    const fruitId = req.params.fruitId;

    let fruits = [
        "routerle",
        "Orange",
        "Banana"
    ]

    if (parseInt(fruitId) > fruits.length) {
        res.send({error:"No fruit with this id, only " + fruits.length + " fruits exist"})
    }else {
        res.send({fruit: fruits[fruitId - 1]});
    }

});

router.get('/meals', (req, res) => {

    let italianMeals = [
        "Risotto",
        "Pizza",
        "Lasagne"
    ];

    let globalMeals = [
        "Cheasburger",
        "Aromatic Duck",
        "Tikka Masala"
    ];

    if (req.query.country !== "italy") return res.send(globalMeals);
    
    if (req.query.country.toLowerCase() === "italy") return res.send(italianMeals);

});

router.post('/add-note', (req, res) => {

    const note = req.body;

    res.send({
        status: 200,
        message: "Successfully added note", 
        note: note

    });

});

module.exports = router;