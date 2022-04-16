/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react';
import { HeadingCarrousel } from '../components/special/carrousel';
import LandingPage from './landing-page';

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

export function PageHome(){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                            <HeadingCarrousel input={["Welcome to", "Croeso i", "Bienvenue à", "Willkommen bei", "Welkom bij", "Bienvenido a", "Ласкаво просимо до"]} />
                            <p>Evil Owl Studios!</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='updates'>
                                <h2>Updates and News</h2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}

export function PageAbout(){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                            <h1>About Us</h1>
                            <p>We are Evil Owl Studios. An indie games studios based in Wales. With the ambition and dedication of making quality games to be fun for everyone.</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='the-studio'>
                                <h2>Our Studio</h2>
                                <p>Started our journey at <a href="https://glyndwr.ac.uk/" target='_blank' rel="noreferrer">Wrexham Glyndŵr University</a>, <a href="https://en.wikipedia.org/wiki/North_Wales" target='_blank' rel="noreferrer">North Wales</a>; as graduate game students.</p>
                                <p>We are a group of Masters Level Game Development graduates, formed in North Wales; with a passion to develop fun and detailed games for everyone.We also develop assets and programs as freelancing jobs</p>
                            </section>
                            <section id='the-team'>
                                <h2>Our Team</h2>
                            </section>
                            <section id='events'>
                                <h2>Planned Events</h2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}

export function PageProjects(){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                            <h1>Our Projects</h1>
                            <p>Here you can find the projects we have released, and future projects we are working on.</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='projects'>
                                <h2>Our Projects</h2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}

export function PageContact(){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                        <h1>Contact Us</h1>
                        <p>Here you can find our community platforms</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='socials'>
                                
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}