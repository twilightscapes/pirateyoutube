const { useStaticQuery, graphql } = require("gatsby");

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          titleDefault
          siteUrl
          description
          image
          twitterUsername
          iconimage
          companyname
          showNav
          showNav2
          showDates
          showSearch
          showSwipe
          postcount
          homecount
          font1
          showArchive
          showTitles
          magicOptions {
            showMagic
            showMagicCat
            showMagicTag
            showMagicSearch
          }
        }
      }
    }
  `
  );
  return site.siteMetadata;
};

module.exports = useSiteMetadata;
