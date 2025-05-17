import { NextResponse } from "next/server";
import supabase from "@/app/config/supabase";

export async function POST(request: Request) {
    
    const { data, error } = await supabase.from("Products").insert(request.body);
    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
    return NextResponse.json(data);
}


