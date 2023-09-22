import React from 'react'
// import the_kong from '../assets/images/webp/the_kong.webp'
const Preloader = () => {
    return (
        <div className='d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-black min-vh-100 w-100 z-5'>
            <div className='d-flex flex-column justify-content-center align-items-center'><h1 className='fs_xl text_ffffff ff_Azo_Sans_Uber preloading_animation mb-0 text-center'>THE KONG</h1></div>
        </div>
    )
}

export default Preloader