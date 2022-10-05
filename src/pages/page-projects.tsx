import { ItchProjectData } from "../data/Registry";
import { PageMeta } from "./default-pages";
import LandingPage from "./landing-page";

import pjImgSer from '../media/images/projects/pj-ser.png';
import pjImgBalth from '../media/images/projects/pj-balth.png';
import pjImgJunk from '../media/images/projects/pj-junk.png';

export function PageProjects(meta?: PageMeta){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                            <h1>Our Projects</h1>
                            <p>Here you can find the projects we have released, and future projects we are working on.</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='projects'>
                                {/* <h2>Our Projects</h2> */}
                                <article>
                                    <h2>Our Demos</h2>
                                    <div className="project-hold" id="demos">
                                        {GetItchProjectIframe({id: "550044", url: "https://evilowlstudios.itch.io/junkship", name: "JunkShip", pjImage: {src: pjImgJunk, alt: ""}}, meta)}
                                        {GetItchProjectIframe({id: "1178668", url: "https://evilowlstudios.itch.io/balthazaars-freedom", name: "Balthazaar's Freedom", pjImage: {src: pjImgBalth, alt: ""}}, meta)}
                                        {GetItchProjectIframe({id: "1713180",url: "https://evilowlstudios.itch.io/ser", name: "Ser", pjImage: {src: pjImgSer, alt: ""}}, meta)}
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}

function GetItchProjectIframe(projectData: ItchProjectData, pageMeta?: PageMeta){

    return (<div className="project"><div className="itch">
                <div className="overlay">
                    <p>{projectData.name}</p>
                </div>
                <img alt={projectData.pjImage.alt} src={projectData.pjImage.src} />
                <a className="btn" rel="noreferrer" href={projectData.url} target="_blank">Download on itch.io</a>
            </div></div>)
    
}