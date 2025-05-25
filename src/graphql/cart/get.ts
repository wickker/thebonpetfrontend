export default `
query ($cartId: ID!) {
  cart(id: $cartId) {
    id
    createdAt
    updatedAt
    checkoutUrl
    attributes {
      key
      value
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              image {
                url
              }
              compareAtPrice {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
              title
            }
          }
          sellingPlanAllocation {
            sellingPlan {
              id
              name
            }
            priceAdjustments {
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              perDeliveryPrice {
                amount
                currencyCode
              }
            }
          }
          ... on CartLine {
            merchandise {
              ... on ProductVariant {
                product {
                  description
                  title
                  id
                }
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      customer {
        id
        email
        phone
        firstName
        lastName
      }
    }
    totalQuantity
    note
  }
}
`
