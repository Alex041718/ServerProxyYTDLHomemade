const net = require('net');
const fs = require('fs');
const ipcSocketPath = '/tmp/server-ipc.sock';

const client = net.createConnection({ path: ipcSocketPath }, () => {
    // Prendre le message à envoyer depuis les arguments de la ligne de commande
    const message = process.argv[2] || 'Hello from IPC';
    client.write(message);
});

// Écouter la réponse du serveur IPC
client.on('data', (data) => {
    console.log('Received response from IPC server:', data.toString());
    client.end();
});

client.on('error', (err) => {
    console.error('Error connecting to IPC server:', err.message);
});


// function return string
const sendAndReceive = (message) => {
    const client = net.createConnection({ path: ipcSocketPath }, () => {
        client.write(message);
    });

    return new Promise((resolve, reject) => {
        client.on('data', (data) => {
            resolve(data.toString());
            client.end();
        });

        client.on('error', (err) => {
            reject(err.message);
        });
    });
}



module.exports = { sendAndReceive };