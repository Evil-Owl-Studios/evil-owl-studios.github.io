import { Registry } from "../data/Registry";
import { PageMeta } from "./default-pages";
import LandingPage from "./landing-page";

export function PageContact(meta?: PageMeta){
    return (<div className='page'>
                <div className='page-body'>
                    <LandingPage>
                        <h1>Contact Us</h1>
                        <p>Here you can find our community platforms</p>
                    </LandingPage>
                    <div className='page-main'>
                        <div className="page-main-body">
                            <section id='socials'>
                                <h2>Our Socials</h2>
                                <div className="social-hold">
                                    {new ScFacebook(meta).getElement()}
                                    {new ScInstagram(meta).getElement()}
                                    {new ScLinkedin(meta).getElement()}
                                    {new ScTiktok(meta).getElement()}
                                    {new ScTwitch(meta).getElement()}
                                    {new ScTwitter(meta).getElement()}
                                    {new ScYoutube(meta).getElement()}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>)
}


class SocialBase{
    protected href: string;
    protected title: string;
    protected meta?: PageMeta;

    protected svgColour?: string;
    protected classId?: string;

    constructor(href: string, title: string, classId?: string, meta?: PageMeta){
        this.href = href;
        this.title = title;
        this.meta = meta;
        this.classId = classId;

        this.svgColour = `#${(this.meta?.isDarkMode) ? Registry.Colours.nqWhite : Registry.Colours.nqBlack}`;
    }

    protected getSVG(): JSX.Element | undefined{
        return undefined;
    }

    public getElement(): JSX.Element | undefined{
        return (<a title={`Evil Owl Studios ${this.title} page`} target="_blank" className={this.classId} rel="noopener noreferrer" href={this.href}>
                    {this.getSVG()}
                </a>);
    }
}

class ScFacebook extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://facebook.com/EvilOwlStudios", "Facebook", "fb", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg  height="100%" style={{fill: this.svgColour,fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}} version="1.1" viewBox="0 0 512 512" width="100%"><path d="M374.244,285.825l14.105,-91.961l-88.233,0l0,-59.677c0,-25.159 12.325,-49.682 51.845,-49.682l40.116,0l0,-78.291c0,0 -36.407,-6.214 -71.213,-6.214c-72.67,0 -120.165,44.042 -120.165,123.775l0,70.089l-80.777,0l0,91.961l80.777,0l0,222.31c16.197,2.541 32.798,3.865 49.709,3.865c16.911,0 33.511,-1.324 49.708,-3.865l0,-222.31l74.128,0Z" style={{fillRule: "nonzero"}}/></svg>)
    }
}

class ScInstagram extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://instagram.com/EvilOwlStudios", "Instagram", "insta", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg height="100%" style={{fill: this.svgColour, fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}} version="1.1" viewBox="0 0 600 600" width="100%"><g transform="matrix(1.01619,0,0,1.01619,44,43.8384)"><path d="M251.921,0.159C183.503,0.159 174.924,0.449 148.054,1.675C121.24,2.899 102.927,7.157 86.902,13.385C70.336,19.823 56.287,28.437 42.282,42.442C28.277,56.447 19.663,70.496 13.225,87.062C6.997,103.086 2.739,121.399 1.515,148.213C0.289,175.083 0,183.662 0,252.08C0,320.497 0.289,329.076 1.515,355.946C2.739,382.76 6.997,401.073 13.225,417.097C19.663,433.663 28.277,447.712 42.282,461.718C56.287,475.723 70.336,484.337 86.902,490.775C102.927,497.002 121.24,501.261 148.054,502.484C174.924,503.71 183.503,504 251.921,504C320.338,504 328.917,503.71 355.787,502.484C382.601,501.261 400.914,497.002 416.938,490.775C433.504,484.337 447.553,475.723 461.559,461.718C475.564,447.712 484.178,433.663 490.616,417.097C496.843,401.073 501.102,382.76 502.325,355.946C503.551,329.076 503.841,320.497 503.841,252.08C503.841,183.662 503.551,175.083 502.325,148.213C501.102,121.399 496.843,103.086 490.616,87.062C484.178,70.496 475.564,56.447 461.559,42.442C447.553,28.437 433.504,19.823 416.938,13.385C400.914,7.157 382.601,2.899 355.787,1.675C328.917,0.449 320.338,0.159 251.921,0.159ZM251.921,45.551C319.186,45.551 327.154,45.807 353.718,47.019C378.28,48.14 391.619,52.244 400.496,55.693C412.255,60.263 420.647,65.723 429.462,74.538C438.278,83.353 443.737,91.746 448.307,103.504C451.757,112.381 455.861,125.72 456.981,150.282C458.193,176.846 458.45,184.814 458.45,252.08C458.45,319.345 458.193,327.313 456.981,353.877C455.861,378.439 451.757,391.778 448.307,400.655C443.737,412.414 438.278,420.806 429.462,429.621C420.647,438.437 412.255,443.896 400.496,448.466C391.619,451.916 378.28,456.02 353.718,457.14C327.158,458.352 319.191,458.609 251.921,458.609C184.65,458.609 176.684,458.352 150.123,457.14C125.561,456.02 112.222,451.916 103.345,448.466C91.586,443.896 83.194,438.437 74.378,429.621C65.563,420.806 60.103,412.414 55.534,400.655C52.084,391.778 47.98,378.439 46.859,353.877C45.647,327.313 45.391,319.345 45.391,252.08C45.391,184.814 45.647,176.846 46.859,150.282C47.98,125.72 52.084,112.381 55.534,103.504C60.103,91.746 65.563,83.353 74.378,74.538C83.194,65.723 91.586,60.263 103.345,55.693C112.222,52.244 125.561,48.14 150.123,47.019C176.687,45.807 184.655,45.551 251.921,45.551Z" style={{fillRule: "nonzero"}}/><path d="M251.921,336.053C205.543,336.053 167.947,298.457 167.947,252.08C167.947,205.702 205.543,168.106 251.921,168.106C298.298,168.106 335.894,205.702 335.894,252.08C335.894,298.457 298.298,336.053 251.921,336.053ZM251.921,122.715C180.474,122.715 122.556,180.633 122.556,252.08C122.556,323.526 180.474,381.444 251.921,381.444C323.367,381.444 381.285,323.526 381.285,252.08C381.285,180.633 323.367,122.715 251.921,122.715Z" style={{fillRule: "nonzero"}}/><path d="M416.627,117.604C416.627,134.3 403.092,147.834 386.396,147.834C369.701,147.834 356.166,134.3 356.166,117.604C356.166,100.908 369.701,87.374 386.396,87.374C403.092,87.374 416.627,100.908 416.627,117.604Z" style={{fillRule: "nonzero"}}/></g></svg>)
    }
}

