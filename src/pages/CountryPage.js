import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Divider from '../components/Divider'
import CurrentAssessmentSection from '../components/CurrentAssessmentSection'
import IndicatorPerformanceSection from '../components/IndicatorPerformanceSection'

class CountryPage extends Component {
  render() {
    const countrySlug = this.props.match.params.country
    const { focus, countries, setMapFocus, resetMapFocus } = this.props

    const country = countries.find(country => country.slug() === countrySlug.toString())

    const { name, region } = country || {}

    return (
      <Paper style={{padding: 24, paddingTop: 16, position: 'relative'}}>
        <Box marginBottom={2} paddingTop={1} style={{position: 'sticky', top: 0, background: 'white', zIndex: 100}}>
          <Link to='/' style={{float: 'right'}}>
            <Typography variant='body2'>
              Back to countries list
            </Typography>
          </Link>
          <Typography variant="h3">
            {name}
          </Typography>
          <Typography variant="h5" gutterBottom style={{color: '#6c757d'}}>
            {region}
          </Typography>
          <Divider />
        </Box>

        <CurrentAssessmentSection
          {...{country, setMapFocus, resetMapFocus}}
          />

        <IndicatorPerformanceSection
          display={focus ? true : false}
          {...{country, focus}}
          />

      </Paper>
    );
  }
}

export default CountryPage
