import React from 'react'
import { Container } from 'react-bootstrap'

const MyForm = () => {
    return (
        <section className='py-5 bg-black'>
            <Container>
                <h1 className='text-white fw-bold text-center mb-5'>SEND US YOUR DETAILS</h1>
                <form className='d-flex justify-content-between'>
                    <div className='d-flex flex-column align-items-end gap-5'>
                        <label className='fs-4 text-white fw-semibold '>
                            FIRST NAME <span className=' text-danger'>*</span>
                            <input required type="text" className='ms-2' />
                        </label>
                        <label className='fs-4 text-white fw-semibold'>
                            LAST NAME
                            <input type="text" className='ms-2' />
                        </label>
                        <label className='fs-4 text-white fw-semibold'>
                            MOBILE NO. <span className=' text-danger'>*</span>
                            <input required type="text" className='ms-2' />
                        </label>
                    </div>


                    <div className='d-flex flex-column align-items-end gap-5'>
                        <label className='fs-4 text-white fw-semibold'>
                            ID NUMBER <span className=' text-danger'>*</span>
                            <input required type="text" className='ms-2' />
                        </label>
                        <label className='fs-4 text-white fw-semibold'>
                            EMAIL ID <span className=' text-danger'>*</span>
                            <input required type="text" className='ms-2' />
                        </label>
                        <label className='fs-4 text-white fw-semibold'>
                            PASSWORD <span className=' text-danger'>*</span>
                            <input required type="password" className='ms-2' />
                        </label>
                    </div>
                </form>
                    <div className='mt-5 d-flex justify-content-center'><button className='py-1 px-4 bg-transparent text-white fw-semibold border-white rounded-5 fs-4'>SUBMIT</button></div>
            </Container>
        </section >
    )
}

export default MyForm