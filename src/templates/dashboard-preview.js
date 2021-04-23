import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from '../components/Slider'
import './slider.css'
import './catalogue.css'
import './modal.css'

export const DashboardPreviewPageTemplate = ({
  slider,
}) => {
  return (
    <div className="slider-container">
      <Slider slider={slider} />
    </div>
  )
}

DashboardPreviewPageTemplate.propTypes = {
  slider: PropTypes.array,
}

const DashboardPreviewPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <DashboardPreviewPageTemplate
      slider={frontmatter.slider}
    />
  )
}

DashboardPreviewPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default DashboardPreviewPage

export const dashboardPreviewPageQuery = graphql`
  query DashboardPreviewPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        slider {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
            extension
            publicURL
          }
          name
          text
        }
      }
    }
  }
`
