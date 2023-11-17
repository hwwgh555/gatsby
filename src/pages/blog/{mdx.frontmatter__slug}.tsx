import React from 'react';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogPost = ({data, children}: any) => {
  const image = getImage(data.mdx.frontmatter.hero_image);
  console.log('image:', image);

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      {children}
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
/*
// 这个id怎么传递的？
export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`
*/

export const Head = ({data}: any) => {
  return <Seo title={data.mdx.frontmatter.title} />
}
export default BlogPost

