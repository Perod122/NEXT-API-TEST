import { NextResponse } from "next/server";
import supabase from "@/app/config/supabase";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        
        // Insert into Supabase
        const { data, error } = await supabase.from("Products").insert(body).select();
        
        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to create product" },
            { status: 400 }
        );
    }
}

export async function GET(request: Request) {
    const { data, error } = await supabase.from("Products").select("*");

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}