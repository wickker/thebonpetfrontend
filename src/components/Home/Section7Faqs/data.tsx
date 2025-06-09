import { LINKS, ROUTES } from '@/utils/constants'

export const FAQS = [
  {
    question: 'How long can your meals be stored in the freezer?',
    answer: (
      <p>
        Our meals can be stored in the freezer for <b>up to 1 year</b> from the
        date of manufacture. Each pack is labeled with a "Best Before" date, so
        be sure to check it for guidance.
      </p>
    ),
  },
  {
    question: 'How are your meals delivered?',
    answer: (
      <p>
        Our meals are delivered through <b>cold-chain delivery</b>, ensuring
        they remain frozen from the time of manufacture until they reach your
        doorstep. You can select a <b>4-hour delivery window</b> when placing
        your order. The driver will make <b>up to 3 attempts</b> to deliver your
        furkid's meals if you're unavailable.
      </p>
    ),
  },
  {
    question: 'How do I transition my pet to The Bon Pet meals?',
    answer: (
      <p>
        We recommend a <b>gradual transition</b>, especially if your pet is
        currently on a kibble diet. Start by mixing a small portion of our meals
        with their current food and increase the ratio over 3–5 days. Monitor
        your pet's stool throughout the process. If you encounter any issues or
        have concerns, feel free to contact us on{' '}
        <a
          href={LINKS.WHATSAPP}
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>{' '}
        for tailored advice.
      </p>
    ),
  },
  {
    question: 'My pet has allergies. What should I do?',
    answer: (
      <p>
        All our meals are made with <b>single-protein sources</b> to minimise
        allergy risks, and they do not contain artificial preservatives,
        colours, or fillers. If your pet has known allergies, please reach out
        to us on{' '}
        <a
          href={LINKS.WHATSAPP}
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>{' '}
        with details so we can help recommend a suitable meal plan.
      </p>
    ),
  },
  {
    question: 'Can I cook or heat your meals?',
    answer: (
      <p>
        We do not recommend cooking or heating our meals as this can{' '}
        <b>alter the nutrient profile</b> and reduce the quality of the food.
        Serve the meals <b>at room temperature</b> for the best experience.
      </p>
    ),
  },
  {
    question: 'How should I store the meals once thawed?',
    answer: (
      <p>
        Thawed meals should be stored in a sealed container in the refrigerator
        and consumed within <b>2–3 days</b>. Do not refreeze once thawed, as
        this can compromise the food's quality and safety.
      </p>
    ),
  },
  {
    question: 'Are your meals nutritionally complete?',
    answer: (
      <p>
        Yes, all our meals are formulated by <b>PhD nutritionists</b> to meet{' '}
        <b>AAFCO Nutritional Standards for All Life Stages</b>. This ensures
        your furkid gets a balanced and wholesome diet.
      </p>
    ),
  },
  {
    question: 'What ingredients do you use in your meals?',
    answer: (
      <p>
        We use only <b>restaurant-grade, human-quality ingredients</b>,
        including free-range chicken, responsibly sourced meats, and fresh
        vegetables. All meals are made without artificial preservatives,
        fillers, or by-products.
      </p>
    ),
  },
  {
    question: 'My pet is a picky eater. Will they like your meals?',
    answer: (
      <p>
        We've designed our meals to be highly palatable for both cats and dogs.
        If your pet is picky, try our <b>trial packs</b> to let them sample
        different options before committing to a full plan.
      </p>
    ),
  },
  {
    question: 'Do you offer trial packs?',
    answer: (
      <p>
        Yes, we offer <b>trial packs</b> so your pet can try out our meals
        before you purchase larger quantities. This is especially helpful during
        the transition period.
      </p>
    ),
  },
  {
    question: "Can I customise my pet's meal plan?",
    answer: (
      <p>
        Yes, we can help tailor a meal plan for your pet based on their{' '}
        <b>age, weight, activity level, and dietary needs</b>. Contact us on{' '}
        <a
          href={LINKS.WHATSAPP}
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>{' '}
        for a personalised recommendation.
      </p>
    ),
  },
  {
    question: 'Are your meals suitable for puppies and kittens?',
    answer: (
      <p>
        Absolutely! Our meals are formulated to meet the nutritional
        requirements of <b>all life stages</b>, including growing puppies and
        kittens.
      </p>
    ),
  },
  {
    question: "What if my pet doesn't like the food?",
    answer: (
      <p>
        If your pet refuses the food, don't worry! We're here to help
        troubleshoot. Reach out to us on{' '}
        <a
          href={LINKS.WHATSAPP}
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>
        , and we can provide tips to encourage your pet to try the meals.
      </p>
    ),
  },
  {
    question: 'How do I know how much to feed my pet?',
    answer: (
      <p>
        We provide a{' '}
        <a href={ROUTES.FEEDING_GUIDE} className='underline' target='_blank'>
          Feeding Guide
        </a>{' '}
        on our website to help you determine the appropriate portion size based
        on your pet's weight and activity level. If you're unsure, feel free to
        contact us for advice.
      </p>
    ),
  },
  {
    question: 'Are your meals raw or cooked?',
    answer: (
      <p>
        Our meals are prepared <b>sous vide</b>, a method that cooks the food
        gently to preserve nutrients while eliminating harmful pathogens. This
        process ensures that your pet gets the best of both worlds: the benefits
        of raw food with the safety of cooked meals.
      </p>
    ),
  },
  {
    question: 'Can I pause or cancel my subscription?',
    answer: (
      <p>
        Yes, you can pause, adjust, or cancel your subscription anytime. Just
        log in to your account or contact us on{' '}
        <a
          href={LINKS.WHATSAPP}
          className='underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          WhatsApp
        </a>{' '}
        for assistance.
      </p>
    ),
  },
  {
    question: 'Do you cater to pets with specific health conditions?',
    answer: (
      <p>
        Yes, we can provide recommendations for pets with specific health needs
        such as weight management or food sensitivities. While our meals are not
        therapeutic diets, they are wholesome and balanced. For serious health
        conditions, we recommend consulting with your vet before making dietary
        changes.
      </p>
    ),
  },
  {
    question: 'Can I change my delivery address after placing an order?',
    answer: (
      <p>
        Yes, you can update your delivery address by contacting us at least 24
        hours before your scheduled delivery.
      </p>
    ),
  },
  {
    question: 'How sustainable are your packaging and sourcing practices?',
    answer: (
      <p>
        We are committed to sustainability by using{' '}
        <b>eco-friendly packaging</b> and responsibly sourcing our ingredients.
        Wherever possible, we aim to minimize our carbon footprint while
        delivering high-quality food for your pets.
      </p>
    ),
  },
  {
    question: 'Do you deliver islandwide?',
    answer: (
      <p>
        Yes, we deliver across Singapore. During checkout, you'll be able to
        select your preferred delivery window based on your location.
      </p>
    ),
  },
]
