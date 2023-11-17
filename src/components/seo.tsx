import * as React from "react";
import { graphql, useStaticQuery} from 'gatsby';

interface PropsType {
  title: string
}

const Seo: React.FC<PropsType> = ({title}) => {
  const data = useStaticQuery(graphql`
  {
    site {
      siteMetadata{
        title
      }
    }
  }
  `);

  return (
    <title>{title} | {data.site.siteMetadata.title}</title>
  )

}


export default Seo