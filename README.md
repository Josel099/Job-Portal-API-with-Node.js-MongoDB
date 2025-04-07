# 🏆 Job Portal API with Node.js & MongoDB

## 📌 Project Overview  
This is a **Job Portal API** built using **Node.js, Express, and MongoDB**.  
It allows users to **register, log in, view job listings, and browse colleges**.  
Admins can **manage jobs, colleges, and users** with full **CRUD operations**.  

---

## 🚀 Features  
✅ **CRUD for Jobs** (Add, View, Update, Delete)  
✅ **CRUD for Colleges** (Add, View, Update, Delete)  
✅ **CRUD for Users** (Admins can manage users)  
✅ **MongoDB Database Integration**  

# Creating a `.env` File for Your Project

Create a `.env` file in the root of your project and add the following environment variables:

MONGO_URI=mongodb://127.0.0.1:27017/job-portal

PORT=5000

-------

# 🎯 Frontend – React.js

## 📌 Overview  
This is the **frontend** for the Job Portal application built with **React.js** and **Vite**. It located inside the_ /frontend_ folder of this repository
It connects to a **Node.js + Express + MongoDB** backend and allows users to:

- Register and log in
- Browse job listings and colleges
- Admins can manage jobs, colleges, and users

---

## 🖥️ Tech Stack  
- ⚛️ React.js  
- 🚀 Vite  
- 💅 Bootstrap
- 📦 Axios  

---

Create a .env.local file in the root directory and add:

VITE_API_BASE_URL=http://localhost:5000/api

Make sure your backend server is running on the same port.
