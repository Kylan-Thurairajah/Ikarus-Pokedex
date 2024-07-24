import React from "react"
import "./PokemonDetails.css"

function PokemonStatsTable() {
  return (
    <table className="vitals-table">
      <tbody>
        <tr>
          <th>HP</th>
          <td className="cell-num">90</td>
          <td className="cell-barchart">
            <div
              style={{ width: "50.00%" }}
              className="barchart-bar barchart-rank-4"
            ></div>
          </td>
          <td className="cell-num">290</td>
          <td className="cell-num">384</td>
        </tr>
        <tr>
          <th>Attack</th>
          <td className="cell-num">92</td>
          <td className="cell-barchart">
            <div
              style={{ width: "51.11%" }}
              className="barchart-bar barchart-rank-4"
            ></div>
          </td>
          <td className="cell-num">170</td>
          <td className="cell-num">311</td>
        </tr>
        <tr>
          <th>Defense</th>
          <td className="cell-num">75</td>
          <td className="cell-barchart">
            <div
              style={{ width: "41.67%" }}
              className="barchart-bar barchart-rank-3"
            ></div>
          </td>
          <td className="cell-num">139</td>
          <td className="cell-num">273</td>
        </tr>
        <tr>
          <th>Sp. Atk</th>
          <td className="cell-num">92</td>
          <td className="cell-barchart">
            <div
              style={{ width: "51.11%" }}
              className="barchart-bar barchart-rank-4"
            ></div>
          </td>
          <td className="cell-num">170</td>
          <td className="cell-num">311</td>
        </tr>
        <tr>
          <th>Sp. Def</th>
          <td className="cell-num">85</td>
          <td className="cell-barchart">
            <div
              style={{ width: "47.22%" }}
              className="barchart-bar barchart-rank-3"
            ></div>
          </td>
          <td className="cell-num">157</td>
          <td className="cell-num">295</td>
        </tr>
        <tr>
          <th>Speed</th>
          <td className="cell-num">60</td>
          <td className="cell-barchart">
            <div
              style={{ width: "33.33%" }}
              className="barchart-bar barchart-rank-3"
            ></div>
          </td>
          <td className="cell-num">112</td>
          <td className="cell-num">240</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td className="cell-num cell-total">494</td>
          <th className="cell-barchart"></th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default PokemonStatsTable
