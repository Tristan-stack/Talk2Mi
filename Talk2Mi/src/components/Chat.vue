<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Chat Component -->
    <div class="w-1/2 flex-1 bg-backgroundDark text-textLight p-4 m-2">
      <h1 class="text-3xl font-bold mb-4 bg-primary-light text-black rounded-lg p-2">Chat</h1>

      <div id="chat-container" class="h-96 overflow-y-scroll p-4 bg-gray-800 rounded-lg shadow-md">
        <div v-for="msg in messages" :key="msg._id" class="mb-2">
          <p class="bg-primary-light text-black rounded-lg p-2 max-w-xs">
            {{ msg.message }} - {{ formatTime(msg.createdAt) }}
          </p>
        </div>
      </div>

      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message"
        class="mt-4 w-full p-2 border border-secondary-light rounded-lg bg-gray-700 text-textLight placeholder-gray-400" />
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'; // Importation du composant Sidebar
import Pusher from 'pusher-js';
import axios from 'axios';

export default {
  components: {
    Sidebar,
  },
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
/* Styles personnalisés ici si nécessaire */
</style>
