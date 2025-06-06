import { PropsWithChildren, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'motion/react'
import { RxCross2 } from 'react-icons/rx'
import { Button } from '@/components/commons'
import useProduct from '@/hooks/queries/useProduct'
import useAddItemToCart, { AddToCartButton } from '@/hooks/useAddItemToCart'

const DonationModal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<string>('Wildflower')
  const [quantity, setQuantity] = useState(1)
  const [weeks, setWeeks] = useState(1)
  const { addItemToCart, addToCartButtonRef, isLoading } =
    useAddItemToCart(handleClose)
  const { useGetProductsQuery } = useProduct()
  const getProducts = useGetProductsQuery({
    first: 100,
  })
  const products = getProducts.data?.nodes || []
  const product = products.find((product) =>
    product.title.includes(selectedOrg)
  )

  function handleClose() {
    setOpen(false)
    setSelectedOrg('Wildflower')
    setQuantity(1)
    setWeeks(1)
  }

  const handleSelectOrg = (org: string) => setSelectedOrg(org)

  const handleAddOneMeal = () => {
    if (!product) return
    addItemToCart(
      AddToCartButton.DONATION,
      product.variants.edges[0].node.id,
      quantity
    )
  }

  const handleAddSubscription = () => {
    if (!product) return
    const sellingPlanId =
      product.variants.edges[0].node.sellingPlanAllocations.nodes[weeks - 1]
        .sellingPlan.id
    addItemToCart(
      AddToCartButton.DONATION_SUBSCRIPTION,
      product.variants.edges[0].node.id,
      quantity,
      sellingPlanId
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogOverlay className='fixed inset-0 bg-black opacity-70' />
            <DialogContent
              className='bg-cream text-dark-brown fixed top-[50%] left-[50%] flex max-h-[85dvh] w-[90dvw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] flex-col items-center overflow-y-auto rounded-lg p-1'
              aria-describedby={undefined}
            >
              <button className='cursor-pointer self-end' onClick={handleClose}>
                <RxCross2 className='h-6 w-6' />
              </button>

              <div className='flex w-full flex-col items-center px-4 pb-6'>
                <DialogTitle className='text-dark-brown mb-4 text-center text-4xl font-bold'>
                  How would you like to donate?
                </DialogTitle>

                <div className='mb-2 flex items-center gap-x-8 text-lg font-bold'>
                  {['Wildflower', 'LUNI'].map((org) => (
                    <label className='flex items-center gap-x-2' key={org}>
                      <input
                        type='radio'
                        value={org}
                        checked={selectedOrg === org}
                        onChange={() => handleSelectOrg(org)}
                        className='accent-green h-4 w-4'
                      />
                      {org}
                    </label>
                  ))}
                </div>

                <Button.Quantity
                  quantity={quantity}
                  onMinus={() => setQuantity((prev) => prev - 1)}
                  onAdd={() => setQuantity((prev) => prev + 1)}
                />

                <div className='mt-6 grid w-full lg:grid-cols-[1fr_auto_1fr]'>
                  <div className='flex flex-col items-center px-4'>
                    <img
                      src='/home-meals-donation.png'
                      alt='Donation'
                      className='mb-2 h-50 w-50 rounded-xl object-cover'
                    />
                    <p className='mb-2 text-center text-xl font-bold'>
                      Feed a Cat
                    </p>
                    <p className='text-brown mb-2 text-center'>
                      Receive photo and video updates when your meal reaches a
                      cat
                    </p>
                    <Button.Cta
                      className='mt-7'
                      onClick={handleAddOneMeal}
                      isLoading={
                        addToCartButtonRef.current ===
                          AddToCartButton.DONATION && isLoading
                      }
                    >
                      <img
                        src='/icons/paw-white.png'
                        alt='Paw icon'
                        className='aspect-auto w-6'
                      />
                      Donate One Meal
                    </Button.Cta>
                  </div>

                  <div className='my-6 h-[1px] w-full rounded-full bg-[#CCBC9E] lg:my-0 lg:h-full lg:w-[1px]' />

                  <div className='flex flex-col items-center px-4'>
                    <img
                      src='/home-meals-donation.png'
                      alt='Donation'
                      className='mb-2 h-50 w-50 rounded-xl object-cover'
                    />
                    <p className='mb-2 text-center text-xl font-bold'>
                      Pledge with Purrpose
                    </p>
                    <p className='text-brown mb-2 text-center'>
                      Set up recurring meals every
                    </p>
                    <Button.Weeks
                      weeks={weeks}
                      onMinus={() => setWeeks((prev) => prev - 1)}
                      onAdd={() => setWeeks((prev) => prev + 1)}
                      maxWeeks={
                        product?.variants.edges[0].node.sellingPlanAllocations
                          .nodes.length || 0
                      }
                    />
                    <Button.Cta
                      className='mt-4'
                      onClick={handleAddSubscription}
                      isLoading={
                        addToCartButtonRef.current ===
                          AddToCartButton.DONATION_SUBSCRIPTION && isLoading
                      }
                    >
                      <img
                        src='/icons/paw-white.png'
                        alt='Paw icon'
                        className='aspect-auto w-6'
                      />
                      Subscribe
                    </Button.Cta>
                    <p className='text-brown mt-1 text-xs'>
                      Skip or cancel any time
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  )
}

export default DonationModal
