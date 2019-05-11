import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby";
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Header from "./header"
import "./layout.css"
import Archive from './archive';

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 40px;
`;
const Layout = ({ children, location }) => {
  const isHomePage = location.pathname === '/';
  const SpringProps = useSpring({
    from: {height: isHomePage ? 200 : 300},
    to: {height: isHomePage ? 300 : 200}
  });
  return (
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
            <animated.div style={{ overflow: 'hidden', ...SpringProps}}>
              <Img fluid={data.file.childImageSharp.fluid}/>
            </animated.div>
          {/*{location.pathname === '/' && <Img fluid={data.file.childImageSharp.fluid}/>}*/}
            <MainLayout>
              <div>
                {children}
              </div>
              <Archive />
            </MainLayout>
        </>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
