# What problem this app solves?
1. A Customer wants to browse books in a very big catalog and he wants to search and save his favorites.
2. Customer has many computers and mobile phones. He wants to browse during day and night. He has a family that also want to do the same and age varies 14-72.

# BookStore is a book management app and customer can..
1. Browse a catalog of books with covers, ratings, and details
2. Search and filter books by category, author, title
3. Add books to favorites (persists in browser)
4. Add / edit / delete books
5. Switch between light/dark themes
6. Get visual feedback via toasts and loading overlays

# Skills/features
1. I will try to include in the project skills & features for educational purposes.
2.  I will also try to add business logicand solve real world problems to be more realistic.
3. features/skills: Hooks, Mock, Search, Filters, Favourites, WishList, Persistance, DeepLinks, Carousel, Eager-Lazy-Suspense, Cache, ReactQuerry, CleanArchitecture, UIUX, Profiling, DarkLightMode, Tanstack, Ratings

#Tech/Libraries
1. React v18
2. Router     - page navigation since its not SPA
3. ContextAPI -	Global state (theme, favorites, loading, toasts) — no Redux used for this small app
4. useEffect Hook -	Data fetching, localStorage sync, cleanup//Not used for enterprise apps #No(Redux/TanStack Query)
5. useState  Hook -	Local component state (forms, filters, pagination)
6. Custom Hooks   -	useDarkMode, useFavorites, useLoading, useToast
7. localStorage	 - For persist favorites and theme across sessions
8. UI   - Tailwind
9. Vite - modern build tool
10. Mock Api & Mock Book Data - Easier deployment, pure React Focus #NoMemonization(useMemo/useCallback)


# What Each File Does
Components.. reusable components
BookCard.jsx — Displays a single book (cover, title, author, rating) in grid
Pagination.jsx — Page navigation (Previous/Next, page numbers)
RatingStars.jsx — Star rating display (⭐)
RisingStar.jsx — Featured "Book of the Month" carousel
SearchBar.jsx — Search input with submit button
Layout.jsx — Wrapper with header/footer for all pages
DarkModeToggle.jsx — Theme switcher button
LoadingOverlay.jsx — Full-screen loading spinner
filters/CategoryFilter.jsx — Dropdown to filter by category
toast/ToastContainer.jsx — Toast notification display

Context.. for global state management
DarkModeContext.jsx — Manages theme (light/dark), saves to localStorage
FavoritesContext.jsx — Manages favorite books, saves to localStorage
LoadingContext.jsx — Controls global loading overlay
ToastContext.jsx — Shows/hides toast notifications

pages.. Page Components (Routes)
Home.jsx — Landing page with search, categories, featured books
BooksList.jsx — Full catalog with filters, sorting, pagination
BookDetail.jsx — Single book view with full info, add to favorites
Search.jsx — Search results page
Favorites.jsx — User's saved favorite books
AddBook.jsx — Form to add new book
EditBook.jsx — Form to edit existing book

services/api.js.. Mock API functions
fetchBooks()    : Get all books
getBookByIsbn() : Get single book
createBook()    : Add new book
updateBook()    : Edit book
deleteBook()    : Remove book
getRisingStars(): Get featured books
Includes simulated network delay (300ms) for realistic loading states

Data/books.json.. Mock Data
Array of book objects (ISBN, title, author, cover, rating, etc.)

utils.. helper functions
deriveCategory.js — Extracts category from publisher name
localStorage.js   — Helpers for saving/loading data from browser storage

# Todo
1. What if there is no Internet? Ofline Mode what should i create?
2. Animation. Does Tailwind have proper library for Animation?
3. Add tests (Jest for React Testing Library). What for backend?
4. Add Dockerfile (After i add backend)
5. Add CI/CD workflow.
6. Add live demo (Vercel/netlify). Try find something free.Can i deploy with backend?
7. Backend and use Memonization in React
8. typescript for Security.
9. Multiple Devices used. Mobile phone has hands, Computer keyboard and mouse. Does this make a problem?
10. Replace useEffect. Use React Query (for caching, optimistic updates)
11. Authentication (login/signup, protected routes). Use React Libary or JWT? No Oath for small apps except if used Microservices for educational reasons.
