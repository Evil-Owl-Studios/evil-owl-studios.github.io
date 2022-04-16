import React from 'react';
import Page from '../pages/default-pages';

interface IProps{
    children: JSX.Element | JSX.Element[] | Page | Page[];
}

interface IState{

}

export default class PageHolder extends React.Component<IProps, IState>{

    constructor(props: IProps){

        super(props);
        
        this.state = {

        }
    }
    
    getCurrentHash(): string{
        return window.location.hash;
    }

    getVisiblePage(): Page | undefined{
        const pages = this.props.children as (Page[] | Page);
        if(Array.isArray(pages)){
            let currPage: Page | undefined;
            for(let i = 0; i < pages.length; i++){
                let page = pages[i];
                let hashes = page.props.pageHashes;

                for(let ii = 0; ii < hashes.length; ii++){
                    let hash = hashes[ii];
                    if(hash === this.getCurrentHash()){
                        currPage = page;
                    }
                }
            }
            return currPage;
        } else {
            return pages;
        }
    }

    render(): React.ReactNode {
        
        return (
            <div className='pages-hold'>
                { this.getVisiblePage() }
            </div>
                );
    }
}
