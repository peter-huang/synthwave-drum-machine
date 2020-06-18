import React from "react";
import logo from "./logo.svg";

const audioFiles = [
  "http://www.peterhuang.net/projects/synthwave-drum-machine/bank1/Synths.mp3",
  "http://www.peterhuang.net/projects/synthwave-drum-machine/bank1/Ste_Ingham_Synthwave_Tom_Fill.mp3",
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusMsg: "OFFLINE",
      isOn: false,
      Q: false,
      W: false,
      E: false,
      A: false,
      S: false,
      D: false,
      Z: false,
      X: false,
      C: false,

      audioFiles: [],
    };

    this.playAudio = this.playAudio.bind(this);
    this.audio = new Audio(audioFiles[0]);
  }

  componentDidMount() {
    let audioArr = [];
    audioFiles.forEach((e) => audioArr.push(new Audio(e)));
    this.setState((state) => ({ audioFiles: [...audioArr] }));
  }

  playAudio(event) {
    if (event != null) {
      let eventKeyClick = "";
      let eventKeyCode = "";

      if (event.type === "click") {
        eventKeyClick = event.target.id.toUpperCase();
      }
      if (event.type === "keyup") {
        eventKeyCode = String.fromCharCode(event.keyCode);
        let stateKeys = Object.keys(this.state);

        for (let i = 0; i < stateKeys.length; i++) {
          if (stateKeys[i] === eventKeyCode) {
            console.log(eventKeyCode);
            this.setState((state) => ({
              [eventKeyCode]: [!state.eventKeyCode],
            }));
          }
        }
      }
    }

    /*
    if (!this.state.audioState) {
      this.audio.play();
      this.setState({ audioState: true });
    } else {
      this.audio.pause();
      this.setState({ audioState: false });
    }*/
  }

  render() {
    console.log(this.state.Q);
    return (
      <div
        id="main-container"
        class="container-fluid h-100 w-100"
        onKeyUp={this.playAudio}
        tabIndex="0"
      >
        <div class="row h-100">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center">
            {/* Container */}
            <div>
              <div id="drum-machine">
                <div class="row">
                  {/* Logo and Power Button */}
                  <div
                    id="buttons-view"
                    class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 order-md-2  mb-1"
                  >
                    <div class="d-flex align-items-center justify-content-end">
                      <div>DMT-1986</div>
                      <div>
                        <i
                          class="fa fa-audio-description fa-lg ml-1"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-end mt-2">
                      <div id="power-status-on" class=""></div>
                      <div id="power-status-off" class=""></div>
                      <button id="power-btn">
                        <i class="fa fa-power-off fa-lg" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  {/* Screen */}
                  <div
                    id="display-view"
                    class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 order-md-1 mb-1"
                  >
                    <div
                      id="display"
                      class="d-flex align-items-center justify-content-center"
                    >
                      {this.state.statusMsg}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div
                    id="controls-view"
                    class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7"
                  >
                    <div id="controls" class="container mt-2">
                      <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="Q"
                            className={
                              this.state.Q ? "drum-pad-active" : "drum-pad"
                            }
                            onClick={this.playAudio}
                          >
                            Q
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="W" class="drum-pad">
                            W
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="E" class="drum-pad">
                            E
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="A" class="drum-pad">
                            A
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="S" class="drum-pad">
                            S
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="D" class="drum-pad">
                            D
                          </button>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="Z" class="drum-pad">
                            Z
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="X" class="drum-pad">
                            X
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button id="C" class="drum-pad">
                            C
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <div id="controls-mod-view" class="container mt-2">
                      <div class="row h-100 align-items-center">
                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">50</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
                              value="50"
                            />
                          </div>
                          <div class="text-center">VOL</div>
                        </div>

                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">50</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
                              value="50"
                            />
                          </div>
                          <div class="text-center">TRB</div>
                        </div>

                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">50</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
                              value="50"
                            />
                          </div>
                          <div class="text-center">BAS</div>
                        </div>
                      </div>

                      {/* Bank Controls */}
                      <div class="row">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <div id="bank">
                            <div class="row">
                              <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                                <div
                                  id="bank-controls"
                                  class="d-flex justify-content-center"
                                >
                                  <button id="bank1"></button>
                                  <button id="bank2"></button>
                                  <button id="bank3"></button>
                                </div>
                                <div>BANK</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end of row of bottom controls */}
                </div>

                {/* end of drum machine */}
              </div>

              <div class="text-center text-white mt-2">
                Designed and developed by Peter Huang
              </div>

              {/* end of container */}
            </div>

            {/* end of column */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
