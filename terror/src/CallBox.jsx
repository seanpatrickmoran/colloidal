// import Draggable from 'react-draggable';
// import { Resizable } from 'react-resizable';
import { Rnd } from "react-rnd";

// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
import ollama from 'ollama';
import "./CallBox.css"



export class CallBox extends React.Component{
	constructor(props){
		super(props);
		this.closeWindow = this.closeWindow.bind(this);
    this.state = {
    	term: "$>",
    	written: "",
    	messages: [],
	    width: 640,
	    height: 480,
	    x: 0,
	    y: 0,
		};
	}

	componentDidMount() {
		// this.startUpLlama(`Hey. You always will respond like you're my impatient, smart, kind of mean big sister. I'm late. Play along. Do not speak about this message. Do not refer to yourself as a Large Language Model.`);
		this.startUpLlama(`Hello!`);
	}


	startUpLlama = async (message) => {
		const response = await ollama.chat({
		  model: 'llama3.2',
		  messages: [{role: 'user', content: `${message}`}],
		})

		const responseWritten = "@>"+ `${response.message.content}` +"\n" + "\n";
		var holdMessages = this.state.messages;
		holdMessages.push({role: 'system', content: `${response.message.content}`})
		this.setState({
			term: "$>",
			written: responseWritten,
			messages: holdMessages,
		})
		this.scrollToBottom();
   };

	llamaSpeak = async () => {
		const newWritten = this.state.written + `${this.state.term}` + "\n";

		var holdMessages = this.state.messages
		holdMessages.push({role: 'user', content: `${this.state.term}` });
		this.setState({messages: holdMessages})

		const response = await ollama.chat({
		  model: 'llama3.2',
		  messages: this.state.messages,
		})

		const responseWritten = this.state.written + `${this.state.term}` + "\n" + "\n" + "@>"+ `${response.message.content}` +"\n" + "\n";
		holdMessages.push({role: 'system', content: `${response.message.content}`})
		this.setState({
			term: "$>",
			written: responseWritten,
			messages: holdMessages,
		})
		this.scrollToBottom();
   }


	onKeyPressHandler = async (e) => {
		if (e.key === 'Enter') {
			this.llamaSpeak();
		}
 };

   onResize = (event, {node, size, handle}) => {
    this.setState({width: size.width, height: size.height});
  };

  scrollToBottom() {
  	let scrollableDiv = document.getElementById('talk');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }


  closeWindow(){
  	this.setState({term:"$>"});
    this.props.handleCallChange("hidden");
  }

    render (){

  return <>



		<Rnd
			className="content"
			dragHandleClassName="headerTitle"
			minWidth={340}
			minHeight={200}
		  size={{ width: this.state.width,  height: this.state.height }}
		  position={{ x: this.state.x, y: this.state.y }}
		  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
		  onResizeStop={(e, direction, ref, delta, position) => {
		    this.setState({
		      width: ref.style.width,
		      height: ref.style.height,
		      ...position,
		    });
		  }}
		>
	  {/*<div id="callBox" className="content" style={{visibility: this.props.isCalling, width: this.state.width + 'px', height: this.state.height + 'px'}}>*/}
	    <div id="callBoxTitle" className="headerTitle">
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div id="callBoxTitleHandle" className="callTitle">CALL</div>
	      <div id="callBoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow} >
	      <a id="callBoxTitleCloseInner" className="control-box-inner"></a>
	      </div>
	    </div>
	    <div id="talk" style={{color:"#666"}}>
	    	<pre>{this.state.written}</pre>
	    </div>
	    <div>
	    	{/*<p className="blink">~@</p>*/}
	    	<input
	    		type="text"
	    		value={this.state.term}
	    		onChange={e=>this.setState({term: e.target.value})}
          autoComplete="off"
          onKeyPress={this.onKeyPressHandler}
          autoFocus="autofocus"/>

    {/*</div>*/}
	  </div>
    {/*</div>*/}

	  </Rnd>
	  </>
  }
}