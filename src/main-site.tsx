import React from 'react';
import NavToggle from './components/special/nav-toggle';
import Navigation from './components/navigation';
import PageHolder from './components/page-holder';
import Page from './pages/default-pages';

import { PageHome } from './pages/page-home';
import { PageAbout } from './pages/page-about';
import { PageContact } from './pages/page-contact';
import { PageProjects } from './pages/page-projects';

import { Scrollbars } from 'react-custom-scrollbars';
import './media/scss/special/scrollbars.scss';
import LightToggle from './components/special/light-toggle';

interface IProps{
}

interface IState{
  darkMode: boolean;
  navHidden: boolean;
}

export default class MainSite extends React.Component<IProps, IState>{

  constructor(props: IProps){
    super(props);

    this.state = {
      darkMode: false,
      navHidden: true
    }
  }

  setNavHidden(newHidden: boolean){
    this.setState({navHidden: newHidden});
  }

  setDarkMode(newDarkMode: boolean){
    this.setState({darkMode: newDarkMode});
  }

  render(): React.ReactNode {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add((this.state.darkMode) ? 'dark' : 'light');
    return (
      <div className="main-site">
        <NavToggle defaultValue={!this.state.navHidden} onToggle={(newToggle) => { this.setNavHidden(!newToggle); }}/>
        <Navigation hashHasChanged={() => { if(!this.state.navHidden){ this.setNavHidden(true);} }} hidden={this.state.navHidden} />
        <LightToggle defaultValue={!this.state.darkMode} onToggle={(newToggle) => { this.setDarkMode(!newToggle); }} />
        <Scrollbars
          autoHide
          autoHideDuration={200}
          autoHideTimeout={1000}
          style={{width: "100%", height: "100vh"}}
          renderView={props => <div {...props} className="scrollbar-view"/>}
          renderTrackVertical={props => <div {...props} className='scrollbar-track'/>}
          renderThumbVertical={props => <div {...props} className="scrollbar-thumb"/>}>
          <PageHolder>
            <Page pageId='home' pageHashes={["", "#home"]} pageContent={PageHome()} />
            <Page pageId='about' pageHashes={["#about"]} pageContent={PageAbout()} />
            <Page pageId='projects' pageHashes={["#projects"]} pageContent={PageProjects()} />
            <Page pageId='contact' pageHashes={["#contact"]} pageContent={PageContact()} />
          </PageHolder>
        </Scrollbars>
      </div>
    );
  }
}