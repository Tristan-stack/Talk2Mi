<template>
    <div class="sidebar bg-backgroundDark text-textLight w-64 p-4 flex flex-col border m-2">
        <h2 class="text-2xl font-bold mb-4 bg-primary-light text-black rounded-lg p-2">Conversation</h2>
        <div class="user-search mb-4">
            <input type="text" placeholder="Search user or chat"
                class="w-full p-2 rounded-lg bg-gray-700 text-textLight placeholder-gray-400" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
};
</script>

<style scoped>

</style>
