import { motion } from 'framer-motion';

export default function Topbar() {
  return (
    <motion.div 
      className="w-[100%] bg-[#13111B]"

    >
      <p className="text-white font-semibold tracking-wider font-monospace text-center">Arquivo</p>
    </motion.div>
  )
}
