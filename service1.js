// const express = require("express");
// const app = express();
// const mysql = require("mysql2");
// const cors = require("cors");
// const http = require("http");
// const bodyParser = require("body-parser");
// const socketIO = require("socket.io");

// // Middleware

// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// app.use(bodyParser.json());

// const con = mysql.createConnection({
//   host: "localhost",

//   user: "root",

//   password: "123456789",

//   database: "test1",
// });

// con.connect((error) => {
//   if (error) {
//     console.error("Error connecting to the database: " + error.stack);

//     return;
//   }

//   console.log("Connected to the database.");
// });

// const server = http.createServer(app);

// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:3000", // Replace with your frontend URL

//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Socket IO client connected");

//   con.query("SELECT * FROM userdetails", (err, res) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//     } else {
//       socket.emit("initialData", res);
//     }
//   });

//   socket.on("message", (message) => {
//     console.log(`Received message: ${message}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket IO client disconnected");
//   });
// });

// app.post("/add", (req, res) => {
//   const newData = req.body;

//   const query = "INSERT INTO userdetails SET ?";

//   con.query(query, [newData], (error, result) => {
//     if (error) {
//       console.error("Error executing the query:", error);

//       res.status(500).send("Internal Server Error");
//     } else {
//       newData.id = result.insertId;

//       io.emit("newData", newData); // Emit an event to all connected clients

//       res.json("Data inserted successfully");
//     }
//   });
// });

// app.get("/users", (req, res) => {
//   con.query("SELECT * FROM userdetails", (err, results, fields) => {
//     if (err) {
//       console.error(err);

//       return res
//         .status(500)
//         .json({ error: "Error retrieving data from the database" });
//     }

//     res.json(results);
//   });
// });

// const port = 4000;

// server.listen(port, () => {
//   console.log("Server is listening on port " + port);
// });






const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

// Mock data (replace this with your actual data)
const mockData = [];

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket IO client connected");

  // Send initial data to the client
  socket.emit("initialData", mockData);

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket IO client disconnected");
  });
});

app.post("/add", (req, res) => {
  const newData = req.body;

  // Add the new data to the mock data array
  mockData.push(newData);

  io.emit("newData", newData); // Emit an event to all connected clients

  res.json("Data inserted successfully");
});

app.get("/users", (req, res) => {
  // Return the mock data as the response
  res.json(mockData);
});

const port = 4000;

server.listen(port, () => {
  console.log("Server is listening on port " + port);
});