import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

const POST_ARCHIVE_QUERY = graphql`
      query BlogPostArchive{
        allMarkdownRemark(
          limit:5, sort: {
          order: DESC,
          fields:[frontmatter___date]
        }) {
          edges {
            node {
              frontmatter{
                title
                slug
                # date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `;

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) => (
      <>
        <aside>
          <h3>Archive</h3>
          {allMarkdownRemark.edges.map(edge => (
            <li key={edge.node.frontmatter.slug}>
              <Link to={`/posts${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </aside>
      </>
    )}
  />
);

export default Archive;
