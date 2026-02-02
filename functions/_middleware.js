export async function onRequest({ request, next }) {
  const auth = request.headers.get("Authorization");

  const USER = "testuser";
  const PASS = "testpass";

  if (!auth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Restricted"',
      },
    });
  }

  const [, encoded] = auth.split(" ");
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  if (user !== USER || pass !== PASS) {
    return new Response("Forbidden", { status: 403 });
  }

  return next();
}
