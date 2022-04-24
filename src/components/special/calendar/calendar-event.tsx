import React from 'react';
import '../../../media/scss/special/calendar.scss';

interface IProps{
    id: string | number;
    name: string;
    description?: string;
    isPinned?: boolean;
    onPinEvent(): void;
}

interface IState{
}

export class CalendarEvent extends React.Component<IProps, IState>{


    constructor(props: IProps){

        super(props);

        this.state = {
        }
    }

    getPin(): JSX.Element | JSX.Element[]{
        return( <svg aria-hidden={true} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="48-Pin" id="_48-Pin">
                        <path d="M26,0H6A1,1,0,0,0,5,1V5A1,1,0,0,0,6,6H8V16.59L6.29,18.29A1,1,0,0,0,6,19v3a1,1,0,0,0,1,1h8v9h2V23h8a1,1,0,0,0,1-1V19a1,1,0,0,0-.29-.71L24,16.59V6h2a1,1,0,0,0,1-1V1A1,1,0,0,0,26,0ZM24,21H8V19.41L9.41,18H22.59L24,19.41ZM10,16V6H22V16ZM25,4H7V2H25Z"/>
                    </g>
                </svg>)
    }

    getInputName(appendix?: string): string{
        return (`${this.props.name}.${this.props.id}${(appendix !== undefined) ? `.${appendix}` : ''}`);
    }

    render(): React.ReactNode {
        
        return  (<div key={this.props.id} className="calendar-event">
                    <button className={(this.props.isPinned) ? 'ev-pinned' : ''} aria-label='Show on calendar' onClick={this.props.onPinEvent}>{ this.getPin() }</button>
                    <div className={`calendar-event-info ${(this.props.description) ? 'with-description' : ''}`}>
                        <label htmlFor={(this.props.description) ? this.getInputName('toggle-desc') : undefined}>{this.props.name}</label>
                        {(this.props.description) ? [
                            <input key={this.getInputName('toggle-desc')} type='checkbox' name={this.getInputName('toggle-desc')} id={this.getInputName('toggle-desc')} />,
                            <div key={this.getInputName('desc')} className='calendar-event-description'>
                                <p>{this.props.description}</p>
                            </div>
                        ] : undefined}
                    </div>
                </div>)
    }
}
