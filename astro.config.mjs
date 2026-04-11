import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [react()],

  // Replace with your domain
  site: 'https://sanctuary.example.com',

  adapter: cloudflare()
});