// MainPage.js

import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/siteLayout';
import MagicIsland from '../components/MagicIsland';
import PostListing from '../components/PostListing';
import useSiteMetadata from '../hooks/SiteMetadata';

const MainPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { homecount } = useSiteMetadata();

  const posts = data.allMarkdownRemark.edges;

  const handleSearch = (searchInput) => {
    setSearchTerm(searchInput);
    setSelectedTag('');
    setSelectedCategory('');
    console.log('Search term:', searchInput);
    console.log('Selected tag:', '');
    console.log('Selected category:', '');
  };

  const handleTagChange = (selectedTag) => {
    setSelectedTag(selectedTag);
    setSelectedCategory('');
    console.log('Search term:', '');
    console.log('Selected tag:', selectedTag);
    console.log('Selected category:', '');
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedTag('');
    console.log('Search term:', '');
    console.log('Selected tag:', '');
    console.log('Selected category:', selectedCategory);
  };

  return (
    <Layout>


<div className="" style={{display:'grid', placeSelf:'center', margin:'0 auto', border:'0px solid red', position: 'fixed', zIndex: '3', top: '', left: '1%', right: '1%', maxWidth:'550px', padding:'0', fontFamily:'var(--theme-ui-colors-fontFamily)' }}>
      <MagicIsland
        onSearch={handleSearch}
        onTagChange={handleTagChange}
        onCategoryChange={handleCategoryChange}
        tags={getUniqueTags(posts)}
        categories={getUniqueCategories(posts)}
      />
</div>

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>
        <PostListing
          posts={filterPosts(posts, searchTerm, selectedTag, selectedCategory, homecount)}
        />
      </div>
    </Layout>
    
  );
};

const getUniqueTags = (posts) => {
  const tagsSet = new Set();
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
};

const getUniqueCategories = (posts) => {
  const categoriesSet = new Set();
  posts.forEach(({ node }) => {
    if (node.frontmatter.category) {
      node.frontmatter.category.forEach((category) => categoriesSet.add(category));
    }
  });
  return Array.from(categoriesSet);
};

const filterPosts = (posts, searchTerm, selectedTag, selectedCategory, homecount) => {
  return posts.filter((post) => {
    const { node } = post;
    const hasTitle = node && node.frontmatter && node.frontmatter.title;
    const hasTags = node && node.frontmatter && node.frontmatter.tags;
    const hasCategory = node && node.frontmatter && node.frontmatter.category;

    const isTagMatch = selectedTag ? hasTags && hasTags.includes(selectedTag) : true;
    const isCategoryMatch = selectedCategory ? hasCategory && hasCategory.includes(selectedCategory) : true;

    console.log("Title:", hasTitle);
    console.log("Tags:", hasTags);
    console.log("Category:", hasCategory);
    console.log("Is Tag Match:", isTagMatch);
    console.log("Is Category Match:", isCategoryMatch);

    return (
      hasTitle &&
      (searchTerm ? hasTitle.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      isTagMatch &&
      isCategoryMatch
    );
  }).slice(0, homecount);
};



export const query = graphql`
query MultiQuery($homecount: Int) {
  allMarkdownRemark(
    filter: {frontmatter: {template: {eq: "blog-post"}}}
    sort: [{frontmatter: {spotlight: ASC}}, {frontmatter: {date: DESC}}]
    limit: $homecount
  ) {
    edges {
      node {
        fields {
          slug
        }
        id
        frontmatter {
          date
          title
          tags
          slug
          category
          featuredImage {
            childImageSharp {
              gatsbyImageData(quality: 80, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          youtube {
            youtuber
          }
        }
      }
    }
  }
}
`;

export default MainPage;
