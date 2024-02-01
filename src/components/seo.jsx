import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import lightThemeColors from "../../static/data/default-colors.json";
import darkThemeColors from "../../static/data/dark-theme-colors.json";

export default function Seo({
  title = "",
  description = "",
  pathname = "",
  image = "",
  children = null,
  isDarkMode = false, // Set this variable based on your dark/light mode logic
}) {
  const location = useLocation();
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleDefault
          siteUrl
          description
          image
          twitterUsername
          companyname
          icon512
        }
      }
    }
  `);

  const {
    titleDefault,
    siteDescription,
    siteImage,
    twitterUsername,
  } = siteMetadata;

  const seo = {
    title: title || titleDefault,
    description: description || siteDescription,
    url: pathname ? `${pathname}` : location.href,
    image: `${image || siteImage}`,
  };

  const themeColor = isDarkMode ? darkThemeColors.siteColor : lightThemeColors.siteColor;

  return (
    <Helmet
      title={title}
      defaultTitle={titleDefault}
      titleTemplate={`%s | ${titleDefault}`}
    >
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content={seo.description} />
      <meta content={themeColor} name="theme-color" />

      {/* ... other meta tags ... */}

      {children}
    </Helmet>
  );
}
