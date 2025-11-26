📚 BookStore — React Book Library

This is a personal project I built to practice and showcase modern React development.
The goal was to create a small but complete application that feels like a real product: clean UI, good UX, reusable components, and well-structured code.

The project uses a mock API with latency and caching to simulate real backend behavior, allowing me to build features such as searching, filtering, pagination, rating, favorites, loading states, and toast notifications.

🚀 Features
🏠 Home Page

“Rising Stars” carousel with top-rated books

Search bar with instant redirection

Categories preview

Responsive layout in both light and dark mode

📖 Books List

Dynamic category filtering

Sorting by title, author, rating, and year

Pagination

Fully responsive cards

Consistent design in dark/light mode

📘 Book Detail

Rating system (interactive)

Favorites button (stored in localStorage)

Fallback book cover

Clean layout for book metadata

Toast messages on success/error

❤️ Favorites Page

Books saved locally with instant updates

Same polished UI and grid layout as the main list

🔍 Search Page

Search by title or author

Pagination for results

Clear “no results” state

Fully responsive and dark-mode friendly

➕ Add / Edit Book Forms

Unified UI design

Client-side validation

Global spinner feedback

Toast messages for success/errors

Controlled form inputs

🌐 Application-Wide Functionality

Global loading overlay (context-based)

Global toast notifications (context-based)

Favorites context

Clean folder structure for scalability

Tailwind CSS for styling

Mobile-first responsive approach

🛠️ Tech Stack

Frontend:

React 18

React Router

Tailwind CSS

Vite

State & Architecture:

Custom Context Providers

LocalStorage

Reusable Components

Clean code & modular design

Data:

Mock API (latency, caching, controlled responses)

📁 Folder Structure
src/
  components/
  context/
  pages/
  services/
  utils/
  data/


Focused on separation of concerns and scalability.

▶️ Getting Started

Install dependencies:

npm install


Run development server:

npm run dev

✨ What I Practiced & Learned

This project helped me solidify:

Building complete UI flows with React

State management with custom contexts

Managing loading states and global feedback

Creating reusable and clean components

Working with Tailwind in both light & dark mode

Designing responsive layouts

Handling forms, validation, and API integration

Organizing a project for real-world maintainability

Structuring commits and feature development step-by-step

📄 About This Project (for portfolio use)

I built this project to demonstrate my ability to create a complete and polished React application from scratch.
The main focus was balancing clean architecture, good UX, and real-world features such as filtering, pagination, search, favorites, and loading states.

It reflects my approach to frontend development:
clean, structured, consistent, and user-focused.

I am using Mock Data to make it easier to create Demo "Free"