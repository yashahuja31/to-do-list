const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const tasksFile = "./tasks.json";

// defining the read and write tasks function to read and write them into the json file
const readTasks = () => (fs.existsSync(tasksFile) ? JSON.parse(fs.readFileSync(tasksFile)) : []);
const writeTasks = (tasks) => fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));

// write the tasks in the json file that have been added by the user from the frontend
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  const tasks = readTasks();
  const newTask = { id: Date.now(), title, description, status: "pending" };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// read the tasks from the json file
app.get("/tasks", (req, res) => {
  res.json(readTasks());
});

//to get the task id
app.get("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  task ? res.json(task) : res.status(404).json({ error: "Task not found" });
});

// check if the task id exists and then updates its data otherwise output task not found
app.put("/tasks/:id", (req, res) => {
  const { status } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex > -1) {
    tasks[taskIndex].status = status;
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// to delete task by its id
app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  if (tasks.length === newTasks.length) {
    res.status(404).json({ error: "Task not found" });
  } else {
    writeTasks(newTasks);
    res.json({ message: "Task deleted" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} \nhttp://127.0.0.1:5500/`));