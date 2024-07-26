<script setup lang="ts">

    import { getIcon } from '@/lib/icons';

    const props = defineProps<{id?: string, title?: string, stickyFoot?:boolean, isToggle?: boolean}>()
</script>

<template>
    <div :class="`group${(props.isToggle) ? ' toggle' : ''}`">
        <div class="group-head">
            <slot name="head"></slot>
        </div>
        <input v-if="props.isToggle" type="checkbox" :name="`${props.id} toggle`" :id="`${props.id} toggle`" />
        <label v-if="props.isToggle" :for="`${props.id} toggle`">{{ props.title }}</label>
        <div class="group-content">
            <slot></slot>
        </div>
        <div :class="`group-foot${(props.stickyFoot) ? ' sticky' : ''}`">
            <slot name="foot"></slot>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');
    div.group{
        display: flex;
        flex-direction: column;
        width: 75%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid $fg-main;
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
                background-color: $bg-main
            }
        }
        & div.group-content{
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            & div.item{
                box-sizing: border-box;
                width: 100%;
                display: flex;
                flex-direction: row;

                padding-top: 4px;
            }
            & div.group{
                width: 100%;
            }
        }
        &.toggle{
            position: relative;
            
            padding: 0px;

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
                        display: block;
                        position: absolute;
                        top: -1px;
                        right: 0px;
                        width: 35px;
                        height: 33px;
                        background-image: url(map-get($icons, 'expand'));
                        background-size: 90%;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    & + div.group-content{
                        display: none;
                        padding: 7px;
                        padding-top: 2px;
                        padding-bottom: 2px;

                        max-height: 300px;
                        overflow-y: auto;
                        & + div.group-foot{
                            display: none;
                        }
                    }
                }
                &:checked{
                    & + label{
                        background-color: $fg-main;
                        color: $bg-main;
                        &::after{
                            background-image: url(map-get($icons, 'collapse'));
                            filter: brightness(0);
                        }
                        & + div.group-content{
                            display: flex;
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

        
        @media screen and (max-width: 900px) {
            width: 100%;
        }

    }
</style>
