// import React, { useState } from "react";

// const NewForm = () => {
//   const [myForm, setMyForm] = useState({
//     firstName: "",
//     lastName: "",
//   });

//   const [error, setError] = useState({
//     firstName: false,
//   });

//   const handleChangeInput = (field, value) => {
//     setMyForm({ ...myForm, [field]: value });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (myForm.firstName.trim() === "") {
//       setError({
//         firstName: myForm.firstName.trim() === "",
//       });
//       return;
//     }
//     setError({
//       firstName: false,
//     });
//     setMyForm({
//       firstName: "",
//       lastName: "",
//     });

//     console.log(myForm);
//   };

//   return (
//     <div className="py-5" id="form_validation">
//       <div className="container">
//         <form
//           onSubmit={submitHandler}
//           className="form_width d-flex justify-content-center align-items-center gap-4 flex-column mx-auto"
//         >
//           <div className="position-relative w-100">
//             <input
//               type="text"
//               value={myForm.firstName}
//               placeholder="First Name"
//               onChange={(e) => handleChangeInput("firstName", e.target.value)}
//             />
//             {error.firstName && (
//               <p className="error_message text-danger">
//                 {myForm.firstName.trim() === ""
//                   ? " please enter your first name"
//                   : ""}
//               </p>
//             )}
//           </div>
//           <div className="position-relative w-100">
//             <input
//               type="text"
//               value={myForm.lastName}
//               placeholder="Last Name"
//               onChange={(e) => handleChangeInput("lastName", e.target.value)}
//             />
//           </div>
//           <button className="common_btns" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewForm;

import React, { useState } from "react";

const NewForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
  });
  const regexFirstName = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/;
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Reset error when user starts typing
    setError({ ...error, [field]: false });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (form.firstName.trim() === "" || form.lastName.trim() === "") {
      setError({
        firstName: form.firstName.trim() === "",
        lastName: form.lastName.trim() === "",
      });
      return;
    }
    if (!regexFirstName.test(form.firstName)) {
      setError({
        firstName: { ...form, firstName: true },
      });
      return;
    }

    // If no empty fields, reset form
    setForm({
      firstName: "",
      lastName: "",
    });
    console.log(form);
  };

  return (
    <div className="py-5" id="form_validation">
      <div className="container">
        <form
          onSubmit={submitHandler}
          className="form_width d-flex flex-column align-items-center justify-content-center mx-auto gap-4"
        >
          <div className="position-relative w-100">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {error.firstName && (
              <p className="error_message text-danger">
                {form.firstName.trim() === ""
                  ? "Please enter your first name"
                  : "invalid first name"}
              </p>
            )}
          </div>
          <div className="position-relative w-100">
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {error.lastName && (
              <p className="error_message text-danger">
                Please enter your last name
              </p>
            )}
          </div>
          <button className="common_btns" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewForm;
