
const delim = `{-}`;
const arrayDelim = '|';

//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';
const roleBgColors = ['bg-yellow-500','bg-sky-500', 'bg-indigo-700', 'bg-orange-500', 'bg-red-700']
const dbeugSymbol = '#';
const npcDelay= Math.floor(Math.random() * 1000) + 1;

const debugMessage = (string : string) => {

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

export {delim, arrayDelim, liStyle, roleBgColors,npcDelay, debugJSON, splitFilterJSON, parseJSONArray, stringifyData2D, randomOrders};