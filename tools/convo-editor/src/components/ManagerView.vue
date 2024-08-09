<script setup lang="ts">
    import { Convo } from '@/lib/convo';
    import { inject, ref } from 'vue';

    import Group from './Group.vue';
    import Input from './Input.vue';
    import Item from './Item.vue';
    import { convoDataKey, convoNameKey, updateConvoDataKey, updateConvoNameKey } from '@/lib/keys';
    import { Utils } from '@/lib/utils';

    const props = defineProps<{convoName?: string, convoData?: Convo.Convo}>();
    const emit = defineEmits(['switch-save', 'on-save']);

    const convoName = inject(convoNameKey);
    const updateConvoName = Utils.injectStrict(updateConvoNameKey);

    const convoData = inject(convoDataKey);
    const updateConvoData = Utils.injectStrict(updateConvoDataKey);

    function fileUpload(f: any){
        let target = f.target;
        if(target.files.length === 1){
            let file : File = target.files[0];
            file.text().then(async (data) => {
                updateConvoName(file.name.replace(".json", ''));
                updateConvoData(Convo.Parse(data));
            })
        }
    }

    function loadCheck(): boolean{
        if(convoData){
            if(convoData.value.conversation.length > 0 || convoData.value.speakers.length > 0){
                if(confirm("You may have unsaved changes! Are you sure you want to start new?")){
                    return true;
                } else {
                    return false
                }
            }
        }
        return true;
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
                        <input class="hidden-input" type="file" name="file-upload" id="file-upload" accept=".json" @click="(e) => { if(!loadCheck()) e.preventDefault() }" @change="(e) => { fileUpload(e); emit('switch-save') }">
                        <label class="button" for="file-upload">Open Convo File</label>
                    </Input>
                    <Input>
                        <button @click="() => { if(loadCheck()) updateConvoData({conversation: [], speakers: []}); emit('switch-save'); }">Create New Convo File</button>
                    </Input>
                </Item>
                <div v-if="props.convoName !== undefined">
                    <Item>
                        <Input>
                            <label for="confo-file-name">Convo Name</label>
                            <input name="confo-file-name" id="confo-file-name" type="text" @change="updateConvoName(($event.target as HTMLInputElement).value)" :value="convoName"/>
                        </Input>
                    </Item>
                    <Item>
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

    input.hidden-input{
        appearance: none !important;
        width: 0px !important;
        & + label{
            margin-bottom: 0px;
        }
        &:focus{
            outline: none;
            & + label{
                outline: auto;
            }
        }
    }

    div.editor-base{
        width: 100%;
    }
</style>
