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

        <div>
            <h1 className='text-center mb-4'>== Api Fetch Start Here ==</h1>
            <div className='d-flex justify-content-center flex-wrap'>
            {/* 5. Using *dogImage as* the *src* for our image*/}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
            {dogImage && <img width={449.6} height={400} src={dogImage} alt='dogs'/>}
             {/* {dogImage && dogImage.map((dog) => <img width={"200px"} height={"200px"} src={dog} alt='dogs'/>)} */}
             </div>
             <h1 className='text-center my-4'>^^ Api Fetch End Here ^^</h1>
        </div>
    )
}

export default ApiFetch