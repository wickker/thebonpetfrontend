import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { LINKS } from '@/utils/constants'

const featuredPosts = [
  {
    path: '/home-join-1.jpg',
    caption: 'This is an example of a caption from Instagram',
    link: 'https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    username: '@username',
  },
  {
    path: '/home-join-2.jpg',
    caption: 'This is an example of a caption from Instagram',
    link: 'https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    username: '@username',
  },
  {
    path: '/home-join-3.jpg',
    caption: 'This is an example of a caption from Instagram',
    link: 'https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    username: '@username',
  },
  {
    path: '/home-join-4.jpg',
    caption: 'This is an example of a caption from Instagram',
    link: 'https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    username: '@username',
  },
  {
    path: '/home-join-5.jpg',
    caption: 'This is an example of a caption from Instagram',
    link: 'https://www.instagram.com/reel/DFZVNdKzQa6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    username: '@username',
  },
]

const Section6Join = () => {
  return (
    <div className='relative bg-[linear-gradient(90deg,#03453D_0%,#19756A_50.36%,#03453D_100%)]'>
      <div className='text-cream mx-auto flex w-full max-w-[1650px] flex-col items-center px-4 py-8 lg:w-[90%]'>
        <h1 className='text-center text-5xl font-bold'>Join the Pack</h1>

        <p className='text-beige mt-4 mb-6 text-center text-lg leading-[1.8]'>
          Meet our satisfied paw-rents
        </p>

        <div className='mb-8 flex flex-wrap items-center justify-around gap-6'>
          {featuredPosts.map((post) => (
            <a
              className='group flex w-[258px] flex-col items-center rounded-xl bg-white p-4'
              href={post.link}
              target='_blank'
              rel='noopener noreferrer'
              key={post.path}
            >
              <img
                src={post.path}
                alt='Join the pack'
                className='h-[262px] w-[226px] object-cover transition-all duration-300 group-hover:scale-102'
              />
              <p className='text-dark-gray mt-2'>{post.caption}</p>
              <p className='text-dark-gray/60 mt-2 text-center'>
                {post.username}
              </p>
            </a>
          ))}
        </div>

        <a
          className='flex cursor-pointer items-center gap-x-2 rounded-xl border-[2px] border-white/70 bg-[radial-gradient(100%_100%_at_0%_100%,#F8BA71_22.92%,#F27979_46.35%,#EC69DB_79.35%,#BE5BED_100%)] px-3 py-2 text-white transition-all hover:scale-x-102 hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]'
          href={LINKS.INSTAGRAM}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram className='h-10 w-10' />
          <div className='flex flex-col items-center'>
            <p className='font-bold'>@TheBonPet</p>
            <p className='text-xs'>Follow on Instagram</p>
          </div>
        </a>
      </div>

      <a
        className='group absolute top-8 right-0 hidden cursor-pointer items-center gap-x-2 rounded-l-full border-[2px] border-r-0 border-white/50 px-4 py-2 text-white lg:flex'
        style={{
          background: 'linear-gradient(90deg, #4EC465 22.95%, #3CA250 100%)',
        }}
        href={LINKS.WHATSAPP}
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaWhatsapp className='h-10 w-10' />
        <div className='flex flex-col items-center'>
          <p className='font-bold'>Join the Community</p>
          <p className='text-xs'>Tips, Deals, Networking</p>
        </div>
        <div className='max-w-0 self-start overflow-hidden transition-[max-width] duration-300 group-hover:max-w-[45px]'>
          <FiExternalLink className='ml-2 h-6 w-6 opacity-0 transition-all duration-900 group-hover:opacity-100' />
        </div>
      </a>
    </div>
  )
}

export default Section6Join
