export { auth as middleware } from "@auth";
// import { auth } from "@auth";
// export default auth((req) => {
//   console.log({ "req.auth": req.auth, pathName: req.nextUrl.pathname });
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
