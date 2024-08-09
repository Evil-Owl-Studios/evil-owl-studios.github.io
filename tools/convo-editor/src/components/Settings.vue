<script setup lang="ts">
    import { inject } from 'vue';
import Group from './Group.vue';
    import { Utils } from '@/lib/utils';
import { updateAppThemeKey } from '@/lib/keys';

    const version = APP_VERSION;

    const themes: {id: string, display: string}[] = [
        {id: 'dark', display: "Dark"},
        {id: 'light', display: "Light"},
        // {id: 'pinkish', display: "Pink"}
    ]

    const updateAppTheme = Utils.injectStrict(updateAppThemeKey);
</script>

<template>
    <Group id="app-settings" :is-toggle="true" title="App Settings">
        <template #foot>
            <div id="app-settings">
                <p>App Version: <strong>{{ version }}</strong></p>
                <div class="theme-changer">
                    <p>Change Theme:</p>
                    <ul>
                        <li v-for="(theme, i) in themes"><button @click="() => { updateAppTheme(themes[i].id)}">{{ theme.display }}</button></li>
                    </ul>
                </div>
            </div>
        </template>
    </Group>  
</template>
  
<style scoped lang="scss">
    @import url('../assets/main.scss');

    div#app-settings{
        padding: 10px;
        width: 100%;
        & p{
            margin: 0px;
            text-align: center;
            margin-bottom: 5px;
        }
        & div.theme-changer{
            width: 100%;
            & ul{
                align-items: center;
                justify-content: center;
                display: flex;
                flex-direction: row;
                list-style-type: none;
                margin: 0px;
                padding: 0px;
                flex-wrap: wrap;
                & li{
                    width: calc(100% / 3);
                }
            }
        }
    }
</style>
