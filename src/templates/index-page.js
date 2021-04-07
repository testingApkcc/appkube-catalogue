import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  title,
}) => (
  <div
    style={{
      display: 'flex',
      height: '150px',
      lineHeight: '1',
      justifyContent: 'space-around',
      alignItems: 'left',
      flexDirection: 'column',
    }}
  >
    <h1
      className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
      style={{
        boxShadow:
          'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
        backgroundColor: 'rgb(255, 68, 0)',
        color: 'white',
        lineHeight: '1',
        padding: '0.25em',
      }}
    >
      {title}
    </h1>
  </div>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
    }
  }
`
