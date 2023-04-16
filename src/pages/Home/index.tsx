import { motion } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../services/queries/github';
import { supabase } from '../../services/supabaseClient';
import { Title } from './components/Title';

export default function Home() {
  const [ animationHasEnded, setAnimationHasEnded ] = useState(false);
  const navigate = useNavigate();
  
  const { data: user, isLoading } = useQuery('getUser', getUserInfo);

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  async function signout() {
    await supabase.auth.signOut().then(() => window.location.reload())
  }
  
  const userIsAuthenticated = user && user.role === 'authenticated';
  const userName = userIsAuthenticated ? user.user_metadata.user_name : 'stranger'


  if(isLoading) return null;
  
  return (
    <main className="flex relative flex-col justify-center items-center pt-24">
      {userIsAuthenticated && (
        <motion.div 
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5}}
          className="absolute top-4 right-12 allcenter gap-4"
        >
          <img src="github.svg" className="w-8 h-8"/>
          <button onClick={signout} className="font-monospace border-b-[3px] w-[80px] border-[#8257e5]">Sign out</button>
        </motion.div>
      )}

      <Title userName={userName} updateAnimationStatus={setAnimationHasEnded} />
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
            {!userIsAuthenticated && (
              <button onClick={signInWithGitHub} className="h-14 bg-[#8257e5] rounded-md w-80 hover:scale-105 transition-all duration-300">
                <p className="font-monospace uppercase tracking-wider text-lg">Sign in</p>
              </button>
            )}
         
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
