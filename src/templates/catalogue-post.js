import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from '../components/Slider'
import './slider.css'

export const CataloguePageTemplate = ({
  slider,
}) => {
  return (
    <div className="slider-container">
      <Slider slider={slider} />
    </div>
  )
}

CataloguePageTemplate.propTypes = {
  slider: PropTypes.array,
}

const CataloguePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <CataloguePageTemplate
      slider={frontmatter.slider}
    />
  )
}

CataloguePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default CataloguePage

export const cataloguePageQuery = graphql`
  query CataloguePage($id: String!) {
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
