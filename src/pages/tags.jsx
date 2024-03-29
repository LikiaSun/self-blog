import React from "react";
import { kebabCase } from "lodash";
import { Link, graphql } from "gatsby";

import SEO from "@components/seo";
import Layout from "@components/Layout";

export default function TagsPage({ location, data }) {
  const allTags = data.allMarkdownRemark.group;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`All Likia blog's tags`} />
      <div>
        <h1>Tags</h1>
        <ul>
          {allTags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
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
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
