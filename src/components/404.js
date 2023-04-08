import React from "react";
import Layout from "../containers/Layout";
import SEO from "../containers/seo";

const ErrorPage = () => {
  return (
    <Layout>
      <SEO title="404 Error Page" description="404 Error Page" />
      <div className="w-full flex  flex-col justify-center items-center text-gray-600">
        <h1 className="text-3xl font-bold">Oops!</h1>

        <h2 className="text-2xl text-center font-bold mt-2">Page not found</h2>
      </div>
    </Layout>
  );
};

export default ErrorPage;
