<script setup lang="ts">
    import type { Convo } from '@/lib/convo';

    import Group from './Group.vue';
    import Item from './Item.vue';
    import Input from './Input.vue';

    const props = defineProps<{speaker: Convo.Speaker, index: number}>();

</script>

<template>
    <Item>
        <Input>
            <label :for="`speaker ${props.index} id`">ID</label>
            <input required type="text" :name="`speaker ${props.index} id`" :id="`speaker ${props.index} id`" :value="props.speaker.id" @change="(e) => props.speaker.id = (e.target as HTMLInputElement).value">
        </Input>
        <Input>
            <label :for="`speaker ${props.index} displayName`">Display name</label>
            <input required type="text" :name="`speaker ${props.index} displayName`" :id="`speaker ${props.index} displayName`" :value="props.speaker.displayName" @change="(e) => props.speaker.displayName = (e.target as HTMLInputElement).value">
        </Input>
    </Item>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
