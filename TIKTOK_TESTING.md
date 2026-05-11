# TikTok Testing Workflow

This project sends TikTok events from two places:

- Browser-side TikTok Pixel
- Server-side TikTok Events API

TikTok's Test Events UI is useful, but it is not the source of truth for every event. Some valid events may be delayed or may not appear in the UI consistently.

## Source of Truth

- Browser events: Chrome DevTools `Network` tab with filter `tiktok`
- Server events: Vercel runtime logs
- TikTok Test Events UI: secondary confirmation only

## Events We Expect

- `ViewContent` when a user selects a protocol CTA
- `InitiateCheckout` when checkout opens
- `Lead` / `Submit form` after checkout submission
- `Purchase` after the admin marks the order `paid` or `completed`

## Always Start With a Fresh Test Link

Do not reuse old TikTok test URLs.

Each time:

1. Open TikTok Events Manager
2. Open the pixel
3. Go to `Test events`
4. Click `Open website`

This gives a fresh URL with the current `tt_test_event_code` / `tt_test_id`.

## Browser-Side Verification

Use this to verify `ViewContent` and `InitiateCheckout`.

1. Open the fresh TikTok test link
2. Open Chrome DevTools
3. Go to `Network`
4. Filter by `tiktok`
5. Clear the request list
6. Trigger the action you want to test
7. Click the new TikTok request
8. Check `Payload`

Expected browser events:

- `event: "ViewContent"` after clicking a protocol CTA such as `Enroll: Trial`
- `event: "InitiateCheckout"` when the checkout modal opens

## Server-Side Verification

Use this to verify `Lead` and `Purchase`.

### Lead

1. Complete checkout submission from the fresh TikTok test session
2. Open Vercel runtime logs for the latest production deployment
3. Search for:

```text
TikTok lead event sent
```

Or search by order number.

### Purchase

1. Open `/admin/orders`
2. Find the test order
3. Mark it `paid` or `completed`
4. Open Vercel runtime logs
5. Search for:

```text
TikTok purchase event sent
```

Or search by order number.

Successful server send logs look like:

- `TikTok lead event sent`
- `TikTok purchase event sent`

If runtime logs show a successful send, treat that as success even if TikTok Test Events does not display the event.

## Known TikTok UI Limitations

These behaviors were observed and are not currently treated as app bugs:

- TikTok Test Events may not show every browser event consistently
- TikTok Test Events may not show `Purchase` even when Vercel logs confirm it was sent successfully
- Diagnostics can take hours to update after changes

## Known Good Behavior in This Repo

- Test event codes are stored with a TTL instead of persisting indefinitely
- Browser-side identify is used to improve match quality
- Philippine phone numbers are normalized to `639XXXXXXXXX`
- `ViewContent` is sent on protocol selection
- `InitiateCheckout` is sent on checkout open
- `Lead` and `Purchase` are sent from the server and logged in Vercel

## If a Test "Doesn't Appear"

Check in this order:

1. Confirm you used a fresh TikTok test link
2. Confirm browser payloads in DevTools `Network`
3. Confirm server logs in Vercel
4. Only then check TikTok Test Events UI

If Vercel runtime logs show the send succeeded, the integration is working even if TikTok's UI is incomplete.
