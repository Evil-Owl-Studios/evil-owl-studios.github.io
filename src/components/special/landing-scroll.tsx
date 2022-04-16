import React from 'react';
import '../../media/scss/special/scroller.scss';

interface IProps{
    
}

interface IState{
    
}

export class LandingScroll extends React.Component<IProps, IState>{

    constructor(props: IProps){

        super(props);
        
        this.state = {
            currIndex: 0
        }
    }

    getScrollIcon(){
        return( <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g id="chevron-bottom">
                        <line x1="16" x2="7" y1="20.5" y2="11.5"/>
                        <line x1="25" x2="16" y1="11.5" y2="20.5"/>
                    </g>
                </svg>)
    }

    render(): React.ReactNode {
        return (<div className='scroller'>
                    <div className='scroller-icon'>
                        {this.getScrollIcon()}
                    </div>
                </div>);
    }
}
