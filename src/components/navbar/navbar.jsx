"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "../button/customButton";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Events", href: "/all-events" },
    { name: "My Events", href: "/my-events" },
  ];
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-event");
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "none"
      }`}
    >
      <nav className="max-w-6xl px-4 py-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo4.svg" alt="Logo" width={120} height={120} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center text-sm gap-6 font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-neutral-800 font-medium hover:text-neutral-500 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
          <CustomButton label="Create Event" onClick={handleClick} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center p-2 text-neutral-800 hover:text-neutral-500 transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-neutral-800 font-medium hover:text-neutral-500 transition duration-200 py-2"
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <CustomButton label="Create Event" onClick={handleClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
