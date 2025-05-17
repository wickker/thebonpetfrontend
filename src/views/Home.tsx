import { toast } from 'react-toastify'
import Config from '@/configs'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants'
import { getTokenJson } from '@/utils/functions'

const Home = () => {
  const existingToken = getTokenJson()

  const handleLogout = () => {
    if (!existingToken?.id_token) {
      toast.error('No id_token found') // TODO: Add title
      return
    }
    const url = new URL(
      `${Config.VITE_SHOPIFY_CUSTOMER_AUTHENTICATION_BASE_URL}/logout`
    )
    url.searchParams.append('id_token_hint', existingToken.id_token)
    url.searchParams.append('post_logout_redirect_uri', Config.VITE_FE_BASE_URL)

    localStorage.removeItem(LOCAL_STORAGE_KEYS.CUSTOMER_ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE_VERIFIER)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.NONCE)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.STATE)

    window.location.href = url.toString()
  }

  return (
    <div>
      Home
      <br />
      {existingToken && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Home
