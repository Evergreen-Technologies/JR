import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// export function middleware(req: NextRequest) {
//   console.log(req.nextUrl);
//   const res = NextResponse.next();
//   res.headers.append("ACCESS-CONTROL-ALLOW-ORIGIN", "*");
//   return res;
// }

export const config = { matcher: ["/admin/:path*"] };
