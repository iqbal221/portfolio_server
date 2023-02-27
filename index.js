const express = require("express");
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("portfolio server is running");
});

// Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t4uwg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const projectsCollection = client.db("portfolio").collection("projects");

  try {
    app.get("/projects", async (req, res) => {
      const query = {};
      const projects = await projectsCollection.find(query).toArray();
      res.send(projects);
    });

    app.get("/projectsDetails/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const projectsDetails = await projectsCollection.findOne(filter);
      res.send(projectsDetails);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("server is running");
});
