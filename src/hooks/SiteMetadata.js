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
          showfooter
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
          showConsent
          showSocial
          showBranding
          showLegal
          showModals
          showContact
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
