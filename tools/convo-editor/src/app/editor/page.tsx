'use client'

import { Convo } from "@/lib/convo";
import PageHold from "../template";
import { DefaultButton } from "@/components/inputs/default";
import EditorModal from "./modal/page";
import { useState } from "react";
import {Dialogue, Speaker} from "@/components/convo/convo";
import { GroupEditable } from "@/components/groups/groups";
import EditorList from "./list/page";

export default function EditorView({convoData, onEditorClose}: {convoData: Convo.ConvoData, onEditorClose: () => void}){

    const [isClosing, setClose] = useState<boolean>(false);
    const [localData, setLocalData] = useState<Convo.ConvoData>(convoData);

    function closeEditor(){
        onEditorClose();
    }

    function getLocalData(): Convo.Conversation | undefined{
        return localData?.data;
    }

    function updateLocalSpeakerData(index: number, data: Convo.Speaker){
        let localDataCopy = localData;
        let tempData: Convo.Conversation = new Convo.Conversation(localData.data);

        if(data !== undefined){
            if(tempData.hasOwnProperty("speakers")){
                if(tempData.speakers !== undefined && tempData.speakers[index]){
                    tempData.speakers[index] = {...tempData.speakers[index], ...data};
                } else {
                    if(tempData.speakers !== undefined){
                        tempData.speakers = [...tempData.speakers, ...[data]];
                    } else {
                        tempData = {...tempData, ...{"speakers": [data]}};
                    }
                }
            }
        }

        localDataCopy.data = tempData;
        setLocalData({...localDataCopy});
        console.log(localDataCopy);
    }

    function updateLocalDialogueData(index: number, data: Convo.Dialogue){
        let localDataCopy = localData;
        let tempData: Convo.Conversation = new Convo.Conversation(localData.data);

        if(data !== undefined){
            if(tempData.hasOwnProperty("conversation")){
                if(tempData.conversation !== undefined && tempData.conversation[index]){
                    tempData.conversation[index] = {...tempData.conversation[index], ...data};
                } else {
                    if(tempData.conversation !== undefined){
                        tempData.conversation = [...tempData.conversation, ...[data]];
                    } else {
                        tempData = {...tempData, ...{"conversation": [data]}};
                    }
                }
            }
        }

        localDataCopy.data = tempData;
        setLocalData({...localDataCopy});
        console.log(localDataCopy);
    }

    function handleSave(e: any){
        const target = e.target as HTMLButtonElement;
        const file = getDownloadableFile();
        
        const tempLink = document.createElement('a');
        tempLink.href = file;
        tempLink.download = localData?.name;
        tempLink.click();

        URL.revokeObjectURL(file);
    }

    function getDownloadableFile(): string{
        if(localData.data){
            const dataToSave: string = JSON.stringify(localData?.data);
            const blob = new Blob([dataToSave], {type: "application/json"});
    
            const downloadURL = URL.createObjectURL(blob);
            return downloadURL;
        }
        throw Error("Missing data");
    }

    return (
        <PageHold>
            {getLocalData()?.speakers ? <EditorList id="speaker-list" listItems={getLocalData()?.speakers?.map((speaker) => ({label: speaker.displayName, value: speaker.id}))}/> : undefined}
            <EditorModal open={isClosing}>
                <DefaultButton id="editor-modal-button-1" label="Yes" onClick={closeEditor}/>
                <DefaultButton id="editor-modal-button-2" label="No" onClick={() => {setClose(false)}}/>
            </EditorModal>
            <DefaultButton id="editor-close" label="Close Editor" onClick={() => {setClose(true)}}/>
            <GroupEditable<Convo.Speaker> id="speakers" separator label="Speakers" childId="speaker" childLabel="Speaker" dataPass={getLocalData()?.speakers || []} toClone={(identifier, index, data) => {
                // if(!data) throw Error("Missing data")
                return (<Speaker identifier={identifier} index={index} speaker={data} onModify={(modifiedSpeaker) => {
                    updateLocalSpeakerData(index, modifiedSpeaker);
                }} />)
            }}/>
            <GroupEditable<Convo.Dialogue> id="convo" separator label="Conversation" childId="dialogue" childLabel="Dialogue" dataPass={getLocalData()?.conversation || []} toClone={(identifier, index, data) => {
                // if(!data) throw Error("Missing data")
                return (<Dialogue identifier={identifier} dialogue={data} convoData={localData} onModify={(modifiedDialogue) => {
                    updateLocalDialogueData(index, modifiedDialogue)
                }}/>)
            }}/>
            <DefaultButton id="editor-save" label="Save Changes" onClick={handleSave}/>
        </PageHold>
    )
}