import { Convo } from '@/lib/convo';
import '../_styles/main.scss';

export default function ManagerView({data}: {data?: Convo.ConvoData}){
    return (
        <div className='header'>
            <h1>Convo Editor</h1>
            {(data?.name) ? <span>Editing {data.name}</span> : undefined }
        </div>
    )
}