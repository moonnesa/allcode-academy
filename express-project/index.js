//Boiler plate for API in java.script
const express = require("express");

const routes = require("./routes")

const app = express();

const port = 3000;

app.use(express.json());

app.use('/', routes)

app.get('/hello-world', (req, res) => {
    res.send({message: "Hello World"});
});

app.get('/teams', (req, res) => {
    res.send([
        {
            name: "49ers",
            location: "San Fransisco"
        },
        {
            name: "Miami Heat",
            location: "Florida"
        }
    ]);
});

app.listen(port, () => {
    console.log("Server running on Port " + port);
});
