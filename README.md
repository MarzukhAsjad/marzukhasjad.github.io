# Marzukh Portfolio

This portfolio is built with React, TypeScript, and Vite, and now includes a markdown-driven blog publishing pipeline.

## Blog publishing flow

Each blog post now lives in a single markdown file under `src\content`. Frontmatter is the source of truth for blog metadata, previews, and routing.

### Required frontmatter

```md
---
title: Replace with your post title
subtitle: Replace with the short subtitle shown on the blog card and post page
date: 2026-01-01
author: Marzukh Akib Asjad
slug: replace-with-a-url-safe-slug
description: Replace with the short excerpt shown on the blog card
coverImage: /blog-folder/cover-image.png
featured: false
draft: false
sortOrder: 999
tags:
  - replace-tag
---
```

Use `src\content\_template.md` as the starting point for new posts.

### Publishing a new post

1. Create a new markdown file in `src\content`.
2. Fill in the required frontmatter.
3. Add any referenced images under `public\...`.
4. Push the branch to GitHub.

To unpublish a post, delete its markdown file from `src\content` and remove any no-longer-needed assets from `public\...`. The next generated manifest and deployment will remove the blog post route and preview automatically.

The build runs `npm run blog:generate`, which scans the current contents of `src\content`, validates the markdown contract, regenerates `src\generated\blog-content.ts`, and then builds the site. New markdown files are added automatically, and deleted markdown files are removed automatically from the generated manifest.

## GitHub Actions flow

- `.github\workflows\blog-build.yml` runs on every push and pull request that changes the site or blog pipeline.
- `.github\workflows\blog-deploy.yml` runs only on pushes to `dev`, so deployment happens after code is merged to `dev`, not before.
- To make the build pipeline block merges, add **Blog Build** as a required status check in the repository branch protection rules for the target branch.

### Local commands

- `npm run dev` - start the Vite dev server
- `npm run blog:generate` - regenerate blog metadata from markdown
- `npm run build` - regenerate blog metadata and build the production site
- `npm run lint` - run ESLint
