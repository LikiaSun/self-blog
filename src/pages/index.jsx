import { kebabCase } from "lodash";
import React from "react";
import { Link, graphql } from "gatsby";

import "../scss/style.scss";
import "../scss/tag/tag-style.scss";

import Bio from "@components/bio";
import SEO from "@components/seo";
import Layout from "@components/Layout";

export default function BlogIndex({ location, data }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div className="main-article">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug} className="main-article">
              <header className="main-article-header">
                <h3
                  style={{
                    display: "inline",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                >
                  <Link to={node.fields.slug}>{title}</Link>
                </h3>
                <time>{node.frontmatter.date}</time>
              </header>
              {node.frontmatter.tags ? (
                <div className="tags-container">
                  <ul className="tag-list">
                    {node.frontmatter.tags.map(tag => (
                      <li key={tag + `tag`} className={`tag-style-${tag}`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <section>
                <p
                  style={{ color: "#f7f7f7", fontWeight: 100 }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
