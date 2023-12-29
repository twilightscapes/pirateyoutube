// Test.js
import React from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import BlogPosts from "../components/BlogPosts"; // Import the BlogPosts component

const Test = () => {
  return (
    <Layout className="not-found-page">
      <Seo title="Page not found" />

      <div className="post-container">
        {/* Use the BlogPosts component */}
        <BlogPosts />
      </div>
    </Layout>
  );
};

export default Test;
