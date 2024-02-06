import React, { useState, useEffect } from "react";
import Seo from "../components/seo";
import Layout from "../components/siteLayout";
import TagPosts from "../components/TagPosts";
import { Helmet } from "react-helmet"
const Tags = () => {
  // Check if localStorage is available
  const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // Set the initial state directly from localStorage if available, otherwise set to true
  const storedValue = isLocalStorageAvailable ? localStorage.getItem("isSliderVisible") : null;
  const initialSliderVisible = storedValue ? JSON.parse(storedValue) : true;

  const [isSliderVisible, setIsSliderVisible] = useState(initialSliderVisible);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      // Update isSliderVisible when it changes in localStorage
      const handleStorageChange = () => {
        const storedValue = localStorage.getItem("isSliderVisible");
        try {
          setIsSliderVisible(JSON.parse(storedValue) ?? true);
        } catch (error) {
          setIsSliderVisible(true);
        }
      };

      // Add event listener for storage change
      window.addEventListener("storage", handleStorageChange);

      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [isLocalStorageAvailable]);

  return (
    <Layout className="tags">
      <Seo title="Tags" />
<Helmet>
<body id="body" className="tagspage" />
</Helmet>

      <div className="post-container" id="posttop">
        {/* Pass isSliderVisible as a prop to BlogPosts */}
        <TagPosts isSliderVisible={isSliderVisible} />
      </div>
    </Layout>
  );
};

export default Tags;
