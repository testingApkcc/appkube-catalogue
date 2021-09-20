import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const CategoryPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Catgeory | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Cloud Type</h1>
            <ul className="taglist">
              {group.map((cloudtype) => (
                <li key={cloudtype.fieldValue}>
                  <Link to={`/category/${kebabCase(cloudtype.fieldValue)}/`}>
                    {cloudtype.fieldValue} ({cloudtype.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default CategoryPage

export const categoryPageQuery = graphql`
  query CategoryQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___cloudtype) {
        fieldValue
        totalCount
      }
    }
  }
`
