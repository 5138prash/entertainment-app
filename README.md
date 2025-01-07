# 🎬 Entertainment App

Welcome to Entertainment Hub, your ultimate destination to explore Movies, TV Series, and manage your favorite content through bookmarks.

## ✨ Features

- **Home Page**: Discover trending Movies and TV Series effortlessly.
- **Movies Page**: Dive into an extensive library of movies with detailed descriptions.
- **TV Series Page**: Find your next favorite series to binge-watch.
- **Bookmarks**: Keep track of your favorite movies and TV shows with ease.
- **Authentication**: Secure login and registration with JWT.
- **Responsive Design**: Optimized for all screen sizes, providing a seamless user experience.

## 🛠️ Tech Stack

### Frontend
- **React** - A modern JavaScript library for building interactive UIs.
- **Tailwind CSS** - A utility-first CSS framework to style components quickly.
- **React Router** - For easy and efficient client-side navigation.
- **Redux & Redux Toolkit** - For managing application state in a predictable way.


### Backend
- **Node.js** - JavaScript runtime environment for backend development.
- **Express.js** - Lightweight framework to build REST APIs.

- **MongoDB** - NoSQL database to store user data, bookmarks, and media content.
- **Mongoose** - MongoDB object modeling tool for easier data management.
- **JWT** - Used for secure, stateless user authentication.

## 📑 Pages

- **Home**
- **Movies**
- **TV Series**
- **Bookmarks**
- **Login**
- **Signup**
- **Movie Detail**
- **TV Series Detail**

## 🔐 Authentication

User authentication is handled using JWT (JSON Web Tokens). Passwords are securely hashed using bcrypt, and tokens are saved in the browser’s local storage.

## 📡 API Endpoints

### Home Routes
- `GET /api/home` - Get a list of available movies.

### Movies Routes
- `GET /api/movies` -  Get a list of available movies.
- `GET /api/movies/:id` -  Get detailed information about a specific movie.
### TV Series Routes
- `GET /api/tvseries` -  Get a list of TV series.
- `GET /api/tvseries/:id` - Get detailed information about a specific TV series.

### User Routes
- `POST /api/users/signup` - Register a new user.
- `POST /api/users/login` - Authenticate a user.

### Bookmarks Routes
- `GET /api/bookmarks` -  Retrieve all bookmarks of the logged-in user.
- `POST /api/bookmarks` - Add an item to bookmarks.
- `DELETE /api/bookmarks/:id` - Remove a bookmarked item.


## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (running locally or a MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/entertainment-app.git
    cd entertainment-app
    ```

2. **Install dependencies**:
    ```bash
    # For Backend
    npm install

    # For Frontend
    cd frontend
    npm install
    ```

3. **Create a `.env` file** in the `backend` directory and add the following:
    ```env
    URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    TMDB_API=your_tmdb_api
    ```

4. **Start the development server**:
    ```bash
    # For both frontend & Backend
    npm run dev
    ```

5. **Access the app**:
    Open your browser and go to `http://localhost:3000`

## 📝 Usage

- **Sign Up**: Create a new account by visiting the sign-up page.
- **Login**: Access your account by logging in with your credentials.
- **Browse Movies and TV Series**: Browse through the Movies and TV Series pages to find content.
- **Bookmark Items**: Save your favorite content by clicking the bookmark icon.
- **View Bookmarks**: Navigate to the Bookmarks page to manage your saved items.

---

Made with by [Prashant Tripathi](https://github.com/5138prash)
