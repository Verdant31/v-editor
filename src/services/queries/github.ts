import { supabase } from "../supabaseClient";

export const getUserInfo = async () => {
  const { data, error } = await supabase.auth.getUser();
  try {
    if (!error) return data.user;
  }
  catch (error) {
    console.log(error);
  }
}