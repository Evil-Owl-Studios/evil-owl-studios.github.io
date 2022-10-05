import React from 'react';

interface IProps{
    hidden?: boolean;
    hashHasChanged(newHash: string): void;
}

interface IState{
    currHash: string;
}

export default class Navigation extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props);
        
        this.state = {
            currHash: window.location.hash
        }

        this.onHashChange = this.onHashChange.bind(this);
    }

    componentDidMount(){
        window.addEventListener('hashchange', this.onHashChange, false);
    }

    componentWillUnmount(){
        window.removeEventListener("hashchange", this.onHashChange, false)
    }

    onHashChange(ev: HashChangeEvent){
        if(ev.newURL !== ev.oldURL){
            let newHash = /(#.*)$/.exec(ev.newURL);
            if(newHash && newHash[1]){
                this.setState({currHash: newHash[1]});
                if(this.props.hashHasChanged){
                    this.props.hashHasChanged(newHash[1]);
                }
            }
        }
    }

    render(): React.ReactNode {
        
        const navLinks = ["Home", "About", "Projects", "Contact"]

        return (
            <div className={`nav ${(this.props.hidden) ? 'hidden' : ''}`} aria-hidden={this.props.hidden}>
                <div className='nav-col'>
                    {/* <p>Contact Us</p> */}
                </div>
                <div className='nav-col'>
                    <nav className='main'>
                        <ul>
                            {navLinks.map((el, i) => {
                                let hashLink = `#${el.toLowerCase().replace(/\s/gm, '_')}`
                                return (<li key={i} className={(this.state.currHash === hashLink) ? 'targeted' : undefined}><a href={hashLink}>{el}</a></li>)
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
                );
    }
}
