# Cubs Bakery & Cakes — working frontend demo

React + Vite + TypeScript storefront and owner desk. No backend, authentication, payment gateway or messaging service. All records are browser-local. Use the Customer / Admin switch to move between experiences.

## Run

Requires Node 22.12+ and npm.

```sh
npm install --legacy-peer-deps
npm run dev
```

Open the Local URL printed by Vite. For a production bundle run `npm run build`; serve `dist/` with an SPA fallback to `index.html`. Run `npm test` for financial, menu, lead-time, capacity and persisted-data checks. A lockfile is included. Monetary values are integer paise; bookings display in Asia/Kolkata.

## Try the connected workflows

- Browse `/menu`, open a product, choose a quantity, add to bag, and proceed to checkout.
- Use a future fulfillment time between configured hours. Cakes require 24 hours notice by default. No cake weights or flavours were invented.
- Apply sample code `CUBS10` for 10% off. Choose demo success or demo failure. Failure saves the order, and Retry pays the same order reference.
- Open Admin → Orders to change the status, then use Details → Customer tracking. Order history is available under Your orders in the footer.
- Request a table, then confirm or decline in Admin → Reservations. Requests and confirmations are separate from cake preorders.
- Toggle a product off in Menu & Products. It becomes unavailable, and a previously filled cart cannot buy it. Price changes require removing and re-adding the line.
- Edit/add/archive products; purchase snapshots preserve old names and prices. Uploaded images are limited to 500 KB; storage errors produce feedback.
- Payments supports simulated full refunds. Refunds remove the order from net revenue and eligible loyalty spending. Dashboard reporting currently attributes net paid orders to their order-created month, rather than cash settlement/refund event month.
- Customer Retention shows paid spending and points, repeat/new customers and inactivity. Generate a replacement sample code there; edit rules in Settings.
- Refresh to verify persistence. Settings → Reset demo data requires confirmation and restores the source menu and fictional records.

## Extracted source and review

The menu in `src/menu.ts` contains the legible items and prices from the supplied screenshots, with descriptions where legible. The supplied Cubs paw logo is displayed without changing its proportions. Photographs are illustrative Unsplash images, not actual Cubs products; unavailable remote images have a local UI fallback. Fonts are requested from Google Fonts with local fallbacks.

Business details supplied: No.39, 2, Gokulam Main Rd, Gokulam 2nd Stage, Vani Vilas Mohalla, Mysuru, Karnataka 570002; telephone 0821 424 6688; closing time 23:30; reported ₹200–400 per person (context only, not an order price).

Needs owner review:

1. Printed menu photos are too small to confirm extra items, cake weights, flavours and customization prices.
2. Portion sizes for ₹550–₹1,320 pastry/cake entries are not supplied. Current ordering offers the named menu item at the screenshot price; no size or flavour options or surcharges are fabricated.
3. A cropped “Mango Strawberry With Butterscotch…” entry shows ₹1,100 but lacks the full name, so it is not sold.
4. Opening time is unknown. 09:00 opening, ₹40 delivery, Mysuru delivery coverage, 24-hour cake lead time, 60-minute reservation slots / 20 guests, loyalty and discounts are editable demo rules.
5. Obtain actual product photographs before production.

The same list is editable in Admin → Menu & Products → Needs review. Unknown prices may be left blank and cannot be purchased.

## Verification

Automated tests cover unique menu IDs and integer prices, discounts and fees, seeded order/payment consistency, refund eligibility, cake lead time, overlapping capacity, and corrupt saved data. TypeScript and the production build are checked. Browser checks performed are recorded in `VERIFICATION.md`.

Implementation uses shared components in `src/components/shared.tsx`, customer routes in `src/features/storefront.tsx`, owner routes in `src/features/admin.tsx`, shared context in `src/state.tsx`, domain rules in `src/data.ts`, extracted menu in `src/menu.ts`, and responsive styling in `src/style.css`. The entry point is `src/main.tsx`.
"# Cuba" 
"# Cuba" 
