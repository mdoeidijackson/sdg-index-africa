import React, { PureComponent } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import GridListTile from '@material-ui/core/GridListTile'
import styled from 'styled-components'

const FullSizeImage = styled.img`
  && {
    left: 0;
    position: default;
    transform: none;
    max-width: 100%;
    width: 300px;
  }
`

const TrendSection = styled.div`
  color: ${props => props.color};
  margin: 20px;
  transform: scale(2);
`

class SDGTile extends PureComponent {
  render() {
    const { sdg, clickHandler, backgroundColor, trend, ...otherProps } = this.props

    const sdgTrend = (trend ? trend(sdg) : null)

    return(
      <GridListTile cols={1} {...otherProps}>
        <ButtonBase
          onClick={clickHandler}
          data-focus={sdg}
          style={{border: '1px solid #eee'}}>
          <FullSizeImage
            src={`/images/sdg${sdg}.png`}
            alt={`SDG ${sdg} icon`}
            style={{backgroundColor: backgroundColor ? backgroundColor(sdg) : ''}}
            className={`bg sdg${sdg}`} />
          {sdgTrend ? (
            <TrendSection color={sdgTrend.color}>
              {sdgTrend.icon}
            </TrendSection>
          ) : null}
        </ButtonBase>
      </GridListTile>
    );
  }
}

export default SDGTile
