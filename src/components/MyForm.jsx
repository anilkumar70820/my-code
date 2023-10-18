import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'
import { Container } from 'react-bootstrap'

const MyForm = () => {
    const form = useRef();
    const my_form = document.getElementById("my-form")
    const submitEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_dajapid', 'template_kr2mvzw', form.current, '2Y4CO6Jgm5GkMWGEg')
            .then((result) => {
                Swal.fire({
                    title: 'Good job!',
                    text: 'You submited this form.',
                    icon: 'success'
                });
                my_form.reset("my-form")
            }, (error) => {
                Swal.fire({
                    title: 'Bad job!',
                    text: 'something went wrong.Please try again later.',
                    icon: 'error'
                });
            });
    };
    return (
        <section className='py-5 bg-black'>
            <Container>
                <h1 className='text-white fw-bold text-center mb-5'>SEND US YOUR DETAILS</h1>
                <form ref={form} onSubmit={submitEmail} id='my-form' >
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column align-items-end gap-5'>
                            <label className='fs-4 text-white fw-semibold '>
                                FIRST NAME <span className=' text-danger'>*</span>
                                <input name='user_name' required type="text" className='ms-2' />
                            </label>
                            <label className='fs-4 text-white fw-semibold'>
                                EMAIL ID <span className=' text-danger'>*</span>
                                <input name='user_email' required type="email" className='ms-2' />
                            </label>
                            {/* <label className='fs-4 text-white fw-semibold'>
                                ID NUMBER <span className=' text-danger'>*</span>
                                <input name='user_id' required type="text" className='ms-2' />
                            </label> */}
                        </div>
                        <div className='d-flex flex-column align-items-end gap-5'>
                            {/* <label className='fs-4 text-white fw-semibold'>
                                LAST NAME
                                <input name='user_name' type="text" className='ms-2' />
                            </label> */}
                            {/* <label className='fs-4 text-white fw-semibold'>
                                MOBILE NO. <span className=' text-danger'>*</span>
                                <input name='user_phone' required type="text" className='ms-2' />
                            </label> */}
                            <label className='fs-4 text-white fw-semibold'>
                                MESSAGE <span className=' text-danger'>*</span>
                                <input name='message' required type="text" className='ms-2' />
                            </label>
                        </div>
                    </div>
                    <div className='ms-5 mt-5'>
                        <input className=' bg-transparent px-4 py-1 rounded-4 fs-4 send_hover' type="submit" value="Send" />
                    </div>
                </form>
            </Container>
        </section >
    )
}

export default MyForm