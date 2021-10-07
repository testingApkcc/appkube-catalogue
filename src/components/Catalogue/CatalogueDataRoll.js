import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class CatalogueDataRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  getQueryParams = (qs) => {
    qs = qs.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  }


  componentDidMount() {
    this.setData()
  }

  setData = () => {
    const { data } = this.props
    const { edges: posts } = data.catalogs;
    var query = this.getQueryParams(document.location.search);
    let dashData = {};
    for (let i = 0; i < posts.length; i++) {
      let row = posts[i].node.frontmatter;
      let isMatched = true;
      if(isMatched && query.cloudtype && query.cloudtype.toLowerCase() !== row.cloudtype.toLowerCase()){
        isMatched = false;
      }
      if(isMatched && query.hostingnature && query.hostingnature.toLowerCase() !== row.hostingnature.toLowerCase()){
        isMatched = false;
      }
      if(isMatched && query.servicetype && query.servicetype.toLowerCase() !== row.servicetype.toLowerCase()){
        isMatched = false;
      }
      if(isMatched && query.servicename && query.servicename.toLowerCase() !== row.servicename.toLowerCase()){
        isMatched = false;
      }
      if(isMatched && query.nature && query.nature.toLowerCase() !== row.nature.toLowerCase()){
        isMatched = false;
      }
      if(isMatched){
        dashData[i] = row.dashboardData.data;
      }
    }
    this.setState({
      data: dashData
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="">
        {JSON.stringify(data)}
      </div>
    )
  }
}

CatalogueDataRoll.propTypes = {
  data: PropTypes.shape({
    catalogs: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query CatalogueDataRollQuery {
        catalogs: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "catalogue-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                image {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
                title
                text
                templateKey
                cloudtype
                hostingnature
                servicetype
                servicename
                nature
                dashboardData
                  {
                    data
                  }
              }
            }
          }
        }
        dashboards: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "dashboard-preview" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                dashtype
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <CatalogueDataRoll data={data} count={count} />}
  />
)
