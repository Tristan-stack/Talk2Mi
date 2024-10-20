<template>
  <div class="flex">
    <!-- Sidebar -->
    <!--<Sidebar />-->

    <!-- Chat Component -->
    <div class="bg-transparent backdrop-blur-sm border border-gray-500/10 w-1/2 h-2/3 overflow-hidden shadow-2xl shadow-gray-500/30 rounded-lg ">
      <h1 class="bg-gradient-to-r from-[#57ebdf8c] to-[#aefb2a85] p-4 border-b border-gray-200 backdrop-blur-sm shadow-xl shadow-gray-300/50 mb-4">Chat avec : {{ url }}</h1>

      <div id="chat-container" class="p-3 py-7">
        <div v-for="msg in messages" :key="msg._id" class="w-1/3 mb-2 rounded-md bg-[#7ef29d] ">
          <p class=" ml-2 py-3">
            {{ msg.message }} 
            <!--- {{ formatTime(msg.createdAt) }} --> 
          </p>
        </div>
      </div>

      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message" class="w-1/3 ml-3 p-2 bg-white/60 backdrop-blur-sm border border-gray-500/10 rounded-md" />
    </div>
  </div>
</template>

<script>

// import Sidebar from './Sidebar.vue'; // Importation du composant Sidebar
import Pusher from 'pusher-js';
import axios from 'axios';

export default {
  components: {
    // Sidebar,
  },

  data() {
    return {
      messages: [],
      newMessage: '',
      url: '',
    };
  },

  created() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    this.url = window.location.href;

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