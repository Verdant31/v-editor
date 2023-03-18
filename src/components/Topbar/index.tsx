import { motion } from 'framer-motion';

export default function Topbar() {
  return (
    <motion.div className="w-[100%] flex items-center justify-center gap-4 bg-[#13111B]">
      <p className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer">
        New file
      </p>
      <p className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer">
        Github
      </p>
      <p className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer">
        Linkedin
      </p>
      <p className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer">
        Donate
      </p>
    </motion.div>
  )
}
