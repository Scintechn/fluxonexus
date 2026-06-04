import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { defaultLocale, getDictionary, hreflangMap, isLocale, locales } from "@/lib/i18n";
import { business, addressOneLine } from "@/lib/business";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const url = `${business.siteUrl}/${locale}`;
  return {
    metadataBase: new URL(business.siteUrl),
    title: { default: dict.meta.siteTitle, template: `%s · ${business.brandName}` },
    description: dict.meta.siteDescription,
    applicationName: business.brandName,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}`])),
    },
    openGraph: {
      type: "website",
      url,
      siteName: business.brandName,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      locale: hreflangMap[locale].replace("-", "_"),
    },
    twitter: { card: "summary_large_image", title: dict.meta.siteTitle, description: dict.meta.siteDescription },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: business.legalName,
    alternateName: business.brandName,
    url: `${business.siteUrl}/${locale}`,
    email: business.email.display,
    telephone: business.phone.display,
    foundingDate: String(business.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: business.hours.weekdays.open,
        closes: business.hours.weekdays.close,
      },
    ],
    areaServed: { "@type": "Country", name: "Portugal" },
    sameAs: [business.social.linkedin, business.social.instagram, business.social.facebook],
    description: dict.meta.siteDescription,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[color:var(--color-brand-900)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <Header locale={locale} t={dict.nav} />
      <main id="main">{children}</main>
      <Footer locale={locale} t={dict.footer} nav={dict.nav} />
      <WhatsAppFab message={`Olá FluxoNexus, gostaria de saber mais sobre os vossos serviços. (${addressOneLine()})`} />
      <Script id="ld-business" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <Analytics />
    </>
  );
}
