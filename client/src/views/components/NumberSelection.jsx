import React, { useState, useEffect } from 'react';

//label and number selection component, val and setVal must be passed

const NumberSelection = ({ name = '', label, min = 0, max = 20, val, setVal, disabled = false, step=5 }) => {
    if (!(val || setVal)) throw new Error('NumberSelection Component requires a passed val and setVal function');
    //Bubbles up value change
    /*
    @param {string} name - defaults to ''
    @param {string} label - Text to display in this component's label, if null label will be display - may lead to unexpected formatting
    @param {int} min - minimum value of selection range, defaults to 0
    @param {int} max - maximum value of selection range, defaults to 20
    @param {any} val - cannot be null
    @param {function} setVal - used to bubble up changes to passed val prop
    @param {bool} disabled - Controls visibility, defaults to false
*/
    //TODO: setVal and val rename?
    const handleChange = (e) => {
        e.preventDefault();
        setVal(e.target.value);
        console.log('number input val update')
    };

    // if a label is not pased, the label portion of the component will not render
    return (<>
        < div className="h-full bg-slate-100 text-slate-700 font-semibold flex flex-row flex-wrap justify-between items-center  ">
            {label ? <label className='pl-2 w-1/2'>{label}</label> : name ? name : <></>}
            <input
                className='bg-slate-100 text-center w-1/2 '
                type="number"
                value={val}
                onChange={handleChange}
                min={min ? min : 0}
                max={max ? max : 100}
                disabled={disabled}
                step={step}
            ></input>
        </div >
    </>
    )
}

export default NumberSelection;