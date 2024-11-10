import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json({ error: "Code is wrong" }, { status: 400 });
    }
    const verficationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });
    if (!verficationCode) {
      return NextResponse.json({ error: "wrong code" }, { status: 400 });
    }
    await prisma.user.update({
      where: {
        id: verficationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });
    await prisma.verificationCode.delete({
      where: {
        id: verficationCode.id,
      },
    });
    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (error) {
    console.error(error);
    console.log("[VERIFY_GET] Server error", error);
  }
}
