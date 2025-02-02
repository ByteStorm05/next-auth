"use client";
import { useState } from "react";
import Link from "next/link";
import { Auth } from "./auth"; // Ensure this path is correct

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Container with 3 sections */}
        <div className="flex w-full items-center justify-between">
          {/* 1. Logo and Name */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/logo.svg"
                className="h-16"
                alt="Flowbite Logo"
              />
              <span className="text-2xl font-medium text-gray-700 whitespace-nowrap logo">addicere</span>
            </Link>
          </div>

          {/* 2. Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-8  ">
            <Link
              href="/"
              className="underline-animation block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              href="/firebase"
              className="underline-animation block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Firebase🔥
            </Link>
            <Link
              href="/about"
              className="underline-animation block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="#"
              className="underline-animation block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Services
            </Link>
            <Link
              href="#"
              className="underline-animation block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>

          {/* 3. Auth Component and Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <Auth />
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={handleMenu}
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 2l10 10M2 12L12 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-white shadow-lg md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id="navbar-cta"
      >
        <ul className="flex flex-col font-medium p-4 border border-gray-100 rounded-lg bg-gray-50">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/firebase"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Firebase🔥
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
