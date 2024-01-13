import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/siteLayout';
import useSiteMetadata from '../hooks/SiteMetadata';
import { Helmet } from 'react-helmet';
import { ImPlay } from "react-icons/im"
import { FaImage } from "react-icons/fa"
import { AiOutlinePicLeft } from "react-icons/ai"
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from "gatsby"
import TimeAgo from 'react-timeago'
const Tag = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = data.allMarkdownRemark.edges;

  const { featureOptions, proOptions, language } = useSiteMetadata()
  const { showDates, showNav, showTitles } = featureOptions
  const { showModals  } = proOptions
  const { dicPlayMultimedia } = language;


  const [selectedTag, setSelectedTag] = useState(tag);
  

  const allTags = data.allMarkdownRemark.group.map(tag => tag.fieldValue);
  
  const handleTagChange = e => {
    setSelectedTag(e.target.value);
    if (e.target.value === '') {
      navigate('/tags/');
    }
  };
  
  const filteredPosts = selectedTag
    ? posts.filter(({ node }) => node.frontmatter.tags.includes(selectedTag))
    : posts;

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }


  return (
    <Layout>
      <Helmet>
        <body id='body' className='tagpage' style={{}} />
      </Helmet>


      {/* <h1 style={{ textAlign: 'center' }}>{tag}</h1> */}

      <div className="magicisland">
        <div className="cattags font">
        
        <select className="" id="tag-select" value={selectedTag} onChange={handleTagChange} style={{ background: 'var(--theme-ui-colors-siteColor)', color:'var(--theme-ui-colors-siteColorText)', borderRadius: 'var(--theme-ui-colors-borderRadius)', padding: '2px', width:'380px', display:'block', margin:'0 1%', overflow:'hidden', height:'34px', lineHeight:'100%' }}>
  <option value=''>All Keywords</option>
  {allTags.map(tag => (
    <option key={tag} value={tag}>
      {tag}
    </option>
  ))}
</select>
      </div> 
      </div>

      <section id="showPosts" style={{marginTop:''}}>

      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: showNav ? '8vw' : '8vw', }}>
        <div className='sliderSpacer' style={{ height: '', paddingTop: '0', display: 'none' }}></div>

        {filteredPosts.map(({ node }) => {
          // const featuredImg = node.frontmatter.featuredImage;
          return (
            <div className='post-card1' style={{ alignItems: '', overflow: 'visible', position:'relative' }} key={node.id}>
              {/* Render featured image thumbnail if it exists */}
        
              <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>


{node.frontmatter.featuredImage ? (
  <GatsbyImage
    image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
    alt={node.frontmatter.title + " - Featured image"}
    className="featured-image1"
    placeholder="blurred"
    style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
  />
) : (
  <StaticImage
    className="featured-image1"
    src="../../static/assets/default-og-image.webp"
    alt="Default Image"
    style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto', borderRadius:'var(--theme-ui-colors-borderRadius)' }}
  />
)}

{node.frontmatter.youtube.youtuber ? (
    <div className="spotlight font" style={{border:'0px solid'}}>
      <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
          <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
          <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
          <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', }} />
        </div>
        {dicPlayMultimedia}
      </div>
    </div>
  ) : ("")}
</Link>

<div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>

<div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent:'center', margin: '10px auto', maxWidth: '', gap: '.4vw', maxHeight: '74px', textAlign: 'left', padding: '10px 5%', fontSize: 'clamp(.7rem,.8vh,12px)', outline:'0px solid #444', overFlow:'hidden', lineHeight:'2.4vh', borderRadius:'var(--theme-ui-colors-borderRadius)', background: showTitles ? 'var(--theme-ui-colors-headerColor)' : 'transparent', }}>
  {showTitles ? (
    <h2 className="title1" style={{width:'100%', }}>{node.frontmatter.title}</h2>
  ) : (
    ""
  )}

  {showDates ? (
    <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '', padding:'0', margin:'0 0 0 20px', maxWidth: '60px', lineHeight:'100%' }}>
      <TimeAgo date={node.frontmatter.date} />
    </p>
  ) : ("")}
</div>
</div>
              
            </div>
          );
        })}
      </div>

      </section>
    </Layout>
  );
};

export const query = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "blog-post" }
          draft: { ne: true }
          tags: { in: [$tag] }
        }
      }
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            category
            youtube{
              youtuber
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  quality: 80
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            tags
          }
        }
      }
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tag;
