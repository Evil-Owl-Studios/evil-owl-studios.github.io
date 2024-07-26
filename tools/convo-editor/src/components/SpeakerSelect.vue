<script setup lang="ts">

    import { Convo } from '@/lib/convo';
    import { getIcon } from '@/lib/icons';
    import { ref, watch } from 'vue';

    const props = defineProps<{id?: string, label?: string, speakers: Convo.Speaker[], defaultValue?: string}>();
    const emit = defineEmits(['on-change']);
    
    const selected = ref<string | undefined>(props.defaultValue);
    const current = ref<string>();
    const expanded = ref<boolean>(false);

    function getDisplayName(id?: string): string | undefined{
        if(id) return props.speakers.filter((speaker) => (speaker.id === id))[0].displayName;
        return undefined;
    }
    
    function changeSpeaker(newSpeaker: string){
        selected.value = newSpeaker;
        emit('on-change', selected.value);
    }
</script>

<template>
    <div class="select-hold">
        <span :id="`${props.id} input`" 
              class="select-input"
              tabindex="0" 
              :aria-controls="`${props.id} options`"
              :aria-expanded="expanded"
              aria-haspopup="listbox"
              :aria-labelledby="props.label"
              role="combobox"
              @focusin="expanded = true"
              @focusout="expanded = false"
              >{{ getDisplayName(selected) || "Please Select Speaker" }}</span>

        <ul :id="`${props.id} options`" role="listbox" class="select-list" tabindex="-1" :aria-labelledby="props.label">
            <li v-if="!(props.speakers.length > 0)" class="select-option" :style="{cursor: 'default'}">No Speakers! Add some.</li>
            <li v-for="(speaker, index) in props.speakers" 
                role="option" :class="`select-option${(speaker.id === current) ? ' option-current' : ''}`"
                :id="`${props.id} option ${speaker.id}`"
                :data-value="speaker.id" 
                :aria-selected="speaker.id === selected"
                @mouseenter="current = speaker.id"
                @mousedown="changeSpeaker(speaker.id)"
                >{{ speaker.displayName }}</li>
        </ul>
    </div>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

    div.select-hold{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        & span.select-input{
            padding: 5px;
            border: 1px solid $fg-main;

            position: relative;
            
            cursor: pointer;

            &[aria-expanded="true"]{
                background-color: $fg-main;
                color: $bg-main;
                outline: auto;
                & + ul.select-list{
                    display: block
                }
                &::after{
                    content: '';
                    background-image: url(map-get($icons, 'up'));
                    filter: brightness(0);
                }
            }

            &::after{
                content: '';
                display: block;
                position: absolute;
                right: 0px;
                top: 0px;
                height: 32px;
                width: 32px;

                background-image: url(map-get($icons, 'down'));
                background-size: 90%;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
        & ul.select-list{
            display: none;
            box-sizing: border-box;
            list-style-type: none;
            padding: 0px;
            margin: 0px;
            position: absolute;
            top: 100%;
            background-color: $bg-main;
            z-index: 3;
            width: 100%;
            border: 1px solid $fg-main;

            max-height: calc(32px * 4);
            overflow-y: auto;
            & li.select-option{
                display: block;
                padding: 5px;
                cursor: pointer;
                &[aria-selected="true"]{
                    box-shadow: 0px 0px 0px 2px inset map-get($colours, "blue");
                    background-color: $fg-main;
                    color: $bg-main;
                    &::after{
                        content: ' - Selected';
                    }
                }
                &.option-current{
                    background-color: lighten($bg-main, 20px);
                    background-color: $fg-main;
                    color: $bg-main;
                }
            }
        }
    }
</style>
