import React, { useState, useEffect } from "react";
import Seo from "../../components/seo";
import Layout from "../../components/siteLayout";
import BlogPosts from "../../components/BlogPosts";

const Search = () => {
  const [isSliderVisible, setIsSliderVisible] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      // Check if window is defined to ensure it's running in a client-side environment
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem("isSliderVisible");
        try {
          setIsSliderVisible(JSON.parse(storedValue) ?? true);
        } catch (error) {
          setIsSliderVisible(true);
        }
      }
    };

    // Add event listener for storage change
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);
    }

    // Cleanup function to remove event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, []);

  return (
    <Layout className="search">
      <Seo title="Search" />

      <div className="post-container">
        {/* Pass isSliderVisible as a prop to BlogPosts */}
        <BlogPosts isSliderVisible={isSliderVisible} />
      </div>
    </Layout>
  );
};

export default Search;
