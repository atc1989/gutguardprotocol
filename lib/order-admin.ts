export function isOrderAdminAuthorized(request: Request) {
  const adminToken = process.env.ORDER_ADMIN_TOKEN;

  if (!adminToken) {
    return false;
  }

  const authorization = request.headers.get("authorization");

  return authorization === `Bearer ${adminToken}`;
}
