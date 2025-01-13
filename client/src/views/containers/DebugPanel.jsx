import React, { useState, useEffect } from 'react';
import NumberSelection from '../components/NumberSelection';

const DebugPanel = ({ isLoading, gameOver, rounds, setRounds, onAutoPlay, onRestart, onRevealDetails, onRevealGodMode }) => {

    const handleAutoPlayClick = (e) => {
        e.preventDefault();
        console.log("toggling autoplay")
        //bubble up onAutoPlayClick to a function to toggle auto play on and off in game.jsx
        onAutoPlay();
    }

    const handleRestartClick = (e) => {
        e.preventDefault();
        console.log("restarting game");
        onRestart();
    }


    const handleRevealGodModeClick = (e) => {
        e.preventDefault();
        console.log('revealing god mode details')
        onRevealGodMode();
    }

    const handleRevealDetailsClick = (e) => {
        e.preventDefault();
        console.log('revealing details')
        onRevealDetails();
    }

    return (
        <form className='[&_*]:m-2 p-2 [&_button]:bg-green-900 bg-purple-800/25'>
            <h2>DEBUG PANEL</h2>
            <button onClick={handleAutoPlayClick}>AUTOPLAY</button>
           {/*} <button onClick={handleRestartClick}>RESTART</button>*/}
            <button onClick={handleRevealDetailsClick}>REVEAL DETAILS</button>
            <button onClick={handleRevealGodModeClick}>REVEAL GOD MODE</button>
            <NumberSelection label="Change Ending Round" max={100} val={rounds} setVal={setRounds} step={1}/>
        </form>
    )
}

export default DebugPanel;