import React from 'react';
import '../../media/scss/special/carrousel.scss';

interface IProps{
    input: string[];
}

interface IState{
    currIndex: number;
}

export class HeadingCarrousel extends React.Component<IProps, IState>{

    constructor(props: IProps){

        super(props);
        
        this.state = {
            currIndex: 0
        }
    }

    componentDidMount(){
        this.setState({currIndex: 0})
    }

    getCurrIndex(): number{
        return this.state.currIndex;
    }

    getNextValidIndex(): number{
        if(this.getText(this.getCurrIndex() + 1) !== undefined){
            return this.getCurrIndex() + 1;
        } else {
            return 0;
        }
    }
    
    getText(index: number): string | undefined{
        if(index > this.props.input.length - 1){
            return undefined;
        } else {
            return this.props.input[index];
        }
    }

    getCurrentText(): string{
        return this.getText(this.getCurrIndex()) || "";
    }

    getNextText(): string{
        return this.getText(this.getNextValidIndex()) || "";
    }

    updateCarrouselToNext(){
        let nextValidIndex = this.getNextValidIndex();
        this.setState({currIndex: nextValidIndex});
    }

    render(): React.ReactNode {
        
        return (<div className='carrousel heading' aria-label={this.getNextText()}>
                    <span className='curr' aria-hidden='true'>{this.getCurrentText()}</span>
                    <h1 className='next' onAnimationIteration={this.updateCarrouselToNext.bind(this)} aria-live='polite'>{this.getNextText()}</h1>
                </div>);
    }
}
