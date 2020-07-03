import React from "react";
import logo from "./logo.svg";

const PWR_STATE = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
};

const SOUND_BANKS = {
  BANK1: {
    name: "Drum Kit",
    status: false,
    source: [
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Perc_01.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Perc_02.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Perc_03.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Hi_Hat_02.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Hi_Hat_05.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Clap_02.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Snare_05.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Tom01.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank1/Kick02.mp3",
    ],
  },
  BANK2: {
    name: "Synth Wave Kit",
    status: false,
    source: [
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/C_Flute_Green.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Drums_13.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Drums_26.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Drums_65.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Dshp_Guitar_2.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Dshp_Organ_2.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Dshp_Syn_Bass_32.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Dshp_Synth_07.mp3",
      "http://www.peterhuang.net/projects/synthwave-drum-machine/static/media/bank2/Perc_10.mp3",
    ],
  },
  BANK3: {
    name: "",
    status: false,
    source: [],
  },
};

const MACHINE_STATE = {
  DEFAULT: {
    statusMsg: PWR_STATE.OFFLINE,
    pwrStatus: false,
    banks: SOUND_BANKS,
    activeBank: SOUND_BANKS.BANK1.source,
    isOn: false,
    btQ: false,
    btW: false,
    btE: false,
    btA: false,
    btS: false,
    btD: false,
    btZ: false,
    btX: false,
    btC: false,
    vol: 50,
    treb: 50,
    bass: 50,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = MACHINE_STATE.DEFAULT;

    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);

    // audio methods
    this.playAudio = this.playAudio.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.toggleTreble = this.toggleTreble.bind(this);
    this.toggleBass = this.toggleBass.bind(this);

    // updating screen
    this.updateScreen = this.updateScreen.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.playAudio);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.playAudio);
  }

  // Update the screen with current playing sounds, status of machine
  updateScreen(e) {
    let name = "bt" + e.id;
    let fileName = e.src.split("/").pop();
    fileName = fileName.substring(0, fileName.length - 4);

    this.setState((state) => {
      return {
        [name]: !state[name],
        statusMsg: fileName,
      };
    });
  }

  // Toggle on and off for drum machine
  togglePower() {
    this.setState((state) => {
      if (!state.pwrStatus) {
        return {
          statusMsg:
            state.statusMsg === PWR_STATE.OFFLINE
              ? PWR_STATE.ONLINE
              : PWR_STATE.OFFLINE,
          pwrStatus: !state.pwrStatus,

          banks: {
            BANK1: {
              name: state.banks.BANK1.name,
              status: true,
              source: state.banks.BANK1.source,
            },
            BANK2: {
              name: state.banks.BANK2.name,
              status: false,
              source: state.banks.BANK2.source,
            },
            BANK3: {
              name: state.banks.BANK3.name,
              status: false,
              source: state.banks.BANK3.source,
            },
          },

          activeBank: state.banks.BANK1.source,
        };
      }
      return {
        statusMsg:
          state.statusMsg === PWR_STATE.OFFLINE
            ? PWR_STATE.ONLINE
            : PWR_STATE.OFFLINE,
        pwrStatus: !state.pwrStatus,

        banks: SOUND_BANKS,
      };
    });
  }

  // Toggle sound bank kit
  toggleBank(e) {
    if (this.state.pwrStatus) {
      switch (e.target.id) {
        case "bank1":
          this.setState((state) => {
            return {
              banks: {
                BANK1: {
                  name: state.banks.BANK1.name,
                  status: !state.banks.BANK1.status,
                  source: state.banks.BANK1.source,
                },
                BANK2: {
                  name: state.banks.BANK2.name,
                  status: false,
                  source: state.banks.BANK2.source,
                },
                BANK3: {
                  name: state.banks.BANK3.name,
                  status: false,
                  source: state.banks.BANK3.source,
                },
              },
              statusMsg: state.banks.BANK1.name,
              activeBank: state.banks.BANK1.source,
            };
          });
          break;

        case "bank2":
          this.setState((state) => {
            return {
              banks: {
                BANK1: {
                  name: state.banks.BANK1.name,
                  status: false,
                  source: state.banks.BANK1.source,
                },
                BANK2: {
                  name: state.banks.BANK2.name,
                  status: !state.banks.BANK2.status,
                  source: state.banks.BANK2.source,
                },
                BANK3: {
                  name: state.banks.BANK3.name,
                  status: false,
                  source: state.banks.BANK3.source,
                },
              },
              statusMsg: state.banks.BANK2.name,
              activeBank: state.banks.BANK2.source,
            };
          });
          break;

        case "bank3":
          this.setState((state) => {
            return {
              banks: {
                BANK1: {
                  name: state.banks.BANK1.name,
                  status: false,
                  source: state.banks.BANK1.source,
                },
                BANK2: {
                  name: state.banks.BANK2.name,
                  status: false,
                  source: state.banks.BANK2.source,
                },
                BANK3: {
                  name: state.banks.BANK3.name,
                  status: !state.banks.BANK3.status,
                  source: state.banks.BANK3.source,
                },
              },
              statusMsg: state.banks.BANK3.name,
              activeBank: state.banks.BANK3.source,
            };
          });
          break;
      }
    }
  }

  // Toggle audio files, plays initially, pause and replay from start on subsequent button events
  toggleAudio(audio) {
    try {
      //this.toggleVolume(audio, this.state.vol);

      audio.currentTime = 0;
      audio.volume = this.state.vol / 100;
      let promise = audio.play();

      if (promise !== undefined) {
        console.log(promise);
      }
    } catch (err) {
      console.log(err);
    }
  }

  toggleTreble(dom_id, treb) {}

  toggleBass(dom_id, bass) {}

  toggleVolume(dom_id, vol) {
    console.log("audio node", dom_id, vol);
    let audioContext = new AudioContext();
    let source = audioContext.createMediaElementSource(dom_id);

    // create gain node
    let gainNode = audioContext.createGain();

    // connect audio dom to gain node
    source.connect(gainNode);

    // set volume
    gainNode.gain.value = vol / 100;

    // connect
    gainNode.connect(audioContext);

    source.play();
  }

  playAudio(event) {
    try {
      if (this.state.pwrStatus) {
        switch (event.type) {
          case "click":
            let e = document.getElementById(event.target.id).childNodes[0];

            this.toggleAudio(e);
            this.updateScreen(e);
            break;

          case "keydown":
            let keyCode = String.fromCharCode(event.keyCode);
            let key;
            try {
              key = document.querySelectorAll("#" + keyCode)[0];
            } catch (err) {
              console.log(err);
            }

            switch (keyCode) {
              case "Q":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "W":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "E":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "A":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "S":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "D":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "Z":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "X":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;

              case "C":
                this.toggleAudio(key);
                this.updateScreen(key);
                break;
            }
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div id="main-container" class="container-fluid h-100 w-100">
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
                      <div
                        id="power-status-on"
                        className={
                          this.state.pwrStatus
                            ? "power-status-on-active"
                            : "power-status-on-inactive"
                        }
                      ></div>
                      <div
                        id="power-status-off"
                        className={
                          !this.state.pwrStatus
                            ? "power-status-off-active d-none"
                            : "power-status-off-inactive d-none"
                        }
                      ></div>
                      <button id="power-btn" onClick={this.togglePower}>
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
                            id="btQ"
                            className={
                              this.state.btQ
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="Q"
                              class="clip"
                              src={this.state.activeBank[0]}
                              crossOrigin="anonymous"
                            ></audio>
                            Q
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btW"
                            className={
                              this.state.btW
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="W"
                              class="clip"
                              src={this.state.activeBank[1]}
                              crossOrigin="anonymous"
                            ></audio>
                            W
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btE"
                            className={
                              this.state.btE
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="E"
                              class="clip"
                              src={this.state.activeBank[2]}
                              crossOrigin="anonymous"
                            ></audio>
                            E
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btA"
                            className={
                              this.state.btA
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="A"
                              class="clip"
                              src={this.state.activeBank[3]}
                              crossOrigin="anonymous"
                            ></audio>
                            A
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btS"
                            className={
                              this.state.btS
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="S"
                              class="clip"
                              src={this.state.activeBank[4]}
                              crossOrigin="anonymous"
                            ></audio>
                            S
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btD"
                            className={
                              this.state.btD
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="D"
                              class="clip"
                              src={this.state.activeBank[5]}
                              crossOrigin="anonymous"
                            ></audio>
                            D
                          </button>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btZ"
                            className={
                              this.state.btZ
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="Z"
                              class="clip"
                              src={this.state.activeBank[6]}
                              crossOrigin="anonymous"
                            ></audio>
                            Z
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            preload="auto"
                            id="btX"
                            className={
                              this.state.btX
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="X"
                              class="clip"
                              src={this.state.activeBank[7]}
                              crossOrigin="anonymous"
                            ></audio>
                            X
                          </button>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                          <button
                            id="btC"
                            className={
                              this.state.btC
                                ? "drum-pad drum-pad-active"
                                : "drum-pad drum-pad-inactive"
                            }
                            onClick={this.playAudio}
                          >
                            <audio
                              id="C"
                              class="clip"
                              src={this.state.activeBank[8]}
                              crossOrigin="anonymous"
                            ></audio>
                            C
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Banks */}
                  <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    <div id="controls-mod-view" class="container mt-2">
                      <div class="row h-100 align-items-center">
                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">{this.state.vol}</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
                            />
                          </div>
                          <div class="text-center">VOL</div>
                        </div>

                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">{this.state.treb}</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
                            />
                          </div>
                          <div class="text-center">TRB</div>
                        </div>

                        <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 controls-mod d-flex flex-column align-items-center">
                          <div class="text-center">{this.state.bass}</div>
                          <div class="text-center">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              orient="vertical"
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
                                  <button
                                    id="bank1"
                                    className={
                                      this.state.banks.BANK1.status
                                        ? "bank1-active"
                                        : "bank1-inactive"
                                    }
                                    onClick={this.toggleBank}
                                  ></button>
                                  <button
                                    id="bank2"
                                    className={
                                      this.state.banks.BANK2.status
                                        ? "bank2-active"
                                        : "bank2-inactive"
                                    }
                                    onClick={this.toggleBank}
                                  ></button>
                                  <button
                                    id="bank3"
                                    className={
                                      this.state.banks.BANK3.status
                                        ? "bank3-active d-none"
                                        : "bank3-inactive d-none"
                                    }
                                    onClick={this.toggleBank}
                                  ></button>
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
                Designed and coded by{" "}
                <a class="credits" href="https://github.com/peter-huang">
                  Peter Huang
                </a>
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
