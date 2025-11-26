export default function Footer() {
  return (
    <footer className="mt-10 py-6 bg-gray-100 text-center text-sm text-gray-600 border-t">
      <p>
        © {new Date().getFullYear()} <strong>Book Explorer</strong>.  
        All rights reserved.
      </p>

      <p className="mt-1">
        Built with <span className="text-indigo-600 font-semibold">React + Vite</span>
      </p>
    </footer>
  );
}
