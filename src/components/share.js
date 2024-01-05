import * as React from "react"
import { ShareSocial } from 'react-share-social' 


const style = {
  root: {
    background: 'transparent',
    borderRadius: 'var(--theme-ui-colors-borderRadius',
    color: 'var(--theme-ui-colors-headerColorText)',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    padding:'1vh 0',
    width:'100%',
    minWidth: '400px',
    border:'0',
    outline:'0'
  },


};

const Share = () => {
  
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (


    <ShareSocial
    id="share"
    style={style}
    // style={{background:'transparent !important'}}
    url ={url}
    // title="Sharing IS Caring!"
    socialTypes={['facebook','twitter','reddit','linkedin']}>

      </ShareSocial>



  );
};

export default Share