class ScLinkedin extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://uk.linkedin.com/company/evil-owl-studios", "LinkedIn", "linkedin", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg height="100%" style={{fill: this.svgColour, fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}} version="1.1" viewBox="0 0 512 512" width="100%"><path d="M473.305,-1.353c20.88,0 37.885,16.533 37.885,36.926l0,438.251c0,20.393 -17.005,36.954 -37.885,36.954l-436.459,0c-20.839,0 -37.773,-16.561 -37.773,-36.954l0,-438.251c0,-20.393 16.934,-36.926 37.773,-36.926l436.459,0Zm-37.829,436.389l0,-134.034c0,-65.822 -14.212,-116.427 -91.12,-116.427c-36.955,0 -61.739,20.263 -71.867,39.476l-1.04,0l0,-33.411l-72.811,0l0,244.396l75.866,0l0,-120.878c0,-31.883 6.031,-62.773 45.554,-62.773c38.981,0 39.468,36.461 39.468,64.802l0,118.849l75.95,0Zm-284.489,-244.396l-76.034,0l0,244.396l76.034,0l0,-244.396Zm-37.997,-121.489c-24.395,0 -44.066,19.735 -44.066,44.047c0,24.318 19.671,44.052 44.066,44.052c24.299,0 44.026,-19.734 44.026,-44.052c0,-24.312 -19.727,-44.047 -44.026,-44.047Z" style={{fillRule: "nonzero"}}/></svg>)
    }
}

class ScTiktok extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://www.tiktok.com/@evilowlstudios", "TikTok", "tiktok", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path fill={this.svgColour} d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>)
    }
}

class ScTwitch extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://www.twitch.tv/evilowlstudios", "Twitch", "twitch", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill={this.svgColour} d="M2.089 0L.525 4.175v16.694h5.736V24h3.132l3.127-3.132h4.695l6.26-6.258V0H2.089zm2.086 2.085H21.39v11.479l-3.652 3.652H12l-3.127 3.127v-3.127H4.175V2.085zM9.915 12.522H12v-6.26H9.915v6.26zm5.735 0h2.086v-6.26H15.65v6.26z"/></svg>)
    }
}

class ScTwitter extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://twitter.com/evilowlstudios", "Twitter", "twitter", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg height="100%" style={{fill: this.svgColour, fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}} version="1.1" viewBox="0 0 512 512" width="100%"><path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" style={{fillRule: "nonzero"}}/></svg>)
    }
}

class ScYoutube extends SocialBase{

    constructor(meta?: PageMeta){
        super("https://www.youtube.com/channel/UCNVA0UjBLMiim1yf5jnj0eQ", "YouTube", "yt", meta)
    }

    protected override getSVG(): JSX.Element | undefined {
        return(<svg height="100%" style={{fill: this.svgColour, fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}} version="1.1" viewBox="0 0 512 512" width="100%"><path d="M501.303,132.765c-5.887,-22.03 -23.235,-39.377 -45.265,-45.265c-39.932,-10.7 -200.038,-10.7 -200.038,-10.7c0,0 -160.107,0 -200.039,10.7c-22.026,5.888 -39.377,23.235 -45.264,45.265c-10.697,39.928 -10.697,123.238 -10.697,123.238c0,0 0,83.308 10.697,123.232c5.887,22.03 23.238,39.382 45.264,45.269c39.932,10.696 200.039,10.696 200.039,10.696c0,0 160.106,0 200.038,-10.696c22.03,-5.887 39.378,-23.239 45.265,-45.269c10.696,-39.924 10.696,-123.232 10.696,-123.232c0,0 0,-83.31 -10.696,-123.238Zm-296.506,200.039l0,-153.603l133.019,76.802l-133.019,76.801Z" style={{fillRule: "nonzero"}}/></svg>)
    }
}