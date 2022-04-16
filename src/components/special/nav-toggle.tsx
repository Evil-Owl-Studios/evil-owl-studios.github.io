import React from 'react';
import '../../media/scss/special/nav-toggle.scss';

interface IProps{
    onToggle(newToggle: boolean): void
    defaultValue?: boolean;
}

interface IState{
    
}

export default class NavToggle extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props);
        
        this.state = {

        }
    }

    render(): React.ReactNode {

        return (
            <div className='nav-toggle'>
                <input checked={this.props.defaultValue} id='nav-toggle' name='nav-toggle' type="checkbox" onChange={(ev) => {this.props.onToggle(ev.target.checked);}}></input>
                <label htmlFor='nav-toggle'>
                    <div className='hamburger'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </label>
            </div>
                );
    }
}
