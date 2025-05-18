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
  const id = (await context.params).id;

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }
  
  // First check if the product exists
  const { data: checkData, count, error: checkError } = await supabase
    .from("Products")
    .select("*", { count: "exact" })
    .eq("id", id);
    
  if (checkError) {
    return NextResponse.json(
      { error: `We have internal error with this ${id}` },
      { status: 404 }
    );
  }
  
  // If product exists, get it with single()
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  return NextResponse.json(data);
} 