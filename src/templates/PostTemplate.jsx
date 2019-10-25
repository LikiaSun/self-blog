import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/Bio";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import { rhythm } from "../utils/typography";

import "../scss/post/style.scss";
import "../scss/post/github-markdown.css";

export default function BlogPostTemplate({ location, data, pageContext }) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="main-child">
        <main>
          <article className="post-main-content">
            <header>
              <h1>{post.frontmatter.title}</h1>
              <time>{post.frontmatter.date}</time>
            </header>
            <section
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <footer>
              <Bio />
            </footer>
          </article>
        </main>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              width: `80vw`,
              margin: `10px 10vw`,
              listStyle: `none`,
              color: `white`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`;
