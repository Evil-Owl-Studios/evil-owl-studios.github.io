/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react';

interface IProps{
    pageId: string;
    pageHashes: string[];
    pageContent: JSX.Element | JSX.Element[] | undefined;
}

interface IState{

}

export default class Page extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props);

        this.state = {

        }
    }

    getPageContent(): JSX.Element | JSX.Element[]{
        return this.props.pageContent || (<div className='page'>
                    <h1>Template Page</h1>
                    <p>Do no use this! Override in Child classes.</p>
                </div>);
    }

    getCurrentHash(): string{
        return window.location.hash;
    }

    render(): React.ReactNode {
        
        return (<div id={`page-${this.props.pageId}`} className='page-hold'>
                    {this.getPageContent()}
                </div>);
    }
}

// Pages



