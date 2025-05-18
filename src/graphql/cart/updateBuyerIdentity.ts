export default `
mutation ($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
  cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        customer {
          id
          email
          firstName
          lastName
        }
      }
    }
    userErrors {
      code
      field
      message
    }
  }
}
`
