<script setup lang="ts">
    import type { Convo } from '@/lib/convo';

    import Item from './Item.vue';
    import Input from './Input.vue';
    import { getIcon } from '@/lib/icons';
    import Condition from './Condition.vue';
    import Group from './Group.vue';

    const props = defineProps<{response: Convo.Response, id: string}>();
    const emit = defineEmits(['on-update']);
</script>

<template>
    <Item>
        <Input>
            <label :for="`${props.id} line`">Line</label>
            <input type="text" :name="`${props.id} line`" :id="`${props.id} line`" v-model="response.line">
        </Input>
        <Group :isToggle="true" title="Conditions to Set" :id="`${props.id} conditions`">
            <Group v-for="(condition, cIndex) in response.conditionsToSet" v-if="response.conditionsToSet">
                <template #edit>
                    <li title="Delete" @click="response.conditionsToSet.splice(cIndex, 1)"><img :src="getIcon('delete')" alt="Delete"/></li>
                    <li v-if="(cIndex) > 0" title="Shift Up" @click="[response.conditionsToSet[cIndex], response.conditionsToSet[cIndex - 1]] = [response.conditionsToSet[cIndex - 1], response.conditionsToSet[cIndex]]"><img :src="getIcon('move-up')" alt="Shift Up"/></li>
                    <li v-if="(cIndex) < (response.conditionsToSet.length - 1)" title="Shift Down" @click="[response.conditionsToSet[cIndex], response.conditionsToSet[cIndex + 1]] = [response.conditionsToSet[cIndex + 1], response.conditionsToSet[cIndex]]"><img :src="getIcon('move-down')" alt="Shift Down"/></li>
                </template>
                <Condition :condition="condition" :id="`${props.id} condition ${cIndex} id`" :key="new Date().getTime() + cIndex"/>
            </Group>
            <template #foot>
                <button @click="response.conditionsToSet?.push({id: '', value: ''})">Add</button>
            </template>
        </Group>
    </Item>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
