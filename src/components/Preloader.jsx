import React from 'react'
import preloader from '../assets/images/webp/practice.webp'

const Preloader = () => {
    return (
        <div className='d-flex justify-content-center align-items-center position-fixed top-0 start-0 bg-black min-vh-100 w-100 z-3'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img src={preloader} alt="practice_make_perfect" />
            </div>
        </div>
    )
}

export default Preloader