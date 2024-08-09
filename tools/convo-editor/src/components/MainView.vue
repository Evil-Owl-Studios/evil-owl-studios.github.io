<script setup lang="ts">
    import { Convo } from '@/lib/convo';
    
    import Conversation from './Conversation.vue';
    import Speakers from './Speakers.vue';

    import Group from './Group.vue';
    import { getIcon } from '@/lib/icons';
    import { inject, ref } from 'vue';
    import { convoDataKey, updateConvoDataKey } from '@/lib/keys';
    import { Utils } from '@/lib/utils';

    const props = defineProps<{speakerView: boolean}>();
    const emit = defineEmits(['on-save']);

    const convoData = Utils.injectStrict(convoDataKey);
    const updateConvoData = Utils.injectStrict(updateConvoDataKey);

</script>

<template>
    <Group v-if="!props.speakerView">
        <template #head>
            <h2>Conversation</h2>
        </template>
        <template #default>
            <Group v-for="(dialogue, index) in convoData.conversation" :is-toggle="true" :title="`[${index}] ${dialogue.speaker}`" :id="`dialogue ${index}`">
                <template #edit>
                    <li title="Delete" class="ico delete" @click="convoData.conversation.splice(index, 1)"></li>
                    <li v-if="(index) > 0" title="Shift Up" @click="[convoData.conversation[index], convoData.conversation[index - 1]] = [convoData.conversation[index - 1], convoData.conversation[index]]"></li>
                    <li v-if="(index) < (convoData.conversation.length - 1)" title="Shift Down" @click="[convoData.conversation[index], convoData.conversation[index + 1]] = [convoData.conversation[index + 1], convoData.conversation[index]]"></li>
                </template>
                <Conversation :index="index" :key="new Date().getTime() + index"/>
            </Group>
        </template>
        <template #foot>
            <button @click="convoData.conversation.push({speaker: '', isResponse: false, requireConditions: [], lines: [], responses: []})">Add Convo</button>
        </template>
    </Group>
    <Group v-else>
        <template #head>
            <h2>Speakers</h2>
        </template>
        <template #default>
            <Group v-for="(speaker, index) in convoData.speakers" :id="`speaker ${index}`">
                <template #edit>
                    <li title="Delete" class="ico delete" @click="convoData.speakers.splice(index, 1)"></li>
                    <li v-if="(index) > 0" title="Shift Up" class="ico move-up" @click="[convoData.speakers[index], convoData.speakers[index - 1]] = [convoData.speakers[index - 1], convoData.speakers[index]]"></li>
                    <li v-if="(index) < (convoData.speakers.length - 1)" class="ico move-down" title="Shift Down" @click="[convoData.speakers[index], convoData.speakers[index + 1]] = [convoData.speakers[index + 1], convoData.speakers[index]]"></li>
                </template>
                <Speakers :index="index" :key="speaker.id" />
            </Group>
        </template>
        <template #foot>
            <button @click="convoData.speakers.push({id: '', displayName: ''})">Add Speaker</button>
        </template>
    </Group>
</template>
  
<style lang="scss">
    @import url('../assets/main.scss');
</style>
