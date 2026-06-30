/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_CONTACT_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}