import React, { useState, useEffect } from 'react';

const NumberSelection = ({ labelText, min, max, val, setVal,disabled }) => {


    const handleChange = (e) => {
        setVal(e.target.value);
        console.log('number input val update')
    };

    return (<>
        < div className="w-full [&_*]:w-fit [&_*]:bg-slate-100 text-slate-700 font-semibold flex flex-row flex-wrap justify-between items-center">

            <label name="selection" className='p-1 text-center'>{labelText}</label>
            < input className='w-full items-center text-center'
                type="number"
                value={val}
                onChange={handleChange}
                min={min ? min : 0}
                max={max ? max : 100}
                disabled={disabled}
            />
        </div >
    </>
    )
}

export default NumberSelection;