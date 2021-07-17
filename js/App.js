import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      billError: false,
      peopleError: false,
      activeReset: false,
      bill: "",
      tip: "",
      custom: "",
      people: "",
      tipPerPerson: "0.00",
      totalPerPerson: "0.00",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.countTip = this.countTip.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target

    if(name === "bill") {
      const re = /^\d{0,8}(\.\d{0,2})?$/g
      if(value == "0") {
        this.setState ({ billError: true })
      } else {
        if (re.test(value)) {
          this.setState ({
            billError: false,
            bill: value,
            activeReset: true
          }, () => {
            this.countTip();
          })
        }
      }
    }
    if(name == "people") {
      const re = /^\d{0,6}?$/g
      if(value == "0") {
        this.setState ({ peopleError: true })
      } else {
        if(re.test(value)) {
          this.setState ({
            peopleError: false,
            people: value,
            activeReset: true
          }, () => {
            this.countTip();
          })
        }
      }
    }
    if(name === "tip_custom") {
      const re = /^\d{0,3}(\.\d{0,2})?$/g
      if(re.test(value)) {
         this.setState ({
          tip: value,
          custom: value,
          activeReset: true
        }, () => {
          this.countTip();
        })
      }
    }
    if(name === "tip") {
      this.setState ({
        tip: value,
        custom: "",
        activeReset: true
      }, () => {
        this.countTip();
      })
    }
  }

  countTip() {
    if(this.state.people > 0) {
      let tip = ((this.state.bill * (this.state.tip/100)) / this.state.people).toFixed(2)
      let total = (parseFloat(this.state.bill / this.state.people) + parseFloat(tip)).toFixed(2)
      this.setState ({
        tipPerPerson: tip,
        totalPerPerson: total
      })
    }
  }

  handleClick() {
    this.setState ({
      billError: false,
      peopleError: false,
      activeReset: false,
      bill: "",
      tip: "",
      custom: "",
      people: "",
      tipPerPerson: "0.00",
      totalPerPerson: "0.00"
    })
  }

  render() {
    return (
      <div className="container container--pall">
        <img className="tip_cal_logo" src="./images/logo.svg" alt="TIP Calculator Logo" />

        <div className="calculator">

          <div className="calculator__left">
            <div className="calculator__flex-label">
              <label htmlFor="bill" className="calculator__label grey">Bill</label>
              <span className={`calculator__label ${this.state.billError ? "error_msg" : "none"}`}>Can't be zero</span>
            </div>
            <div className="calculator__input">
              <img className="calculator__icon" src="./images/icon-dollar.svg" alt="Icon Dollar"/>
              <input 
                type="text" 
                className={`calculator__text ${this.state.billError ? "error" : ""}`} 
                name="bill" 
                id="bill" 
                placeholder="0" 
                value={this.state.bill}
                onChange={this.handleChange}
              />
            </div> 

            <div className="calculator__select-tip">
              <label className="calculator__label grey">Select Tip %</label>
              <div className="calculator__tip">
                <div className="calculator__radio">
                  <input type="radio" name="tip" id="tip_5" value="5" checked={this.state.tip === "5"} onChange={this.handleChange}/>
                  <label htmlFor="tip_5">5%</label>
                </div>
                <div className="calculator__radio">
                  <input type="radio" name="tip" id="tip_10" value="10" checked={this.state.tip  === "10"} onChange={this.handleChange}/>
                  <label htmlFor="tip_10">10%</label>
                </div>
                <div className="calculator__radio">
                  <input type="radio" name="tip" id="tip_15" value="15" checked={this.state.tip  === "15"} onChange={this.handleChange}/>
                  <label htmlFor="tip_15">15%</label>
                </div>
                <div className="calculator__radio">
                  <input type="radio" name="tip" id="tip_25" value="25" checked={this.state.tip  === "25"} onChange={this.handleChange}/>
                  <label htmlFor="tip_25">25%</label>
                </div>
                <div className="calculator__radio">
                  <input type="radio" name="tip" id="tip_50" value="50" checked={this.state.tip  === "50"} onChange={this.handleChange}/>
                  <label htmlFor="tip_50">50%</label>
                </div>
                <div className="calculator__radio">
                  <input 
                    type="text" 
                    className="calculator__text custom" 
                    aria-label="Custom"
                    name="tip_custom"
                    value={this.state.custom}
                    placeholder="Custom"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="calculator__flex-label">
              <label htmlFor="people" className="calculator__label grey">Number of People</label>
              <span className={`calculator__label ${this.state.peopleError ? "error_msg" : "none"}`}>Can't be zero</span>
            </div>
            
            <div className="calculator__input">
              <img className="calculator__icon" src="./images/icon-person.svg" alt="Icon Person"/>
              <input 
                type="text"
                className={`calculator__text ${this.state.peopleError ? "error" : ""}`} 
                name="people" 
                id="people"
                value={this.state.people}
                placeholder="0" 
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="calculator__right">
            <div>
              <div className="calculator__amount">
                <div className="calculator__amount--label">
                  <div className="label--one">Tip Amount</div>
                  <div className="label--two">/ person</div>
                </div>
                <span className="calculator__amount--text tip">${this.state.tipPerPerson}</span>
              </div>
              <div className="calculator__amount">
                <div className="calculator__amount--label">
                  <div className="label--one">Total</div>
                  <div className="label--two">/ person</div>
                </div>
                <span className="calculator__amount--text total">${this.state.totalPerPerson}</span>
              </div>
            </div>
            <div>
              <button className={`calculator__amount--reset ${this.state.activeReset ? "active" : ""}`} onClick={this.handleClick}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  
export default App;