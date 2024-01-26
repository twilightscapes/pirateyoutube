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
          postcount
          homecount

          featureOptions{
            showfooter
            showDates
            showSearch
            showSwipe
            showArchive
            showTitles
            showSocial
          }

          proOptions{
            showConsent
            showBranding
            showLegal
            showModals
            showContact
            showPopup
            ShowDisclaimer
            showDefault
            startUrl
          }
          navOptions{
            showFooterMenu
            showNav
            showNav2
          }
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
            dicClose
            dicName
            dicEmail
            dicMessage
            dicSubmit
            dicPhone
            dicConfirmation
          }
        }
      }
    }
  `
  );
  return site.siteMetadata;
};

module.exports = useSiteMetadata;
