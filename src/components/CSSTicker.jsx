import React from 'react'
import { Link } from 'react-router-dom'

const CSSTicker = () => {
  return (
    <>
   <div className='container'><Link to='/'><button className='common_btns my-4'>Back</button></Link></div>
     <div className="marquee mt-5 bg-warning">
             <div className="marquee__content">
                 <ul className="list-inline">
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                 </ul>
                 <ul className="list-inline">
                    <li>Lorem ipsum dolor sit amet. Lorem</li>
                    <li>Lorem ipsum dolor sit amet. Lorem</li>  
                    <li>Lorem ipsum dolor sit amet. Lorem</li>
                    <li>Lorem ipsum dolor sit amet. Lorem</li>
                 </ul>
                 <ul className="list-inline">
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                   <li>Lorem ipsum dolor sit amet. Lorem</li>
                 </ul>
             </div>
         </div>

    </>
  )
}

export default CSSTicker