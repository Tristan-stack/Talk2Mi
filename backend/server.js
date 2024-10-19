const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // ou tout autre port que tu souhaites utiliser
const mongoDB = 'mongodb://localhost:27017/chat'; 
const Message = require('./models/Messages');

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

// Connexion à la base de données
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Connexion à la base de données réussie!'))
    .catch(()=> console.log('Connexion à la base de données échouée!'));

// Route pour envoyer des messages
app.post('/message', (req, res) => {
    const message = req.body.message;

    // Créer une nouvelle instance du modèle Message
    const newMessage = new Message({ message });

    // Enregistrer le message dans la base de données
    newMessage.save()
        .then(() => {
            // Publier un événement dans le canal
            pusher.trigger('chat-channel', 'message-event', {
                message: message,
                createdAt: newMessage.createdAt
            });
            res.send('Message enregistré et envoyé !');
        })
        .catch(err => {
            console.error('Erreur lors de l\'enregistrement du message:', err);
            res.status(500).send('Erreur lors de l\'enregistrement du message.');
        });
});

// Route pour récupérer les messages
app.get('/messages', (req, res) => {
    Message.find()
        .then(messages => {
            res.json(messages);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des messages:', err);
            res.status(500).send('Erreur lors de la récupération des messages.');
        });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});