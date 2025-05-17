"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export default function DashboardClient({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading..."/>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl text-black font-semibold mb-4">Welcome, {user?.user_metadata?.firstname || user?.email}</h2>
          <p className="text-gray-600">You are successfully logged in!</p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Account Details:</h3>
          <div className="bg-gray-50 p-4 rounded-lg overflow-auto">
            <pre className="text-sm text-black">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
} 