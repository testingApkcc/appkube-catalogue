import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class CatalogueRoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorytype: 'All',
            category: [],
        }
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
        const { edges: posts } = data.allMarkdownRemark;
        const { category } = this.state;
        for (let i = 0; i < posts.length; i++) {
            let row = posts[i].node.frontmatter;
            if (category.indexOf(row.category) == -1) {
                category.push(row.category);
            }
        }
    }

    render() {
        const { data } = this.props
        const { categorytype, category } = this.state;
        const { edges: posts } = data.allMarkdownRemark
        return (
            <div className="catalogue-roll-container">
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="is-parent column is-4"></div>
                        <div className="is-parent column is-4">
                            <div className="field">
                                <div className="control">
                                    <select className="input select" onChange={this.handlestateChange}>
                                        <option>All</option>
                                        {category &&
                                            category.map((value) => (
                                                <option>{value}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="is-parent column is-4">
                            <div className="field">
                                <div className="control">
                                    <input class="input" type="text" name="search" id="search" placeholder="search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="columns is-multiline">
                        {posts &&
                            posts.map(({ node: post }) => (
                                <>
                                    {(categorytype == post.frontmatter.category || categorytype == 'All') &&
                                        <div className="is-parent column is-4" key={post.id}>
                                            <article className="blog-list-item tile is-child box">
                                                <div className="columns is-multiline">
                                                    <div className="is-parent column is-4">
                                                        <img src={!!post.frontmatter.image.childImageSharp ? post.frontmatter.image.childImageSharp.fluid.src : post.frontmatter.image} alt={post.frontmatter.title} title={post.frontmatter.title} />
                                                    </div>
                                                    <div className="is-parent column is-8">
                                                        <p className="is-block">
                                                            <Link
                                                                className="title has-text-primary is-size-5"
                                                                to={post.fields.slug}
                                                            >
                                                                {post.frontmatter.title}
                                                            </Link>
                                                        </p>
                                                        <p className="subtitle is-block is-pb-2">
                                                            {post.frontmatter.text}
                                                        </p>
                                                        <ul>
                                                            <li><Link to="#">Add Dashboard to Catalog</Link></li>
                                                            <li><Link to="#">Add Catalog To library</Link></li>
                                                            <li><Link to={post.fields.slug}>Preview Dashboard</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    }
                                </>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}

CatalogueRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
      query CatalogueRollQuery {
        allMarkdownRemark(
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
      }
    `}
        render={(data, count) => <CatalogueRoll data={data} count={count} />}
    />
)
