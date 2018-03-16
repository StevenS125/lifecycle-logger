import React, { Component } from 'react';
import logify from './logify';

class App extends Component {

static displayName = "App"

state = {
  data: "no data yet"
}

  fetchData = () => {
    console.log("going to fetch data")
    setTimeout(
      () => {
        console.log("data retrieved")
        this.setState({
          data: Math.random()
        })
      },
      1500
    )
  }

  componentDidMount() {
    this.fetchData()
    const canvasCtx = this.refs.appCanvas.getContext('2d')
    canvasCtx.fillStyle="blue"
    canvasCtx.arc(75,75,50,0,2 * Math.PI)
    canvasCtx.fill()
  }


  render() {
    let {showPollChild} = this.state

    return (
<div> Hello World!

  <h4>{this.state.data}</h4>

<canvas 
ref={"appCanvas"}
height={200}
width={200}
/>

<button onClick={()=> {
  this.setState((prevState) => {
    return {
      showPollChild: !prevState.showPollChild
       }
     })
  }}
>
{(showPollChild) ? "Hide" : "Show"} 
</button>
{(showPollChild) ? <PollChild/> : null} 
</div>

    );
  }
}

class PollChild extends Component {

static displayName = "PollChild"

state = {
  poll: Math.random()
}

componentDidMount() {
  this.polldData()
}

componentWillUnmount() {
  clearInterval(this.pollInterval)
}

  polldData = () => {
    this.pollInterval = setInterval(() => {
      console.log("Poll!")
      this.setState({ 
        poll: Math.random()
      })
    }, 1000
  )
  }

   render() {
     return (
       <h4> poll: {this.state.poll}</h4>
     )
   }
}

App = logify(App)
PollChild = logify(PollChild)

export default App;
