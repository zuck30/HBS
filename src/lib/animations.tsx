import React from 'react'
import { motion, useInView } from 'framer-motion'

export const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false
}: {
  children: React.ReactNode,
  delay?: number,
  direction?: "up" | "down" | "left" | "right" | "none",
  fullWidth?: boolean
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: { x: 0, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={fullWidth ? "w-full" : ""}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({
  children,
  delay = 0
}: {
  children: React.ReactNode,
  delay?: number
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
      }}
    >
      {children}
    </motion.div>
  )
}
