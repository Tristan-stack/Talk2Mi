<template>
  <div>
    <h1>Chat</h1>
    <div v-for="msg in messages" :key="msg._id" id="chat-container">
      <p>{{ msg.message }} - {{ formatTime(msg.createdAt) }} </p>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message" />
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },

  created() {
    if (Notification.permission !== 'granted') {
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
      this.scrollToBottom();
      this.showNotification(data.message);
    });

    // Récupérer les messages depuis le serveur
    this.getMessages().then(() => {
      this.scrollToBottom();
    });
  },

  methods: {
    scrollToBottom() {
      const chatContainer = this.$el.querySelector("#chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    getMessages() {
      return axios.get('http://localhost:3000/messages')
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

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
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(this.newMessage);
    },

    showNotification(message) {
      if (Notification.permission === 'granted') {
        new Notification('Nouveau message', {
          body: message,
        });
      }
    },

    formatTime(data) {
      const date = new Date(data);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}h${minutes}`;
    },
  },
};
</script>

<style scoped>
/* Ajoute des styles ici si nécessaire */
</style>
