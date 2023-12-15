import React from "react"
// import useSiteMetadata from "../hooks/SiteMetadata"
import Seo from "../components/seo"
import Layout from "../components/siteLayout"


import styled from "styled-components"
const CustomBox = styled.div`

`

function Test () {

  return (

  <Layout className="not-found-page">
    <Seo title="Page not found" />

      <header className=""></header>

        {/* <AiFillRobot
          style={{
            fontSize: "160px",
            color: "var(--primary-color)",
            margin:'0 auto',
        textAlign:'center'
          }}
        /> */}



{/* <div className="scroll-container1" style={{display:'flex', justifyContent:'start', maxWidth:'', height:'calc(100vh - 70px)', margin:'0 auto 0 auto', position:'relative', left:'0', right:'0', top:'0'}}> */}

<div className="horizontal-scroll-container">
      <div className="horizontal-scroll-content">
        {/* Your content goes here */}
        <div className="section">Section 1</div>
        <div className="section">Section 2</div>
        <div className="section">Section 3</div>
        {/* Add more sections as needed */}
      </div>
    </div>




{/* </div> */}

  </Layout>
  );
      }

export default Test



// import React from "react"
// import { Link } from "gatsby"
// import { RiArrowLeftSLine, RiBugLine } from "react-icons/ri"
// import { StaticImage } from "gatsby-plugin-image"
// // import { AiFillRobot } from "react-icons/ai"
// import Seo from "../components/seo"
// import Layout from "../components/siteLayout"

// const NotFound = () => (
//   <Layout className="not-found-page">
//     <Seo title="Page not found" />

//       <header className="tvscreen"></header>

//         {/* <AiFillRobot
//           style={{
//             fontSize: "160px",
//             color: "var(--primary-color)",
//             margin:'0 auto',
//         textAlign:'center'
//           }}
//         /> */}
//  <div style={{display:'grid', justifyContent:'center', gap:'30px', height:'100vh', width:'100vw',  border:'0px solid', background:'rgba(0, 0, 0, .8)'}}>

  

//  <StaticImage src="../img/moose.webp" alt="Todd builds Web Apps" style={{height:'auto', position:'fixed', top:'80px', left:'0', zIndex:'', width:'100vw', maxHeight:'60%',  objectFit:'contain', overflow:'',}}  />


// {/* <h1 className="headline1" style={{fontSize:'200%'}}>Well, Darn.</h1> */}
// <p className="headline1" style={{fontSize:'', margin:'2rem auto'}}>
  
// </p>

// <div style={{display:'flex',}}>
//         <Link to="/" className="button">
//         <RiArrowLeftSLine className="icon -left" />
//         Back to Homepage
//       </Link>
//       <Link to="/contact" className="button">
//         Report this &nbsp;<RiBugLine className="icon -right" />
//       </Link></div>

      
//       </div>


//   </Layout>
// )

// export default NotFound
