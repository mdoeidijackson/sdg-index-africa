import React, { Fragment, PureComponent } from 'react'
import GridList from '@material-ui/core/GridList'
import withWidth from '@material-ui/core/withWidth'

import SDGTile from '../components/SDGTile'


class SDGTileCollection extends PureComponent {
  render() {
    const { resetMapFocus, setMapFocus,
            columnsMD, columnsSM, columnsXS,
            width, exclude = [], trend, backgroundColor } = this.props

    let columns = null

    switch(width) {
      case 'xs':
        columns = columnsXS
        break
      case 'sm':
        columns = columnsSM
        break
      case 'md':
      case 'lg':
      case 'xl':
      default:
        columns = columnsMD
        break;
    }

    const goals1to17  = [...Array(17).keys()].map(goal => {
      return <SDGTile clickHandler={setMapFocus}
                      key={goal+1}
                      sdg={goal+1}
                      {...{backgroundColor, trend}} />
      })
    const sdgTile     = <SDGTile clickHandler={resetMapFocus} key={18} sdg='18' />

    let tiles = goals1to17.concat([sdgTile])

    // remove unwanted tiles, such as goals 14 and 17
    // must be reverse-sorted so that we remove the biggest index first
    exclude.sort().reverse().forEach(tileToExclude => {
      tiles.splice(tileToExclude - 1, 1)
    })

    return(
      <Fragment>
        <GridList cols={columns} spacing={8} cellHeight='auto'>
          {tiles}
        </GridList>
      </Fragment>
    );
  }
}

export default withWidth()(SDGTileCollection)
