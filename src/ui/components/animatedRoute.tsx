import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

const AnimatedRoute: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => (
  <motion.div
    className={className}
    initial={{
      opacity: 0,
      scale: 1.1,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 1.1,
    }}
    transition={{
      duration: 0.15,
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedRoute;
