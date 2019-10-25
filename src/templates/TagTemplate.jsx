import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "@components/Seo";
import Layout from "@components/Layout";
import "../scss/tag/style.scss";

export default function Tags({ location, pageContext, data }) {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`All post with "${tag}" tag`} />
      <div className="main-child">
        <div className="tag-main">
          <header className="tag-header">
            <h1>{tag}</h1>
            <small>{tagHeader}</small>
          </header>
          <ul className="tag-list">
            {edges.map(({ node }) => {
              const { title, date } = node.frontmatter;
              const { slug } = node.fields;
              return (
                <li key={slug}>
                  <Link to={slug}>
                    {title} <time>{date}</time>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to="/tags">All tags</Link>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
