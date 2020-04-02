const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./app/models");
const Role = db.role;

//Import route
const tutorialRoute = require("./app/routes/tutorial.routes");
const signRoute = require("./app/routes/auth.route");
const userRoute = require("./app/routes/user.route");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use("/tutorial", tutorialRoute);

app.use("/api/auth", signRoute);

app.use("/api/test", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
});

// function initial() {
//     Role.create({
//         id: 1,
//         name: "user"
//     });

//     Role.create({
//         id: 2,
//         name: "admin"
//     })
// };