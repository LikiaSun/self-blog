import React, { lazy, Suspense } from "react";
import { Link, graphql } from "gatsby";

import "../scss/style.scss";

import Layout from "../components/Layout";
import SEO from "../components/seo";
const Bio = lazy(() => import("../components/bio"));

export default function BlogIndex({ location, data }) {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Suspense fallback={<div>Loading...</div>}>
        <Bio />
      </Suspense>
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
              <section>
                <p
                  style={{ color: "#f7f7f7" }}
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
          }
        }
      }
    }
  }
`;
