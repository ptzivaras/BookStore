# 📚 BookStore — React Library App

A modern React application for browsing, searching, rating, and managing books.  
Built with a clean architecture, reusable components, polished UI, and full dark mode support.

---

## ✨ Features

### 🏠 **Home**
- "Rising Stars" carousel
- Quick search bar
- Category preview
- Responsive light/dark theme

### 📖 **Books List**
- Category filtering
- Sorting (title, author, rating, year)
- Pagination
- Responsive grid layout

### 📘 **Book Detail**
- Book information
- Rating system (interactive)
- Favorites (localStorage)
- Fallback cover
- Toast notifications

### ❤️ **Favorites Page**
- Persistent favorite books
- Filtered grid view

### 🔍 **Search Page**
- Title/author search
- Pagination
- Clear empty state

### ➕ **Add & Edit Book**
- Unified form UI
- Validation
- Toast feedback
- Global loading overlay

### 🌐 **Global App Features**
- Tailwind CSS
- Dark mode
- Toast notifications (context-based)
- Loading overlay (context-based)
- Mock API (latency + caching)
- Clean folder structure

---

## 🛠 Technologies

- **React 18**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **Context API**
- **LocalStorage**
- **Custom mock API**

---

## 📂 Project Structure

```
src/
├── components/
│   ├── filters/
│   └── toast/
├── context/
├── pages/
├── services/
├── utils/
└── data/
```

---

## ▶️ Run the Project

**Install:**
```bash
npm install
```

**Start dev server:**
```bash
npm run dev
```

---

## 📌 Purpose of the Project

This project demonstrates building a complete, polished React application with real-world features such as filtering, searching, pagination, favorites, rating, context-based global UI handling, and responsive design.

**It highlights:**
- Clean component architecture
- State management with contexts
- Tailwind-based UI
- Good UX practices
- Strong fundamentals in React and frontend development

---

## 📄 About

Built to showcase modern React development with clean code, scalable architecture, and a focus on user experience.  
Uses mock data for easy demonstration without backend requirements.
