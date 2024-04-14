'use client'

import InputHold from "./template";
import styles from './inputs.module.scss';
import { useEffect, useState } from "react";
import { Convo } from "@/lib/convo";

export interface IInputOverrides{
    defaultValue?: string;
    pattern?: string;
    optional?: boolean;
    list?: string;
    convoData?: Convo.ConvoData;
    whitespaceAlt?: string;
    toLower?: boolean;
    toUpper?: boolean;
    prefix?: string;
    suffix?: string;
}

export function DefaultInput({id, label, type, flipLabel, onChange, overrides}: {id: string, label: string, type: string, flipLabel?: boolean, overrides?: IInputOverrides, onChange?: (e: any) => void}){

    function handleInputChange(e: any){
        const target = (e.target as HTMLInputElement);
        
        if(target.value !== ""){
            if(overrides?.prefix){
                if(!target.value.startsWith(overrides.prefix))
                    target.value = `${overrides.prefix}${target.value}`
            }
            if(overrides?.suffix){
                if(!target.value.endsWith(overrides.suffix))
                    target.value = `${target.value}${overrides.suffix}`
            }
        }

        if(onChange){
            onChange(e);
        }
    }

    function handleInputInput(e: any){
        const target = (e.target as HTMLInputElement);

        if(overrides?.toUpper){
            target.value = target.value.toUpperCase();
        }
        if(overrides?.toLower){
            target.value = target.value.toLowerCase();
        }

        if(overrides?.whitespaceAlt){
            target.value.replace(/\s/gm, overrides.whitespaceAlt);
        }
    }

    const labelElem = <label htmlFor={id}>{label}</label>
    const inputElem = <input type={type} id={id} name={id} pattern={overrides?.pattern} required={!overrides?.optional} list={overrides?.list} onBlur={handleInputChange} onInput={handleInputInput} defaultValue={overrides?.defaultValue} />

    if(flipLabel){
        return(
            <InputHold id="default">
                {inputElem}
                {labelElem}
            </InputHold>
        )
    } else {
        return(
            <InputHold id="default">
                {labelElem}
                {inputElem}
            </InputHold>
        )
    }
}

export function RichTextInput({id, label, multiLine, overrides, onChange}: {id: string, label: string, multiLine?: boolean, overrides?: IInputOverrides, onChange?: (e: any) => void}){
    
    const [rtOutput, setOutput] = useState<string>(overrides?.defaultValue || "");

    function handleInputChange(e: any){
        const value = (e.target).value;
        setOutput(value);
        if(onChange){
            onChange(e);
        }
    }

    function getFormattedData(value: string): string{
        let output: string = value;
        output = output?.replaceAll("\n", "<br/>");
        
        if(overrides?.convoData?.data){
            output = Convo.ParseDataToString(output, overrides.convoData.data);
        }
        
        return output;
    }

    const rtTogglerId = `${id} rt-toggle`;

    return(
        <InputHold id="rich-text">
            <label htmlFor={id}>{label}</label>
            <div className={styles["rt-editor"]}>
                <input type="checkbox" name={rtTogglerId} id={rtTogglerId} />
                <label htmlFor={rtTogglerId}></label>
                <textarea id={id} onChange={handleInputChange} defaultValue={overrides?.defaultValue}></textarea>
                <output dangerouslySetInnerHTML={{__html: getFormattedData(rtOutput)}}></output>
            </div>
        </InputHold>
    )
}

export function DefaultButton({id, label, type, onClick} : {id: string, label: string, type?: "button" | "reset" | "submit", onClick?: (e?: any) => void}){

    function handleButtonClick(e: any){
        if(onClick)
            onClick(e);
    }

    return(
        <InputHold id="button">
            <button type={type || "button"} onClick={handleButtonClick}>
                {label}
            </button>
        </InputHold>
        )
}