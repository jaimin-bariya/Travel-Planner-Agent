import { MapPin, Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t border-gray-100 pt-12 pb-8 px-6 md:px-12">
      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-travel-500 mr-2" />
            <span className="font-semibold text-lg">VoyageVision</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your intelligent travel planning assistant, powered by AI.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-travel-600 text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-travel-600 text-sm">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-travel-600 text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="text-gray-600 hover:text-travel-600 text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-600 hover:text-travel-600 text-sm">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <a href="mailto:info@voyagevision.com" className="text-gray-600 hover:text-travel-600 text-sm">
                info@voyagevision.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <a href="tel:+11234567890" className="text-gray-600 hover:text-travel-600 text-sm">
                +1 (123) 456-7890
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} JP.  rights Not-reserved 😴.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-travel-600">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;