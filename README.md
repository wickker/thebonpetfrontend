# The Bon Pet 

## Authentication
Authentication with Shopify is based on Legacy Customer Accounts (email + password).

The new and recommended [authentication flow](https://shopify.dev/docs/api/customer#authentication) (login via code sent to email) works. However, the resultant access token JWT obtained requires the method customerAccessTokenCreateWithMultipass to convert it to a usable Storefront API customerAccessToken; and this method is only available with Shopify Plus.