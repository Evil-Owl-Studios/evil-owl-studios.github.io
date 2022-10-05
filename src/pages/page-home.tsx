import { HeadingCarrousel } from "../components/special/carrousel";
import LandingPage from "./landing-page";
import logoDark from "../media/images/eos_logo_dark_nobg.png";
import logoLight from "../media/images/eos_logo_light_nobg.png";
import { PageMeta } from "./default-pages";

export function PageHome(meta?: PageMeta){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage showScroll={false}>
                            <HeadingCarrousel input={["Welcome to", "Croeso i"]} />
                            <p>Evil Owl Studios!</p>
                            <div className="eos-logo">
                                <img className="eos-logo" alt="Owl with a Crown. Evil Owl Studios Logo" src={(meta?.isDarkMode ? logoLight : logoDark)} />                                
                            </div>
                    </LandingPage>
                    {/* <div className='page-main'>
                        <div className="page-main-body">
                            <section id='updates'>
                                <h2>News and Updates</h2>
                            </section>
                        </div>
                    </div> */}
                </div>
            </div>)
}