// import { useNavigate } from "react-router";
import * as React from "react";
// import { ipcRenderer } from 'electron';

export default class Head extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      favicon: "", 
      lightModeBool: window.matchMedia('(prefers-color-scheme: light)').matches, //true to lightmode, false to darkmode;
    }
  }

  componentDidMount(){
    const faviconMode = this.state.lightModeBool ? "/colloidal.svg" : "/cyclops.svg";
    this.setState({favicon: faviconMode, lightModeBool: window.matchMedia('(prefers-color-scheme: light)').matches});
  }


  componentDidUpdate(prevProp,prevState){
    // if(window.matchMedia('(prefers-color-scheme: light)').matches != this.state.lightModeBool){
    // console.log(window.matchMedia('(prefers-color-scheme: light)').matches )
    // const faviconMode =  window.matchMedia('(prefers-color-scheme: light)').matches ? "/colloidal.svg" : "/cyclops.svg";
    // this.setState({favicon: faviconMode, lightModeBool: window.matchMedia('(prefers-color-scheme: light)').matches});
    // }
  }

    // const navigate = useNavigate();
    // const navToMain = () => navigate('/');
    // const navToQuery = () => navigate('/query');
    // const navToInspect = () => navigate('/inspect');
    // const navToPairs = () => navigate('/pairs');

    // const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const favicon = document.getElementById('favicon');

    //   function switchIcon(usesDarkMode) {
    //     if (usesDarkMode) { 
    //       favicon.href = '%PUBLIC_URL%/favicon-dark.ico';
    //       manifest.href='%PUBLIC_URL%/manifest-dark.json' 
    //     } else {
    //     favicon.href = '%PUBLIC_URL%/favicon-light.ico';
    //     manifest.href='%PUBLIC_URL%/manifest-light.json' 
    //     }
    //   }


  render(){
    return (
      <>
        <link id="favicon" rel="icon" type="image/svg+xml" href={this.state.favicon} />
  {/*			<nav className="row-container">
        <button className="command_button" id="backBtn" onClick={navToMain}> MAIN </button>
        <button className="command_button" id="viewToQueryBtn" onClick={navToQuery}> QUERY </button>
        <button className="command_button" id="viewToInspectBtn" onClick={navToInspect}> INSPECT </button>
        <button className="command_button" id="viewToPairsBtn" onClick={navToPairs}> PAIRS </button>
  	    </nav>*/}
      </>
    )
  }
}







 
