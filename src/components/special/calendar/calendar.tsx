import React from 'react';
import '../../../media/scss/special/calendar.scss';
import { CalendarEvent } from './calendar-event';

interface IProps{
    name: string;
    events?: ICalendarEvent[];
}

interface IState{
    calendarDate: Date;
    calendarYearInput: number;
    calendarMonthInput: number;
}


interface ICalendarEventDetails{
    name: string;
    description?: string;
}

interface ICalendarEventTime{
    year: number;
    month: EMonths;
    day: number;
}

export interface ICalendarEvent{
    details: ICalendarEventDetails
    start: ICalendarEventTime;
    end?: ICalendarEventTime;
}

enum EWeekdays{
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6
}

export enum EMonths{
    JANUARY = 0,
    FEBRUARY = 1,
    MARCH = 2,
    APRIL = 3,
    MAY = 4,
    JUNE = 5,
    JULY = 6,
    AUGUST = 7,
    SEPTEMBER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11,
}

export class Calendar extends React.Component<IProps, IState>{

    private today: Date;

    constructor(props: IProps){

        super(props);

        this.today = new Date();

        this.state = {
            calendarDate: this.today,
            calendarYearInput: this.today.getFullYear(),
            calendarMonthInput: this.today.getMonth()
        }
    }

    getWeekdays(): {id: EWeekdays, abbr: string, full: string}[]{
        return[
            {id: EWeekdays.SUNDAY, abbr: 'S', full: 'Monday'},
            {id: EWeekdays.MONDAY, abbr: 'M', full: 'Tuesday'},
            {id: EWeekdays.TUESDAY, abbr: 'T', full: 'Wednesday'},
            {id: EWeekdays.WEDNESDAY, abbr: 'W', full: 'Thursday'},
            {id: EWeekdays.THURSDAY, abbr: 'T', full: 'Friday'},
            {id: EWeekdays.FRIDAY, abbr: 'F', full: 'Saturday'},
            {id: EWeekdays.SATURDAY, abbr: 'S', full: 'Sunday'},
        ]
    }

    getMonths(): {id: EMonths, abbr: string, full: string}[]{
        return [
            {id: EMonths.JANUARY, abbr: 'JAN', full: 'January'},
            {id: EMonths.FEBRUARY, abbr: 'FEB', full: 'February'},
            {id: EMonths.MARCH, abbr: 'MAR', full: 'March'},
            {id: EMonths.APRIL, abbr: 'APR', full: 'April'},
            {id: EMonths.MAY, abbr: 'MAY', full: 'May'},
            {id: EMonths.JUNE, abbr: 'JUN', full: 'June'},
            {id: EMonths.JULY, abbr: 'JUL', full: 'July'},
            {id: EMonths.AUGUST, abbr: 'AUG', full: 'August'},
            {id: EMonths.SEPTEMBER, abbr: 'SEP', full: 'September'},
            {id: EMonths.OCTOBER, abbr: 'OCT', full: 'October'},
            {id: EMonths.NOVEMBER, abbr: 'NOV', full: 'November'},
            {id: EMonths.DECEMBER, abbr: 'DEC', full: 'December'},
        ]
    }

    getMonth(index: number): EMonths{
        return this.getMonths()[index].id;
    }

    getSortedWeekdays(startWith: number){
        let weekdays = this.getWeekdays();
        let bottom = weekdays.splice(startWith, weekdays.length);

        return bottom.concat(weekdays); //return bottom.concat(top);
    }

    getWeekday(day: number): {id: EWeekdays, abbr: string}{
        return this.getWeekdays()[day];
    }

    getDatesWithWeekday(date: Date): {day: number, wdIndex: number}[] {
        let tmpDate: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        var numDays = tmpDate.getDate();
        var weekdayMap: {day: number, wdIndex: number}[] = [];

        for(let i = 1; i <= numDays; i++){
            tmpDate.setDate(i);
            weekdayMap.push({day: i, wdIndex: tmpDate.getDay()});
        }

        return weekdayMap;
    }

    getFirstWeekDay(): number{
        let datesWd = this.getDatesWithWeekday(this.state.calendarDate);
        return datesWd[0].wdIndex;
    }

    isDateEqual(a: Date, b: Date): boolean{
        return ((a.getDate() === b.getDate()) && (a.getMonth() === b.getMonth()) && (a.getFullYear() === b.getFullYear()));
    }

