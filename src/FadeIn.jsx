import { motion } from 'framer-motion'

const directionVariants = {
  up:    { opacity: 0, y: 40 },
  down:  { opacity: 0, y: -40 },
  left:  { opacity: 0, x: 40 },
  right: { opacity: 0, x: -40 },
}

function FadeIn({ children, delay = 0, direction = 'up', duration = 0.6, className = '' }) {
  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
