import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://connect0459.github.io",
  base: "met-docs", // GitHub Pagesにデプロイするときのみコメントアウト
  integrations: [
    starlight({
      /**
       * プロパティの詳細はStarlightの公式ドキュメントを見て設定
       * https://starlight.astro.build/ja/reference/configuration/
       */
      title: "Met Docs",
      lastUpdated: true,
      // favicon: "/icons/favicon.ico",
      favicon: "/favicon.svg",
      head: [
        // Google Analytics 4
        // GitHub Actions の Secrets に設定した値を使用
        {
          tag: "script",
          attrs: {
            src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA4_ID}`,
            async: true,
          },
        },
        {
          tag: "script",
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.PUBLIC_GA4_ID}');
          `,
        },
        // webmanifest
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/manifest.webmanifest",
          },
        },
        // icon
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/icons/favicon.ico",
            sizes: "any",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/icons/icon-500x500.svg",
            type: "image/svg+xml",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/icons/apple-touch-icon.png",
            sizes: "180x180",
          },
        },
      ],
      logo: {
        // light: "./src/assets/logos/logo-sftech-rectangle-light.png",
        // dark: "./src/assets/logos/logo-sftech-rectangle-dark.png",
        src: "./src/assets/logo-starlight.png",
        alt: "ロゴ-met",
        replacesTitle: true,
      },
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/connect0459",
        },
      ],
      sidebar: [
        {
          label: "ガイド",
          autogenerate: { directory: "guides" },
        },
        {
          label: "開発環境",
          autogenerate: { directory: "environments" },
        },
        {
          label: "Python",
          autogenerate: { directory: "python" },
        },
        {
          label: "PyPI",
          autogenerate: { directory: "pypi" },
        },
        {
          label: "SSH",
          autogenerate: { directory: "secure-shell" },
        },
      ],
    }),
  ],
});
