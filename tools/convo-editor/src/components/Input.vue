<script setup lang="ts">
import { appThemeKey } from '@/lib/keys';
import { inject } from 'vue';


    const appTheme = inject(appThemeKey);
</script>

<template>
    <div class="input" :data-theme="appTheme">
        <slot></slot>
    </div>
</template>
  
<style lang="scss">
    @import url('../assets/main.scss');

    div.input{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 2px;
        padding: 0px;

        & label{
            min-width: 150px;
            padding: 2px;
        }
        & input:not(.hidden-input), & textarea{
            box-sizing: border-box;
            width: 100%;
            font-size: 16px;
            padding: 2px;
            outline: none;
            border: 1px solid $bg-main;
            background-color: $fg-main;
            color: $bg-main;

        }
        & textarea{
            resize: vertical;
            min-height: 75px;
            max-height: 135px;
            overflow-y: auto;
            margin: 0px;
        }

        &:focus-within{
            & > label{
                color: $bg-main;
            }
        }

        @include themify($themes){
            & {
                &:focus-within{
                    outline: 1px solid themed('ally-main');
                    background-color: themed('bg-main');
                    & > label{
                        color: themed('fg-main');
                    }
                }
            }
        };
    }
</style>
