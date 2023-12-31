
import CMS from "decap-cms-app"

/**
 * Any imported styles should be automatically be applied to the editor preview
 * pane thus eliminating the need to use `registerPreviewStyle` for imported
 * styles. However if you are experiencing build errors regarding importing css,
 * sass or scss into a cms module when deploying to the netlify platform, you
 * may need to follow the implementation found in netlify documentation here:
 * https://www.decapcms.org/docs/beta-features/#raw-css-in-registerpreviewstyle
 * All of the example imports below would result in styles being applied to the
 * preview pane.
 */
// import "module-that-imports-styles.js"
// import "styles.scss"
// import "../other-styles.css"

/**
 * Let's say you've created widget and preview components for a custom image
 * gallery widget in separate files:
 */
// import ImageGalleryWidget from "./image-gallery-widget.js"
// import ImageGalleryPreview from "./image-gallery-preview.js"

/**
 * Register the imported widget:
 */
// CMS.registerWidget(`image-gallery`, ImageGalleryWidget, ImageGalleryPreview)

// document.addEventListener("DOMContentLoaded", function() {
//     // Register 'logout' event listener
//     netlifyIdentity.on('logout', () => {
//       // Refresh the parent window
//       // window.top.location.reload();
//       window.top.location.href = '/';
//     });

//     // Register 'login' event listener
//     netlifyIdentity.on('login', () => {
//       window.top.location.href = '/pirate';
//     });
//   });