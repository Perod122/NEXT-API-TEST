"use client"
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/LoadingScreen";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';

export default function SettingsClient({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-4">
        <h1 className="text-3xl  text-black font-bold">Settings</h1>
        <input type="text" disabled className="w-full p-2 border border-gray-300 rounded-md text-black" value={user?.email} />
        <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md">Back to Dashboard</Link>
      </div>

    </div>
  );    
}
