import { InstagramEmbed } from 'react-social-media-embed'

const Section6Join = () => {
  return (
    <div className='bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)]'>
      <div className='text-cream mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <h1 className='text-center text-5xl font-bold'>Join the Pack</h1>

        <p className='text-beige mt-4 mb-6 text-center text-lg leading-[1.8]'>
          Meet our satisfied paw-rents
        </p>

        <div className='flex flex-wrap items-center justify-around gap-4'>
          <InstagramEmbed url='https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
          <InstagramEmbed url='https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
          <InstagramEmbed url='https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
          <InstagramEmbed url='https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
        </div>
      </div>
    </div>
  )
}

export default Section6Join
