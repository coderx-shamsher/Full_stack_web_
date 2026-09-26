async function GetUsers(req,res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]));
    // return true; // Route handled
}

export default GetUsers