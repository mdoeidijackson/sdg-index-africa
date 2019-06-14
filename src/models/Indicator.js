import SDG from './SDG'

class Indicator {
  constructor({label, score, status, trend}) {
    this.label = label
    this.score = score
    this.status = status || 'gray'
    this.trend = trend
  }

  // rounds the score to two decimal places
  roundedScore() {
    if(this.score === null || this.score.length === 0)
      return 'N/A'

    return (+this.score.toFixed(2)).toString()
  }

  // return a color for the indicator's status
  statusColor() {
    return SDG.colorScheme().find(option => option.colorName === this.status).tileColor
  }

  // return a color for the indicator's trend
  trendColor() {
    const trendColorNames = {
      '↑': 'green',
      '➚': 'yellow',
      '→': 'orange',
      '↓': 'red',
      '.': 'gray',
      '':  'gray'
    };

    const trendColorName = trendColorNames[this.trend]

    return SDG.colorScheme().find(option => option.colorName === trendColorName).tileColor
  }
}

export default Indicator
