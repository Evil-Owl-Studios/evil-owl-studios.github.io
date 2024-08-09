<script setup lang="ts">
import { ref } from 'vue';
    const showEditPanel = ref<boolean>(false);
</script>

<template>
    <div class="item">
        <slot></slot>
    </div>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

    div.item{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: column;

        padding-top: 4px;

        position: relative;
    }
</style>
