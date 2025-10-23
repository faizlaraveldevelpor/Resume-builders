import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#0B1739] text-white mt-16 w-full flex flex-col items-center">
      <div className="w-full 2xl:w-[1200px] px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h3 className="text-[22px] font-bold text-white mb-3">ResumeBuilder</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Build your professional resume effortlessly with our easy-to-use
            builder. Stand out and land your dream job today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#68a3fc]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/choesoptions" className="hover:text-white transition-colors">
                Build Resume
              </Link>
            </li>
            <li>
              <Link href="/templates" className="hover:text-white transition-colors">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#68a3fc]">
            Resources
          </h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-[#68a3fc]">Follow Us</h4>
          <div className="flex items-center gap-x-4">
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#1C74F8] rounded-full hover:bg-[#418af7] transition-all"
            >
              <Facebook className="text-white size-5" />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#1C74F8] rounded-full hover:bg-[#418af7] transition-all"
            >
              <Twitter className="text-white size-5" />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#1C74F8] rounded-full hover:bg-[#418af7] transition-all"
            >
              <Linkedin className="text-white size-5" />
            </Link>
            <Link
              href="mailto:info@resumebuilder.com"
              className="w-9 h-9 flex items-center justify-center bg-[#1C74F8] rounded-full hover:bg-[#418af7] transition-all"
            >
              <Mail className="text-white size-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1c2d57] w-full py-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ResumeBuilder — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
