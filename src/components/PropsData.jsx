import React from 'react'
import PropsPractice from './PropsPractice'

const PropsData = () => {
    const message = "Hello I am here";
  return (
   <>
   <div>
<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, deserunt?</h1>
<PropsPractice message={message} /> 
   </div>
   </>
  )
}

export default PropsData