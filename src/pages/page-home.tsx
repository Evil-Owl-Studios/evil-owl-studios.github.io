import { HeadingCarrousel } from "../components/special/carrousel";
import LandingPage from "./landing-page";

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