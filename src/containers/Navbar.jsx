import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const navigation = [
        { name: "All Tasks", path: "/" },
        { name: "Todo", path: "todo" },
        { name: "Done", path: "done" },
    ];



    return (
        <div className="w-full border-b border-gray-200">
            <nav className="max-w-screen-lg mx-auto relative flex flex-wrap items-center justify-between p-4 lg:justify-between">
                {/* Logo  */}
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                                <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-[#20232A] to-indigo-500 flex font-extrabold items-center space-x-2 text-2xl text-indigo-500 ">
                                    To-do
                                </Link>

                                <Disclosure.Button
                                    aria-label="Toggle Menu"
                                    className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none  ">
                                    <svg
                                        className="w-6 h-6 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        {open && (
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                            />
                                        )}
                                        {!open && (
                                            <path
                                                fillRule="evenodd"
                                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                            />
                                        )}
                                    </svg>
                                </Disclosure.Button>

                                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                                    <>
                                        {navigation.map((item, index) => (
                                            <Link key={index} to={item.path} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none ">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </>
                                </Disclosure.Panel>
                            </div>
                        </>
                    )}
                </Disclosure>

                {/* menu  */}
                <div className="hidden lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 lg:pt-0 list-reset lg:flex">
                        {navigation.map((menu, index) => (
                            <li className="mr-3 nav__item" key={index}>
                                <Link to={menu.path} className="inline-block p-2 font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}