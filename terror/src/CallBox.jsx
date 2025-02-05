import Draggable from 'react-draggable';
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

				<Draggable
				handle="#callBoxTitle"
				position={null}
				scale={1}
				onStart={this.handleStart}
				onDrag={this.handleDrag}
				onStop={this.handleStop}>

			  <div id="callBox" className="content" style={{visibility: this.props.isCalling}}>
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
          autoFocus="autofocus"

	    	/>
	    </div>

{/*	    <div className="row-container">
	      <button type="button" id="intersectBtn">SEND</button>
	      <button type="button" id="aNotbBtn">RECV</button>
	      <button type="button" id="bNotaBtn">CLEAR</button>
	    </div>*/}
	  </div>

	  </Draggable>
	  </>
  }
}