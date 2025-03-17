/* eslint-disable react/prop-types */
import React from 'react'
import Image from 'next/image'

export function TeamCard ({ title, icon, elements }) {
  return (
    <div className="float-right divide-y divide-gray-200 bg-gray-300 py-4 px-7 rounded-sm z-[10] m-4">
      <div className='flex items-center'>
        <p className="text-md font-semibold leading-6 text-gray-900">
          {title}
        </p>
        <Image
          src={"/shirt-" + icon + ".svg"}
          alt="shirt"
          className={"pl-2 "}
          width={35}
          height={4}
          priority
        />
      </div>

      <ul className='font-semibold text-gray-800'>
        {elements.map((elemento, index) => (
          elemento ? <li key={index}>{index + 1} - {elemento[0]}</li> : ''
        ))}
      </ul>

    </div>
  )
}