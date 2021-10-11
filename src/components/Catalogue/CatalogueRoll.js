import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../Layout'
import libraryIcon from '../../img/library-icon.png'
import dashboardIcon from '../../img/dashboard-icon.png'
import AddLibraryPopup from './AddLibraryPopup';
import AddCataloguePopup from './AddCataloguePopup';
import { kebabCase } from 'lodash';
import { v4 } from 'uuid';
import './../../css/catalogue.css';
import './../../css/modal.css';
import './../../css/slider.css';

class CatalogueRoll extends React.Component {
  addlibraryRef;
  constructor(props) {
    super(props);
    this.state = {
      categorytype: '',
      hostingnatureOption: '',
      servicetypeOption: '',
      servicenameOption: '',
      natureOption: '',
      cloudtype: [],
      catalogue: [],
      hostingnature: [],
      servicetype: [],
      servicename: [],
      nature: [],
      searchKey: '',
    }
    this.addlibraryRef = React.createRef();
    this.addcatalogueRef = React.createRef();
  }

  componentDidMount() {
    this.setCategory()
  }

  handlestateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  setCategory = () => {
    const { data } = this.props
    const { edges: posts } = data.catalogs;
    const { edges: dashboards } = data.dashboards;
    const { cloudtype, catalogue, hostingnature, servicetype, servicename, nature } = this.state;
    const pushedCatalogue = [];
    for (let i = 0; i < posts.length; i++) {
      let row = posts[i].node.frontmatter;
      if (cloudtype.indexOf(row.cloudtype) === -1) {
        cloudtype.push(row.cloudtype);
      }
      if (hostingnature.indexOf(row.hostingnature) === -1) {
        hostingnature.push(row.hostingnature);
      }
      if (servicetype.indexOf(row.servicetype) === -1) {
        servicetype.push(row.servicetype);
      }
      if (servicename.indexOf(row.servicename) === -1) {
        servicename.push(row.servicename);
      }
      if (nature.indexOf(row.nature) === -1) {
        nature.push(row.nature);
      }
      if (pushedCatalogue.indexOf(row.cloudtype) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.cloudtype);
      } else if (pushedCatalogue.indexOf(row.hostingnature) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.hostingnature);
      } else if (pushedCatalogue.indexOf(row.servicetype) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.servicetype);
      } else if (pushedCatalogue.indexOf(row.servicename) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.servicename);
      } else if (pushedCatalogue.indexOf(row.nature) === -1) {
        catalogue.push(posts[i].node);
        pushedCatalogue.push(row.nature);
      }
    }
    for (let i = 0; i < catalogue.length; i++) {
      let cat = catalogue[i].frontmatter.cloudtype;
      for (let j = 0; j < dashboards.length; j++) {
        let dash = dashboards[j].node;
        catalogue[i].dashboard = dash;
        if (cat === dash.frontmatter.dashtype || catalogue[i].frontmatter.hostingnature === dash.frontmatter.dashtype || catalogue[i].frontmatter.servicetype === dash.frontmatter.dashtype || catalogue[i].frontmatter.servicename === dash.frontmatter.dashtype) {
          catalogue[i].dashboard = dash;
        }
      }
    }
    this.setState({
      cloudtype,
      hostingnature,
      servicetype,
      servicename,
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
          let title = search.frontmatter.title.toLowerCase();
          if (title.indexOf(value) !== -1) {
            if (duplicatecatalogue.indexOf(title) === -1) {
              queryResult.push(search);
              duplicatecatalogue.push(title);
            }
          }
        }
      } else {
        for (let j = 0; j < posts.length; j++) {
          let search = posts[j].node;
          let cloudtype = search.frontmatter.title.toLowerCase();
          // if (duplicatecatalogue.indexOf(cloudtype) === -1) {
          queryResult.push(search);
          // duplicatecatalogue.push(cloudtype);
          // }
        }
      }
      this.setState({
        catalogue: queryResult,
      });
    }
  }

  displayCatalogue = () => {
    const { catalogue, categorytype, hostingnatureOption, servicetypeOption, servicenameOption, natureOption } = this.state;
    let retData = [];
    if (catalogue.length > 0) {
      for (let i = 0; i < catalogue.length; i++) {
        let row = catalogue[i];
        let isMatched = true;
        if (!categorytype || (categorytype && categorytype === row.frontmatter.cloudtype)) {
          // if (catalogue.indexOf(row.frontmatter.cloudtype) === -1) {
          isMatched = true;
        } else {
          isMatched = false;
        }
        if (isMatched) {
          if (!hostingnatureOption || (hostingnatureOption && hostingnatureOption === row.frontmatter.hostingnature)) {
            isMatched = true;
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          if (!servicetypeOption || (servicetypeOption && servicetypeOption === row.frontmatter.servicetype)) {
            isMatched = true;
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          if (!servicenameOption || (servicenameOption && servicenameOption === row.frontmatter.servicename)) {
            isMatched = true;
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          if (!natureOption || (natureOption && natureOption === row.frontmatter.nature)) {
            isMatched = true;
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          retData.push(
            <article className="blog-list-item box" key={v4()}>
              <div className="module-card-content">
                <div className="columns is-multiline">
                  <div className="is-parent column is-2">
                    <img src={!!row.frontmatter.image.childImageSharp ? row.frontmatter.image.childImageSharp.fluid.src : row.frontmatter.image} alt={row.frontmatter.title} title={row.frontmatter.title} />
                  </div>
                  <div className="is-parent column is-10">
                    <p className="title is-block"><Link to={`/category/${kebabCase(row.frontmatter.cloudtype)}/`}>{row.frontmatter.title}</Link></p>
                    <p className="subtitle is-block">{row.frontmatter.text}</p>
                  </div>
                </div>
              </div>
              <div className="module-card-footer">
                <div className="module-card-footer-details">
                  <a onClick={e => this.onClickAddLibrary(e, row.frontmatter.title, row.id)}><img src={libraryIcon} alt /> Add Catalog To library</a>
                </div>
                <div className="module-card-footer-provider">
                  {
                    row.dashboard &&
                    <Link to={`${row.dashboard.fields.slug}`}><img src={dashboardIcon} alt /> Preview Dashboard</Link>
                  }
                </div>

              </div>
            </article>
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
    const { cloudtype, searchKey, hostingnature, servicetype, servicename, nature, categorytype, hostingnatureOption, servicetypeOption, servicenameOption, natureOption } = this.state;
    return (
      <Layout>
        <div className="catalogue-roll-container">
          <div className="catalogue-roll-tabs">
            <div className="container">
              <ul>
                <li>Providers</li>
                <li className="active">Modules</li>
              </ul>
            </div>
          </div>
          <div className="catalogue-modules">
            <div className="container">
              <div className="common-container">
                <div className="columns is-multiline">
                  <div className="is-parent column is-3">
                    <div className="catalogue-fliter">
                      {/* <div className="form-group category-control-group">
                        <form>
                          <input type="text" className="input" placeholder="Search" value={searchKey} onChange={this.keyPress} />
                          <button className="is-search"><img src={isSearch} alt="" /></button>
                        </form>
                      </div> */}
                      <div className="sidebar-filter-title">
                        <h3>FILTERS</h3>
                        <a href="#" class="sidebar-reset-filters">
                          Clear Filters
                        </a>
                      </div>
                      <div className="field category-select">
                        <select className="input select" name="categorytype" value={categorytype} onChange={this.handlestateChange}>
                          <option value="">Select Cloud Type</option>
                          {cloudtype &&
                            cloudtype.map((value) => (
                              <option value={value} key={v4()}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="field category-select">
                        <select className="input select" name="hostingnatureOption" value={hostingnatureOption} onChange={this.handlestateChange}>
                          <option value="">Select Hosting Nature</option>
                          {hostingnature &&
                            hostingnature.map((value) => (
                              <option value={value} key={v4()}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="field category-select">
                        <select className="input select" name="servicetypeOption" value={servicetypeOption} onChange={this.handlestateChange}>
                          <option value="">Select Service Type</option>
                          {servicetype &&
                            servicetype.map((value) => (
                              <option value={value} key={v4()}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="field category-select">
                        <select className="input select" name="servicenameOption" value={servicenameOption} onChange={this.handlestateChange}>
                          <option value="">Select Service Name</option>
                          {servicename &&
                            servicename.map((value) => (
                              <option value={value} key={v4()}>{value}</option>
                            ))}
                        </select>
                      </div>
                      <div className="field category-select">
                        <select className="input select" name="natureOption" value={natureOption} onChange={this.handlestateChange}>
                          <option value="">Select Nature</option>
                          {nature &&
                            nature.map((value) => (
                              <option value={value} key={v4()}>{value}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="is-parent column is-9">
                    <div className="catalogue-apps-modules">
                      <div className="columns is-multiline">
                        <div className="is-parent column is-9 pb-0">
                          <div className="catalog-app-text">
                            <h3>Catalogue</h3>
                            <p>A catalogue is collection of dashboards</p>
                          </div>
                        </div>
                        <div className="is-parent column is-3 pb-0">
                          <button onClick={this.onClickAddCatalogue} className="create-btn">Add Catalogue</button>
                        </div>
                      </div>
                      <div className="catalogue-boxes">
                        {this.displayCatalogue()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddLibraryPopup ref={this.addlibraryRef} />
        <AddCataloguePopup ref={this.addcatalogueRef} />
      </Layout>
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
                cloudtype
                hostingnature
                servicetype
                servicename
                nature
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
