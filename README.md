# UrbanSync: Collaborative Feedback Platform

---

## 🌱 Project Origin Story

In the bustling world of urban development, feedback from citizens, planners, and stakeholders is often scattered, lost in emails, or buried in forms. The idea for **UrbanSync** was born from a simple question:  
**"How can we make city feedback collaborative, transparent, and actionable?"**

Imagine a platform where anyone can submit feedback, discuss ideas, and see real change happen—whether it's about a new park, a traffic issue, or a community event. UrbanSync aims to bridge the gap between citizens and city planners, making urban development a truly collaborative process.

---

## 🚀 Project Overview

**UrbanSync** is a full-stack web application that enables users to:

- **Submit feedback** on urban projects and issues
- **Discuss and vote** on feedback from others
- **Authenticate securely** (login/register)
- **View feedback analytics** for city planners

The platform is designed for scalability, security, and ease of use, with a modern UI and robust backend.

---

## 🛠️ Tech Stack

### Frontend

- **React**: Fast, component-based UI
- **Axios**: HTTP client for API requests
- **JavaScript**: Core language for logic and interactivity
- **Environment Variables**: For flexible API endpoints

### Backend

- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Web framework for routing and middleware
- **MongoDB**: NoSQL database for storing feedback and users
- **JWT**: Secure authentication tokens
- **CORS**: Cross-Origin Resource Sharing for frontend-backend communication
- **dotenv**: Environment variable management

### Deployment

- **Railway**: Cloud hosting for production

---

## 🗂️ File-wise Workflow & Significant Code Bits

### 1. `/frontend/`

#### - `src/App.js`
The entry point for the React app. Sets up routing and global state.

```javascript
// ...existing code...
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/feedback" component={Feedback} />
        {/* ...other routes... */}
      </Switch>
    </Router>
  );
}
// ...existing code...
```
**Importance:**  
Defines the navigation structure, ensuring users can access login and feedback pages.

---

#### - `src/components/Login.js`
Handles user authentication.

```javascript
// ...existing code...
axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password })
  .then(res => {
    localStorage.setItem('token', res.data.token);
    // Redirect to feedback page
  })
  .catch(err => setError('Login failed!'));
```
**Importance:**  
Uses environment variable for API endpoint, enabling seamless switching between local and production backends.

---

#### - `src/components/Feedback.js`
Displays feedback list and submission form.

```javascript
// ...existing code...
useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/feedback`)
    .then(res => setFeedbacks(res.data))
    .catch(err => setError('Failed to load feedback'));
}, []);
```
**Importance:**  
Fetches feedback from backend, showing real-time updates and error handling.

---

#### - `.env`
Stores API URL for flexibility.

```
REACT_APP_API_URL=http://localhost:5000
```
**Importance:**  
Allows easy switching between environments without code changes.

---

### 2. `/backend/`

#### - `server.js`
Main entry point for the backend server.

```javascript
// ...existing code...
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// ...route imports...
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
// ...existing code...
```
**Importance:**  
Sets up CORS, connects to MongoDB, and starts the server using environment variables for flexibility and security.

---

#### - `routes/auth.js`
Handles user registration and login.

```javascript
// ...existing code...
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // ...user lookup and password check...
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
// ...existing code...
```
**Importance:**  
Implements secure JWT authentication, enabling protected routes and user sessions.

---

#### - `routes/feedback.js`
Manages feedback CRUD operations.

```javascript
// ...existing code...
router.post('/', authenticate, async (req, res) => {
  const feedback = new Feedback({ ...req.body, user: req.userId });
  await feedback.save();
  res.status(201).json(feedback);
});
// ...existing code...
```
**Importance:**  
Ensures only authenticated users can submit feedback, linking feedback to user IDs for accountability.

---

#### - `.env`
Stores sensitive configuration.

```
MONGODB_URI=mongodb://localhost:27017/urbansync
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
FRONTEND_URL=http://localhost:3000
```
**Importance:**  
Keeps secrets and config out of code, supporting secure and flexible deployments.

---

### 3. `/models/`

#### - `User.js`
Defines user schema for MongoDB.

```javascript
// ...existing code...
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // ...other fields...
});
```
**Importance:**  
Enforces unique emails and required passwords, supporting secure authentication.

---

#### - `Feedback.js`
Defines feedback schema.

```javascript
// ...existing code...
const feedbackSchema = new mongoose.Schema({
  title: String,
  description: String,
  votes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
```
**Importance:**  
Links feedback to users, tracks votes and timestamps for analytics.

---

## 🔗 Workflow Summary

1. **User visits frontend** (`localhost:3000`)
2. **Frontend loads API URL** from `.env`
3. **User logs in** via `/api/auth/login` (handled by backend)
4. **JWT token stored** in localStorage for session management
5. **User submits feedback** via `/api/feedback` (protected route)
6. **Backend validates JWT**, saves feedback to MongoDB
7. **Feedback displayed** in frontend, updated in real-time

---

## ✨ Why These Code Bits Matter

- **Environment Variables:**  
  Enable seamless local and production development, keeping secrets safe.

- **CORS Setup:**  
  Allows secure communication between frontend and backend.

- **JWT Authentication:**  
  Protects user data and feedback, enabling personalized experiences.

- **MongoDB Schemas:**  
  Structure data for scalability and analytics.

- **Component-based Frontend:**  
  Makes UI easy to maintain and extend.

---

## 🌟 Conclusion

UrbanSync is more than just a feedback tool—it's a platform for **collaborative urban development**. By combining modern technologies and thoughtful architecture, it empowers communities to shape their cities together.

Whether you're a citizen with an idea, a planner seeking input, or a developer looking to contribute, UrbanSync is designed to be open, scalable, and impactful.

---

**Ready to sync your city? Clone,
