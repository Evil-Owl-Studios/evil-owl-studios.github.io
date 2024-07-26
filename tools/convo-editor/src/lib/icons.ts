import ico_edit from '../assets/img/ico_edit.svg';
import ico_save from '../assets/img/ico_save.svg';
import ico_add from '../assets/img/ico_add.svg';
import ico_move from '../assets/img/ico_move.svg';
import ico_move_up from '../assets/img/ico_move_up.svg';
import ico_move_down from '../assets/img/ico_move_down.svg';
import ico_collapse from '../assets/img/ico_collapse.svg';
import ico_expand from '../assets/img/ico_expand.svg';
import ico_delete from '../assets/img/ico_delete.svg';
import ico_up from '../assets/img/ico_up.svg';
import ico_down from '../assets/img/ico_down.svg';

const icons: {id: string, icon: string}[] = [
    {id: 'edit', icon: ico_edit},
    {id: 'save', icon: ico_save},
    {id: 'add', icon: ico_add},
    {id: 'move', icon: ico_move},
    {id: 'move-up', icon: ico_move_up},
    {id: 'move-down', icon: ico_move_down},
    {id: 'collapse', icon: ico_collapse},
    {id: 'expand', icon: ico_expand},
    {id: 'delete', icon: ico_delete},
    {id: 'up', icon: ico_up},
    {id: 'down', icon: ico_down},
]

export function getIcon(iconId: string){
    let outIcon = ''
    icons.forEach((icon) => {
        if(icon.id === iconId) outIcon = icon.icon;
    });
    if(outIcon === '') console.warn(`Missing icon ${iconId}`);
    return outIcon;
}