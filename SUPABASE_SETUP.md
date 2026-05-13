# Supabase Setup Order

This project is already wired to Supabase for `leads` and `orders`.

## 1. Local env vars

Done in `.env.local`.

Required values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
ORDER_ADMIN_TOKEN=<your-random-admin-token>
```

Notes:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the browser-safe `sb_publishable_...` key.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only.
- `ORDER_ADMIN_TOKEN` is used by the admin status update endpoint.

## 2. Database schema

Run `supabase/schema.sql` in Supabase SQL Editor.

This creates:
- `public.leads`
- `public.orders`
- indexes for email and created timestamps
- unique protection for duplicate lead emails
- unique protection for duplicate pending orders on the same email + protocol

## 3. Restart local dev server

After changing `.env.local`:

```bash
npm run dev
```

## 4. Test the lead form

Use the `Send Free Guide` form on the site.

Expected:
- first submit inserts into `public.leads`
- second submit with the same email shows `This email is already on the list.`

## 5. Test checkout

Complete checkout and click `Place Order`.

Expected:
- first submit inserts into `public.orders`
- second submit with the same email and same protocol while still `pending` reuses the existing order

## 6. Verify in Supabase Table Editor

Check:
- `public.leads`
- `public.orders`

## 7. Use defined order statuses

Supported statuses:
- `pending`
- `paid`
- `shipped`
- `completed`
- `cancelled`

These are enforced in app code and in the database schema.

## 8. Update order status safely

This repo now has a guarded admin endpoint:

```http
PATCH /api/orders/:orderNumber
Authorization: Bearer <ORDER_ADMIN_TOKEN>
Content-Type: application/json
```

Body:

```json
{
  "status": "paid"
}
```

Example:

```bash
curl -X PATCH http://localhost:3000/api/orders/GG-260504-GROW-1BZD ^
  -H "Authorization: Bearer <ORDER_ADMIN_TOKEN>" ^
  -H "Content-Type: application/json" ^
  -d "{\"status\":\"paid\"}"
```

## 9. Retire old leaked legacy keys

Do not use old JWT-style `anon` or `service_role` keys if they were ever exposed.

Use only:
- `sb_publishable_...`
- `sb_secret_...`

## 10. Add env vars to hosting

When deploying, add the same values to your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ORDER_ADMIN_TOKEN`

## 11. RLS policy note

RLS is enabled on the tables.

Right now this app writes through server routes using the secret key, so explicit public policies are not required yet.

Only add client-facing policies when you start reading or writing tables directly from the browser.

## 12. Next improvements

Recommended next work:
- use the internal admin UI at `/admin/orders` for reviewing and updating orders
- send transactional emails for lead and order confirmation
- store numeric pricing fields separately from display strings
- add patient auth and storage only when needed
