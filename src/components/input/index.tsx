import React from 'react'

const Input = (props: any) => {
    const { required, labeltext } = props
    return (<>
        {labeltext && (<>
            <label htmlFor={labeltext} className='cursor-pointer block text-xs mb-1'>{labeltext} <span className={`${required ? 'inline' : "hidden"} text-red-600 font-medium text-sm leading-none`}>*</span></label>
        </>)}
        <input
            className='bg-[#fbfbfb] rounded border text-4 border-solid border-[#e1e1e1] w-full text-[#737373] p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:outline hover:outline-1 hover:outline-[#e9e9e9] focus:outline focus:outline-2 focus:outline-[var(--primary1)]'
            {...props}
            id={labeltext}
        />

    </>)
}

export default Input
