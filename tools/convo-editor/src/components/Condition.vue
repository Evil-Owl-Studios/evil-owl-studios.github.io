<script setup lang="ts">
    import type { Convo } from '@/lib/convo';

    import Item from './Item.vue';
    import Input from './Input.vue';
import { watch } from 'vue';

    const props = defineProps<{condition: Convo.Condition, id: string}>();
    const emit = defineEmits(['on-update']);
</script>

<template>
    <Item>
        <Input>
            <label :for="`${props.id} id`">ID</label>
            <input type="text" :name="`${props.id} id`" :id="`${props.id} id`" :value="condition.id" @change="(e) => props.condition.id = (e.target as HTMLInputElement).value">
        </Input>
        <Input>
            <label :for="`${props.id} value`">Value</label>
            <input type="text" :name="`${props.id} value`" :id="`${props.id} value`" :value="condition.value" @change="(e) => props.condition.value = (e.target as HTMLInputElement).value">
        </Input>
    </Item>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
