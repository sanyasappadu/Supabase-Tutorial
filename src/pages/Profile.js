import React from 'react'
import {useEffect, useState} from "react"
import supabase from '../config/supabaseClient'

function Profile() {
  const [user, setUser ] = useState(null); 

  const loginGithub = async () => {
    await supabase.auth.signIn({
      provider : "github",
    })
  }
  const loginGoogle = async () => {
    await supabase.auth.signIn({
      provider : "google",
    })
  }
  const logout = async () => {
    await supabase.auth.signOut()
  }
  const createProfile = async (id) => {
    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the "not found" error
      console.error('Error checking existing profile:', fetchError);
      return;
    }

    // Only create profile if it doesn't exist
    if (!existingProfile) {
      const { data, error } = await supabase
        .from('users')
        .insert([{ id: id }]);
      const { prfileData } = await supabase
        .from('profiles')
        .insert([{ id: id }]);

      if (error) {
        console.error('Error creating profile:', error);
      }
      if (data) {
        console.log('Profile created:', data, prfileData);
      }
    }
  }
  useEffect(() => {
    async function getSession() {
      const session = await supabase.auth.session();
      setUser(session?.user);
      console.log(session?.user.id);
      if (session?.user) {
        createProfile(session?.user.id);
      }
    }
    
    getSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <div>
      {user?
      <div>
        <h4>User Authenticated</h4>
        <button onClick={logout}>Logout</button>

      </div>:
      <div>
      <button onClick={loginGithub}>Login with github</button>
      <button onClick={loginGoogle}>Login with google</button>
      </div>
      }
    </div>
  )
}

export default Profile