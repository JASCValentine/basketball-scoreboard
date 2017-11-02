function Timer(element, formatter, audio, seconds = 0) {
  this.element = element;
  this.formatter = formatter;
  this.audio = audio;
  
  this.seconds = seconds;
  this._seconds = null;
  this.countUp = !seconds;
  this.intervalId = null;
  
  this.callback = function() {
    if (!this._seconds && !this.countUp) {
      audio.play();
      this.stop();
      return;
    }
    
    this._seconds += this.countUp ? 1 : -1;
    this.element.innerHTML = this.formatter(this._seconds);
  }
  
  this.set = function(seconds) {
    this.seconds = seconds;
    this.countUp = !seconds;
    this.reset();
  }
  
  this.start = function() {
    if (this.intervalId) {
      return;
    }
    
    this.intervalId = window.setInterval(this.callback.bind(this), 1000);
  };
  
  this.stop = function() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  };
  
  this.reset = function() {
    if (this.intervalId) {
      return;
    }
    
    this._seconds = this.seconds;
    this.element.innerHTML = this.formatter(this.seconds);
  };
  
  this.reset();
}