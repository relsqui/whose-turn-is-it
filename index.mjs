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

const renderState = (oldState, baseUrl, event) => {
    const newState = nextTurn(oldState);
    const newUrl = baseUrl + encodeState(newState);
    const lines = [
        "<html><body>",
        `<p>${JSON.stringify(newState)}</p>`,
        `<h2>It's <b>${newState.names[newState.index]}'s</b> turn.</h2>`,
        `<p>Next URL: <a href="${newUrl}">${newUrl}</a></p>`,
        "</body></html>"
    ];
    return lines.join("\n");
}

export const handler = async (event, context, callback) => {
  const base64 = event.rawPath.substring(1);
  const oldState = base64 ? decodeState(base64) : {index: 0, names: []};
  const baseUrl = 'https://' + event.headers.host + '/';
  callback(null, {
    statusCode: 200,
    headers: {"content-type": "text/html"},
    body: renderState(oldState, baseUrl, event)
  })
}

const main = async () => {
    const base64 = process.argv[2] ?? "MSxhcHBsZSxiYW5hbmEsY29jb251dCxkdXJpYW4sZWxlcGhhbnQ=";
    const state = decodeState(base64);
    console.log(renderState(state, ""));
}

main();