    isTimeWithinEventRange(inTime: ICalendarEventTime): boolean{
        if(this.props.events){
            for(let i = 0; i < this.props.events.length; i++){
                let ev = this.props.events[i];
                let start = ev.start;
                let end = ev.end;

                
                if(end){
                    if((inTime.year === start.year) && (inTime.month === start.month)){
                        if(inTime.day === start.day){
                            return true;
                        }
                        if(inTime.day > start.day && inTime.day < end.day){
                            return true;
                        }
                        if(inTime.day === end.day){
                            return true;
                        }
                    }
                } else {
                    if((inTime.year === start.year) && (inTime.month === start.month)){
                        if(inTime.day === start.day){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    getCalendarDates(): (JSX.Element | JSX.Element[]){
        let outDates: JSX.Element | JSX.Element[] = [];
        let datesWd = this.getDatesWithWeekday(this.state.calendarDate);
        let cDate = this.dateAsCTime(this.state.calendarDate);

        outDates = datesWd.map((date, ind) => {
            let weekDay = this.getWeekday(date.wdIndex);
            let tmpTime: ICalendarEventTime = {year: cDate.year, month: cDate.month, day: date.day};
            
            let isEvent: boolean = this.isTimeWithinEventRange(tmpTime);

            let elemClass = `date ${(weekDay.id === EWeekdays.SATURDAY || weekDay.id === EWeekdays.SUNDAY) ? 'date-weekend' : ''} ${((this.state.calendarDate.getFullYear() === this.today.getFullYear()) && (this.state.calendarDate.getMonth() === this.today.getMonth()) && (this.today.getDate() === date.day)) ? 'date-today' : ''}`

            return (isEvent) ? <mark key={(ind)} className={elemClass}>{date.day}</mark> : <span key={(ind)} className={elemClass}>{date.day}</span>
        })

        return outDates;
    }

    updateDate(month?: number, year?: number){
        let newYear = (year !== undefined) ? year : this.state.calendarDate.getFullYear();
        let newMonth = (month !== undefined) ? month : this.state.calendarDate.getMonth();

        let newDate = new Date(newYear, newMonth);
        
        this.setState({calendarDate: newDate, calendarYearInput: newYear, calendarMonthInput: newMonth});
    }

    onChangeMonth(ev: React.ChangeEvent<HTMLSelectElement>){
        let val = ev.target.value;
        let monthNum = Number.parseInt(val);

        
        if(!isNaN(monthNum)){
            this.setState({calendarMonthInput: monthNum});

            if(monthNum >= 0 && monthNum <= 11){
                this.updateDate(monthNum, undefined);
            }
        }
    }

    onChangeYear(ev: React.ChangeEvent<HTMLInputElement>){
        let val = ev.target.value;
        let yearRegex = /^[12][0-9]{3}$/;
        let yearNum = Number.parseInt(val);

        if(!isNaN(yearNum)){
            this.setState({calendarYearInput: yearNum});
            
            if(yearRegex.exec(val)){
                this.updateDate(undefined, yearNum);
            }
        }
    }

    resetCalendar(){
        this.updateDate(this.today.getMonth(), this.today.getFullYear())
    }

    dateAsCTime(date: Date): ICalendarEventTime{
        return {year: date.getFullYear(), month: this.getMonth(date.getMonth()), day: date.getDay()}
    }

    getEvent(index: number): ICalendarEvent | undefined{
        if(this.props.events){
            let ev = this.props.events[index];
            if(ev){
                return ev;
            }
        }
        return undefined;
    }

    onEventPinned(id: number){
        let ev = this.getEvent(id);
        if(ev){
            this.updateDate(ev.start.month, ev.start.year);
        }
    }

    isEventPinned(index: number): boolean{
        let ev = this.getEvent(index);
        if(ev){
            const evStart = ev.start;
            const cTime = this.dateAsCTime(this.state.calendarDate);

            if((evStart.year === cTime.year) && (evStart.month === cTime.month)){
                return true;
            }
        }
        return false;
    }
    
    render(): React.ReactNode {
        return (<div className='calendar'>
                    <div className='calendar-head'>
                        <span className='calendar-month'>
                            <select onChange={this.onChangeMonth.bind(this)} value={this.state.calendarMonthInput}>
                                {this.getMonths().map((month, ind) => {
                                    return <option key={ind} value={month.id}>{month.full}</option>
                                })}
                            </select>
                        </span>
                        <span className='calendar-year'>
                            <input maxLength={4} onChange={this.onChangeYear.bind(this)} pattern='^[12][0-9]{3}$' required type='text' value={`${this.state.calendarYearInput}`} />
                        </span>
                        <span className='calendar-reset'>
                            <button onClick={() => {this.resetCalendar()}}>Today</button>
                        </span>
                    </div>
                    <div className='calendar-body'>
                        <div className='calendar-weekdays'>
                            {this.getSortedWeekdays(this.getFirstWeekDay()).map((weekDay, wI) => {
                                return (<span key={wI} className={`wd ${(weekDay.id === EWeekdays.SATURDAY || weekDay.id === EWeekdays.SUNDAY) ? 'wd-weekend' : '' }`}><span>{weekDay.abbr}</span></span>);
                            })}
                        </div>
                        <div className='calendar-dates'>
                            {this.getCalendarDates()}
                        </div>
                    </div>
                    <div className='calendar-footer'>
                        <div className='calendar-events'>
                            {this.props.events?.map((event, ind) => {
                                return (<CalendarEvent key={ind} id={ind} name={event.details.name} description={event.details.description} isPinned={this.isEventPinned(ind)} onPinEvent={() => { this.onEventPinned(ind); }} />);
                            })}
                        </div>
                    </div>
                </div>);
    }
}
