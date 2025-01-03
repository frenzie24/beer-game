import React, { useState, useEffect } from 'react';
/*
########
OUT OF DATE WITH NUMBER SELECTION BEHAVIOR
TODO: UPDATE TO REFLECT CHANGES IN NUMBERSELECTION
*/
const NumberRange = ({labelText, min, max, val, setVal}) => {
    const handlehCange = (e) => {
        setVal(e.target.value);
    };

    return (
        <div className="w-full bg-slate-100 text-slate-700 font-semibold flex justify-center items-center">

            <label name="vol">{labelText}:</label>
            <input type="range" id="vol" name="vol" min={min ? min : 0} max={max ? max : 10} onChange={handlehCange} value={val} />
        </div>
    )
}

export default NumberRange;