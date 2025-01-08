import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorModal from './components/ErrorModal';
import Connection from './workers/Conncetion';
import Behavior from './Behavior';
import BehaviorsList from './BehaviorsList';

import { defaultBehavior } from './workers/Behaviors';

const GameSettings = ({ }) => {
  // State for the game settings
  const [rounds, setRounds] = useState(10); // Default to 10 rounds
  const [role, setRole] = useState(0); // Default role
  const [entropy, setEntropy] = useState(2); // Default entropy level (1 to 10)
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null)
  const [customerBehavior, setCustomerBehavior] = useState(defaultBehavior);

  const [retailerBehavior, setRetailerBehavior] = useState(defaultBehavior);

  const [wholesalerBehavior, setWholesalerBehavior] = useState(defaultBehavior);

  const [distributionerBehavior, setDistributionerBehavior] = useState(defaultBehavior);

  const [manufacturerBehavior, setManufacturerBehavior] = useState(defaultBehavior);
  const navigate = useNavigate(); // Use useNavigate for React Router navigation
  const [roles, setRoles] = useState([
    { role_id: 0, name: "Retailers", user_id: user?.id ? user.id : 1, inventory: 10, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 1, name: "Wholesaler", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 2, name: "Distributor", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 3, name: "Manufacturer", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
  ]);

  const [errorMessage, setErrorMessage] = useState('');

  //currently being handled entirely within behavior components by passing associated setBehavior
  const handleBehaviorSubmit = (behavior) => {
    debugger;
    console.log(behavior)
  }

  // Handle form submission to start the game
  const handleStartGame = async (e) => {
    const data = { game: { round: 0, rounds, selectedRole: role, entropy, history: '' }, players: roles };
    e.preventDefault();

    try {
      // const response = await Connection.newGame(data);
      const response = await fetch('http://localhost:3001/api/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      debugger;/*
      if (response.ok) {
        debugger;
        const data = await response.json();
        console.log('GAME CREATED:', data);
        localStorage.setItem('authToken', data.token); // Store the token
        return data;
        //          navigate('/game', { state: { id: data.game.id, user: user, role: Number(role), rounds: rounds, entropy: entropy, players: data.players } });
        //

        // Redirect to profile page after successful login
      }*/
      debugger;
      if (response.ok) {
       // debugger;
        const data = await response.json();
        console.log('GAME CREATED:', data);
        localStorage.setItem('authToken', data.token); // Store the token
        debugger;

        localStorage.setItem('authToken', response.token); // Store the token
        navigate('/game', { state: { id: response.game.id, user: user, role: Number(role), rounds: rounds, entropy: entropy, players: response.players } });

      } else {
        const data = await response.json();
        debugger;
        setErrorMessage(data.message || 'Oops!  We\'re not sure what happened.');
        //   navigate('/login');
      }
    } catch (error) {
      debugger;
      //setIsLoading(false);
      setErrorMessage('An error occurred. Please try again.');
      //navigate('/login');
      console.error(error);
    }




  };
  const handleSelectRole = (e) => {
    const val = e.target.value;
    setRole(parseInt(val));
  }

  const handleOnRoundsChange = (e) => {
    const val = e.target.value > 50 ? 50 : e.target.value;

    setRounds(val);
  }


  const handleBehaviorClick = (e) => {
    e.preventDefault();

    const listItemKey = e.target.key;
    const childBehaviorEle = e.target.children[0];
    switch (listItemKey) {
      case "4":
        childBehaviorEle
    }
    debugger;
  }

useEffect(()=> {
  console.log(customerBehavior)
  debugger;
},[customerBehavior, retailerBehavior, manufacturerBehavior, distributionerBehavior, wholesalerBehavior])

  return (
    <div className="w-screenp-6 bg-slate-900 shadow-md">
      <div className='max-w-3xl rounded-md bg-slate-200 shadow-lg mx-auto py-8 px-4'>
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => setErrorMessage('')}
        />
        <h2 className="text-5xl font-extrabold text-slate-800 text-center">Game Settings</h2>

        <form >
          {/* Rounds Input */}
          <div className="mb-4">
            <label htmlFor="rounds" className="block text-sm text-black font-semibold">Weeks to Run</label>
            <input
              type="number"
              id="rounds"
              value={rounds}
              onChange={handleOnRoundsChange}
              min="1"
              className="mt-1 px-3 py-2 border rounded-md w-full bg-slate-900"
            />
          </div>

          {/* Role Selection Dropdown */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm text-black font-semibold">Select Role:</label>
            <select
              id="role"
              value={role}
              onChange={handleSelectRole}
              className="mt-1 px-3 py-2 border rounded-md w-full  bg-slate-900"
              disabled={false}
            >
              <option value={0}>Retailers</option>
              <option value={1}>Wholesalers</option>
              <option value="2">Distributors</option>
              <option value="3">Manufacturers</option>
            </select>
          </div>

        </form>

        <BehaviorsList id="4" name="Customers" handleSelection={setCustomerBehavior} />
        {role == 0 ? <></>
          : <BehaviorsList id="0" name="Retailers" handleSelection={setRetailerBehavior} />
        }

        {role == 1 ? <></>
          : <BehaviorsList id="1" name="Wholesalers" handleSelection={setWholesalerBehavior} />}

        {role == 2 ? <></>
          : <BehaviorsList id="2" name="Distributers" handleSelection={setDistributionerBehavior} />}

        {role == 3 ? <></>
          : <BehaviorsList id="3" name="Manufacturers" handleSelection={setManufacturerBehavior} />}

        {/* Submit Button */}

        <div className="flex justify-center">
          <button
            onClick={handleStartGame}
            className=" [&_*]:border-2 [&_*]:border-slate-300 mt-2 [&_*]:p-2 [&_*]:mx-1 [&_*]:rounded-md [&_*]:bg-slate-700"
          >
            Start Game
          </button>
        </div>


      </div>
    </div>
  );
};

export default GameSettings;
