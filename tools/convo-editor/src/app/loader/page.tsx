'use client'

import {DefaultInput, DefaultButton} from "@/components/inputs/default"
import FileUpload from "@/components/inputs/file-upload"
import { Convo } from "@/lib/convo"
import PageHold from "../template";

export default function LoaderView({onConvoLoad}: {onConvoLoad: (convoData: Convo.ConvoData) => void}){

    async function handleFileUpload(file: File){
        const name: string = file.name;
        file.text().then(async (data) => {
            const convo: Convo.Conversation = JSON.parse(data) as Convo.Conversation;
            await onConvoLoad({name, data: convo});
        });
    }

    let newConvoName: string = "";

    async function handleNewConvo(){
        if(newConvoName){
            await onConvoLoad({name: newConvoName, data: Object.create(Convo.Conversation)});
        } else {
            console.error("Convo Name Missing");
        }
    }

    return (
        <PageHold>
            <div>
                <h2>New</h2>
                <p>Start a new Conversation</p>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                        await handleNewConvo();
                    }}>
                    <DefaultInput id="file-name" label="Convo Name" type="text" onChange={(e) => {newConvoName = (e.target).value}} overrides={{pattern: '[a-zA-Z0-9]+.json', suffix: '.json'}} />
                    <DefaultButton type="submit" id="create-new" label="Create New"/>
                </form>
            </div>
            <p>or</p>
            <div>
                <h2>Load</h2>
                <p>Start a new Conversation</p>
                <FileUpload id="file-edit-convo" label="Load Convo" onUpload={async (e) => {
                    await handleFileUpload(e);
                }}/>
            </div>
        </PageHold>
    )
}