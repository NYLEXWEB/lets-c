import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const cwd = process.cwd();
    
    // Check git remote
    let remoteOutput = "";
    try {
      remoteOutput = execSync("git remote -v", { cwd, encoding: "utf8" });
    } catch (e: any) {
      remoteOutput = e.message;
    }

    // Set remote
    try {
      execSync("git remote remove origin", { cwd, stdio: "ignore" });
    } catch {}

    execSync("git remote add origin https://github.com/NithanthHarsha/letsc.git", { cwd, encoding: "utf8" });
    
    // Add and commit
    execSync("git add .", { cwd, encoding: "utf8" });
    
    let commitOutput = "";
    try {
      commitOutput = execSync('git commit -m "Update Let\'s C website with HandySquad workflow and cleanings"', { cwd, encoding: "utf8" });
    } catch (e: any) {
      commitOutput = "Nothing to commit or already committed: " + e.message;
    }

    // Push
    let pushOutput = "";
    try {
      pushOutput = execSync("git push -u origin main --force", { cwd, encoding: "utf8" });
    } catch (e: any) {
      try {
        pushOutput = execSync("git push -u origin master --force", { cwd, encoding: "utf8" });
      } catch (err: any) {
        pushOutput = "Push error: " + err.message;
      }
    }

    return NextResponse.json({
      status: "success",
      remote: remoteOutput,
      commit: commitOutput,
      push: pushOutput,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
