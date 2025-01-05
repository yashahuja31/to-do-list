# basic-to-do-list
just a basic backend code for a to-do list in node.js and express with storage in a JSON file 

this is the working backend of a to-do list app in which you can do all the following commands as mentioned in the question:

1. POST /tasks: Create a new task with title (string), description (string), and status (default: "pending").
2. GET /tasks: Fetch all tasks.
3. GET /tasks/:id: Fetch a task by its ID.
4. PUT /tasks/:id: Update the task status (pending, in progress, completed).
5. DELETE /tasks/:id: Delete a task by its ID.

now the project is built using node.js/express and for the storing purpose of data I used a .json file for easy storage we can also use any SQL or NoSQL database for storing the data.

now the steps to run the project are as follows:

1. open a new terminal (using ctrl key +  ` key)
2. firstly we need to install all the dependencies required for this project which are body-parser, cors, express, nodemon, fs (or simply copy this command and run it in your terminal 'npm I nodemon fs cors express body-parser curl' this command will install all the required dependencies required for running the project)
3. enter 'npx nodemon' or 'npm app' in the terminal and press enter key (this is to run the backend of the project)
4. now press the go-live of the code editor you are using (for me I'm using vs code so the go live button is in the bottom right corner of my code editor)
5. a new tab will open in your browser with 2 input data elements and a button which is used to add data in the JSON file created by the name 'tasks.json'

this to do list allows you to create a private to-do for yourself which you can access only after you log in with you credentials with the help of this privacy of your data is constantly maintained, JWT (jsonwebtokens) help ensuring the privayc of your data by binding it with your login credentials 
