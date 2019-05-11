import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby";
import Img from 'gatsby-image';
import styled from 'styled-components';

import Header from "./header"
import "./layout.css"
import Archive from './archive';

const MainLayout = styled.main`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 40px;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath:{
          regex: "/bg/"
        }) {
          childImageSharp{
            fluid(maxWidth:1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          } 
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
          <Img fluid={data.file.childImageSharp.fluid}/>
          <MainLayout>
            <div>
              {children}
            </div>
            <Archive />
          </MainLayout>
        {/*</div>*/}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
