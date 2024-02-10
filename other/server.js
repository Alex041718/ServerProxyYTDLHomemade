const net = require('net');

// Vérifiez si un port est fourni en argument de ligne de commande
const port = process.argv[2];
if (!port) {
    console.log('Usage: node server.js <port>');
    process.exit(1);
}

// Créer un serveur TCP
const server = net.createServer((socket) => {
    console.log('Client connected');

    // Gestion des données entrantes du client
    socket.on('data', (data) => {
        console.log('Data received from client:', data.toString());

        // Vérifiez si le caractère '#' est dans les données reçues
        if (data.includes('#')) {
            socket.end('Server: Connection terminated\n');
        } else {
            socket.write('Server: Message received\n');
        }
    });

    // Gestion de la fermeture de la connexion
    socket.on('end', () => {
        console.log('Client disconnected');
    });

    // Gestion des erreurs
    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

// Démarrer le serveur
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Gestion des erreurs du serveur
server.on('error', (err) => {
    console.error('Server error:', err.message);
});
