import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from '../components/Slider'
import './slider.css'
import './catalogue.css'
import './modal.css'

export const CatalogueDataTemplate = ({
  slider,
}) => {
  return (
    <div className="slider-container">
      <Slider slider={slider} />
    </div>
  )
}

CatalogueDataTemplate.propTypes = {
  slider: PropTypes.array,
}

const CatalogueData = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <CatalogueDataTemplate
      slider={frontmatter.slider}
    />
  )
}

CatalogueData.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default CatalogueData

export const catalogueDataQuery = graphql`
  query CatalogueData($id: String!) {
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
