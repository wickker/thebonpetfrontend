export default `
query ($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    numberOfOrders
    email
    firstName
    lastName
    phone
    addresses(first: 10) {
      nodes {
        address1
        address2
        country
        firstName
        lastName
        zip
      }
    }
  }
}
`
