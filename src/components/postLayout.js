import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';

const postLayout = ({ data }) => {
  const { markdownRemark } = data;
  return (
    <Layout>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </Layout>
  );
};

// query gets ran through createPages in gatsby-node, https://www.gatsbyjs.org/docs/query-behind-the-scenes/
// ! means required argument
/* $slug is passed through the context @see gatsby-node
  `context: {
    slug: node.frontmatter.slug,
  }`
  It a gatsby feature not graphql, in Apollo we have to physically pass the argument
 */

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: {
      slug: {
        eq: $slug
      }
    }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;

export default postLayout;
