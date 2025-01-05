import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Player from './components/Player';
import ErrorModal from './components/ErrorModal';
import Connection from './workers/Conncetion';
import Dashboard from './components/Dashboard';
import { defaultBehavior } from './workers/Behaviors';
import { delim, arrayDelim, npcDelay, debugJSON, splitFilterJSON, parseJSONArray, stringifyData2D, randomOrders } from './workers/GameController';


// game must nav from gamesettings to get data required
const Game = () => {

  const navigate = useNavigate(); // Use useNavigate for React Router navigation
  const location = useLocation();
  const [round, setRound] = useState(location.state?.round || 0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [rounds, setRounds] = useState(location.state?.rounds || 4);
  const [entropy, setEntropy] = useState(location.state?.entropy || 2);
  const [selectedRole, setSelectedRole] = useState(location.state?.role || 1);
  const [rolesHidden, setRolesHidden] = useState(location.state?.rolesHidden || true)

  // behavior objects stored in an array?
  // get behaviors from passed settings or use default behaviors if undefined
  const [customerBehavior, setCustomerBehavior] = useState(location.state?.customerBehavior || defaultBehavior);
  const [retailerBehavior, setRetailerBehavior] = useState(location.state?.retailerBehavior || defaultBehavior);
  const [wholesalerBehavior, setWholesalerBehavior] = useState(location.state?.wholesalerBehavior || defaultBehavior);
  const [distributionerBehavior, setDistributionerBehavior] = useState(location.state?.distributionerBehavior || defaultBehavior);
  const [manufacturerBehavior, setManufacturerBehavior] = useState(location.state?.manufacturerBehavior || defaultBehavior);

  const [behaviors, setBehaviors] = useState(location.state?.behaviors || [customerBehavior, retailerBehavior, wholesalerBehavior, distributionerBehavior, manufacturerBehavior]);

  const [gameOver, setGameOver] = useState(false);
  const [user, setUser] = useState(location.state?.user || { first_name: 'Charles', id: 3 });

  const [history, setHistory] = useState(location.state?.history ? splitFilterJSON(location.state?.history) : [[], [], [], [], []] || [[], [], [], [], []])

  const [errorMessage, setErrorMessage] = useState('');

  const [roles, setRoles] = useState([
    { role_id: 0, name: "Customer", user_id: user.id, game_id: location.state?.id || 1, inventory: 0, ordered: 0, fulfilled: 0, lastFulfilled: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: history[3], isHistoryVisible: false, isHidden: rolesHidden, expenses: 0.0 },

    { role_id: 1, name: "Retailer", user_id: user.id, game_id: location.state?.id || 1, inventory: 0, ordered: 0, fulfilled: 0, lastFulfilled: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: history[0], isHistoryVisible: false, isHidden: rolesHidden, expenses: 0.0 },
    { role_id: 2, name: "Wholesaler", user_id: user.id, game_id: location.state?.id || 1, inventory: 0, ordered: 0, fulfilled: 0, lastFulfilled: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: history[1], isHistoryVisible: false, isHidden: rolesHidden, expenses: 0.0 },
    { role_id: 3, name: "Distributor", user_id: user.id, game_id: location.state?.id || 1, inventory: 0, ordered: 0, fulfilled: 0, lastFulfilled: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: history[2], isHistoryVisible: false, isHidden: rolesHidden, expenses: 0.0 },
    { role_id: 4, name: "Manufacturer", user_id: user.id, game_id: location.state?.id || 1, inventory: 0, ordered: 0, fulfilled: 0, lastFulfilled: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: history[3], isHistoryVisible: false, isHidden: rolesHidden, expenses: 0.0 },
  ]);


  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    debugJSON({ rounds, round, currentPlayerIndex, selectedRole, behaviors, gameOver, user, history, errorMessage, roles });
  } else ({ message: `game view rerender`, rounds, rounds, round, currentPlayerIndex, selectedRole, roles })

  // Handles turn changing for npc
  useEffect(() => {
    console.log(`Starting ${roles[currentPlayerIndex].name}s' turn`)
    if (roles[currentPlayerIndex].role_id !== selectedRole) { // Random npcDelay between 500ms and 1500ms


      setTimeout(() => handleOrderForNonActiveRoles(currentPlayerIndex), npcDelay);

    }

    // if (!location.state?.user) navigate('/login')
  }, [currentPlayerIndex]);

  //returns into setRoles
  const checkFulfillment = (idx, players, amount) => {
    // set lastFulfilled to current fulfilled

    const player = players[idx];


    // when the current player is the customer
    if (idx === 0) {

    }
    // force prevPlayer $ nextplayer to be null if we try to access an undefined player
    const prevPlayer = idx == 0 ? null : players[idx - 1];
    const nextPlayer = idx >= players.length - 1 ? null : players[idx + 1];
    if (round == 0 && player.role_id == 0) { } else {

      if (prevPlayer) {
        //player.received = prevPlayer.ordered;
      }
      if (nextPlayer) {
        nextPlayer.received = amount;
        // nextPlayer has inventory get a shipmetn from them
        const inventory = nextPlayer.inventory;
        if (inventory > 0) {
          player.fulfilled = inventory - amount > 0 ? amount : inventory;
          debugger;
        } else {
          // if the nextPlayer's inventory is negative, still get a fulfillment pulled nextPlayer's lastFulfilled
          // this should handle fulfilling backlogs?
          player.fulfilled = nextPlayer.lastFulfilled;
        }
      } else {
        // manufacturers just produce their behavior orders
        player.fulfilled = behaviors[idx].phase1.orders;
      }
    }

    const newPlayers = players.map(entry => {
      if (prevPlayer?.role_id === entry.role_id) return prevPlayer;
      else if (nextPlayer?.rold_id === entry.role_id) return nextPlayer;
      else if (player?.role_id === entry.rold_id) return player;
      else return entry;

    })

    //   debugJSON([player, prevPlayer? prevPlayer : '', nextPlayer ? nextPlayer : '']);

    return newPlayers;


    if (idx >= 0) {
      players[idx].lastFulfilled = players[idx].fulfilled;
      if (idx === 0) {
        players[idx].received = behaviors[idx].phase1.orders; //
      }

      if (idx < players.length - 1) {

        // check the next player's inventory for fulfullment and set next player's received to current player's order
        players[idx + 1].received = amount;// + randomOrders(entropy);
        if (players[idx + 1].inventory < amount) {
          players[idx].fulfilled = players[idx + 1].inventory;
        } else {
          players[idx].fulfilled = amount;
        }
      } else {
        // the manufacturer gets random fulfillment which can suck lol
        players[idx].fulfilled = behaviors[idx].phase1.orders;
      }
      players[idx].ordered = amount;
    }

    return players;
  }


  const handleOrderForNonActiveRoles = (index) => {
    const updatedRoles = roles.map((entry, idx) => {
      if (idx === index) {


        // call randomOrders()
        const orderAmount = behaviors[index].phase1.orders;

        //  const randomOrderAmount = randomOrders(entropy) * index;
        entry.ordered = orderAmount;
        //   entry.ordered = randomOrderAmount;
        if (entry.pendingReceived > 0) {
          entry.ordered += Math.floor(entry.pendingReceived);
        }
      }
      return entry;
    });
    //setRoles(updatedRoles);


    setTimeout(() => {
      const newRoles = checkFulfillment(index, updatedRoles, updatedRoles[index].ordered);
      setRoles(newRoles);
      handleNextPlayer();
    }, 1500)
  };

  const handleOrder = (id, amount) => {
    const updatedRoles = [...roles];
    updatedRoles[id].ordered = amount;

    // logic to handle whether the next player can fill the order entirely or not
    setTimeout(() => {
      const newRoles = checkFulfillment(id, updatedRoles, amount)
      setRoles(newRoles);
      handleNextPlayer();
    }, 500)

  };

  const addToGameHistory = (newEntry, idx) => {

    // history entries are separated by , now instead of delim const
    const updated = `${history[idx]}${JSON.stringify(newEntry)}${delim}`;
    return updated;
  };


  const handleShipment = async () => {
    let newHistory = history;
    const updatedRoles = roles.map((role, idx) => {
      console.log(`Handling shipments for ${role.name}`);
      if (role.inventory < 0) role.roundsPending++;
      // const fulfilled =
      debugJSON(role)
      const newInventory = role.inventory - role.received + role.fulfilled;
      //   let pending = newInventory < 0 ? Math.abs(newInventory) : 0;
      let receivedAmount = role.received;
      const newExpenses = role.expenses + ((newInventory > 0 ? behaviors[role.role_id].cost.inventory : behaviors[role.role_id].cost.backlog) * Math.abs(newInventory));
      //const pendingReceived =
      const historyEntry = {
        round,
        ordered: role.ordered,
        received: receivedAmount,
        fulfilled: role.fulfilled,
        lastFulfilled: role.lastFulfilled,
        pendingReceived: role.pendingReceived + role.received,
        totalReceived: role.totalReceived,
        expenses: newExpenses,
        //  pendingReceived: pending,
        inventory: newInventory,
      };

      // instead of parsing the different player history arrays, we just add historyEntry to the history we have stored in state before we update the server with a new game state
      //            newHistory[idx].push(addToGameHistory(historyEntry, idx);
      newHistory[idx].push(historyEntry)

      console.log(`Finishing shipments for ${role.name}`);
      return {
        ...role,
        inventory: newInventory,
        expenses: newExpenses,
        ordered: 0,
        fulfilled: 0,
        lastFulfilled: role.fulfilled,
        lastOrder: role.ordered,
        received: receivedAmount,
        totalReceived: role.totalReceived + receivedAmount,
        //  pendingReceived: pending,
        //  history: `${role.history},${historyEntry}`
      };
    });

    //let _history = stringifyData2D(newHistory);
    const data = { game: { round, rounds, selectedRole, entropy, history: newHistory.join('|'), id: location.state?.id }, players: updatedRoles, }

    // await updateServer({ ...data });
    debugger;
    setRoles(updatedRoles);
    setHistory(newHistory);
    console.log(`Finished shipments for round: ${round}`);

    if (round < rounds - 1) {
      const newRound = Number(round + 1);

      setRound(newRound);
      console.log(`Resetting current player`);

      setCurrentPlayerIndex(0); // Reset to the first player for the next round
    } else {
      setGameOver(true);
      return;
    }

  };

  const handleNextPlayer = () => {
    //next turn in week
    console.log(`Ending ${roles[currentPlayerIndex].name}s' turn.`)
    if (currentPlayerIndex < roles.length - 1) {

      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      console.log(`Beginning shipments.`)
      handleShipment(); // All players have taken their turn, process shipments
    }
  };


  const updateServer = async (data) => {
    try {
      const update = await Connection.updateGameData(data);
      if (update) {
        console.log(update);
        return true
      };
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      navigate("/login");
      console.error(error);
    }
  }

  const remainingRounds = () => rounds - round - 1;


  // Function to toggle the visibility of the history section
  const toggleHistoryVisibility = (roleId) => {
    const updatedRoles = [...roles];
    updatedRoles[roleId].isHistoryVisible = !updatedRoles[roleId].isHistoryVisible;
    setRoles(updatedRoles);
  };

  useEffect(() => {
    console.log('game over')
  }, [gameOver])

  useEffect(() => {
    console.log(`Loading: ${isLoading ? 'in progress' : 'complete'}`)
  }, [isLoading])

  useEffect(() => {
    // console.log(`Loading: ${isLoading}`)
    const newRoles = roles.map((entry) => {
      const role = entry;
      if (role.role_id == selectedRole) {
        role.isHidden = false;
      }
      return role;

    });
    setRoles(newRoles);
    if (isLoading) setIsLoading(false);
  }, [])

  return (


    <div className="container mx-auto p-4 text-center">


      <ErrorModal
        errorMessage={errorMessage}
        onClose={() => { setErrorMessage(''); navigate('/login') }}
      />

      <Dashboard round={round} name={user.first_name} role={roles[selectedRole]?.name || 'CPU'} roundsRemaining={remainingRounds()} expenses={roles[selectedRole]?.expenses || roles[1].expenses} gameOver={gameOver} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 flex-wrap gap-8">
        {!gameOver ? roles.map((role) => (<Player player={role}
          key={role.role_id}
          index={role.role_id}
          currentPlayerIndex={currentPlayerIndex}
          handleNextPlayer={handleNextPlayer}
          handleOrder={handleOrder}
          history={history[role.role_id]}
          toggleHistoryVisibility={(ev) => toggleHistoryVisibility(role.role_id)}
          name={role.role_id == selectedRole ? user.first_name : `CPU ${role.role_id + 1}`} />

        )) : (
          roles.map((role) => (
            <div key={role.role_id} className="mt-4 w-full">
              <h4 className="text-lg font-semibold">{role.name} Rounds with Pending Shipments: {role.roundsPending}</h4>
              <h4 className="text-lg font-semibold">{role.name} Total Expenses: {role.expenses}</h4>
            </div>
          ))
        )}
      </div>
      <button onClick={() => { setSelectedRole(selectedRole != 6 ? 6 : 1) }}>AUTOPLAY</button>
    </div>
  );
};

export default Game;
