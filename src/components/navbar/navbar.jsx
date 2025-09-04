import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "../button/customButton";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Events", href: "/" },
    { name: "My Events", href: "/" },
  ];
  return (
    <div>
      <nav className="max-w-6xl px-4 py-4 mx-auto flex justify-between items-center z-10 relative">
        {/* Logo and navigation links */}
        <div className="flex items-center cursor-pointer">
          <Image src="/logo4.svg" alt="Logo" width={120} height={120} />
        </div>
        <div className="flex items-center text-sm gap-6 font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-neutral-800 font-medium hover:text-neutral-500 transition duration-200"
            >
              {link.name}
            </Link>
          ))}
          <CustomButton label="Create Event" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
