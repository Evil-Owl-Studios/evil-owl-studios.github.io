import React from "react";
import styles from './inputs.module.scss';

export default function InputHold({id, children} : { id: string, children: React.ReactNode}){
    return (
        <div className={`${styles['input-hold']} ${styles[id]}`}>
            {children}
        </div>
    )
}