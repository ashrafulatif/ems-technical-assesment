"use client";
import React from "react";
import { Calendar, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomButton from "../button/customButton";

const Footer = () => {
  const router = useRouter();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "All Events", href: "/all-events" },
    { name: "My Events", href: "/my-events" },
    { name: "Create Event", href: "/create-event" },
  ];

  const socialLinks = [
    { name: "Email", icon: Mail, href: "mailto:contact@ems.com" },
    { name: "Phone", icon: Phone, href: "tel:+1234567890" },
    { name: "Location", icon: MapPin, href: "#" },
  ];

  return (
    <footer className="border-t border-gray-200 mt-6">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">EMS</h3>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Magically simplify events and planning. Create events, manage
              RSVPs, and keep everything organized, all in one place.
            </p>
            <div className="mt-6">
              <CustomButton
                onClick={() => router.push("/create-event")}
                label="Get Started"
              ></CustomButton>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-gray-600 hover:text-teal-600 transition duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-600 hover:text-teal-600 transition duration-200 text-sm"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name === "Email" && "contact@ems.com"}
                    {link.name === "Phone" && "+880 1706534595"}
                    {link.name === "Location" && "Dhaka, Bangladesh"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EMS. All rights reserved.
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-500 hover:text-teal-600 transition duration-200 text-sm">
                Privacy Policy
              </button>
              <button className="text-gray-500 hover:text-teal-600 transition duration-200 text-sm">
                Terms of Service
              </button>
              <button className="text-gray-500 hover:text-teal-600 transition duration-200 text-sm">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
