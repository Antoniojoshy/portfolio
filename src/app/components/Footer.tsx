
export function Footer() {
  return (
    <footer className="relative bg-navy-base border-t border-navy-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-slate-text text-center text-sm md:text-base">
          © {new Date().getFullYear()} Antonio Joshy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
