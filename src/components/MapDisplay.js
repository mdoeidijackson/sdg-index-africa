import React, { PureComponent } from 'react'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import styled from 'styled-components'

const MapSvg = styled(SvgLoader)`
  width: auto;
  height: auto;
  max-height: 70vh;
  max-width: 100%;

  padding-bottom: 20px;

  // center align
  display: block;
  margin: auto;

  .scored {
    transition: all .3s;
    cursor: pointer;

    ${props => {
      let templateLiteral = ``
      props.scheme.forEach(option => {
        console.log(option['colorName'])
        console.log(option['mapColor'])
        templateLiteral += `
          &[data-color="${option['colorName']}"] {
            fill: ${option['mapColor']};

            &:hover {
              fill: ${option['mapHoverColor']};
            }
          }
        `
      })
      return templateLiteral
    }}
  }
`

class MapDisplay extends PureComponent {
  getCountryScore(country, focus) {
    if(focus === null)
      return country.score ? country.score.toString() : "Not scored"
    else {
      const sdg = country.getSDG(focus)
      return sdg && sdg.score.toString()
    }
  }

  getCountryColorName(country, focus) {
    if(focus === null) {
      const score = country.score

      // find the correct HEX value for the score from color scheme
      const { colorSchemeOverallScore } = this.props
      const option = colorSchemeOverallScore.find(option => score === option.threshold || score > option.threshold)

      return option.colorName
    }
    else {
      const sdg = country.getSDG(focus)
      return sdg.mapStatusColorName() || 'black'
    }
  }

  getScoreLabel(country, focus) {
    if(focus === null)
      return 'Overall Score'
    else {
      const sdg = country.getSDG(focus)
      return sdg && sdg.getLabel()
    }
  }

  render() {
    const { focus, countries, showTooltip, hideTooltip, openCityDashboard } = this.props

    const proxies = countries && countries.map(country => {
      return <SvgProxy  key={country.name.toLowerCase()}
                        selector={`#${country.slug()}`}
                        data-score={this.getCountryScore(country, focus)}
                        data-label={this.getScoreLabel(country, focus)}
                        data-country={country.name}
                        data-url={country.url()}
                        data-color={this.getCountryColorName(country, focus)}
                        onMouseMove={showTooltip}
                        onMouseOut={hideTooltip}
                        onClick={openCityDashboard}
                         />
    })

    return(
      <MapSvg path="/images/africa.svg" scheme={this.props.colorSchemeOverallScore}>
        {proxies}
      </MapSvg>
    );
  }
}

export default MapDisplay
