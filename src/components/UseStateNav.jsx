import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UseStateNav = () => {
    const [person, setPerson] = useState("")
    const [value, setValue] = useState("palvi")
    const [showNavbar, setShowNavbar] = useState(true);

    const [name, setName] = useState("muskan");
    const [input1, setInput1] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: 0,
        gender: "",
        radio: "",

    })

    if (showNavbar) {
        document.body.classList.remove('overflow-hidden');
    } else {
        document.body.classList.add('overflow-hidden')
    }
    return (
        <div className='container my-5'>
            <h1 className='text-center mb-5'>== UseState Nav Start Here ==</h1>

            <header className='py-4 bg-warning  w-100'>
                <Container>
                    <nav className='d-flex justify-content-between align-items-center'>
                        <h1>logo</h1>
                        <ul className={`${showNavbar ? 'd-flex align-items-center gap-4 mb-0 nav_sm p-0' : 'd-flex align-items-center gap-4 mb-0 nav_sm nav_show p-0'} `}>
                            <li><Link onClick={() => setShowNavbar(true)} className=''>Home</Link></li>
                            <li><Link onClick={() => setShowNavbar(true)} className=''>About</Link></li>
                            <li><Link onClick={() => setShowNavbar(true)} className=''>Team</Link></li>
                            <li><Link onClick={() => setShowNavbar(true)} className=''>Roadmap</Link></li>
                            <li><Link onClick={() => setShowNavbar(true)} className=''>Partners</Link></li>
                            <li><button className='connect_wallet text_ffffff fs_sm fw-medium ff_lato'>Connect Wallet</button></li>
                            <span title="close" className="ms-4 close_nav text-white fw-bold fs-1 d-lg-none" onClick={() => setShowNavbar(true)}>&times;</span>
                        </ul>
                        <span title="open"
                            className="d-inline d-lg-none fw-bold fs-1 text-white"
                            onClick={() => setShowNavbar(false)}>
                            &#9776; </span>
                    </nav>
                </Container>
            </header>
            <h1 className='text-center mt-5'>^^ UseState Nav End Here ^^</h1>
            <div>
                <h1>usestate toggle button</h1>
                <button onClick={() => setName(!name)}>save</button>
                <p>{name ? "muskan" : "palvi"}</p>
            </div>

            <div>
                <h1>input data show on screen</h1>
                <input type="text" placeholder='your name' onChange={(e) => setPerson(e.target.value)} />
                <p>{person}</p>
            </div>
            <div>
                <h1>input default value</h1>
                <input type="text" placeholder='your name' value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default UseStateNav