"use client";
import React from 'react'
import { BounceLoader } from 'react-spinners'
const Error = () => {
  return (
    <div className=' flex flex-col items-center mt-l2-'>
        <div>
            <BounceLoader />
        </div>
        <div className=' font-bold my-2'> there is something warn</div>
    </div>
  )
}

export default Error