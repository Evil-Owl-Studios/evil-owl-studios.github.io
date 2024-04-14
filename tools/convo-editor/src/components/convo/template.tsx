import styles from './convo.module.scss';

export default function InputGroup({children} : { children: JSX.Element | JSX.Element[]}){
    return (
        <div className={styles['input-group']}>
            {children}
        </div>
    )
}