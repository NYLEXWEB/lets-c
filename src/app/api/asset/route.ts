import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    const sourcePath =
      "C:/Users/hnith/.gemini/antigravity/brain/691c68a4-0ce9-426f-a235-e1e9ed468ebe/.user_uploaded/media_1794083912498_b4b59e43.jpg";
    
    // Also copy to public/images for permanent static serving
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    const targetPath = path.join(publicImagesDir, "letsc-penguins.jpg");
    
    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, targetPath);
      } catch (e) {
        // Continue if copy fails
      }

      const fileBuffer = fs.readFileSync(sourcePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (fs.existsSync(targetPath)) {
      const fileBuffer = fs.readFileSync(targetPath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Not found", { status: 404 });
  } catch (err: any) {
    return new NextResponse(err?.message || "Server Error", { status: 500 });
  }
}

