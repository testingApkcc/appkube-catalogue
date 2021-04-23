import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import isSearch from '../img/search-icon.png'
import AddLibraryPopup from './AddLibraryPopup';
import AddCataloguePopup from './AddCataloguePopup';
import { kebabCase } from 'lodash';
import { v4 } from 'uuid';

class CatalogueRoll extends React.Component {
  addlibraryRef;
  constructor(props) {
    super(props);
    this.state = {
      categorytype: 'All',
      category: [],
      catalogue: [],
      searchKey: '',
    }
    this.addlibraryRef = React.createRef();
    this.addcatalogueRef = React.createRef();
  }

  componentDidMount() {
    this.setCategory()
  }

  handlestateChange = (e) => {
    this.setState({
      categorytype: e.target.value,
    })
  }

  setCategory = () => {
    const { data } = this.props
    const { edges: posts } = data.catalogs;
    const { edges: dashboards } = data.dashboards;
    const { category, catalogue } = this.state;
    const pushedCatalogue = [];
    for (let i = 0; i < posts.length; i++) {
      let row = posts[i].node.frontmatter;
      if (category.indexOf(row.category[0]) === -1) {
        category.push(row.category[0]);
      }
      if (pushedCatalogue.indexOf(row.category[1]) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.category[1]);
      }
    }
    for (let i = 0; i < catalogue.length; i++) {
      let cat = catalogue[i].frontmatter.category[1];
      for (let j = 0; j < dashboards.length; j++) {
        let dash = dashboards[j].node;
        if (cat === dash.frontmatter.dashtype) {
          catalogue[i].dashboard = dash;
        }
      }
    }
    this.setState({
      category,
      catalogue
    })
  }

  keyPress = (e) => {
    const { data } = this.props
    const { edges: posts } = data.catalogs;
    let { value } = e.target;
    this.setState({
      searchKey: value,
    });
    var queryResult = [];
    let duplicatecatalogue = [];
    if (posts) {
      value = value.trim();
      value = value.toLowerCase();
      if (value) {
        for (let i = 0; i < posts.length; i++) {
          let search = posts[i].node;
          let category = search.frontmatter.category[1].toLowerCase();
          if (category.indexOf(value) !== -1) {
            if (duplicatecatalogue.indexOf(category) === -1) {
              queryResult.push(search);
              duplicatecatalogue.push(category);
            }
          }
        }
      } else {
        for (let j = 0; j < posts.length; j++) {
          let search = posts[j].node;
          let category = search.frontmatter.category[1].toLowerCase();
          if (duplicatecatalogue.indexOf(category) === -1) {
            queryResult.push(search);
            duplicatecatalogue.push(category);
          }
        }
      }
      this.setState({
        catalogue: queryResult,
      });
    }
  }

  displayCatalogue = () => {
    const { catalogue, categorytype } = this.state;
    let retData = [];
    if (catalogue.length > 0) {
      for (let i = 0; i < catalogue.length; i++) {
        let row = catalogue[i];
        {
          (categorytype == row.frontmatter.category[0] || categorytype == 'All') &&
            retData.push(
              <div className="is-parent column is-4" key={v4()}>
                <article className="blog-list-item tile is-child box">
                  <div className="columns is-multiline">
                    <div className="is-parent column is-4">
                      <img src={!!row.frontmatter.image.childImageSharp ? row.frontmatter.image.childImageSharp.fluid.src : row.frontmatter.image} alt={row.frontmatter.title} title={row.frontmatter.title} />
                    </div>
                    <div className="is-parent column is-8">
                      <p className="title is-block"><Link to={`/category/${kebabCase(row.frontmatter.category[1])}/`}>{row.frontmatter.category[1]}</Link></p>
                      <p className="subtitle is-block">{row.frontmatter.text}</p>
                      <ul>
                        <li><a onClick={e => this.onClickAddLibrary(e, row.frontmatter.title, row.id)}>Add Catalog To library</a></li>
                        {
                          row.dashboard &&
                          <li><Link to={`${row.dashboard.fields.slug}`}>Preview Dashboard</Link></li>
                        }
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            );
        }
      }
    } else {
      retData.push(
        <div key={v4()}>There is no dashboard match.</div>
      );
    }
    return retData;
  }

  onClickAddLibrary = (e, selectedCatalogName, selectedCatalogId) => {
    this.addlibraryRef.current.toggle(selectedCatalogName, selectedCatalogId);
  };

  onClickAddCatalogue = () => {
    this.addcatalogueRef.current.toggle();
  };


  render() {
    const { category, searchKey } = this.state;
    return (
      <div className="catalogue-roll-container">
        <div className="container">
          <div className="common-container">
            <div className="catalog-app-text">
              <h3>Catalogue</h3>
              <p>A catalogue is collection of dashboards</p>
            </div>
          </div>
          <div className="common-container catalogue-fliter">
            <div className="fliter-left">
              <button onClick={this.onClickAddCatalogue} className="create-btn">Add Catalogue</button>
            </div>
            <div className="fliter-right">
              <div className="field category-select">
                <select className="input select" name="catalogType" onChange={this.handlestateChange}>
                  <option>All</option>
                  {category &&
                    category.map((value) => (
                      <option key={v4()}>{value}</option>
                    ))}
                </select>
              </div>
              <div className="form-group category-control-group">
                <form>
                  <input type="text" className="input" placeholder="Search" value={searchKey} onChange={this.keyPress} />
                  <button className="is-search"><img src={isSearch} alt="" /></button>
                </form>
              </div>
            </div>
          </div>
          <div className="common-container catalogue-boxes">
            <div className="columns is-multiline">
              {this.displayCatalogue()}
            </div>
          </div>
        </div>
        <AddLibraryPopup ref={this.addlibraryRef} />
        <AddCataloguePopup ref={this.addcatalogueRef} />
      </div>
    )
  }
}

CatalogueRoll.propTypes = {
  data: PropTypes.shape({
    catalogs: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query CatalogueRollQuery {
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
                category
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
    render={(data, count) => <CatalogueRoll data={data} count={count} />}
  />
)
