import React, { PureComponent } from 'react'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import SDGTileCollection from './SDGTileCollection'
import Divider from './Divider'
import SDG from '../models/SDG'
import Trend from '../models/Trend'

const Color = styled.span`
  background-color: ${props => props.hex};
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 100%;
  border: 0;
  margin-right: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  vertical-align: middle;
`

const TrendIcon = styled.span`
  color: ${props => props.color};
  display: inline-block;
  vertical-align: middle;

  &&, svg {
    height: 1rem;
  }
`

const Description = styled(Typography)`
  && {
    font-size: .8rem;
    color: rgb(108, 117, 125);
  }
`

class CurrentAssessmentSection extends PureComponent {
  render() {
    const { country, setMapFocus, resetMapFocus } = this.props

    const ratings = SDG.colorScheme().map(option => {
      return (
        <div key={option.colorName}>
          <Color hex={option.tileColor} />
          <Description variant='body1' component='span'>
            {option.description}
          </Description>
        </div>
      )
    })

    const trends = Trend.options.map(option => {
      return (
        <div key={option.name}>
          <TrendIcon color={option.color}>
            {option.icon}
          </TrendIcon>
          <Description variant='body1' component='span'>
            {option.description}
          </Description>
        </div>
      )
    })

    return(
      <Box marginBottom={3}>
        <Typography variant="h5" gutterBottom>
          Current Assessment – SDG Dashboard
        </Typography>
        <Divider />
        <Box marginBottom={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <SDGTileCollection
                columnsMD={6}
                columnsSM={4}
                columnsXS={2}
                backgroundColor={(sdg) => {
                  return country && country.getSDG(sdg).tileStatusColor()
                }}
                trend={(sdg) => {
                  return country && country.getSDG(sdg).trend
                }}
                exclude={[18]}
                {...{setMapFocus, resetMapFocus}} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Card style={{display: 'inline-block', marginRight: '8px'}}>
                <CardContent>
                  <Typography variant='subtitle1'>
                    Rating
                  </Typography>
                  {ratings}
                </CardContent>
              </Card>
              <Card style={{display: 'inline-block'}}>
                <CardContent>
                  <Typography variant='subtitle1'>
                    Trend
                  </Typography>
                  {trends}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default CurrentAssessmentSection
