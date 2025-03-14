import express from "express";
import logger from "./utilities.js";
import morgan from "morgan";

const app = express();
const port = 6969;
const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

// app.get("/", (req, res) => { 
//   res.send("Hello from Jarvis");
// });

// app.get("/login", (req, res) => {
//   res.send("Hello from Login");
// });

// app.get("/about", (req, res) => {
//     res.send("Hello from about");
//   });

//accepting data

app.use(express.json());

let data = [];
let nextId = 1;
//adding users
app.post("/login", (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: nextId++, name, age };
  data.push(newUser);
  res.status(201).send(newUser);
});

//retrieving users
app.get("/users",(req,res)=>{
    res.status(200).send(data)
})

//retrieving users by id
app.get("/users/:id",(req,res)=>{
    const user = data.find(user=>user.id===parseInt(req.params.id))
    if (!user) {
        return res.status(404).send("user not found")
    }else {
        res.status(200).send(user)
    }
    
})

//update user
app.put("/update/:id",(req,res)=>{
    const user = data.find(user=>user.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).send("user not found")
    }else {
        const {name,age} = req.body
        user.name = name,
        user.age = age
    }
    return res.status(200).send(user);
})

//delete user
app.delete("/delete/:id",(req,res)=>{
    const userIndex = data.findIndex(user=>user.id === parseInt(req.params.id))
    if (userIndex==-1) {
        return res.status(404).send("user not found")
    }else {
        data.splice(userIndex,1)
        return res.status(204).send(`deleted`)
    }
})

//server code
app.listen(port, () => {
  console.log(`server is running at port:${port}`);
});
