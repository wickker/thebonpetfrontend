export default `
mutation ($attributes: [AttributeInput!]!, $cartId: ID!) {
  cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
    cart {
      note
      attributes{
        key
        value
      }
    }
    userErrors {
      field
      message
    }
    warnings {
      message
    }
  }
}
`
