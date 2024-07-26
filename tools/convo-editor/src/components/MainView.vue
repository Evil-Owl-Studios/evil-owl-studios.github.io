<script setup lang="ts">
    import type { Convo } from '@/lib/convo';
    
    import Conversation from './Conversation.vue';
    import Speakers from './Speakers.vue';

    import Group from './Group.vue';
    import { ref } from 'vue';

    const props = defineProps<{convoName?: string, convoData: Convo.Convo, speakerView: boolean}>();
    const emit = defineEmits(['on-save']);
</script>

<template>
    <Group v-if="!props.speakerView">
        <template #head>
            <h2>Conversation</h2>
        </template>
        <template #default>
            <Group v-for="(dialogue, index) in props.convoData.conversation" :is-toggle="true" :title="`[${index}] ${dialogue.speaker}`" :id="`dialogue ${index}`">
                <Conversation :dialogue="dialogue" :index="index" :speaker-list="props.convoData.speakers" :key="new Date().getTime() + index"/>
            </Group>
        </template>
        <template #foot>
            <button @click="props.convoData.conversation.push({speaker: '', isResponse: false, requireConditions: [], lines: [], responses: []})">Add Convo</button>
        </template>
    </Group>
    <Group v-else>
        <template #head>
            <h2>Speakers</h2>
        </template>
        <template #default>
            <Group v-for="(speaker, index) in props.convoData.speakers" :id="`speaker ${index}`">
                <Speakers :index="index" :speaker="speaker" :key="speaker.id" />
            </Group>
        </template>
        <template #foot>
            <button @click="props.convoData.speakers.push({id: '', displayName: ''})">Add Speaker</button>
        </template>
    </Group>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

</style>
