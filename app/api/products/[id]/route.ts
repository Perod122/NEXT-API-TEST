import { NextResponse } from "next/server";
import supabase from "@/app/config/supabase";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: number }> } //params is actually a Promise that needs to be awaited.
) {
    const id  = (await context.params).id; //await the promise to get the id

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }
  
  const { data, error } = await supabase.from("Products").delete().eq("id", id);
  
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ success: true, data });
}

export async function GET(
    req: Request, 
    context: { params: Promise<{ id: number }> }
) {
  const id  = (await context.params).id;

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }
  
  const { data, error } = await supabase.from("Products").select("*").eq("id", id).single();
  
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.code === "PGRST116" ? 404 : 500 }
    );
  }
  
  return NextResponse.json(data);
} 