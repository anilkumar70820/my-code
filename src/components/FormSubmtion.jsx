import React, { useState } from "react";

const FormSubmtion = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    console.log(user, password)
    return (
        <div className="py-5 mb-5">
            <h1 className='text-center mb-5'>== Form Summition Start Here ==</h1>
            <form className="ms-5 ps-5 d-flex gap-5">
                <label className="fw-semibold fs-3">Name<span className="text-danger">*</span>
                    <input className="ms-4" required type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                </label>
                <label className="fw-semibold fs-3">Password<span className="text-danger">*</span>
                    <input className="ms-4" required type="password" value={password} onChange={(a) => setPassword(a.target.value)} />
                </label>
            </form>
            <h1 className='text-center my-5'>^^ Form Summition End Here ^^</h1>
        </div>
    );
};

export default FormSubmtion;    