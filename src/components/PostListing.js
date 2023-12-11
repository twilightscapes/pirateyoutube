import React, { useState } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import TimeAgo from 'react-timeago';
import { FaImage } from 'react-icons/fa';
import { ImPlay } from 'react-icons/im';
import { AiOutlinePicLeft } from 'react-icons/ai';
import useSiteMetadata from '../hooks/SiteMetadata';

const PostListing = ({ posts, showDates, showModals, postcount }) => {
  const { homecount } = useSiteMetadata();
  const [visibleItems, setVisibleItems] = useState(postcount);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + homecount);
  };

  console.log('Posts:', posts);
  console.log('Visible Items:', visibleItems);

  return (
    <>
      {posts.slice(0, visibleItems).map(({ node }, index) => (
        <div key={index} className="post-card1" style={{ alignItems: 'center' }}>
          <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.fields.slug}>
            {node.frontmatter.featuredImage ? (
              <GatsbyImage
                image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                alt={node.frontmatter.title + ' - Featured image'}
                className="featured-image1"
                placeholder="blurred"
                loading="eager"
                style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
              />
            ) : (
              <StaticImage
                className="featured-image1"
                src="../../static/assets/default-og-image.webp"
                alt="Default Image"
                style={{ position: 'relative', zIndex: '' }}
              />
            )}
            <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '0', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
              {node.frontmatter.youtube.youtuber ? (
                <div className="spotlight" style={{ marginLeft: '10%', marginTop: '-28%', margin: '-24% 10% 0 10%' }}>
                  <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff' }}>
                      <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                      <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                      <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                    </div>
                    Play Multimedia
                  </div>
                </div>
              ) : (
                ''
              )}
              <div
                className="panel"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px auto',
                  maxWidth: '80vw',
                  gap: '.4vw',
                  height: '',
                  textAlign: 'center',
                  padding: '1vh 2vw',
                  fontSize: 'clamp(1rem, 1vw, 1rem)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '',
                  color: '#aaa',
                }}
              >
                <h2 className="title1" style={{}}>
                  {node.frontmatter.title}
                </h2>
              </div>
            </div>
          </Link>
          {showDates ? (
            <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '70%', minWidth: '100px' }}>
              <TimeAgo date={node.frontmatter.date} />
            </p>
          ) : (
            ''
          )}
        </div>
      ))}
      {postcount < posts.length && (
        <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '', height: '50vh' }}>
          <button className="button load-more" onClick={showMoreItems}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default PostListing;
