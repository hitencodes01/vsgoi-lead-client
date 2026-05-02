const COURSES = ["B.Tech", "BBA", "BCA", "MBA", "ITI", "Polytechnic"];

export default function SocialLinks() {
  return (
    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">

      {/* Header */}
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
        Courses Offered
      </div>

      {/* List */}
      <ul className="flex flex-col">
        {COURSES.map((course) => (
          <li key={course}>
            <button
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition flex items-center justify-between group"
            >
              <span>{course}</span>

              {/* Arrow icon */}
              <span className="text-gray-400 group-hover:translate-x-1 transition">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer CTA */}
      <div className="border-t p-3">
        <button className="w-full text-center text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg py-2 transition">
          Explore All Courses
        </button>
      </div>

    </div>
  );
}