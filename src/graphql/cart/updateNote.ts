export default `
mutation ($cartId: ID!, $note: String!) {
  cartNoteUpdate(cartId: $cartId, note: $note) {
    cart {
      note
      attributes {
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
