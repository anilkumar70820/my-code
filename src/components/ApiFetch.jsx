import React, { useEffect, useState } from 'react'

const ApiFetch = () => {
    let [dogImage, setDogImage] = useState(null)
    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setDogImage(data.message))
        }, [])
        console.log()
    return (

        <div className='py-5'>
            <h1 className='text-center mb-4'>== Api Fetch Start Here ==</h1>
            <div className='d-flex justify-content-center flex-wrap'>
            {/* 5. Using *dogImage as* the *src* for our image*/}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
             {/* {dogImage && dogImage.map((dog) => <img width={"200px"} height={"200px"} src={dog} alt='dogs'/>)} */}
             </div>
             <h1 className='text-center my-4'>^^ Api Fetch End Here ^^</h1>
        <div>
            rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {

    // This rule allows anyone with your Storage bucket reference to view, edit,
    // and delete all data in your Storage bucket. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Storage bucket will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Storage bucket will be denied until you Update
    // your rules
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2024, 3, 2);
    }
  }
}
        </div>
        </div>
    )
}

export default ApiFetch