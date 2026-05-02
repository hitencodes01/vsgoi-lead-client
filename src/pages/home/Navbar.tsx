import { useState } from "react";
import { useLeadUI } from "../../store/useLeadUI";
import { Menu, SquareArrowRightExit } from "lucide-react";

export default function Navbar() {
  const open = useLeadUI((s) => s.open);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/download.jpg"
              alt="VSGOI Logo"
              className="h-10 w-auto object-contain rounded-md"
            />

            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-bold text-blue-900">VSGOI</span>
              <span className="text-[10px] text-gray-500">
                Transforming Passion into Careers
              </span>
            </div>
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:block text-center">
            <h1 className="text-base xl:text-lg font-semibold text-blue-900">
              Dr. Virendra Swarup Group of Institutions
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+917311105831"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition"
            >
              Call Now
            </a>

            <button
              onClick={open}
              className="px-4 sm:px-5 py-2 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-md transition"
            >
              Apply Now
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
            >
              {isMenuOpen ? (
                <SquareArrowRightExit color="black" />
              ) : (
                <Menu color="black" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 border-t pt-4">
              <a
                href="tel:+917311105831"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                📞 Call: +91 73111 05831
              </a>

              <a
                href="https://www.vsgoi.in"
                target="_blank"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                🌐 Website
              </a>

              <a
                href="https://www.instagram.com/vsgoi_unnao.in/"
                target="_blank"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                📸 Instagram
              </a>

              <button
                onClick={() => {
                  open();
                  setIsMenuOpen(false);
                }}
                className="mt-2 w-full py-2 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
