<script setup lang="ts">
</script>

<template>
    <div class="input">
        <slot></slot>
    </div>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

    div.input{
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 2px;
    }
</style>
