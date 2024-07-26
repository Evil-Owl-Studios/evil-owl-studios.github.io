<script setup lang="ts">
  import { onBeforeUnmount, ref, watch } from 'vue';
  import Editor from './components/MainView.vue';
  import Manager from './components/ManagerView.vue';
  import { Convo } from './lib/convo';

  const convoName = ref<string>();
  const convoData = ref<Convo.Convo>();

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

  function handleUpdate(data: {name: string, convo?: Convo.Convo}){
    convoName.value = data.name;

    if(data.convo !== undefined){
      convoData.value = data.convo;
      isSaving.value = false;
    }
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
        toast("Error!", e)
      }
    } else {
      toast("Can't Save!", "Missing Data");
    }
  }

  const toastData = ref<{title: string, message: string}>({title: "", message: ""});
  const toastShow = ref<boolean>(false);
  function toast(title: string, message: string){
    toastData.value.title = title;
    toastData.value.message = message;
    toastShow.value = true;
    
    (setTimeout(() => {
      toastShow.value = false;
    }, 5000))
  }

  document.addEventListener('keydown', handleSaveShortcut);

</script>

<template>
  <header v-if="convoData !== undefined">
      <h1>Editing {{ convoName }}</h1>
      <nav>
          <button v-if="!isSaving" @click="speakerView = !speakerView">Edit {{ (speakerView) ? "Convo" : "Speakers"}}</button>
          <button @click="isSaving = !isSaving">{{ (isSaving) ? 'Back to' : 'Save'}} Convo</button>
      </nav>
  </header>
  <main>
    <Editor v-if="!isSaving && convoData !== undefined" :convo-name="convoName" :convo-data="convoData" :speaker-view="speakerView"/>
    <Manager v-else-if="isSaving" :convo-name="convoName" :convo-data="convoData" @on-update="handleUpdate" @on-save="handleSave"/>
  </main>

  <div class="toast" :aria-hidden="!toastShow" @click="toastShow = false">
    <span class="title">{{ toastData.title }}</span>
    <span class="content">{{ toastData.message }}</span>
  </div>
</template>

<style scoped lang="scss">
@import url('./assets/main.scss');

header{
    display: flex;
    flex-direction: row;
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
}

main{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

div.toast{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: $fg-main;
  color: $bg-main;
  bottom: 10px;
  left: calc(50% - (200px / 2));
  border-radius: 20px;
  
  transform: translateY(200px);
  
  transition: transform 0.2s ease-in-out;

  & span{
    color: inherit;
    &.title{
      font-weight: bold;
    }
  }

  &[aria-hidden="false"]{
    transform: translateY(0px);
  }
}
</style>
