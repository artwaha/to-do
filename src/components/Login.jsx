import React, { useState } from "react";
import SEO from "../containers/seo";
import { Link } from "react-router-dom";
import Layout from "../containers/Layout";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(TodoContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/tasks");
    console.table(email, password);
    // updateIsLoggedIn(true);
    // setIsLoggedIn(true);
    // console.table(setIsLoggedIn);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Layout>
      <SEO title="Login" description="Login Page" />
      <div className="w-full flex  flex-col justify-center items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 font-sans text-3xl font-bold text-cyan-800">
                Sign in
              </h1>

              <p className="text-gray-500 ">Sign in to access your Tasks</p>
            </div>

            <div className="m-7">
              <form action="">
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
                    onClick={handleLogin}
                    className="w-full px-3 py-4 text-white bg-[#121212] focus:bg-[#121212] focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    to={"/register"}
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 "
                  >
                    Sign up
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

export default Login;
