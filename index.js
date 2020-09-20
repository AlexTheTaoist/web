const express = require("express");
const node = express();
const cors = require("cors");
const port = 8080;

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "AsuraGateOfHell93",
    database: "todos",
  },
});
node.use(cors());
node.use(express.json());

// get all data from the todos database
node.get("/todos", async (req, res) => {
  const todos = await knex("todos").select("*");
  res.json(todos);
});

// create new todo
node.post("/todos", async (req, res) => {
  const name = req.body.name;
  await knex("todos").insert({
    name: name,
    isCompleted: 0,
  });
  res.json();
});

//update a todos todo
node.put("/todos/:id", async (req, res) => {
  const isCompleted = req.body.isCompleted;
  const id = req.params.id;
  //   const name = req.body.name;

  await knex("todos").where("id", "=", id).update({
    isCompleted: isCompleted,
  });
  res.json();
});

//delete a todo
node.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  await knex("todos").where("id", "=", id).del();
  res.json();
});

node.listen(port, () => {
  console.log(`Travel app Listening at http://localhost:${port}`);
});
