<script setup lang="ts">
    import type { Convo } from '@/lib/convo';

    import Group from './Group.vue';
    import Item from './Item.vue';
    import Input from './Input.vue';
import { Utils } from '@/lib/utils';
import { convoDataKey } from '@/lib/keys';

    const props = defineProps<{index: number}>();

    const speaker = Utils.injectStrict(convoDataKey).value.speakers[props.index];
</script>

<template>
    <Item>
        <Input>
            <label :for="`speaker ${props.index} id`">ID</label>
            <input required type="text" :name="`speaker ${props.index} id`" :id="`speaker ${props.index} id`" :value="speaker.id" @change="(e) => speaker.id = (e.target as HTMLInputElement).value">
        </Input>
        <Input>
            <label :for="`speaker ${props.index} displayName`">Display name</label>
            <input required type="text" :name="`speaker ${props.index} displayName`" :id="`speaker ${props.index} displayName`" :value="speaker.displayName" @change="(e) => speaker.displayName = (e.target as HTMLInputElement).value">
        </Input>
    </Item>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
</style>
