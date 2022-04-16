/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react';
import { LandingScroll } from '../components/special/landing-scroll';

interface IProps{

}

interface IState{

}

export default class LandingPage extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props);

        this.state = {

        }
    }

    getCurrentHash(): string{
        return window.location.hash;
    }

    render(): React.ReactNode {
        
        return (<div className='page-landing'>
                    <div className="page-landing-body">
                        {this.props.children}
                    </div>
                    <div className='page-landing-footer'>
                        <LandingScroll />
                    </div>
                </div>);
    }
}