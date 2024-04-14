'use client'

import Group from "./template";
import styles from './groups.module.scss';
import { DefaultButton } from "../inputs/default";
import { useEffect, useState } from "react";

export function GroupToggle({id, label, children} : {id: string, label: string, children: JSX.Element | JSX.Element[]}){

    const togglerId = `${id} toggle`;
    
    return (
        <Group id="toggle">
            <input type="checkbox" name={togglerId} id={togglerId} />
            <label htmlFor={togglerId}>
                {label}
            </label>
            <div className={`${styles['group-hold']} ${styles["toggle"]}`}>
                {children}
            </div>
        </Group>
    )
}

interface IIdentifiedElement{
    identifier: string | number;
    elem: JSX.Element;
}

export function GroupEditable<T>({id, label, childId, childLabel, separator, toClone, dataPass} : {id: string, label: string, childId: string, childLabel: string, separator?: boolean, toClone: (identifier: string | number, index: number, data?: T) => JSX.Element, dataPass?: T[]}){

    const [cloneRefs, updateClones] = useState<IIdentifiedElement[]>([]);

    useEffect(() => {
        if(dataPass){
            cloneWithData(dataPass)
        }
    }, [])

    function clone(){
        const identifier = crypto.randomUUID();//cloneRefs.length;
        updateClones([...cloneRefs, ...[{identifier, elem: toClone(identifier, cloneRefs.length)}]]);
    }

    function cloneWithData(data?: T[]){
        let clones = data.map((d, i): IIdentifiedElement => {
            const identifier = crypto.randomUUID();
            return {identifier: identifier, elem: toClone(identifier, i, d)}
        });
        updateClones(clones);
    }

    function removeClone(identifier: number){
        if(cloneRefs[identifier]){
            let cloneCopy = cloneRefs.filter((ref, ind) => { return ind !== identifier; });
            updateClones(cloneCopy);
        }
    }

    return (
        <Group id="editable">
            <hr style={{display: (separator) ? undefined : 'none'}}/>
            <h2>{label}</h2>
            <div className={`${styles['group-hold']} ${styles['editable']}`}>
                {(cloneRefs.length > 0) ? cloneRefs.map((elem, i) => {
                    return  <GroupToggle key={elem.identifier} id={`${childId} ${elem.identifier}`} label={childLabel}>
                                <span className={styles["buttons"]}>
                                    <DefaultButton id={`${id} edit-delete`} label="Delete" onClick={() => {removeClone(i)}}/>
                                </span>
                                {elem.elem}
                            </GroupToggle>
                }) : <p>No Items. Click Add!</p>}
            </div>
            <DefaultButton id={`${id} edit-add`} label="Add" onClick={() => { clone(); }}/>
        </Group>
    )
}

export function GroupSwitch({id, labelOn, labelOff, children, defaultSwitch, onSwitch}: {id: string, labelOn: string, labelOff: string, children: JSX.Element[], defaultSwitch?: boolean, onSwitch?: (newValue: boolean) => void}){

    const [isOn, setIsOn] = useState<boolean>(defaultSwitch || false);

    const switcherId = `${id} switch`;

    return(
        <Group id="switch">
            <input defaultChecked={isOn} type="checkbox" name={switcherId} id={switcherId} onChange={(e) => {
                let on = e.target.checked;
                setIsOn(on);
                if(onSwitch)
                    onSwitch(on);
            }} />
            <label htmlFor={switcherId}>
                {(isOn) ? labelOn : labelOff}
            </label>
            { (isOn) ? children[0] : children[1] }
        </Group>
    )
}