import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

const EmailJs = () => {
    const form = useRef();
    const my_form = document.getElementById("my_form")
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_dajapid', 'template_pwccitg', form.current, '2Y4CO6Jgm5GkMWGEg')
            .then((result) => {
                Swal.fire({
                    title: 'Good job!',
                    text: 'You submited this form.',
                    icon: 'success'
                });
                my_form.reset("my_form")
            }, (error) => {
                Swal.fire({
                    title: 'Bad job!',
                    text: 'something went wrong.Please try again later.',
                    icon: 'error'
                });
            });
    };

    // const [address, setAddress] = useState("");

    return (
        <form ref={form} onSubmit={sendEmail} id='my_form' >
            <label className='text-black fs-4 me-2 mb-0 ms-5 '>Name</label>
            <input required type="text" name="user_name"
            />
            <label className='text-black fs-4 ms-5 me-2 mb-0'>Email</label>
            <input type="text" name="user_email" pattern="^[a-zA-Z0-9]+@gmail\.com$" required
            />
            <label className='text-black fs-4 ms-5 me-2 mb-0'>Message</label>
            <textarea required name="message"
            />
            <div className='ms-5 mt-5'>
                <input className=' bg-transparent px-4 py-1 rounded-4 fs-4 send_hover' type="submit" value="Send" />
            </div>
        </form>
    )
};


export default EmailJs