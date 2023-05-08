import React, { useState } from "react";
import SEO from "../containers/seo";
import { Link } from "react-router-dom";
import Layout from "../containers/Layout";
import { useMatches, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const handleRegister = () => {
    navigate("/tasks");
    console.table(email, password, name, username);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      default:
        setUsername(value);
    }
  };

  return (
    <Layout>
      <SEO title="Register" description="Register Page" />
      <div className="w-full flex  flex-col justify-center items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 font-sans text-3xl font-bold text-cyan-800">
                Sign up
              </h1>

              <p className="text-gray-500 ">
                Sign up for an account to get started
              </p>
            </div>

            <div className="m-7">
              <form action="">
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-600 "
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm text-gray-600 "
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    placeholder="jdoe"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 "
                    >
                      Password
                    </label>

                    <a
                      href="#!"
                      className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500np"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>

                <div className="mb-6">
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full px-3 py-4 text-white bg-[#121212] focus:bg-[#121212] focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 "
                  >
                    Sign in
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
