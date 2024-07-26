<script setup lang="ts">
    import { Convo } from '@/lib/convo';
    import { ref } from 'vue';

    import Group from './Group.vue';
    import Input from './Input.vue';
    import Item from './Item.vue';

    const props = defineProps<{convoName?: string, convoData?: Convo.Convo}>();
    const emit = defineEmits(['on-update', 'on-save']);

    function fileUpload(f: any){
        let target = f.target;
        if(target.files.length === 1){
            let file : File = target.files[0];
            file.text().then(async (data) => {
                let convoName = file.name.replace(".json", '');
                let convoData = Convo.Parse(data);
                emit('on-update', {name: convoName, convo: convoData});
            })
        }
    }

</script>

<template>
    <Group>
        <template #head>
            <h1>Manage and Save</h1>
        </template>
        <template #default>
            <div class="editor-base">
                <Item>
                    <Input>
                        <input type="file" name="file-upload" id="file-upload" accept=".json" @change="fileUpload">
                        <label class="button" for="file-upload">Open Convo File</label>
                    </Input>
                    <Input>
                        <button @click="$emit('on-update', {name: 'New Convo', convo: {conversation: [], speakers: []} as Convo.Convo})">Create New Convo File</button>
                    </Input>
                </Item>
                <div v-if="props.convoName !== undefined">
                    <Item>
                        <Input>
                            <label for="confo-file-name">Convo Name</label>
                            <input name="confo-file-name" id="confo-file-name" type="text" @change="$emit('on-update', {name: ($event.target as HTMLInputElement).value})" :value="props.convoName"/>
                        </Input>
                        <Input>
                            <button @click="$emit('on-save')">Save</button>
                        </Input>
                    </Item>
                </div>
            </div>
        </template>
    </Group>
    
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

    input[type="file"]{
        appearance: none !important;
        width: 0px !important;
        & + label{
            margin-bottom: 3px;
        }
        &:focus{
            outline: none;
            & + label{
                outline: auto;
            }
        }
    }
</style>
