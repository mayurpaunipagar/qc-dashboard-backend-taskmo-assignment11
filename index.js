const express = require("express");
const config = require("./config");
const router = require("./router");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1", router());

app.listen(config.port, () => {
  console.log("Server started on port " + config.port);
});
