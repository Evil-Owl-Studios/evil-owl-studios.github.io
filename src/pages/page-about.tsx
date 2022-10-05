import { Calendar } from "../components/special/calendar/calendar";
import calendarData from "../data/calendar-data";
import LandingPage from "./landing-page";

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
                            <section id='events'>
                                <h2>Planned Events</h2>
                                <Calendar name="Events" events={calendarData()}/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}