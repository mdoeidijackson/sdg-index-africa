import Country from '../models/Country'
import SDG from '../models/SDG'
import Indicator from '../models/Indicator'
import Trend from '../models/Trend'

// initialize an inidivdual SDG
const initSDG = (sdgNumber, sdgData) => {
  const indicators =
    Object
      .keys(sdgData)
      .filter(key => new RegExp("^" + sdgNumber + "\\.\\d\\d? [^_]{2}").test(key))
      .map(key => {
        const [indicatorNumber, label] = key.split(/ (.+)/).filter(x => x)

        // TODO: Refactor .findByObjectKey
        const score  = sdgData[key]
        const status = sdgData[Object.keys(sdgData).find(key => key.startsWith(`${indicatorNumber} __COLOR__`))]
        const trend  = sdgData[Object.keys(sdgData).find(key => key.startsWith(`${indicatorNumber} __ARROW__`))]

        return new Indicator({
          label: label,
          score: score,
          status: status,
          trend: new Trend(trend)
        })
      })

  return new SDG({
    number:     Number(sdgNumber),
    score:      numberOrNull(sdgData[`Goal ${sdgNumber} Score`], 1),
    status:     sdgData[`Goal ${sdgNumber} Dashboard`],
    trend:      new Trend(sdgData[`arrow_goal_${sdgNumber}`]),
    indicators: indicators
  })
}

// return the number in the string or null if string is empty
const numberOrNull = (number, decimals = 0) => {
  return (typeof number == 'number') ? Number(number).toFixed(decimals) : null
}

// initialize an individual country
const initCountry = countryData => {
  // sdg scores
  const sdgs =
    [...Array(17).keys()].map(x => ++x).map(index => initSDG(index, countryData))

  return new Country({
    name:   countryData['country'],
    region: countryData['AfDB_region'],
    // use parseInt because it converts empty strings to NaN
    rank:   numberOrNull(countryData['2019 africa Index Rank']),
    // use parseInt because it converts empty strings to NaN
    score:  numberOrNull(countryData['2019 africa Index Score (0-100)'], 2),
    sdgs:   sdgs
  })
}

const loadCountries = callback => {
  fetch('/data/countries.json')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => {
      // initialize each country
      const cities = data.map(city => initCountry(city))

      // trigger callback
      callback(cities)
    })
}

export default loadCountries
