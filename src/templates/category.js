import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import prometheusIcon from '../img/prometheus-icon.png'
import otherIcon from '../img/other-icon.png'

class CategoryRoute extends React.Component {
  render() {

    const posts = this.props.data.allMarkdownRemark.edges
    const dashboardLists = posts.map((post) => (
      <div key={post.node.fields.slug} className="dashboard-list-item box">
        <Link to={post.node.fields.slug}>
          <div className="columns">
            <div className="column is-1">
              <img src={!!post.node.frontmatter.image.childImageSharp ? post.node.frontmatter.image.childImageSharp.fluid.src : post.node.frontmatter.image} alt={post.node.frontmatter.title} title={post.node.frontmatter.title} />
            </div>
            <div className="column is-8">
              <div className="dashboard-name">
                {post.node.frontmatter.title}
              </div>
              <div className="dashboard-des">
                {post.node.frontmatter.text}
              </div>
              <div className="dashboard-link">
                <ul>
                  <li><img src={prometheusIcon} alt="" /> {post.node.frontmatter.datasource}</li>
                  <li><img src={otherIcon} alt="" /> Other</li>
                </ul>
              </div>
            </div>
            <div className="column is-3">
              <div className="right-downloads">
                <ul>
                  <li>Downloads: 6401</li>
                  <li>Reviews: 7</li>
                </ul>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))
    const datasources = this.props.data.allMarkdownRemark.edges
    const category = this.props.pageContext.cat;
    const title = this.props.data.site.siteMetadata.title
    //const totalCount = this.props.data.allMarkdownRemark.totalCount
    //const categoryHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with “${category}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${category} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div className="column is-2">
                <div className="left-filter">
                  <strong>Filter by:</strong>
                  <div className="field">
                    <label>Name / Description</label>
                    <input className="input" type="text" />
                  </div>

                  {datasources && <div className="field">
                    <label>Data Source</label>
                    <select className="input select">
                      <option>All</option>
                      {datasources.map((datas) => (
                        <option>{datas.node.frontmatter.datasource}</option>
                      ))}
                    </select>
                  </div>}

                  <div className="field">
                    <label>Panel Type</label>
                    <select className="input select">
                      <option>All</option>
                      <option>Akumuli</option>
                      <option>Amazon Timestream</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Category</label>
                    <select className="input select">
                      <option>All</option>
                      <option>Akumuli</option>
                      <option>Amazon Timestream</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-10">
                <div className="dashboard-list">
                  {dashboardLists}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default CategoryRoute

export const categoryPageQuery = graphql`
  query CategoryPage($cat: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$cat] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                  fluid(maxWidth: 100, quality: 100) {
                  ...GatsbyImageSharpFluid
                  }
              }
            }
            text
            datasource
          }
        }
      }
    }
  }
`
