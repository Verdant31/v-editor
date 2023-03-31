import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Title } from './components/Title';

export default function Home() {
  const [ animationHasEnded, setAnimationHasEnded ] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center mt-24">
      <ToastContainer autoClose={2000} />
      <Title updateAnimationStatus={setAnimationHasEnded} />
      {animationHasEnded && (
        <motion.div 
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5}}
          className="mt-12 flex flex-col"
        >
          <p className="text-xl text-center">Choose your playground:</p>
          <div className="flex flex-col mt-6 gap-6">
            <button onClick={() => navigate("/project")} className="h-14 bg-[#8257e5] rounded-md w-80 hover:scale-105 transition-all duration-300">
              <p className="font-monospace uppercase tracking-wider text-lg">React (VITE)</p>
            </button>
            <button className="h-14 bg-[#8257e575] rounded-md w-80 hover:scale-105 transition-all duration-300">
              <p className="font-monospace uppercase tracking-wider text-lg">Javascript</p>
              <p className="font-monospace uppercase tracking-wider text-[10px]">Coming soon...</p>
            </button>
          </div>
        </motion.div>
      )}
    </main>
  )
}
