<template>
  <el-aside width="280px" class="sidebar">
    <div class="sidebar-header">
      <h2>Conversation</h2>
    </div>
    <el-input
      placeholder="Search user or chat"
      prefix-icon="el-icon-search"
      class="user-search"
      clearable
    />
    <el-scrollbar class="user-list">
      <div v-for="(user, index) in users" :key="index" class="user-item">
        <el-avatar :src="user.avatar" class="user-avatar"></el-avatar>
        <span class="user-name">{{ user.name }}</span>
      </div>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      users: [
        { name: 'User 1', avatar: 'https://via.placeholder.com/40' },
        { name: 'User 2', avatar: 'https://via.placeholder.com/40' },
        { name: 'User 3', avatar: 'https://via.placeholder.com/40' },
        // Ajouter d'autres utilisateurs si besoin
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  background: rgba(24, 24, 24, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.sidebar-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #67CC31, #3A7B24);
  -webkit-background-clip: text;
  color: transparent;
}

.user-search {
  margin-bottom: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.user-list {
  max-height: calc(100vh - 200px);
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.3s;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  color: #fff;
}
</style>
