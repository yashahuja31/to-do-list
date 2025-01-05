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
2. firstly we need to install all the dependencies required for this project which are body-parser, cors, express, nodemon, fs (or copy this command and run it in your terminal 'npm I nodemon fs cors express body-parser curl' this command will install all the required dependencies required for running the project)
3. enter 'npx nodemon' or 'npm app' in the terminal and press enter key (this is to run the backend of the project)
4. now press the go-live of the code editor you are using (for me I'm using vs code so the go-live button is in the bottom right corner of my code editor)
5. a new tab will open in your browser with 2 input data elements and a button which is used to add data in the JSON file created by the name 'tasks.json'

This to-do list application is ensured to be developed keeping in mind the security and data privacy. It is ensured that it will ask for a login using the credentials so that only you can access your to-do lists. The use of JWT makes your data safer by binding the data with your session of logging so that your information won't be disclosed. This means that no one else will be able to see or handle your to-do items unless you share your login credentials. Your tasks are fully protected, giving you peace of mind knowing that your personal information is confidential and accessible only to you.

More information about this To-Do List Manager is as follows:
Project On To-Do List
 Our to-do list application is a secure, friendly interface that shall assist users to efficiently manage daily tasks with maximum data privacy and security. Following are some details of its features and functionalities

1. Authentication & Security to the User
->Login & Registration: The user can register and subsequently log in using their credentials. The system utilizes secure password hashing and verification techniques to protect user information.
->JWT (JSON Web Tokens): Sessions fall under JWT and every user information to his credentials by JWT, hence; only those authenticated users would see their work;
->Data Privacy: Your to-do items are privately made, as no others can see that information unless your passwords have been sent.

![image](https://github.com/user-attachments/assets/c2650551-20d3-426f-9c85-c6f6e936a09f)

2. Task Management
->Create Tasks: The users can easily add new tasks with a title and description.
->View Tasks: Once the users log in, they are shown a complete list of all tasks created, enabling them to maintain their to-do items in one place.
->Edit & Update: Users can update the status of their tasks according to their progress so that their to-do list will be up-to-date.
->Delete Tasks: The completed or obsolete tasks can be deleted so that the task list is kept clean.

3. Improved User Experience (Better UI/UX)
->Responsive Design: The application is designed to be responsive, ensuring it works seamlessly across various devices, including desktops, tablets, and mobile phones.
->Intuitive UI: The interface is designed for ease of use, allowing users to navigate through their tasks effortlessly.
->Error Handling: Friendly error messages guide users if something goes wrong, such as entering incorrect login details or attempting unauthorized actions.

![image](https://github.com/user-attachments/assets/7c0ff84f-c402-4af0-b7b5-d5f09f39448a)


4. Data Persistence & Management
->Persistent Storage: Tasks are stored securely in a backend database so that the data persists even after users log out.
->Secure Access: All backend interactions are protected, meaning that data cannot be accessed or modified without proper authentication.

5. Future Improvements
->Collaboration Features: Future features could include task sharing and collaboration, allowing users to work on tasks together while still maintaining privacy controls.
->Notifications & Reminders: adding notifications to remind users of pending tasks.
->Customization options: enabling the user to tailor the appearance and style of their to-do lists.
