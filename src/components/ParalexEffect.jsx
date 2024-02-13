import React from 'react'
import ReactParallaxTilt from 'react-parallax-tilt'
import devloper from "../assets/images/png/fronted devloper.jpeg"
import { Link } from 'react-router-dom'
import CommonButton from "./CommonButton";

const ParalexEffect = () => {
  return (
    
    <>
    <div className="container"><Link to='/homepage'> <CommonButton
            linkButton={"Back"}
            className={"mb-4"}
          /></Link></div>
    <div className='overflow-hidden'>
    <ReactParallaxTilt className='d-flex justify-content-center'>
      <div className='parallax_box cursor_pointer'>
        <img className='w-100' src={devloper} alt="devloper" />
      </div>
    </ReactParallaxTilt>
    </div>
    </>
  )
}

export default ParalexEffect