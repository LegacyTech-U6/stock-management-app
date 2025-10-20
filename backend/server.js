const express = require("express");
const app = express();

const MySQL = require("mysql2");
const db = require("./models");

const {User} = require('./models')
app.get("/test", async (req, res) => {
    User.create({
        id: 2,
        username: "test",
        email: "testuser@example3.com",
        password: "securepassword"

    }).then(() => {
        res.send("User created successfully!");
    }).catch((error) => {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    });
});

app.get("/", (req, res) => {
    User.findAll({ where: { username: "testuser"} }).then(users => {
        res.json(users);
    }).catch(error => {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    });
});
app.get("/delete", (req, res) => {
    User.destroy({ where: { id: 2 } })
        .then(() => {
            res.send("User deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(500).send("Internal Server Error");
        });
});
app.use(express.json());
db.sequelize.sync().then(() => {
  console.log("Database synchronized");

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
