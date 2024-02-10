const net = require('net');
const readline = require('readline');
const { getStreamUrl } = require('./getStreamUrl.js');

// ON RPI3
// Il devra gérer les demandes du server
// Genre des requêtes HTTP à faire
// Ou utilisation de library nodejs



// Vérifiez si l'adresse et le port du serveur sont fournis
const [host, port] = process.argv.slice(2);
if (!host || !port) {
    console.log('Usage: node client.js <host> <port>');
    process.exit(1);
}

// Créer une interface de ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'TCP Client> '
});

// Connectez-vous au serveur
const client = net.connect({ host, port }, () => {
    console.log(`Connected to server on ${host}:${port}`);
    rl.prompt();

    // Envoyer des données au serveur lorsque l'utilisateur entre du texte
    rl.on('line', (line) => {
        client.write(line);
        rl.prompt();
    });
});

// Affichez les données reçues du serveur
client.on('data',async (data) => {

    // Gestion des données entrantes du serveur
    if (data.includes('ytdlId=')) {
        const id = data.toString().split('=')[1];
        console.log('Received ytdlId:', id);
        const VideoData = await getStreamUrl(id);
        const url = VideoData.audioURL;
        console.log('url to send:', url);
        client.write(url);

    }

    console.log(data.toString());
    rl.prompt();
});

// Gestion de la fermeture de la connexion
client.on('end', () => {
    console.log('Disconnected from server');
    process.exit(0);
});

// Gestion des erreurs
client.on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
