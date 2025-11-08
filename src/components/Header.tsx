// Import necessary components and hooks from React and UI libraries
import { Button } from "@/components/ui/button";
// import { MoonIcon, SunIcon } from "lucide-react"; // Assuming you want to add dark mode toggle

// Header component for the blog application
function Header() {
  // State for managing theme (if you implement dark mode)
  // const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    // Main header container
    // flex: enables flexbox layout
    // justify-between: spaces items evenly
    // items-center: centers items vertically
    // w-full: full width
    // p-4: padding all around
    // border-b: bottom border
    // bg-blue-950: dark blue background for light mode
    // dark:bg-gray-800: dark mode background color
    // dark:border-gray-700: dark mode border color
    <header className="flex justify-between items-center w-full p-4 border-b bg-blue-950 dark:bg-gray-800 dark:border-gray-700">
      {/* Left section: Blog title/logo */}
      <h1 className="text-2xl font-bold tracking-tight text-white dark:text-white">
        My React Blog
      </h1>

      {/* Right section: Navigation and controls */}
      <div className="flex items-center gap-4">
        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-gray-200">
            Home
          </Button>
          <Button variant="ghost" className="text-white hover:text-gray-200">
            About
          </Button>
          <Button variant="ghost" className="text-white hover:text-gray-200">
            Contact
          </Button>
        </nav>

        {/* Theme toggle button - commented out until implemented */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-gray-200"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button> */}
      </div>
    </header>
  );
}

// Export Header component as default export
export default Header;
