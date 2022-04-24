import LandingPage from "./landing-page";

export function PageProjects(){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                            <h1>Our Projects</h1>
                            <p>Here you can find the projects we have released, and future projects we are working on.</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='projects'>
                                <h2>Our Projects</h2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}