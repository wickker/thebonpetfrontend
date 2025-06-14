export default `
query {
  blog(handle: "news") {
    articles(first: 50) {
      edges {
        node {
          id
          title
          handle
          publishedAt
          contentHtml
          author {
            name
          }
          excerpt
          image {
            url
            altText
          }
        }
      }
    }
  }
}
`
