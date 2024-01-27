import React from 'react'
import { Link } from 'react-router-dom'
import InputFile from './InputFile'

const HomePage = () => {
  return (
   <>
   <div className='d-flex flex-wrap gap-4 container my-5'>

<Link to='/accordian'><button className='common_btns'>Accordian</button></Link>
<Link  className='cursor_block' to='/audioplayer'><button disabled className='common_btns'>Audio Player</button></Link>
<Link to='/countdown'><button className='common_btns'>Countdown Timer</button></Link>
<Link to='/darkmode'><button className='common_btns'>Dark Mode</button></Link>
<Link to='/emailjs'><button className='common_btns'>Email Js</button></Link>
<Link to='/formvalidation'><button className='common_btns'>Form Validation</button></Link>
<Link to='/realtimedatabase'><button className='common_btns'>Realtime Database</button></Link>
<Link to='/firestoredatabase'><button className='common_btns'>Firestore Database</button></Link>
<Link to='/firebaseauthentication'><button className='common_btns'>Firebase Authentication</button></Link>
<Link to='/googlemap'><button className='common_btns'>Google Map</button></Link>
<Link to='/gsap'><button className='common_btns'>Gsap</button></Link>
<Link to='/inputfile'><button className='common_btns'>Input Type</button></Link>
<Link to='/map'><button className='common_btns'>Map Function</button></Link>
<Link to='/navbar'><button className='common_btns'>Nav Bar</button></Link>
<Link to='/nestedmap'><button className='common_btns'>Nested Map</button></Link>
<Link to='/parallaxeffect'><button className='common_btns'>Parallax Effect</button></Link>
<Link to='/swiperslider'><button className='common_btns'>Swiper Slider</button></Link>
<Link to='/tickerslider'><button className='common_btns'>Ticker Slider</button></Link>
<Link to='/todolist'><button className='common_btns'>To Do List</button></Link>
<Link to='/typewriter'><button className='common_btns'>Type Writer Effect</button></Link>
<Link to='/videoplayer'><button className='common_btns'>Video Player</button></Link>
   </div>
   </>
  )
}

export default HomePage