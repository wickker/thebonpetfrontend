export default `
query ($customerAccessToken: String!, $first: Int) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    orders(first: $first) {
      edges {
        node {
          orderNumber
          id
          billingAddress {
            address1
            address2
            city
            country
            firstName
            lastName
            zip
          }
          name
          processedAt
          subtotalPrice {
            amount
          }
          cancelReason
          canceledAt
          customerUrl
          financialStatus
          fulfillmentStatus
          processedAt
          statusUrl
          customAttributes {
            key
            value
          }
          totalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
          }
          lineItems(first: 50) {
            nodes {
              title
              quantity
              variant {
                id
                image {
                  url
                }
                compareAtPrice {
                  currencyCode
                  amount
                }
                price {
                  amount
                  currencyCode
                }
                barcode
                title
                unitPrice {
                  amount
                  currencyCode
                }
                product {
                  id
                }
              }
            }
          }
        }
      }
      totalCount
    }
    numberOfOrders
    email
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
