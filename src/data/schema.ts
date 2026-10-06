import { site } from './site';

const address = {
  '@type': 'PostalAddress',
  streetAddress: 'Koryun St. 21, 2nd floor',
  addressLocality: 'Yerevan',
  addressRegion: 'Kentron',
  postalCode: site.address.postalCode,
  addressCountry: site.address.countryCode,
};
const geo = { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng };

export const ids = (origin: URL | string) => {
  const base = new URL('/', origin).href;
  return {
    studio: `${base}#studio`,
    school: `${base}#school`,
    founder: `${base}about/#jemma-ter-grigoryan`,
    website: `${base}#website`,
  };
};

export function studioSchema(origin: URL | string) {
  const id = ids(origin);
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': id.studio,
    name: site.studioName,
    alternateName: site.name,
    description:
      'Interior, exterior and landscape design studio in Yerevan, founded in 2022 by interior designer Jemma Ter-Grigoryan.',
    url: new URL('/interior-design/', origin).href,
    telephone: '+37498722727',
    email: site.email,
    foundingDate: String(site.founded),
    founder: { '@id': id.founder },
    address,
    geo,
    areaServed: [{ '@type': 'City', name: 'Yerevan' }, { '@type': 'Country', name: 'Armenia' }],
    knowsLanguage: ['hy', 'en'],
    sameAs: [site.social.studioInstagram.href, site.social.facebook.href, site.social.youtube.href, site.social.threads.href],
  };
}

export function schoolSchema(origin: URL | string) {
  const id = ids(origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': id.school,
    name: site.schoolName,
    description:
      'Interior design school in Yerevan teaching 3ds Max, Corona Renderer, Photoshop and ArchiCAD / Revit — in person and online, in Armenian and English.',
    url: new URL('/design-school/', origin).href,
    telephone: '+37498722727',
    email: site.email,
    foundingDate: String(site.founded),
    founder: { '@id': id.founder },
    address,
    sameAs: [site.social.schoolInstagram.href, site.social.youtube.href],
  };
}

export function courseSchema(origin: URL | string) {
  const id = ids(origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Interior Design Course',
    description:
      'Practical interior design course: space planning, 3D modelling in 3ds Max, visualisation in Corona Renderer, Photoshop post-production and ArchiCAD / Revit drawings, finishing with a portfolio and certificate.',
    provider: { '@type': 'EducationalOrganization', '@id': id.school, name: site.schoolName },
    inLanguage: ['hy', 'en'],
    educationalCredentialAwarded: 'Certificate',
    hasCourseInstance: [
      { '@type': 'CourseInstance', courseMode: 'onsite', location: { '@type': 'Place', name: site.schoolName, address } },
      { '@type': 'CourseInstance', courseMode: 'online' },
    ],
  };
}

export function founderSchema(origin: URL | string) {
  const id = ids(origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': id.founder,
    name: site.founder,
    jobTitle: 'Interior Designer',
    description: 'Interior designer and founder of Interior Design Studio & School by JTG in Yerevan.',
    worksFor: [{ '@id': id.studio }, { '@id': id.school }],
    knowsLanguage: ['hy', 'en'],
    address: { '@type': 'PostalAddress', addressLocality: 'Yerevan', addressCountry: 'AM' },
    sameAs: [site.social.founderInstagram.href],
    url: new URL('/about/', origin).href,
  };
}

export function websiteSchema(origin: URL | string) {
  const id = ids(origin);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': id.website,
    name: site.name,
    url: new URL('/', origin).href,
    inLanguage: 'en',
    publisher: { '@id': id.studio },
  };
}

export function breadcrumbSchema(origin: URL | string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, origin).href,
    })),
  };
}
