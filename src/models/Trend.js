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

  static get options() {
    return TRENDS
  }

  static colorFromColorName(colorName) {
    return SDG.colorScheme()
              .find(option => option.colorName === colorName)
              .tileColor
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
    return Trend.colorFromColorName(this.trendColorName)
  }
}

const TRENDS = [{
    name: '↑',
    icon: ICONS['↑'],
    description: 'On track or maintaining SDG achievement',
    colorName: COLOR_NAMES['↑'],
    color: Trend.colorFromColorName(COLOR_NAMES['↑'])
  },{
    name: '➚',
    icon: ICONS['➚'],
    description: 'Moderately improving',
    colorName: COLOR_NAMES['➚'],
    color: Trend.colorFromColorName(COLOR_NAMES['➚'])
  },{
    name: '→',
    icon: ICONS['→'],
    description: 'Stagnating',
    colorName: COLOR_NAMES['→'],
    color: Trend.colorFromColorName(COLOR_NAMES['→'])
  },{
    name: '↓',
    icon: ICONS['↓'],
    description: 'Decreasing',
    colorName: COLOR_NAMES['↓'],
    color: Trend.colorFromColorName(COLOR_NAMES['↓'])
  },{
    name: '.',
    icon: ICONS['.'],
    description: 'Information unavailable',
    colorName: COLOR_NAMES['.'],
    color: Trend.colorFromColorName(COLOR_NAMES['.'])
  }]

export default Trend
