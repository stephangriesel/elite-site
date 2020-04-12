import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import BackgroundSection from '../components/Globals/BackgroundSection';

import Info from '../components/Home/Info'
import Menu from '../components/Home/Menu'
import Products from '../components/Home/Products'
import Contact from '../components/Home/Contact'

const IndexPage = ({ data }) => (
  < Layout >
    <SEO title="Home" />
    <BackgroundSection
      img={data.img.childImageSharp.fluid}
      title="Elite Properties"
      styleClass="default-background"
    />
    <Info />
    <Menu items={data.menu} />
    {/* <Products /> */}
    <Contact />
  </Layout >
);

export const query = graphql`
{
  img:file(relativePath:{
    eq:"default-test.jpg"
  }){
    childImageSharp{
      fluid {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  menu:allContentfulListItem{
    edges{
      node{
        id
        title
        finalprice
        category
        image {
          fixed(width:50,height:50){
            ...GatsbyContentfulFixed_tracedSVG
          }
        }
        description {
          description
        }
      }
    }
  }
}
`

export default IndexPage
