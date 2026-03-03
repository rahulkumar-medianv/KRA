"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decrement, increment } from "../redux/counterSlice";
import { logout } from "../redux/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  const count = useSelector((state: RootState) => state.counter.value);
  const state = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  // 🔥 Fix Hydration Issue
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/signIn");
  };

  const publicNavigation = [
    { name: "Services", href: "/service" },
    { name: "Contact", href: "/contact" },
    { name: "About us", href: "/about-us" },
  ];

  const authNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Product", href: "/product" },
    { name: "Cart", href: "/cart" },
  ];

  const navigation = state.isAuthenticated
    ? authNavigation
    : publicNavigation;

  return (
    <Disclosure
      as="nav"
      className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <h3 className="ml-2 text-2xl text-blue-200 font-bold">
                Media NV
              </h3>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Log out
              </button>
            ) : (
              <Link
                href="/auth/signIn"
                className="bg-gray-950/50 text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
            )}

            {/* Counter */}
            <button
              onMouseEnter={handleDecrement}
              onClick={handleIncrement}
            >
              <h2 className="text-lime-50 text-2xl">{count}</h2>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 ui-open:hidden" />
              <XMarkIcon className="hidden size-6 ui-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <DisclosurePanel className="sm:hidden px-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              {item.name}
            </DisclosureButton>
          </Link>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}