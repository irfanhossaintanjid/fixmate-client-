<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# FixMate — Premium Responsive Navbar UI Design

Act as a senior UI/UX designer. Design a premium, modern, clean, and fully responsive navigation bar for the FixMate Smart Device & Home Appliance Repair Service Platform.

Use the uploaded screenshot as the primary visual reference. Maintain its overall layout, spacing, alignment, visual simplicity, and Purple & Indigo brand identity while improving its professional appearance.

**Important: Create UI design only. Do not generate code or implementation instructions.**

## 1. Brand Identity

- Brand Name: FixMate
- Design Style: Premium, Modern, Minimal, Professional.
- Primary Color: #5145CD
- Deep Purple: #18112B
- Royal Indigo: #312E81
- Electric Indigo: #6366F1
- Soft Periwinkle: #A5B4FC
- Background: #F2F0FA
- Navbar Background: #FFFFFF
- Border: #E5E1F0

Use the exact brand colors.

## 2. Desktop Navbar Layout

Create a horizontal, sticky navigation bar with three clearly separated areas.

### Left Section — Brand Logo

- Use the FixMate icon-only logo.
- Place the brand name "FixMate" beside the icon.
- Use Deep Purple (#18112B) for the brand name.
- Keep the logo compact, recognizable, and professionally aligned.
- Maintain consistent logo dimensions across all pages.

### Center Section — Navigation Links

Include these navigation items in this exact order:

1. Home
2. Services
3. About
4. How It Works

Requirements:
- Use clean, modern typography.
- Keep consistent spacing between links.
- Highlight the active navigation item.
- Active link should have a subtle Lavender Mist background (#F2F0FA) or a soft purple-tinted background.
- Active text should use Primary Purple (#5145CD).
- Add smooth hover states using the Electric Indigo color.
- Avoid excessive underlines, borders, or decorative effects.

### Right Section — Authentication Actions

For logged-out users, show:

- Sign In — Minimal secondary button or text-style button.
- Sign Up — Prominent primary button with #5145CD background and white text.

Button requirements:
- Consistent height.
- Balanced horizontal padding.
- Smooth rounded corners.
- Subtle hover and focus states.
- Professional appearance.

## 3. Logged-In Navbar State

Create a separate logged-in variation.

Replace the Sign In and Sign Up buttons with:

- User profile avatar.
- User name (where space allows).
- Small dropdown indicator.

When the avatar is clicked, show a premium dropdown menu containing:

1. User Name
2. Role Badge — Customer / Technician / Admin
3. Divider
4. Dashboard
5. Update Profile
6. Sign Out

Requirements:
- Role badge should use a subtle color background.
- Dropdown should have a clean white surface, soft shadow, and subtle border.
- Include suitable icons for menu items.
- Keep the dropdown aligned with the avatar.
- Ensure it looks polished and easy to navigate.

## 4. Sticky Navbar Behavior

- Navbar must remain visible while scrolling.
- Use a clean white background.
- Add a subtle bottom border or very soft shadow.
- Keep the navbar height consistent across public pages.
- Clearly indicate the currently active route.

## 5. Mobile Responsive Navbar

Design a separate mobile version for screens around 375px wide.

Mobile layout:
- FixMate logo and brand name on the left.
- Hamburger menu button on the right.

When opened, show a clean mobile navigation menu containing:

- Home
- Services
- About
- How It Works
- Sign In
- Sign Up

For logged-in users, show:
- Profile information
- Role badge
- Dashboard
- Update Profile
- Sign Out

Requirements:
- Use a clean vertical layout.
- Make menu items easy to tap.
- Use clear active navigation states.
- Avoid horizontal overflow.
- Maintain consistent brand colors and typography.

## 6. Light and Dark Mode

Create both theme variations.

### Light Mode
- Navbar: #FFFFFF
- Brand: #18112B
- Navigation text: #6B6680
- Active item: #5145CD
- Active background: #F2F0FA
- Border: #E5E1F0

### Dark Mode
- Navbar: #18112B
- Brand: #F8FAFC
- Navigation text: #C5C1D6
- Active item: #A5B4FC
- Active background: #312E45
- Border: #403953

Include a subtle theme toggle if space permits.

## 7. Design Consistency

- Use Inter or Plus Jakarta Sans typography.
- Maintain consistent spacing and alignment.
- Use clean Lucide-style icons.
- Avoid oversized navigation elements.
- Avoid unnecessary gradients.
- Keep the navbar visually lightweight.
- Use the same logo, font, button style, and color system throughout the FixMate website.
- Ensure excellent contrast and accessibility.

## 8. Required Design Variations

Generate these four navbar design states:

1. Desktop — Logged Out
2. Desktop — Logged In with Profile Dropdown Open
3. Mobile — Logged Out with Hamburger Menu Open
4. Mobile — Logged In with Navigation Menu Open

Use the uploaded screenshot as a visual reference, not as something to copy pixel by pixel.

## Final Instruction

The final navbar should look like a premium, production-ready service marketplace navigation system.

Prioritize clean alignment, professional spacing, visual consistency, responsive behavior, and a distinctive Purple & Indigo brand identity.

Do not redesign the entire homepage. Focus exclusively on the FixMate Navbar UI.
