import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
   <>
   <div className='d-flex flex-wrap gap-4 container my-5'>

<Link to='/navbar'><button className='common_btns'>Nav Bar</button></Link>
<Link to='/map'><button className='common_btns'>Map Function</button></Link>
<Link to='/tickerslider'><button className='common_btns'>Ticker Slider</button></Link>
<Link to='/formvalidation'><button className='common_btns'>Form Validation</button></Link>
<Link to='/swiperslider'><button className='common_btns'>Swiper Slider</button></Link>
<Link to='/todolist'><button className='common_btns'>To Do List</button></Link>
<Link to='/nestedmap'><button className='common_btns'>Nested Map</button></Link>
<Link to='/typewriter'><button className='common_btns'>Type Writer Effect</button></Link>
<Link to='/parallaxeffect'><button className='common_btns'>Parallax Effect</button></Link>
<Link to='/gsap'><button className='common_btns'>Gsap</button></Link>
<Link to='/darkmode'><button className='common_btns'>Dark Mode</button></Link>
<Link  className='cursor_block' to='/videoplayer'><button disabled className='common_btns'>Video Player</button></Link>
<Link  className='cursor_block' to='/audioplayer'><button disabled className='common_btns'>Audio Player</button></Link>
<Link to='/emailjs'><button className='common_btns'>Email Js</button></Link>
<Link to='/googlemap'><button className='common_btns'>Google Map</button></Link>
   </div>
   </>
  )
}

export default HomePage