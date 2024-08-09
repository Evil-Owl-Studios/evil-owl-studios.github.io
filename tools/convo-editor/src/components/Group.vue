<script setup lang="ts">
    import { appThemeKey } from '@/lib/keys';
import { inject, ref } from 'vue';

    const props = defineProps<{id?: string, title?: string, stickyFoot?:boolean, isToggle?: boolean}>()

    const showEditPanel = ref<boolean>(false);
    const appTheme = inject(appThemeKey);

</script>

<template>
    <div :class="`group${(props.isToggle) ? ' toggle' : ''}`" :data-theme="appTheme">
        <div class="group-head">
            <slot name="head"></slot>
        </div>
        <input v-if="props.isToggle" type="checkbox" :name="`${props.id} toggle`" :id="`${props.id} toggle`" @click="showEditPanel = false"/>
        <label class="icon" @contextmenu.prevent="showEditPanel = !showEditPanel" v-if="props.isToggle" :for="`${props.id} toggle`">{{ props.title }}</label>
        <div v-if="$slots['edit']" :class="`group-editor ${(!props.isToggle || showEditPanel) ? '' : 'hidden'}`">
            <ul>
                <!-- <li class="context-head">Edit Panel</li> -->
                <slot name="edit"></slot>
            </ul>
        </div>
        <div :class="`group-content`" @click="showEditPanel = false">
            <slot></slot>
        </div>
        <div v-if="$slots['foot']" :class="`group-foot${(props.stickyFoot) ? ' sticky' : ''}${(!$slots['default']) ? ' no-pad' : ''}`">
            <slot name="foot"></slot>
        </div>
    </div>
</template>
  
<style lang="scss">
    @import url('../assets/main.scss');
    div.group{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 85%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 4px;
        margin-top: 4px;

        transition: width 0.2s;

        & div.group-head{
            text-align: center;
            font-weight: bold;
            padding-top: 4px;
            padding-bottom: 4px;
            &:empty{
                padding: 0px;
                display: none;
            }
        }
        & div.group-foot{
            position: relative;
            padding-top: 5px;
            &.sticky{
                position: sticky;
                bottom: 0px;
            }
            &.no-pad{
                padding: 0px;
            }
        }
        & div.group-content{
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            
            & div.group{
                width: 100%;
            }
            &:empty{
                display: none !important;
            }
        }
        & div.group-editor{
            position: absolute;
            width: 50px;
            height: 100%;
            box-sizing: border-box;
            top: 0px;
            left: 0px;
            z-index: 2;

            animation-name: fadeShow;
            animation-duration: 0.3s;

            & ul{
                display: flex;
                flex-direction: column;
                list-style-type: none;
                height: 100%;
                width: 100%;
                margin: 0px;
                padding: 0px;
                & li{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    cursor: pointer;
                }
            }
            & + div.group-content{
                margin-left: 50px;
                transition: margin-left 0.2s;
            }
            &.hidden{
                display: none;
                & + div.group-content{
                    margin-left: 0px;
                }
            }
        }

        &.toggle{
            position: relative;
            
            padding: 0px;

            & > div.group-editor{
                top: 32px;
                height: calc(100% - 32px);
            }

            & input[type="checkbox"][id~="toggle"]{
                position: absolute;
                border: none;
                padding: 0px;
                margin: 0px;
                width: 0px;
                height: 0px;
                appearance: none;

                & + label{
                    padding: 5px;
                    cursor: pointer;

                    &::after{
                        content: '';
                        top: -1px;
                        right: 0px;
                        left: unset;
                        width: 35px;
                        height: 33px;
                        mask-image: url(map-get($icons, 'expand'));
                    }

                    & ~ div.group-content{
                        display: none;
                        padding: 7px;
                        padding-top: 2px;
                        padding-bottom: 2px;

                        max-height: 700px;
                        overflow-y: auto;
                        & + div.group-foot{
                            display: none;
                        }
                    }
                }
                &:checked{
                    & + label{

                        &::after{
                            mask-image: url(map-get($icons, 'collapse'));
                        }
                        & ~ div.group-content{
                            display: flex;
                            flex-direction: column;
                            & + div.group-foot{
                                display: flex;
                            }
                        }
                    }
                }
                &:focus{
                    outline: none;
                    &+label{
                        outline: auto;
                    }
                }
            }
        }

        & > div.group-content{
            &.row{
                flex-direction: row !important;
            }
        }
        
        @media screen and (max-width: 900px) {
            width: 100%;
        }

        @include themify($themes){
            & {
                border: 1px solid themed('fg-main');
                & div.group-foot{
                    &.sticky{
                        background-color: themed('bg-main');
                    }
                }
                & div.group-editor{
                    border-right: 1px solid themed('fg-main');
                    & ul{
                        & li{
                            &:not(:last-child){
                                border-bottom: 1px solid themed('fg-main');
                            }
                            &::after{
                                background-color: themed('fg-main');
                            }
                            &[title="Delete"]{
                                background-color: themed('cl-red');
                            }
                            
                            &:hover{
                                background-color: themed('bg-main');

                                &[title="Delete"]{
                                    background-color: themed('cl-red');
                                }

                            }
                        }
                    }
                }
                &.toggle{
                    & input[type="checkbox"][id~="toggle"]{
                        & + label{
                            &::after{
                                background-color: themed('fg-main');
                            }
                        }
                        &:checked{
                            & + label{
                                background-color: themed('bg-main');
                                color: themed('fg-main');
                                border-bottom: 1px solid themed('fg-main');
                            }
                        }
                    }
                }
            }
        };

    }
</style>
