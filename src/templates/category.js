import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import prometheusIcon from '../img/prometheus-icon.png'
import otherIcon from '../img/other-icon.png'
import { v4 } from 'uuid'

class CategoryRoute extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: 'All',
    }
  }
  setDatasource = (e) => {
    this.setState({
      dataSource: e.target.value,
    })
  }

  renderDataSourceOption = (posts) => {
    const retData = [];
    const uniqueData = [];
    for (let i = 0; i < posts.length; i++) {
      const dataSource = posts[i].node.frontmatter.datasource;
      if (uniqueData.indexOf(dataSource) === -1) {
        retData.push(<option key={v4()} value={dataSource}>{dataSource}</option>);
        uniqueData.push(dataSource);
      }
    }
    return retData;
  };

  renderDashboardList = (posts) => {
    const { dataSource } = this.state;
    const retData = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (dataSource === "All" || dataSource == post.node.frontmatter.datasource) {
        retData.push(
          <div key={v4()} className="dashboard-list-item box">
            < Link to={post.node.fields.slug}>
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
        );
      }
    }
    return retData;
  };

  render() {
    const { dataSource } = this.state;
    const posts = this.props.data.allMarkdownRemark.edges
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
                  <div className="field">
                    <label>Data Source</label>
                    <select value={dataSource} className="input select" onChange={this.setDatasource}>
                      <option value="All">All</option>
                      {this.renderDataSourceOption(posts)}
                    </select>
                  </div>
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
                  {this.renderDashboardList(posts)};
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
      filter: { frontmatter: { cloudtype: { in: [$cat] } } }
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
