// Verified business details — see docs/content-sources.md for the source of every value.

export const site = {
  name: 'Interior Design Studio & School by JTG',
  shortName: 'JTG',
  studioName: 'Interior Design by JTG',
  schoolName: 'Interior Design School by JTG',
  founder: 'Jemma Ter-Grigoryan',
  founded: 2022,
  city: 'Yerevan',
  country: 'Armenia',
  description:
    'Interior design studio and interior design school in Yerevan, founded in 2022 by designer Jemma Ter-Grigoryan. Interior, exterior and landscape design — and practical design education.',
  phone: '+374 98 722727',
  phoneHref: 'tel:+37498722727',
  email: 'jemmatergrigoryan@gmail.com',
  address: {
    street: 'Koryun St. 21, 2nd floor',
    district: 'Kentron',
    city: 'Yerevan',
    postalCode: '0009',
    country: 'Armenia',
    countryCode: 'AM',
    lat: 40.189954,
    lng: 44.520516,
  },
  maps: {
    google: 'https://www.google.com/maps/search/?api=1&query=40.189954%2C44.520516',
    twoGis: 'https://2gis.am/yerevan/firm/70000001090521278',
  },
  social: {
    studioInstagram: { label: '@interior_design_by_jtg', href: 'https://www.instagram.com/interior_design_by_jtg/' },
    schoolInstagram: { label: '@interior_design_school_by_jtg', href: 'https://www.instagram.com/interior_design_school_by_jtg/' },
    founderInstagram: { label: '@jemmatergrigoryan', href: 'https://www.instagram.com/jemmatergrigoryan/' },
    facebook: { label: 'Interior design by JTG', href: 'https://www.facebook.com/profile.php?id=100083204438599' },
    youtube: { label: 'Interior Design Studio & School by JTG', href: 'https://www.youtube.com/@interiordesignschoolbyjtg' },
    threads: { label: '@interior_design_by_jtg', href: 'https://www.threads.com/@interior_design_by_jtg' },
  },
  languages: ['Armenian', 'English'],
} as const;

export const nav = [
  { label: 'Interior Design', href: '/interior-design/' },
  { label: 'Design School', href: '/design-school/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;
