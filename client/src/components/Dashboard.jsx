import React, { useState, useEffect } from 'react';

const Dashboard = ({ round, name, role, roundsRemaining, gameOver, expenses }) => {
    return (
        <>
            {!gameOver? <div className='flex flex-row flex-wrap justify-between p-4 font-bold'>
                <h1 className="text-4xl  mb-4"> Beer Game</h1>
                <h1 className="text-4xl font-bold mb-4">Round: {round + 1}</h1>
                <h1 className="text-4xl font-bold mb-4">Rounds Remaining: {roundsRemaining}</h1>
                <h1 className='w-full text-4xl'>Expenses: ${expenses}</h1>
            </div> : <div className='flex flex-row flex-wrap justify-center p-4'>
                <h1 className="text-6xl font-bold mb-4">GAME OVER</h1>
            </div>}


        </>
    )
}

export default Dashboard;