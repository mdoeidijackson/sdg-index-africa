import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import CallMadeIcon from '@material-ui/icons/CallMade'
import RemoveIcon from '@material-ui/icons/Remove'

import SDG from './SDG'

const ICONS = {
  '↑': <ArrowUpwardIcon/>,
  '➚': <CallMadeIcon/>,
  '→': <ArrowForwardIcon/>,
  '↓': <ArrowDownwardIcon/>,
  '.': <RemoveIcon/>,
  '':  <RemoveIcon/>
}

const COLOR_NAMES = {
  '↑': 'green',
  '➚': 'yellow',
  '→': 'orange',
  '↓': 'red',
  '.': 'gray',
  '':  'gray'
}

class Trend {
  constructor(arrow) {
    this.arrow = arrow
  }

  // return a color for the indicator's status
  get icon() {
    return ICONS[this.arrow]
  }

  get trendColorName() {
    return COLOR_NAMES[this.arrow]
  }

  // return a color for the indicator's trend
  get color() {
    return SDG.colorScheme()
              .find(option => option.colorName === this.trendColorName)
              .tileColor
  }
}

export default Trend
