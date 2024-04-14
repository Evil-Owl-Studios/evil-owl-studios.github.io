import { DefaultButton } from '../inputs/default';
import styles from './groups.module.scss';

export default function Group({children, id} : { id: string, children: JSX.Element | JSX.Element[]}){
    return (
        <div className={`${styles['group']} ${styles[id]}`}>
            {children}
        </div>
    )
}