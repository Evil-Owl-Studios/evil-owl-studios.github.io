<script setup lang="ts">
    import { computed, ref, watch } from 'vue';    
    import type { Convo } from '@/lib/convo';
    import { Utils } from '@/lib/utils';

    import Group from './Group.vue';
    import Item from './Item.vue';
    import Input from './Input.vue';
    
    import SpeakerSelect from './SpeakerSelect.vue';

    const props = defineProps<{dialogue: Convo.Dialogue, index: number, speakerList: Convo.Speaker[]}>();
</script>

<template>
    <Group>
        <Item>
            <Input>
                <label>Speaker</label>
                <SpeakerSelect :id="`dialogue ${index} speaker`" :label="`dialogue ${index} speaker`" :speakers="props.speakerList" :defaultValue="dialogue.speaker" @on-change="(speaker) => dialogue.speaker = speaker"/>
            </Input>
        </Item>
        <Group :isToggle="true" :id="`dialogue ${index} conditions`" title="Required Conditions" :stickyFoot="true">
            <template #default>
                <Item v-for="(condition, cIndex) in dialogue.requireConditions" v-if="dialogue.requireConditions">
                    <Input>
                        <label :for="`dialogue ${index} condition ${cIndex} id`">ID</label>
                        <input type="text" :name="`dialogue ${index} condition ${cIndex} id`" :id="`dialogue ${index} condition ${cIndex} id`" v-model="dialogue.requireConditions[cIndex].id">
                    </Input>
                    <Input>
                        <label :for="`dialogue ${index} condition ${cIndex} value`">Value</label>
                        <input type="text" :name="`dialogue ${index} condition ${cIndex} value`" :id="`dialogue ${index} condition ${cIndex} value`" v-model="dialogue.requireConditions[cIndex].value">
                    </Input>
                </Item>
            </template>
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
            <template  #default>
                <Item v-for="(response, rIndex) in dialogue.responses" v-if="dialogue.responses">
                    <Input>
                        <label :for="`dialogue ${index} response ${rIndex} line`">Line</label>
                        <input type="text" :name="`dialogue ${index} response ${rIndex} line`" :id="`dialogue ${index} response ${rIndex} line`" v-model="dialogue.responses[rIndex].line">
                    </Input>
                    <Group :isToggle="true" title="Conditions to Set" :id="`dialogue ${index} response ${rIndex} conditions`">
                        <template #default>
                            <Item v-for="(condition, cIndex) in response.conditionsToSet" v-if="response.conditionsToSet">
                                <Input>
                                    <label :for="`dialogue ${index} response ${rIndex} condition ${cIndex} id`">ID</label>
                                    <input type="text" :name="`dialogue ${index} response ${rIndex} condition ${cIndex} id`" :id="`dialogue ${index} response ${rIndex} condition ${cIndex} id`" v-model="response.conditionsToSet[cIndex].id">
                                </Input>
                                <Input>
                                    <label :for="`dialogue ${index} response ${rIndex} condition ${cIndex} value`">Value</label>
                                    <input type="text" :name="`dialogue ${index} response ${rIndex} condition ${cIndex} value`" :id="`dialogue ${index} response ${rIndex} condition ${cIndex} value`" v-model="response.conditionsToSet[cIndex].value">
                                </Input>
                            </Item>
                        </template>
                        <template #foot>
                            <button @click="response.conditionsToSet?.push({id: '', value: ''})">Add</button>
                        </template>
                    </Group>
                </Item>
            </template>
            <template #foot>
                <button @click="dialogue.responses?.push({conditionsToSet: [], line: ''})">Add</button>
            </template>
        </Group>
    </Group>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
