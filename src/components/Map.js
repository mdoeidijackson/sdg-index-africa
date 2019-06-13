import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import SDG from '../models/SDG'
import MapLegend from './MapLegend'
import MapDisplay from './MapDisplay'

const colorSchemeGoals = SDG.colorScheme()

const colorSchemeOverallScore = [{
    colorName: 'darkest-blue',
    mapColor: '#36869a',
    mapHoverColor: '#255d6b',
    description: '> 60',
    threshold: 60
  },{
    colorName: 'dark-blue',
    mapColor: '#35b4c9',
    mapHoverColor: '#2f9db0',
    description: '50 - 60',
    threshold: 50
  },{
    colorName: 'blue',
    mapColor: '#9ddde7',
    mapHoverColor: '#6dcddd',
    description: '40 - 50',
    threshold: 40
  },{
    colorName: 'light-blue',
    mapColor: '#bfebf5',
    mapHoverColor: '#97cedb',
    description: '30 - 40',
    threshold: 30
  },{
    colorName: 'lightest-blue',
    mapColor: '#ddf5fb',
    mapHoverColor: '#b3e1ed',
    description: '< 30',
    threshold: 0
  },{
    colorName: 'gray',
    mapColor: '#d8d8d8',
    mapHoverColor: '#979797',
    description: 'Not scored',
    threshold: null
  }
]

const Tooltip = styled(Popper)`
  font-size: .8rem;
  border-radius: 5px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  pointer-events: none;
  z-index: 1000;

  .arrow:after {
    box-sizing: border-box;
    display: inline;
    font-size: 10px;
    width: 100%;
    line-height: 1;
    content: "▼";
    color: rgba(0, 0, 0, 0.8);
    position: absolute;
    text-align: center;
    left: 0;
    bottom: -7px;
  }
`

// Controls the map display
class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltipShow: false,
      tooltipAnchor: null,
      tooltipScore: null,
      tooltipLabel: null
    };
  }

  openCityDashboard = event => {
    const url = event.currentTarget.getAttribute('data-url')

    this.props.history.push(url)
  }

  showTooltip = event => {
    const { currentTarget, clientY, clientX } = event;

    this.setState(state => ({
      tooltipShow: true,
      tooltipAnchor: {
        clientWidth: 0,
        clientHeight: 0,
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          top: clientY,
          bottom: clientY,
          left: clientX,
          right: clientX
        }),
      },
      tooltipScore: currentTarget.getAttribute('data-score'),
      tooltipCountry: currentTarget.getAttribute('data-country'),
      tooltipLabel: currentTarget.getAttribute('data-label')
    }));
  };

  hideTooltip = event => {
    this.setState(state => ({
      tooltipShow: false
    }));
  };

  render() {
    const { focus, countries } = this.props

    const { tooltipShow, tooltipAnchor, tooltipCountry, tooltipLabel, tooltipScore } = this.state

    return(
      <Container style={{position: "sticky", top: 0}}>
        { /* TODO: Display legend on mobile devices via tooltip button */ }
        <Hidden smDown>
          <MapLegend
            title={focus ? SDG.getLabel(focus) : 'SDG Index Score'}
            colorScheme={focus ? colorSchemeGoals : colorSchemeOverallScore} />
        </Hidden>

        <MapDisplay
          openCityDashboard={this.openCityDashboard}
          showTooltip={this.showTooltip}
          hideTooltip={this.hideTooltip}
          {...{countries, focus, colorSchemeGoals, colorSchemeOverallScore}}
           />
        <Tooltip
          open={tooltipShow}
          anchorEl={tooltipAnchor}
          placement="top"
          transition
          modifiers={{
            flip: {
              // our arrow is always pointing down, so do not flip tooltip
              enabled: false
            },
            offset: {
              enabled: true,
              offset: '0, 10px'
            }
          }}>
          <Typography variant='body2' style={{fontWeight: 500}}>
            {tooltipCountry}
          </Typography>
          <Typography variant='body2'>
            <span>
              {tooltipLabel}:&nbsp;
            </span>
            <span style={{fontWeight: 500}}>
              {tooltipScore}
            </span>
          </Typography>
          <Hidden smDown>
            <div className='arrow' />
          </Hidden>
        </Tooltip>
      </Container>
    );
  }
}

export default withRouter(Map)
