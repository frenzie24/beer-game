
const delim = `{-}`;
const arrayDelim = '|';

//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';
const roleBgColors = ['bg-sky-500', 'bg-indigo-700', 'bg-orange-500', 'bg-red-700']
const dbeugSymbol = '#';

const debugMessage = (string : string) => {

}

const debugJSON = (data) => {
    const json = JSON.stringify(data, null, "  ");

    console.log('\n\n##################################################\n\n', json, '\n\n##################################################\n\n');
    return true;
}

export {delim, arrayDelim, liStyle, roleBgColors, debugJSON};