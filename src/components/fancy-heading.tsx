import React from 'react';

interface IProps{
    text: string;
}

interface IState{

}

export default class FancyHeading extends React.Component<IProps, IState>{

    state: IState = {

    }



    render(): React.ReactNode {

        const textArray = Array.from(this.props.text);

        return(
        <h1 className='fancy-heading' aria-label={this.props.text}>
            {textArray.map((el, ind) => {
                return <span key={ind}>{el}</span>
            })}
        </h1>);
    }
}