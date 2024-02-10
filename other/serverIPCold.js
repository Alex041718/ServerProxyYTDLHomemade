const net = require('net');
const fs = require('fs');

// ON VPS

const tcpPort = process.argv[2]; // Port TCP fourni en argument de ligne de commande
if (!tcpPort) {
    console.log('Usage: node server.js <tcpPort>');
    process.exit(1);
}

const ipcSocketPath = '/tmp/server-ipc.sock'; // Chemin pour le socket IPC

// Stockez la référence au socket du client TCP ici pour l'utiliser dans le serveur IPC
let tcpClientSocket = null;

// Créer un serveur TCP
const tcpServer = net.createServer((socket) => {
    console.log('Client TCP connected');
    tcpClientSocket = socket; // Stockez la référence au socket du client TCP

    socket.on('data', (data) => {
        console.log('Received from TCP client:', data.toString());
    });

    socket.on('end', () => {
        console.log('TCP client disconnected');
    });

    socket.on('error', (err) => {
        console.error('TCP Socket error:', err.message);
    });
});

tcpServer.listen(tcpPort, () => {
    console.log(`TCP Server listening on port ${tcpPort}`);
});

tcpServer.on('error', (err) => {
    console.error('TCP Server error:', err.message);
});

// Nettoyez le socket IPC s'il existe déjà
if (fs.existsSync(ipcSocketPath)) {
    fs.unlinkSync(ipcSocketPath);
}

// Créer un serveur IPC pour écouter les messages d'autres processus
const ipcServer = net.createServer((ipcClient) => {
    ipcClient.on('data', (data) => {
        console.log('Received from IPC:', data.toString());
        if (tcpClientSocket) {
            tcpClientSocket.write(data); // Envoie le message au client TCP
        } else {
            console.log('No TCP client connected to send the message');
        }
    });
});

ipcServer.listen(ipcSocketPath, () => {
    console.log(`IPC server listening on ${ipcSocketPath}`);
});

ipcServer.on('error', (err) => {
    console.error('IPC Server error:', err.message);
});

// Assurez-vous que le socket IPC est supprimé à la fermeture du serveur
process.on('exit', () => {
    if (fs.existsSync(ipcSocketPath)) {
        fs.unlinkSync(ipcSocketPath);
    }
});
