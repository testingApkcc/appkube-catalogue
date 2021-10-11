import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import isSearch from '../img/search-icon.png'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      activeSearch: false,
      searchBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  toggleSearch = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        activeSearch: !this.state.activeSearch,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.activeSearch
          ? this.setState({
            searchBarActiveClass: 'is-active',
          })
          : this.setState({
            searchBarActiveClass: '',
          })
      }
    )
  }


  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">

          <div className="navbar-brand">
            <Link to="/" className="logo" title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
            {/* Hamburger search */}
            <div
              className={`search-icon ${this.state.searchBarActiveClass}`}
              data-target="navSearch"
              onClick={() => this.toggleSearch()}
            >
              <img src={isSearch} alt="" />
            </div>
            <div
              className={`form-group header-search ${this.state.searchBarActiveClass}`}
            >
              <form>
                <input type="text" className="input" placeholder="Search" />
                <button className="is-search"><img src={isSearch} alt="" /></button>
              </form>
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" to="/catalogue">
                Catalogue
              </Link>
              <Link className="navbar-item" to="/cataloguedata">
                Catalogue Data
              </Link>
              <a
                className="navbar-item"
                href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div>

          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
