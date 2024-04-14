import styles from './modal.module.scss';
import { useState } from "react";

export interface IModalButtons{

}

export default function EditorList({id, listItems}:{id: string, listItems: {value: string, label: string}[]}){

    return (
        <datalist id={id}>
            {listItems?.map((item, i) => {
                return <option key={`${item.value}-${i}`} value={item.value}>{item.label}</option>
            })}
        </datalist>
    )
}