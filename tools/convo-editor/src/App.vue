<script setup lang="ts">
  import { inject, onBeforeUnmount, provide, ref, watch } from 'vue';
  import Editor from './components/MainView.vue';
  import Manager from './components/ManagerView.vue';
  import { Convo } from './lib/convo';
  import { appThemeKey, convoDataKey, convoNameKey, updateAppThemeKey, updateConvoDataKey, updateConvoNameKey } from './lib/keys';
import Settings from './components/Settings.vue';
import { Utils } from './lib/utils';

  const convoData = ref<Convo.Convo>({conversation: [], speakers: []});
  provide(convoDataKey, convoData);
  provide(updateConvoDataKey, updateData);
  
  const convoName = ref<string>('new-conversation');
  provide(convoNameKey, convoName);
  provide(updateConvoNameKey, updateName);

  const appTheme = ref<string>(Utils.getCookie('theme') || 'dark');
  provide(appThemeKey, appTheme);
  provide(updateAppThemeKey, updateAppTheme);

  const speakerView = ref<boolean>(false);
  const isSaving = ref<boolean>(true);

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleSaveShortcut);
  })
  
  function handleSaveShortcut(e: KeyboardEvent){
    if(e.ctrlKey && e.key === 's'){
        e.preventDefault();
        handleSave();
    }
  }

  function updateName(newName: string){
    convoName.value = newName;
  }

  function updateData(newData: Convo.Convo){
    convoData.value = newData;
  }

  function updateAppTheme(newTheme: string){
    appTheme.value = newTheme;
    document.body.setAttribute('data-theme', newTheme);
    document.cookie = `theme=${newTheme}`;
  }

  function validateData(){
    let validated = convoData.value;

    if(validated){
      if(!(validated.speakers.length > 0)){
        throw "Missing Speakers!"
      }

      validated.conversation = validated.conversation.map((convo) => {
        let tmp = convo;

        if((convo.requireConditions) && !(convo.requireConditions?.length > 0)){
          tmp.requireConditions = undefined;
        }

        if((convo.lines) && !(convo.lines?.length > 0)){
          tmp.lines = undefined;
        }

        if((convo.responses) && !(convo.responses.length > 0)){
          tmp.responses = undefined;
        }

        return tmp;
      });
    }


    return validated;
  }
      
  function handleSave(){
    if(convoName.value !== undefined && convoData.value !== undefined){
      try{
        const a = document.createElement('a');
        a.href = `data:text/json;chartset=utf-8,${encodeURIComponent(JSON.stringify(validateData()))}`;
        a.target = '_blank';
        a.download = `${convoName.value}.json`;
        a.click();
      } catch (e: any) {
        console.error("Error!", e)
      }
    } else {
      console.error("Can't Save!", "Missing Data");
    }
  }

  document.addEventListener('keydown', handleSaveShortcut);
  
  window.addEventListener('load', () => {
    document.body.setAttribute('data-theme', appTheme.value);
  })

  window.addEventListener('beforeunload', (e) => {
    if(convoData.value.conversation.length > 0 || convoData.value.speakers.length > 0) e.preventDefault();
  })

</script>

<template>
  <header v-if="convoData !== undefined" :app-theme="appTheme">
      <h1>Editing {{ convoName }}</h1>
      <nav>
          <button v-if="!isSaving" @click="speakerView = !speakerView">Edit {{ (speakerView) ? "Convo" : "Speakers"}}</button>
          <button @click="isSaving = !isSaving">{{ (isSaving) ? 'Back to' : 'Save'}} Convo</button>
      </nav>
  </header>
  <main>
    <Editor v-if="!isSaving && convoData !== undefined" :convo-name="convoName" :convo-data="convoData" :speaker-view="speakerView"/>
    <Manager v-else-if="isSaving" :convo-name="convoName" :convo-data="convoData" @on-save="handleSave" @switch-save="isSaving = !isSaving"/>
    <Settings v-if="isSaving" />
  </main>
</template>

<style scoped lang="scss">
@import url('./assets/main.scss');

header{
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0px;
    z-index: 2;
    padding: 5px;

    margin-bottom: 10px;
    & h1{
        width: 100%;
    }
    & nav{
        display: flex;
        flex-direction: row;
        width: 100%;
        & button{
            width: 100%;
            cursor: pointer;
        }
    }
    
    @include themify($themes){
        & {
          background-color: themed('bg-main');
        }
    };
}

main{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 55px);
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    overflow: auto;
    padding-top: 10px;
    padding-bottom: 10px
}
</style>
