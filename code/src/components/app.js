import React from "react"
import { exVatToIncVat, incVatToExtVat } from "../calculations"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      vatRate: 25,
      incVat: "",
      exVat: "",
      userInputInkVat: false
    }
  }

        handleRadioChange = (event) => {
          const vat = Number(event.target.value)
          if (this.state.userInputInkVat) {
          this.setState({
            vatRate: vat,
            exVat: incVatToExtVat(vat, this.state.incVat)
          })
          } else {
            this.setState({
              vatRate: vat,
              incVat: exVatToIncVat(vat, this.state.exVat)
            })
          }
        }

        handleIncVatChange = (event) => {
          const incVat = Number(event.target.value)
          this.setState({
            incVat,
            exVat: incVatToExtVat(this.state.vatRate, incVat).toFixed(2),
            userInputInkVat: true
          })
        }

        handleExkVatChange = (event) => {
          const exVat = Number(event.target.value)
          this.setState({
            incVat: exVatToIncVat(this.state.vatRate, exVat).toFixed(2),
            exVat,
            userInputInkVat: false
          })
        }

        render() {
          return (
            <div className="App">

              <form>

                <div>
                  <input
                    id="vat25"
                    type="radio"
                    value="25"
                    checked={this.state.vatRate === 25}
                    onChange={this.handleRadioChange} />
                  <label htmlFor="vat25">25%</label>
                </div>

                <div>
                  <input
                    id="vat12"
                    type="radio"
                    value="12"
                    checked={this.state.vatRate === 12}
                    onChange={this.handleRadioChange} />
                  <label htmlFor="vat12">12%</label>
                </div>

                <div>
                  <input
                    id="vat6"
                    type="radio"
                    value="6"
                    checked={this.state.vatRate === 6}
                    onChange={this.handleRadioChange} />
                  <label htmlFor="vat6">6%</label>
                </div>

                <p>Current state: {this.state.vatRate}</p>

                <label htmlFor="ink">Inklusive moms (kr)</label>
                <input
                  id="ink"
                  type="number"
                  name="incVatField"
                  value={this.state.incVat}
                  onChange={this.handleIncVatChange} />

                <label htmlFor="exk">Exklusive moms (kr)</label>
                <input
                  id="exk"
                  type="number"
                  name="exVatField"
                  value={this.state.exVat}
                  onChange={this.handleExVatChange} />

                <label htmlFor="moms">Momssumma (kr)</label>
                <input
                  id="moms"
                  type="number"
                  name="totalVatField"
                  value={(this.state.incVat - this.state.exVat).toFixed(2)}
                  readOnly="readOnly" />
              </form>
            </div>
          )
        }

}

export default App
