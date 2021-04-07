import React from 'react'
import PropTypes from 'prop-types'
import { CataloguePageTemplate } from '../../templates/catalogue-post'

const CataloguePagePreview = ({ entry }) => {
  const entrySlider = entry.getIn(['data', 'slider'])
  const slider = entrySlider ? entrySlider.toJS() : []
  return (
    <CataloguePageTemplate
      slider={slider}
    />
  )
}

CataloguePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default CataloguePagePreview
