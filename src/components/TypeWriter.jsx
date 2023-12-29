import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const TypeWriter = () => {
  return (
    <div className='container mt-5'>
        <Link to='/'><button className='common_btns mb-4'>Back</button></Link>
        <h1 className='fs_lg text-danger h-25'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('Lorem ipsum dolor sit  quod accusantium praesentium eum sunt. Qui, dolorem?')
            .pauseFor(100)
            .start();
        }}
        options={{
          loop: false,
          cursor:"",
        }}
      />
      </h1>
        <h1 className='fs_lg text-dark mt-5'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('Lorem ipsum dolor sit')
            .pauseFor(100)
            .start();
        }}
        options={{
          loop: true,
        }}
      />
      </h1>
    </div>
  );
};

export default TypeWriter;
