const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');


const app = express();
const port = 3000; // ou tout autre port que tu souhaites utiliser

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de Pusher
// A securiser
const pusher = new Pusher({
    appId: '1882510', // Remplace par ton app_id Pusher
    key: '367eb15097d9efb2b6d7',   // Remplace par ta key Pusher
    secret: '43ea5fa331da206c8efd', // Remplace par ton secret Pusher
    cluster: 'eu', // Remplace par ton cluster Pusher
    useTLS: true
});

// Route pour envoyer des messages
app.post('/message', (req, res) => {
    const message = req.body.message;

    // Publier un événement dans le canal
    pusher.trigger('chat-channel', 'message-event', {
        message: message
    });

    res.send('Message envoyé!');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});