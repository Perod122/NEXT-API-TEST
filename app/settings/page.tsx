import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsClient from './client';

export default async function Settings() {
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data?.user) {
      redirect('/login')
    }
  
    return <SettingsClient user={data.user} />
  } 