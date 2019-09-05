$(document).ready(function(){

    class App extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
          running: false,
          status: "Session",
          breakLength: 5,
          sessionLength: 25,
          minutes: 25,
          seconds: "00",
        }
        this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
        this.breakUp = this.breakUp.bind(this);
        this.breakDown = this.breakDown.bind(this);
        this.sessionUp = this.sessionUp.bind(this);
        this.sessionDown = this.sessionDown.bind(this);
        this.countdown = this.countdown.bind(this);
        }
        
        //This handles starting and pausing the timer based on "running"
        start(){
          if(this.state.running != true){
          this.setState({running: true});
          this.state.secondTimer = setInterval(this.countdown, 1000);
          } else {
            this.audio.pause();
            this.setState({running: false})
            clearInterval(this.state.secondTimer);
          }
        }
        
        //This handles the actual countdown of the timer
        countdown(){
       //********** if seconds reaches zero *************
          if(this.state.seconds == 0){
       //**************** if seconds reaches zero and time is up ****************
            if(this.state.minutes == 0){
              this.audio.play();
              if(this.state.status == "Session"){
                this.setState({status: "Break"});
                (this.state.breakLength < 10) ? this.setState({minutes: "0" + this.state.breakLength}) : this.setState({minutes: this.state.breakLength});
              } else {
                 this.setState({status: "Session"});
                 (this.state.sessionLength < 10) ? this.setState({minutes: "0" + this.state.sessionLength}) : this.setState({minutes: this.state.sessionLength});
                }
      //******* if seconds reaches zero but time is not up *********
            } else {
                this.setState({seconds: 59});
                (this.state.minutes < 11) ? this.setState({minutes: "0" + (this.state.minutes - 1)}) : this.setState({minutes: this.state.minutes - 1});
              }
      //********** if seconds does not reach zero *************
         } else {
            (this.state.seconds < 11) ? this.setState({seconds: "0" + (this.state.seconds - 1)}) : this.setState({seconds: this.state.seconds - 1});
            }
       }
      
        //This handles resetting the state to default
        reset(){
          this.audio.pause();
          clearInterval(this.state.secondTimer);
          this.audio.currentTime = 0;
          this.setState({
          status: "Session",
          breakLength: 5,
          sessionLength: 25,
          minutes: 25,
          seconds: "00",
          running: false,
          });
        }
        
        //This handles increasing the break time(max: 60)
        breakUp(){
          (this.state.breakLength < 60) ? this.setState({breakLength: this.state.breakLength + 1}) : this.setState({breakLength: 60});
        }
        
        //This handles decreasing the break time(min: 1)
        breakDown(){
           (this.state.breakLength > 1) ? this.setState({breakLength: this.state.breakLength - 1}) : this.setState({breakLength: 1});
        }
        
        //This handles increasing the session time and timer(only if in "Session", max: 60)
        sessionUp(){
          if(this.state.status == "Session"){
              (this.state.sessionLength < 60) ? this.setState({sessionLength: this.state.sessionLength + 1}) : this.setState({sessionLength: 60});
              if(this.state.minutes < 60) {
                this.setState({minutes: this.state.sessionLength + 1});
              }
              if(this.state.minutes < 9) {
                  this.setState({minutes: "0" + (this.state.sessionLength + 1)});
              }
          }
        }
        //This handles decreasing the session time and timer(only if in "Session", min: 1)
        sessionDown(){
          if(this.state.status == "Session"){
              (this.state.sessionLength > 1) ? this.setState({sessionLength: this.state.sessionLength - 1}) : this.setState({sessionLength: 1});
              if(this.state.sessionLength > 10) {
                  this.setState({minutes: this.state.sessionLength - 1});
              } 
              if(this.state.sessionLength < 11) {
                  this.setState({minutes: "0" + (this.state.sessionLength - 1)});
              }
              if(this.state.sessionLength == 1) {
                this.setState({minutes: "01"});
              }
          }
        }
            
        render() {
          return (
          <div id="main-container">
            <div id="clock-container">
              <div id="main-title">Pomodoro Timer</div>
              <div id="timer-label" className="big-text">{this.state.status}</div>
              <div id="time-left" className="big-text">{this.state.minutes + ":" + this.state.seconds}</div>
              <div id="reset" className="icon" onClick={this.reset}><i class="fas fa-history"></i></div>
              <div id="start_stop" className="icon" onClick={this.start}><i class="far fa-play-circle"></i></div>
              <div id="session-label" className="med-text">Session Length</div>
              <div id="session-length" className="big-text">{this.state.sessionLength}</div>
              <div id="session-increment" className="icon" onClick={this.sessionUp}><i class="fas fa-chevron-right"></i></div>
              <div id="session-decrement" className="icon" onClick={this.sessionDown}><i class="fas fa-chevron-left"></i></div> 
              <div id="break-label" className="med-text">Break Length</div>
              <div id="break-length" className="big-text">{this.state.breakLength}</div>
              <div id="break-increment" className="icon" onClick={this.breakUp}><i class="fas fa-chevron-right"></i></div>
              <div id="break-decrement" className="icon" onClick={this.breakDown}><i class="fas fa-chevron-left"></i></div>
              <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audio = audio; }} />
            </div>
          </div>           
          );
        }
      };
      
      ReactDOM.render(<App/>, document.getElementById('App'))
});