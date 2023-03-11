const decodeState = (stateString64) => {
    const stateString = Buffer.from(stateString64, 'base64').toString('utf-8');
    const [index, ...names] = stateString.split(",");
    return {index, names};
}

const encodeState = (turnState) => {
    const stateString = [turnState.index, ...turnState.names].join(",");
    return Buffer.from(stateString).toString('base64');
}

const nextTurn = (turnState) => {
    var {names, index} = turnState;
    index = Number(index);
    return {index: (index + 1) % names.length, names};
}

const renderState = (oldState, baseUrl) => {
    // TODO: render a form, update the next URL live as it's filled
    const newState = nextTurn(oldState);
    const newUrl = baseUrl + encodeState(newState);
    return `
    <html><body>
    <p>${JSON.stringify(newState)}</p>
    <p><a href="${newUrl}">${newUrl}</a></p>
    </body></html>
    `;
}

export const handler = async (event, context, callback) => {
  const base64 = event.rawPath.substring(1);
  const oldState = base64 ? decodeState(base64) : {index: 0, names: []};
  const baseUrl = 'https://' + event.headers.host + '/';
  callback(null, {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: renderState(oldState, baseUrl)
  })
}

const main = async () => {
    const base64 = process.argv[2] ?? "MSxhcHBsZSxiYW5hbmEsY29jb251dCxkdXJpYW4sZWxlcGhhbnQ=";
    const state = decodeState(base64);
    console.log(renderState(state, ""));
}

main();
