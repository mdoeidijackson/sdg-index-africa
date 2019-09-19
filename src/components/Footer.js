import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const FooterContainer = styled(Grid)`
  p, a {
    color: #6c757d;
  }

  a {
    font-weight: 500;

    &.logo {
      margin: auto;
      align-self: center;
    }
  }

  .MuiGrid-item, .MuiBox-root {
    width: 100%;
    display: flex;
  }
`

function Footer(props) {
  return (
    <FooterContainer container>
      <Grid item md={6} sm={12}>
        <Box padding={2}>
          <Typography variant='body2'>

            The data displayed in this dashboard is sourced from the
            {' '}
            <a href='https://s3.amazonaws.com/sustainabledevelopment.report/2019/2019_africa_index_and_dashboards.pdf' target='_blank' rel='noopener noreferrer'>
              2019 Africa SDG Index and Dashboards Report
            </a>
            . The report was prepared by the
            {' '}
            <a href="http://unsdsn.org/" target='_blank' rel='noopener noreferrer'>
              Sustainable Development Solutions Network
            </a>
            {' '}
            and the
            {' '}
            <a href="https://sdgcafrica.org/" target='_blank' rel='noopener noreferrer'>
              Sustainable Development Goals Center for Africa
            </a>
            .
          </Typography>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Box padding={2}>
          <a className='logo' href="http://unsdsn.org/" target='_blank' rel='noopener noreferrer'>
            <img src='/images/SDSN-logo.png' alt='SDSN logo' style={{maxHeight: 60}}/>
          </a>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <Box padding={2}>
          <a className='logo' href="https://sdgcafrica.org/" target='_blank' rel='noopener noreferrer'>
            <img src='/images/sdgca-logo.png' alt='SDGCA logo' style={{maxHeight: 60}}/>
          </a>
        </Box>
      </Grid>
    </FooterContainer>
  )
}

export default Footer
