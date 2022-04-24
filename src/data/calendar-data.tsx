import { EMonths, ICalendarEvent } from '../components/special/calendar/calendar';

export default function calendarData(): ICalendarEvent[]{
    return[
        {
            details: {
                name: "Jamfuzer",
                description: "72 hour Game Jam. Testing a relatively long description."
            },
            start: {
                year: 2019,
                month: EMonths.MARCH,
                day: 8
            }, 
            end: {
                year: 2019,
                month: EMonths.MARCH,
                day: 11
            }
        },
        {
            details: {
                name: "Grads in Games",
                description: "Awards Ceremony Event"
            },
            start: {
                year: 2019,
                month: EMonths.APRIL,
                day: 17
            }
        },
        {
            details: {
                name: "Wales ComicCon"
            },
            start: {
                year: 2019,
                month: EMonths.APRIL,
                day: 17
            }
        }
    ]
}