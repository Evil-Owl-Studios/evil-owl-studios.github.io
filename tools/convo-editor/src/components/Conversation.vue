<script setup lang="ts">
    import { computed, inject, ref, watch } from 'vue';    
    import type { Convo } from '@/lib/convo';
    import { Utils } from '@/lib/utils';

    import Group from './Group.vue';
    import Item from './Item.vue';
    import Input from './Input.vue';
    
    import SpeakerSelect from './SpeakerSelect.vue';
    import Condition from './Condition.vue';
    import { getIcon } from '@/lib/icons';
    import { convoDataKey } from '@/lib/keys';
import Response from './Response.vue';

    const props = defineProps<{index: number}>();

    const dialogue = Utils.injectStrict(convoDataKey).value.conversation[props.index];
    const speakerList = Utils.injectStrict(convoDataKey).value.speakers;
</script>

<template>
    <Group>
        <Item>
            <Input>
                <label>Speaker</label>
                <SpeakerSelect :id="`dialogue ${index} speaker`" :label="`dialogue ${index} speaker`" :speakers="speakerList" :defaultValue="dialogue.speaker" @on-change="(speaker) => dialogue.speaker = speaker"/>
            </Input>
        </Item>
        <Group :isToggle="true" :id="`dialogue ${index} conditions`" title="Required Conditions" :stickyFoot="true">
            <Group v-for="(condition, cIndex) in dialogue.requireConditions" v-if="dialogue.requireConditions">
                <template #edit>
                    <li title="Delete" @click="dialogue.requireConditions.splice(cIndex, 1)"></li>
                    <li v-if="(cIndex) > 0" title="Shift Up" @click="[dialogue.requireConditions[cIndex], dialogue.requireConditions[cIndex - 1]] = [dialogue.requireConditions[cIndex - 1], dialogue.requireConditions[cIndex]]"></li>
                    <li v-if="(cIndex) < (dialogue.requireConditions.length - 1)" title="Shift Down" @click="[dialogue.requireConditions[cIndex], dialogue.requireConditions[cIndex + 1]] = [dialogue.requireConditions[cIndex + 1], dialogue.requireConditions[cIndex]]"></li>
                </template>
                <Condition :condition="condition" :id="`dialogue ${index} condition ${cIndex}`" :key="new Date().getTime() + cIndex"/>
            </Group>
            <template #foot>
                <button @click="dialogue.requireConditions?.push({id: '', value: ''})">Add</button>
            </template>
        </Group>
        <Item>
            <Input>
                <label>Is Response?</label>
                <button @click="dialogue.isResponse = !dialogue.isResponse">{{ (dialogue.isResponse) ? "Yes" : "No" }}</button>
            </Input>
            <Input v-if="!dialogue.isResponse">
                <label :for="`dialogue ${index} lines`">Lines</label>
                <textarea type="text" :name="`dialogue ${index} lines`" :id="`dialogue ${index} lines`" :value="dialogue.lines?.join('\n')" @change="dialogue.lines = ($event.target as HTMLInputElement).value.split(/\n/g)"></textarea>
            </Input>
        </Item>
        <Group v-if="dialogue.isResponse" :isToggle="true" title="Responses" :id="`dialogue ${index} responses`" :stickyFoot="true">
            <Group v-for="(response, rIndex) in dialogue.responses" v-if="dialogue.responses">
                <template #edit>
                    <li title="Delete" @click="dialogue.responses.splice(rIndex, 1)"></li>
                    <li v-if="(rIndex) > 0" title="Shift Up" @click="[dialogue.responses[rIndex], dialogue.responses[rIndex - 1]] = [dialogue.responses[rIndex - 1], dialogue.responses[rIndex]]"></li>
                    <li v-if="(rIndex) < (dialogue.responses.length - 1)" title="Shift Down" @click="[dialogue.responses[rIndex], dialogue.responses[rIndex + 1]] = [dialogue.responses[rIndex + 1], dialogue.responses[rIndex]]"></li>
                </template>
                <Response :id="`dialogue ${index} response ${rIndex}`" :response="response"/>
            </Group>
            <template #foot>
                <button @click="dialogue.responses?.push({conditionsToSet: [], line: ''})">Add</button>
            </template>
        </Group>
    </Group>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
