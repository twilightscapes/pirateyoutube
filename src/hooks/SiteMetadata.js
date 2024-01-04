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
          showArchive
          showTitles
          showConsent
          showSocial
          showBranding
          showLegal
          showModals
          showContact
          showPopup
          ShowDisclaimer
          magicOptions {
            showMagic
            showMagicCat
            showMagicTag
            showMagicSearch
          }
          language {
            dicLoadMore
            dicViewArchive
            dicCategory
            dicKeyword
            dicSearch
            dicClear
            dicResults
            dicContact
            dicSocial
            dicDisclaimer
            dicPrivacy
            dicTerms
            dicCopyright
            dicSwipe
            dicScroll
            dicPirate
            dicSiteReport
            dicLight
            dicDark
            dicGoBack
            dicPlayVideo
            dicPlayMultimedia
            dicClickToView
            dicSignUpText
            dicSignUpButton
          }
        }
      }
    }
  `
  );
  return site.siteMetadata;
};

module.exports = useSiteMetadata;
