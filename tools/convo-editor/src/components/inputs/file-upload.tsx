'use client'

import { ChangeEvent } from "react";
import InputHold from "./template";

export default function FileUpload({id, label, pattern, onUpload}: {id: string, label: string, pattern?: string, onUpload(file: File): void}){

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        const target = (e.target);
        
        if(target.files)
            onUpload(target.files[0]);
    }

    return (
        <InputHold>
            <input type='file' id={id} name={id} pattern={pattern} onChange={handleInputChange} />
            <label htmlFor={id}>{label}</label>
        </InputHold>
    )
}