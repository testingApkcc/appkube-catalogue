import React from 'react'
import PropTypes from 'prop-types'
import { DashboardPreviewPageTemplate } from '../../templates/dashboard-preview'

const DashboardPreviewPage = ({ entry }) => {
  const entrySlider = entry.getIn(['data', 'slider'])
  const slider = entrySlider ? entrySlider.toJS() : []
  return (
    <DashboardPreviewPageTemplate
      slider={slider}
    />
  )
}

DashboardPreviewPage.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default DashboardPreviewPage
