const net = require('net');
const fs = require('fs');

// ON VPS

const tcpPort = process.argv[2]; // Port TCP fourni en argument de ligne de commande
if (!tcpPort) {
    console.log('Usage: node server.js <tcpPort>');
    process.exit(1);
}

const ipcSocketPath = '/tmp/server-ipc.sock'; // Chemin pour le socket IPC

// Stockez les références aux sockets des clients TCP et IPC ici
const tcpClientSockets = new Set();
const ipcClientSockets = new Set();

// Créer un serveur TCP
const tcpServer = net.createServer((socket) => {
    console.log('Client TCP connected');
    tcpClientSockets.add(socket); // Stockez la référence au socket du client TCP

    socket.on('data', (data) => {
        console.log('Received from TCP client:', data.toString());
        // Envoyer la réponse au client IPC
        sendToIPC(data.toString());
    });

    socket.on('end', () => {
        console.log('TCP client disconnected');
        tcpClientSockets.delete(socket); // Supprimez la référence du socket du client TCP
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
    ipcClientSockets.add(ipcClient); // Stockez la référence au socket du client IPC

    ipcClient.on('data', (data) => {
        console.log('Received from IPC:', data.toString());
        // Envoyer les données au client TCP
        for (const tcpClient of tcpClientSockets) {
            tcpClient.write(data);
        }
    });

    ipcClient.on('end', () => {
        console.log('IPC client disconnected');
        ipcClientSockets.delete(ipcClient); // Supprimez la référence du socket du client IPC
    });

    ipcClient.on('error', (err) => {
        console.error('IPC Socket error:', err.message);
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

// Fonction pour envoyer des données au client IPC
function sendToIPC(data) {
    if (ipcClientSockets.size === 0) {
        console.log('No IPC client connected to send the message');
        return;
    }

    // Envoyer le message à tous les clients IPC connectés
    for (const ipcClient of ipcClientSockets) {
        console.log('test');
        ipcClient.write(data);
    }
}
