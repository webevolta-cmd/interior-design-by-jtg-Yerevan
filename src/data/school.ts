// School content. Software list, formats and languages: YouTube channel description.
// Lesson topics: the school's own published lesson clips (2024–2026). See docs/content-sources.md.

export const software = [
  {
    name: '3ds Max',
    role: '3D modelling',
    text: 'Modelling rooms, furniture and soft furnishings — from Edit Poly fundamentals to detailed pieces such as curtains, cushions and design-classic chairs.',
  },
  {
    name: 'Corona Renderer',
    role: 'Visualisation',
    text: 'Materials, light and camera for photorealistic interior and exterior visualisations — the same way the studio presents its own projects.',
  },
  {
    name: 'Photoshop',
    role: 'Post-production',
    text: 'Finishing visualisations and presentation boards: colour matching, texture changes and perspective correction.',
  },
  {
    name: 'ArchiCAD\u00a0/ Revit',
    role: 'Drawings & documentation',
    text: 'Plans, sections and working drawings — including profile management in ArchiCAD — so a design can actually be built.',
  },
] as const;

export const curriculum = [
  { title: 'Measuring a real space', text: 'Practical lessons on site: measuring an existing space on a real project and turning it into accurate drawings.' },
  { title: 'Planning & standards', text: 'Space planning and the dimensional standards behind well-designed kitchens and bedrooms.' },
  { title: 'Modelling in 3ds Max', text: 'Building the room and its furniture as precise, lightweight 3D models.' },
  { title: 'Materials, light & rendering', text: 'Corona materials, interior and exterior lighting, and presenting several design options.' },
  { title: 'Post-production', text: 'Photoshop techniques for polished, convincing visualisations.' },
  { title: 'Working drawings', text: 'ArchiCAD / Revit documentation for contractors and clients.' },
  { title: 'Showrooms & suppliers', text: 'Open lessons in partner showrooms — tiles, lighting, doors — to learn real materials and products.' },
  { title: 'Portfolio', text: 'Students finish the course with their own portfolio of projects and a certificate.' },
] as const;

export const differentiators = [
  {
    title: 'Taught inside a working studio',
    text: 'The school sits alongside an active interior design practice, so lessons are shaped by real client projects, real constraints and current materials.',
  },
  {
    title: 'Small groups, personal attention',
    text: 'Students consistently describe small groups, an individual approach and lots of practice — progress you can see week by week.',
  },
  {
    title: 'Practice beyond the classroom',
    text: 'Site measurement on real projects, open lessons in showrooms and visits to construction and design expos in Yerevan.',
  },
  {
    title: 'International design tours',
    text: 'Study trips with the founder to design fairs, showrooms and factories abroad — including Dubai INDEX 2024, Qatar in 2025 and Salone del Mobile, Milan, in 2026.',
  },
  {
    title: 'Online or in person',
    text: 'Lessons are available offline in Yerevan and online, in Armenian or English.',
  },
  {
    title: 'Portfolio, certificate, career',
    text: 'Students graduate with a portfolio and certificate — and several graduates already work as designers.',
  },
] as const;

export const enrolmentSteps = [
  { title: 'Send an enquiry', text: 'Tell the school about your experience, goals and preferred format using the form below — or call.' },
  { title: 'Talk it through', text: 'The school contacts you to discuss the programme, format, schedule and tuition for the next group.' },
  { title: 'Join a group', text: 'Choose in-person or online study and reserve your place in an upcoming group.' },
] as const;

export const courseOptions = [
  'Interior design course (full programme)',
  '3ds Max + Corona Renderer',
  'Photoshop for interior visualisation',
  'ArchiCAD / Revit',
  'Not sure yet — I would like advice',
] as const;
