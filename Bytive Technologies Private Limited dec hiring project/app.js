const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(cors());
app.use(bodyParser.json());

const tasksFile = "./tasks.json";
const usersFile = "./users.json";

// Helper functions for file operations
const readTasks = () => {
    try {
        if (!fs.existsSync(tasksFile)) {
            fs.writeFileSync(tasksFile, JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync(tasksFile));
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
};

const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing tasks:', error);
        return false;
    }
};

const readUsers = () => {
    try {
        if (!fs.existsSync(usersFile)) {
            fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync(usersFile));
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing users:', error);
        return false;
    }
};

// Middleware for token verification
function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const tokenValue = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenValue, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
}

// Register endpoint
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const users = readUsers();
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { 
            id: Date.now(), 
            username, 
            password: hashedPassword 
        };
        
        users.push(newUser);
        if (!writeUsers(users)) {
            return res.status(500).json({ error: "Failed to save user" });
        }

        res.status(201).json({ 
            message: "User registered successfully",
            username: newUser.username
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const users = readUsers();
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: "24h" }
        );

        res.json({ token, username: user.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Login failed" });
    }
});

// Task endpoints
app.post("/tasks", verifyToken, (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const tasks = readTasks();
        const newTask = {
            id: Date.now(),
            userId: req.user.id,
            title,
            description,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        if (!writeTasks(tasks)) {
            return res.status(500).json({ error: "Failed to save task" });
        }

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: "Failed to create task" });
    }
});

app.get("/tasks", verifyToken, (req, res) => {
    try {
        const tasks = readTasks();
        const userTasks = tasks.filter(task => task.userId === req.user.id);
        res.json(userTasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

app.put("/tasks/:id", verifyToken, (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { status } = req.body;

        if (!["pending", "in-progress", "completed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const tasks = readTasks();
        const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === req.user.id);

        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        tasks[taskIndex].status = status;
        if (!writeTasks(tasks)) {
            return res.status(500).json({ error: "Failed to update task" });
        }

        res.json(tasks[taskIndex]);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ error: "Failed to update task" });
    }
});

app.delete("/tasks/:id", verifyToken, (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const tasks = readTasks();
        const filteredTasks = tasks.filter(t => !(t.id === taskId && t.userId === req.user.id));

        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (!writeTasks(filteredTasks)) {
            return res.status(500).json({ error: "Failed to delete task" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});