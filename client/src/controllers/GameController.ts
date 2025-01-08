
const delim = `{-}`;
const arrayDelim = '|';

//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';
const roleBgColors = ['bg-yellow-500', 'bg-sky-500', 'bg-indigo-700', 'bg-orange-500', 'bg-red-700']
const dbeugSymbol = '#';
const npcDelay = Math.floor(Math.random() * 1000) + 1;

//  empty stats for a generic role
const emptyStats = {

  ordered: 0,
  fulfilled: 0,
  lastFulfilled: 0,
  lastOrder: 0,
  received: 0,
  totalReceived: 0,
  isHistoryVisible: false,
  expenses: 0.0
};

// passed options should contain: user_id, game_id, lectedRole, isHistoryVisible, rolesHidden
const createNewRolesArray = (options, inventories) => {
  return [
    { role_id: 0, name: "Customer", ...emptyStats, ...options, inventory: inventories[0] },
    { role_id: 1, name: "Retailer", ...emptyStats, ...options, inventory: inventories[1] },
    { role_id: 2, name: "Wholesaler", ...emptyStats, ...options, inventory: inventories[2] },
    { role_id: 3, name: "Distributor", ...emptyStats, ...options, inventory: inventories[3] },
    { role_id: 4, name: "Manufacturer", ...emptyStats, ...options, inventory: inventories[4] },
  ];
}

const debugMessage = (string: string) => {

}



const splitFilterJSON = (data) => {
  // if history is already an array return
  if (Array.isArray(data)) return;

  try {
    const array = data.split(delim);
    return array.filter(entry => entry !== '');
  } catch (e) {
    return null;
  }
}

const parseJSONArray = (data) => {
  if (typeof data == "string") {
    const array = data.split(',');
    const filtered = array.filter(entry => entry !== '');

    return filtered.map((entry) => {
      return JSON.parse(entry);
    })
  }
}

const stringifyData2D = (data) => {
  const dataString = data.map((entry) => {
    return entry.map((element) => {
      return JSON.stringify(element);
    })
  })
  debugger;
  return dataString;
}

const randomOrders = (entropy) => {
  return Math.floor(Math.random() * 20) * (entropy / 2);
}

const debugJSON = (data) => {
  const json = JSON.stringify(data, null, "  ");

  console.log('\n\n##################################################\n\n', json, '\n\n##################################################\n\n');
  return true;
}

export { delim, arrayDelim, liStyle, roleBgColors, npcDelay, createNewRolesArray, debugJSON, splitFilterJSON, parseJSONArray, stringifyData2D, randomOrders };