import React, { PureComponent } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import GridListTile from '@material-ui/core/GridListTile'
import styled from 'styled-components'

const FullSizeImage = styled.img`
  && {
    display: block;
    left: 0;
    position: default;
    transform: none;
    max-width: 100%;
    width: 300px;
  }
`

const TrendSection = styled.span`
  color: ${props => props.color};

  svg {
    transform: scale(2.0);
  }
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
          <Grid container>
            <Grid item xs md>
              <FullSizeImage
                src={`/images/sdg${sdg}.png`}
                alt={`SDG ${sdg} icon`}
                style={{backgroundColor: backgroundColor ? backgroundColor(sdg) : ''}}
                className={`bg sdg${sdg}`} />
              </Grid>
          {sdgTrend ? (
            <Grid item xs={6} md={5} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <TrendSection color={sdgTrend.color}>
                {sdgTrend.icon}
              </TrendSection>
            </Grid>
          ) : null}
          </Grid>
        </ButtonBase>
      </GridListTile>
    );
  }
}

export default SDGTile
