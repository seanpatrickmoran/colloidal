import React, {useState} from 'react';
// import Draggable from 'react-draggable';
import { Plasma } from "./plasma.js";

import figlet from "figlet";

import { CallBox } from "./CallBox.jsx";
// import { ipcRenderer } from 'electron';


export default class Window extends React.Component{
           constructor(props){
              super(props);
              // this.Ref = React.createRef();
              this.state = {
                isCalling: "hidden",
              };
              this.handleCallChange = this.handleCallChange.bind(this);
              this.getTheBoys = this.getTheBoys.bind(this);
           }

  componentDidMount() {
      var plasmaBox = new Plasma(document.getElementById('plasmaArea'),120,30);
  }


  getTheBoys(){
    console.log('hey')
    this.setState({isCalling : "visible"})    

    // const fetchPromise = fetch(`http://localhost:8080/api/talk`);
    // fetchPromise.then(response => {
    //           return response.json();
    //               }).then(entries => {
    //                 document.getElementById("talk").innerHTML = entries;
    //                 // console.log(entries);
    //               });
    console.log('meow!')

  }

    handleCallChange(){
    if(this.state.isCalling=="hidden"){
      this.setState({isCalling: "visible"})
    } else{
    this.setState({isCalling: "hidden"})
    }  
  }

  closeWindow(){
    this.setState({visCallBox: "hidden"});
  }


  render (){

    return  <>

      <pre style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}></pre>
      <div align="center"><pre id="plasmaArea" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>ASCIIPlasma</pre></div>

      <h3 style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}

      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="javascript: void(0)" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}} onClick={this.getTheBoys}>Call for help</a>
      <p/>
      <a href="/" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <div id="callBoxDiv">
        <CallBox isCalling={this.state.isCalling} handleCallChange={this.handleCallChange}/>
      </div>

    </>
  }
}