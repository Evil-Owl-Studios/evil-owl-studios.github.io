import { DefaultButton } from "@/components/inputs/default";
import styles from './modal.module.scss';
import { useState } from "react";

export interface IModalButtons{

}

export default function EditorModal({open, children} : {open: boolean, children: JSX.Element | JSX.Element[]}){

    return (
        <dialog className={styles.modal} aria-modal={true} open={open}>
            <b>Are you sure you want to close the editor?</b>
            <p>Any unsaved changes will be lost.</p>
            <div className={styles["buttons-hold"]}>
                {children}
            </div>
        </dialog>
    )
}