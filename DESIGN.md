---
name: Cubs Bakery & Cakes
description: Warm editorial storefront and restrained operational owner desk
colors:
  brand: "#793c2e"
  brand-hover: "#542a20"
  gold: "#e9c483"
  canvas: "#fcfaf5"
  ink: "#38271e"
  muted: "#776c5e"
  divider: "#e5ded2"
  control-text: "#fffaf1"
  input-surface: "#fffefa"
  admin-canvas: "#f8f7f2"
  admin-panel: "#fffdf9"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(45px, 5.8vw, 82px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.7
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 500
rounded:
  control: "5px"
  image: "8px"
  detail-image: "12px"
spacing:
  desktop-inset: "6.3%"
  mobile-inset: "22px"
  mobile-hero-inset: "23px"
  admin-inset: "35px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.control-text}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  input:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 13px"
---

# Design System: Cubs Bakery & Cakes

## Overview

Warm editorial bakery storefront; restrained operational owner desk. Preserve the supplied Cubs paw logo at its original aspect ratio and the warm brand palette. Photographs are illustrative and labelled.

This record describes the shipped CSS. It is a code-led implementation with no approved visual comp; no detector ran because the engine was unavailable.

## Colors

### Primary
Warm brown brand anchors primary actions and storefront emphasis. Its deeper hover shade marks interaction.

### Secondary
Supporting gold accents the circular hero stamp.

### Neutral
Cream canvas, brown ink, muted supporting text and warm dividers establish the storefront. The owner desk uses a slightly cooler cream canvas and pale panels. Local announcement and navigation brown variants remain as implemented.

## Typography

Playfair Display with Georgia/serif fallback supplies customer headings, product names and owner KPI numerals. DM Sans with sans-serif fallback supplies body text, controls, navigation and owner panel headings. Owner page titles retain Playfair Display; the interface is not exclusively sans serif.

The hero display uses the frontmatter scale, becomes 58px on mobile and 88px from 1500px. General headings use a separate clamp of 36px–61px. Body paragraphs use the body token; compact owner tables use 11px text and 9px headers.

## Layout

Main storefront desktop inset and mobile inset follow the frontmatter. The mobile hero and footer use the slightly wider hero inset. Product grids use four desktop columns with 32px by 23px gaps, becoming two columns with 28px by 15px gaps at 700px. Main content is capped at 1500px on wide screens.

The owner sidebar is fixed at 225px, narrows to 190px at 1050px, and becomes a collapsible overlay at 700px. Owner content uses 25px 35px 55px padding, 22px at the intermediate breakpoint, and 18px 15px 35px on mobile. Tables scroll horizontally. Customer split layouts stack on mobile.

## Elevation & Depth

Tonal surfaces and thin warm borders carry most separation. Shadows are limited to floating feedback, mobile navigation, the active demo switch and photographic text legibility.

## Shapes

Controls have gently curved corners. Product cards and owner panels use the image radius; detail photos use the larger detail-image radius. Hero and reservation photography has arched tops, with circular stamps and round add buttons. Notice and form containers retain their local 6px–10px radii.

## Components

Primary buttons use the frontmatter assignments with a 46px minimum height, 600 weight and 13px type; compact owner-table actions are smaller. Hover transitions take 0.18s. Secondary actions use warm pale fills. Disabled buttons reduce opacity to 0.45.

Inputs have a warm light surface and a 1px #d7cdbe border. Shared focus-visible styling uses a 3px #b47731 outline offset by 4px. Category chips use divider borders, becoming brand-filled when selected. Product cards remain visually open; owner panels use pale fill, a divider border and 25px padding.

Store navigation marks the active link with a brown underline. Owner navigation uses a filled brown active item. Both navigation systems collapse at the mobile breakpoint. Product-image hover scales imagery to 1.035 over 0.3s. Reduced-motion preference removes transitions and animations.

## Do's and Don'ts

- Do retain the warm logo-led palette and original logo aspect ratio.
- Do keep the customer display hierarchy and practical owner data density.
- Do provide visible focus and labelled illustrative imagery.
- Don't describe every image or container as having the same radius; arches and local container variants are part of the shipped system.
