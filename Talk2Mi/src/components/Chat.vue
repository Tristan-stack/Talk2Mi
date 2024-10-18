<template>
  <div>
    <h1>Chat</h1>
    <div v-for="msg in messages" :key="msg.id">
      <p>{{ msg.message }}</p>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message" />
  </div>
</template>

<script>
import Pusher from 'pusher-js';

export default {

  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },

  created() {

    if(Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Configurer Pusher
    const pusher = new Pusher('367eb15097d9efb2b6d7', {
      cluster: 'eu',
    });

    // Écouter les messages
    const channel = pusher.subscribe('chat-channel');
    channel.bind('message-event', (data) => {
        this.messages.push(data);
        this.showNotification(data.message);
    });
  },

  methods: {

    sendMessage() {
      // Envoyer le message au serveur
      fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.newMessage }),
      })
        .then((response) => response.text())
        .then(() => {
          this.newMessage = ''; // Réinitialiser le champ de saisie
        });

        console.log(this.newMessage);
    },

    showNotification(message){
        if(Notification.permission === 'granted'){
            new Notification('Nouveau message', {
            body: message,
            });
        }
    }
  },

};
</script>

<style scoped>
/* Ajoute des styles ici si nécessaire */
</style>
