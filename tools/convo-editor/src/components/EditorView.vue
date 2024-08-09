<script setup lang="ts">
    import { provide, ref } from 'vue';    
    import type { Convo } from '@/lib/convo';

    const props = defineProps<{convoName?: string, convoData?: Convo.Convo}>();
</script>

<template>
    <h1>Editing {{ props.convoName }}</h1>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
