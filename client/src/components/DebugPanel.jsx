import React, { useState, useEffect } from 'react';
import NumberSelection from './NumberSelection';

const DebugPanel = ({ isLoading, gameOver, rounds, setRounds, onAutoPlayClick, onRestartClick, onRevealDetailsClick }) => {

    const handleAutoPlayClick = (e) => {
        e.preventDefault();
        console.log("toggling autoplay")
        //bubble up onAutoPlayClick to a function to toggle auto play on and off in game.jsx
        onAutoPlayClick();
    }

    const handleRestartClick = (e) => {
        e.preventDefault();
        console.log("restarting game");
        onRestartClick();
    }

    const handleRevealDetailsClick = (e) => {
        e.preventDefault();
        console.log('revealing details')
        onRevealDetailsClick();
    }

    return (
        <form className='[&_*]:m-2 p-2 [&_button]:bg-green-900 bg-purple-800/25'>
            <button onClick={handleAutoPlayClick}>AUTOPLAY</button>
            <button onClick={handleRestartClick}>RESTART</button>
            <button onClick={handleRevealDetailsClick}>REVEAL DETAILS</button>
            <NumberSelection label="Change Ending Round" max={100} val={rounds} setVal={setRounds} step={1}/>
        </form>
    )
}

export default DebugPanel;