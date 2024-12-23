# Expo Wheels

<div style="text-align: center;">


![ExpoWeehslLogo](./client/public/ExpoWheels.jpg)

***Providing a One Stop Destination for Buying Selling and Renting Cars on Affordable Price***

</div>

---
## Index
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Pre Requisites](#pre-requisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [References](#references--documentations)
- [Future Scope](#future-scope)
- [Thanks for Visiting](#thank-your-very-much-for-visiting)

---


## Introduction
Expo Wheels is a MERN stack-based platform for buying, selling, and renting cars at affordable prices. It simplifies vehicle transactions by connecting buyers, sellers, and renters in one seamless, user-friendly interface. Whether you’re purchasing, selling, or renting, Expo Wheels ensures transparency, convenience, and affordability for all your automotive needs.

---

## Features

- **Buy and Sell Cars:**  
  Seamlessly list your car for sale or browse a wide range of vehicles available for purchase.

* **Car Rentals:**  
  Explore flexible rental options to suit short-term or long-term needs.

- **User-Friendly Interface:**  
  Intuitive design ensures easy navigation for buyers, sellers, and renters.

* **Advanced Search and Filters:**  
  Quickly find vehicles by make, model, price range, location, and more.

- **Secure Transactions:**  
  Built-in security measures ensure safe and reliable dealings between users.

* **Mobile-Responsive Design:**  
  Access the platform effortlessly from any device.

- **Admin Dashboard:**  
  Manage users, listings, and platform operations efficiently.  

---

## Tech Stack

You will Found all The Documentation in [References](#references--documentations) Tab

### Frontend / Client

- **React** - JavaScript Library for Building Immersive User Interfaces
* **React Router** - Navigation between Pages
- **Tailwind CSS** - CSS Framework for Modern Styling
* **Framer Motion** - Animation Library
- **Vite** - Build Tool for Frontend

### Backend / Server

- **Node.js** - JavaScript runtime for building scalable server-side applications.
* **Express.js** - Web framework for building RESTful APIs and server-side logic.
- **MongoDB** - NoSQL database for storing and managing data.
* **Mongoose** - Object Data Modeling (ODM) library for MongoDB, providing schema-based data management.
- **Bcrypt** - Library for hashing passwords to enhance security.
* **JWT (JSON Web Token)** - Authentication system for secure user verification.
- **Multer** - Middleware for handling file uploads, such as images and documents.  

### Tools Used

- **Postman** - API testing tool for debugging and ensuring seamless communication between the frontend and backend.

---
## Pre Requisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14 or above) – To run the server-side code.
* **npm** or **yarn** – Package manager for managing dependencies.
- **MongoDB** – To set up the database locally or connect to a cloud instance.
* **Git** – For cloning the repository and version control.
- **Code Editor** (e.g., VS Code) – Recommended for editing and managing code.
 
---
## Installation

- **Cloning The Repo**
```bash 
git clone https://github.com/harshit391/ExpoWheels.git
```

- Installing Dependencies (Client Side)
```bash
cd ExpoWheels/client
npm install 

cd ../ # Coming Back to Repo Folder
```

- Installing Dependencies (Server Side)
```bash
cd server
npm install
```

- Environment Variables (Client Side)
```text
VITE_API_URL=your_api_url
```

- Environment Variables (Server Side)
```text
MONGO_URI=your_mongo_db_string
JWT_SECRET_KEY=your_secret_key
```

- Running The Project (Both Side)
```
npm run dev
```

#### Visit http://localhost:5173 to see the Project in Action

---

## Folder Structure

```
ExpoWheels/
└── frontend/             
│   ├── public/           
│   └── src/
│       ├── assets/   
│       ├── components/       
│       ├── context/   
│       ├── pages/       
│       └── utils/       
│
├── server/              
    ├── connection/        
    ├── models/  
    ├── routes/ 
    ├── services/         
    └── utils/           
```
---

## References / Documentations

- ***Frontend Tech***
  - [React](https://legacy.reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://motion.dev/)

* ***Backend Tech***
  * [Node.js](https://nodejs.org/en)
  * [Express.js](https://expressjs.com/)
  * [MongoDB](https://www.mongodb.com/docs/)
  * [Mongoose](https://mongoosejs.com/docs/)
  * [Bcrypt](https://www.npmjs.com/package/bcrypt)
  * [JWT](https://jwt.io/introduction/)
  * [Multer](https://www.npmjs.com/package/multer)

- ***Tools***
  * [PostMan](https://www.postman.com/)

---

## Future Scope

* ***Features***
  * Providing Real Time Updates using Mail Services
  * Notification and Customer Service using Socket.io
  * Separate Organization Accounts for Direct Brand Connects

- ***Technology***
  * Using Socket.IO for Direct Communication
  * Mail Services like Nodemailer 
  * MySQL Database

---

## Thank your Very Much for Visiting
- **Thank you for taking the time to read through this README!** I truly appreciate your interest in this project and hope it helps you in some way.
* **I hope you found this project useful and enjoyable.** Your feedback is always welcomed and encouraged to help improve it further.
- **Feel free to reach out for any questions or collaborations.** You can connect with me on [LinkedIn](https://www.linkedin.com/in/harshitsingla1761/).
* **Your support means a lot, and I look forward to hearing from you!**

---

