import ImageKit from "imagekit";
import { NextResponse } from "next/server";

import config from "@/lib/config";

const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publicKey!,
  privateKey: config.env.imagekit.privateKey!,
  urlEndpoint: config.env.imagekit.urlEndpoint!,
});

// export async function GET() {
//   return NextResponse.json(imagekit.getAuthenticationParameters());
// }


export async function GET() {
  const response = NextResponse.json(imagekit.getAuthenticationParameters());
  
  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "https://learnable-dep.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}