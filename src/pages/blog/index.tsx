import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../../components/layout';
import Seo from '../../components/seo'

interface file {
  name: string
}


interface blogFiles {
  data: {
    allFile: {
      nodes: file[]
    }
  }
}

interface IOptions {
  options: string[]
}

interface mdx {
  frontmatter: {
    title: string;
    date: string;
    slug: string;
  };
  id: string;
  excerpt: string;
}

interface blogMdxData {
  data: {
      allMdx: {
        nodes: mdx[]
      }
  }
}

const BlogPage = (data: blogMdxData) => {
  // console.log(data)
  // const BlogPosts: React.ReactElement[] = files.map(node => {
  //   return (
  //     <li key={node.name}>
  //       {node.name}
  //     </li>
  //   )
  // });

  const BlogPosts: React.FC<blogFiles> = ({ data }) => {
    return data.allFile.nodes.map(node =>
      <li key={node.name}>
        {node.name}
      </li>
    )
  }

  const BlogMdxData: React.FC<blogMdxData> = ({ data }) => {
    return data.allMdx.nodes.map(node =>
      <article key={node.id}>
        <h2>
          <Link to={`/blog/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
        </h2>
        <p>Posted: {node.frontmatter.date}</p>
        <p>{node.excerpt}</p>
      </article>
    )
  }
  const CardArray: React.FC<IOptions> = ({ options }) => {
    return <>{options.map(opt => opt)}</>
  }

  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      {/* <CardArray options={['1', '2']}></CardArray> */}
      {
        // <BlogPosts data={data.data} />
      }
      {
        <BlogMdxData data={data.data} />
      }
    </Layout>
  )
}
/*
export const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
  }
`
*/
export const query = graphql`
  query {
    allMdx(sort: {frontmatter: {date: DESC}}) {
      nodes {
        id
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          slug
        }
        excerpt
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />
export default BlogPage
