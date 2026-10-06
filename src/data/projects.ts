import type { ImageMetadata } from 'astro';

// Burgundy residence
import burgDining from '../assets/projects/burgundy-residence/dining.jpg';
import burgDiningAlt from '../assets/projects/burgundy-residence/dining-alt.jpg';
import burgKitchen from '../assets/projects/burgundy-residence/kitchen-dining.jpg';
import burgKitchenTable from '../assets/projects/burgundy-residence/kitchen-table.jpg';
import burgHall from '../assets/projects/burgundy-residence/hall.jpg';
import burgBeforeDining from '../assets/projects/burgundy-residence/before-dining.jpg';
import burgBeforeHall from '../assets/projects/burgundy-residence/before-hall.jpg';
// Open kitchen
import kitA from '../assets/projects/open-kitchen/kitchen.jpg';
import kitB from '../assets/projects/open-kitchen/kitchen-b.jpg';
import kitC from '../assets/projects/open-kitchen/kitchen-c.jpg';
import kitD from '../assets/projects/open-kitchen/kitchen-d.jpg';
import kitE from '../assets/projects/open-kitchen/kitchen-e.jpg';
import kitBefore from '../assets/projects/open-kitchen/before.jpg';
// Stone bathroom
import bathA from '../assets/projects/stone-bathroom/bathroom.jpg';
import bathB from '../assets/projects/stone-bathroom/bathroom-b.jpg';
import bathBefore from '../assets/projects/stone-bathroom/before.jpg';
// City apartment
import cityLiving from '../assets/projects/city-apartment/living.jpg';
import cityLivingB from '../assets/projects/city-apartment/living-b.jpg';
import cityLivingC from '../assets/projects/city-apartment/living-c.jpg';
import cityLivingD from '../assets/projects/city-apartment/living-d.jpg';
import cityEvening from '../assets/projects/city-apartment/evening.jpg';
import cityBar from '../assets/projects/city-apartment/dining-bar.jpg';
import cityEntrance from '../assets/projects/city-apartment/entrance.jpg';
import cityBefore from '../assets/projects/city-apartment/before.jpg';
// Ararat view
import araratBath from '../assets/projects/ararat-view/bath.jpg';
import araratBathB from '../assets/projects/ararat-view/bath-b.jpg';
import araratDressing from '../assets/projects/ararat-view/dressing.jpg';
import araratBefore from '../assets/projects/ararat-view/before.jpg';
// Mediterranean villa
import villaPool from '../assets/projects/mediterranean-villa/pool.jpg';
import villaFacade from '../assets/projects/mediterranean-villa/facade.jpg';
import villaAerial from '../assets/projects/mediterranean-villa/aerial.jpg';
import villaTerrace from '../assets/projects/mediterranean-villa/terrace.jpg';
import villaPath from '../assets/projects/mediterranean-villa/pool-path.jpg';
// Poolside pavilion
import pavNight from '../assets/projects/poolside-pavilion/pool-night.jpg';
import pavFountains from '../assets/projects/poolside-pavilion/fountains.jpg';
import pavLoungers from '../assets/projects/poolside-pavilion/loungers.jpg';
// Garden landscape
import gardenMain from '../assets/projects/garden-landscape/garden.jpg';
import gardenFire from '../assets/projects/garden-landscape/fire-lounge.jpg';
import gardenPool from '../assets/projects/garden-landscape/pool.jpg';
import gardenEvening from '../assets/projects/garden-landscape/evening.jpg';
import gardenPlan from '../assets/projects/garden-landscape/plan.jpg';
import gardenOverview from '../assets/projects/garden-landscape/overview.jpg';
// Patisserie
import patCounter from '../assets/projects/patisserie/counter.jpg';
import patSalon from '../assets/projects/patisserie/salon.jpg';
import patSeating from '../assets/projects/patisserie/seating.jpg';
import patDisplay from '../assets/projects/patisserie/display.jpg';
// Hallway
import hallA from '../assets/projects/gallery-hallway/hallway.jpg';
import hallB from '../assets/projects/gallery-hallway/hallway-b.jpg';
import hallC from '../assets/projects/gallery-hallway/hallway-c.jpg';
import hallBefore from '../assets/projects/gallery-hallway/before.jpg';
// Textured bedroom
import texBed from '../assets/projects/textured-bedroom/bedroom.jpg';
import texBedB from '../assets/projects/textured-bedroom/bedroom-b.jpg';
import texWardrobe from '../assets/projects/textured-bedroom/wardrobe.jpg';
import texWall from '../assets/projects/textured-bedroom/wall.jpg';
// Learning centre
import lcA from '../assets/projects/learning-centre/classroom.jpg';
import lcB from '../assets/projects/learning-centre/classroom-b.jpg';
import lcBefore from '../assets/projects/learning-centre/before.jpg';
// Neoclassic bedroom
import neoBed from '../assets/projects/neoclassic-bedroom/bedroom.jpg';
import neoBedB from '../assets/projects/neoclassic-bedroom/bedroom-b.jpg';
import neoBedC from '../assets/projects/neoclassic-bedroom/bedroom-c.jpg';
import neoCanopy from '../assets/projects/neoclassic-bedroom/canopy.jpg';
import neoBefore from '../assets/projects/neoclassic-bedroom/before.jpg';
import neoBeforeB from '../assets/projects/neoclassic-bedroom/before-b.jpg';
// Monochrome corridor
import corA from '../assets/projects/monochrome-corridor/corridor.jpg';
import corB from '../assets/projects/monochrome-corridor/corridor-b.jpg';
import corGallery from '../assets/projects/monochrome-corridor/gallery.jpg';
import corBefore from '../assets/projects/monochrome-corridor/before.jpg';
import corBeforeB from '../assets/projects/monochrome-corridor/before-b.jpg';

export type Category = 'Residential' | 'Commercial' | 'Exterior & Landscape';

export interface Shot {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface Transformation {
  label: string;
  before: ImageMetadata;
  after: ImageMetadata;
  beforeAlt: string;
  afterAlt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  type: string;
  /** Month the studio published the project (ISO yyyy-mm). */
  published: string;
  publishedLabel: string;
  location?: string;
  client?: string;
  spaces: string[];
  summary: string;
  approach: string[];
  /** Materials named by the studio itself, or clearly visible in the imagery. */
  palette?: string[];
  quote?: { text: string; note: string };
  cover: Shot;
  gallery: Shot[];
  transformations?: Transformation[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'burgundy-neoclassical-residence',
    title: 'Burgundy Neoclassical Residence',
    category: 'Residential',
    type: 'Apartment interior',
    published: '2026-08',
    publishedLabel: 'August 2026',
    location: 'Kentron, Yerevan',
    spaces: ['Entrance hall', 'Dining room', 'Kitchen & breakfast table'],
    summary:
      'A neoclassical apartment in a deep, noble burgundy — used with restraint and balanced by natural stone, dark wood, cream tones and gold detailing.',
    approach: [
      'Burgundy was chosen as one of the defining colours of the year, but applied in measured doses so that it reads as depth and warmth rather than drama. Around it, the palette stays calm: natural stone, dark timber, milky creams and fine gold accents.',
      'The entrance hall sets the tone in a Modern Classic / Contemporary Luxury register: backlit stone panels, relief surfaces and a mirror give the narrow space depth, while a crystal chandelier completes its composition.',
      'The neoclassical language — mouldings, inlaid floor borders, symmetry — is treated as a timeless combination of classical elegance and modern comfort, and continues through the dining room into a kitchen planned around the client’s wishes and daily routine.',
    ],
    palette: ['Burgundy lacquer', 'Natural stone', 'Dark timber', 'Cream upholstery', 'Gold & brass metal', 'Crystal lighting'],
    quote: {
      text: 'Neoclassical style never grows old — it is an eternal combination of classic elegance and modern comfort.',
      note: 'From the studio’s project notes, August 2026 (translated from Armenian)',
    },
    cover: { src: burgDining, alt: 'Neoclassical dining room with burgundy wall cabinetry, backlit marble panel, crystal chandelier and a round table for ten' },
    gallery: [
      { src: burgHall, alt: 'Entrance hall with backlit stone panels, burgundy frame, round mirror, crystal chandelier and inlaid marble floor', caption: 'Entrance hall' },
      { src: burgKitchen, alt: 'Kitchen with burgundy upper cabinets, marble splashback, built-in ovens and a round breakfast table', caption: 'Kitchen' },
      { src: burgKitchenTable, alt: 'Round pedestal table in dark wood and brass with cream upholstered chairs', caption: 'Breakfast table' },
      { src: burgDiningAlt, alt: 'Alternative dining room lighting option with a linear crystal chandelier', caption: 'Dining room — lighting variant' },
    ],
    transformations: [
      {
        label: 'Dining room',
        before: burgBeforeDining,
        after: burgDining,
        beforeAlt: 'Empty dining room before the design: bare white walls and a beige stone floor',
        afterAlt: 'The same dining room in the design visualisation, with burgundy cabinetry, marble and a crystal chandelier',
      },
      {
        label: 'Entrance hall',
        before: burgBeforeHall,
        after: burgHall,
        beforeAlt: 'Entrance hall before the design: plain white walls and an unlit ceiling',
        afterAlt: 'Entrance hall in the design visualisation with backlit stone, mirror and chandelier',
      },
    ],
    featured: true,
  },
  {
    slug: 'joined-apartment-kitchen',
    title: 'Joined-Apartment Kitchen',
    category: 'Residential',
    type: 'Kitchen & living design',
    published: '2026-08',
    publishedLabel: 'August 2026',
    client: 'Private client based in France',
    spaces: ['Kitchen', 'Connection to the living room'],
    summary:
      'Two apartments joined into one home: the kitchen wall comes down and the kitchen opens to the living room, resolved in dark timber, black-framed glazing and integrated appliances.',
    approach: [
      'The brief started with the plan. Two neighbouring apartments were combined, the wall enclosing the kitchen was removed, and the kitchen became part of the living space.',
      'The studio developed several design options for the client to compare — dark wood-grain joinery with integrated tall appliances, a glazed partition to the living area, and a calm stone-effect floor that runs through both spaces.',
    ],
    palette: ['Dark wood-grain joinery', 'Integrated appliances', 'Black-framed glazing', 'Light stone-effect floor'],
    cover: { src: kitA, alt: 'Dark timber kitchen with integrated ovens, a black refrigerator wall and a glazed partition' },
    gallery: [
      { src: kitB, alt: 'Kitchen option with lighter stone worktops, a walnut island and bar stools', caption: 'Option with walnut island' },
      { src: kitC, alt: 'Bar stools at a stone peninsula looking towards the kitchen wall', caption: 'Peninsula' },
      { src: kitD, alt: 'Corner of the dark kitchen with coffee station and window', caption: 'Coffee corner' },
      { src: kitE, alt: 'Wide view of the dark kitchen with tall cabinetry', caption: 'Tall cabinetry' },
    ],
    transformations: [
      {
        label: 'Kitchen',
        before: kitBefore,
        after: kitA,
        beforeAlt: 'Kitchen area before the design: a bare room after the wall was removed',
        afterAlt: 'The kitchen in the design visualisation with dark joinery and integrated appliances',
      },
    ],
    featured: true,
  },
  {
    slug: 'dark-stone-bathroom',
    title: 'Dark Stone Bathroom',
    category: 'Residential',
    type: 'Bathroom design',
    published: '2026-08',
    publishedLabel: 'August 2026',
    spaces: ['Bathroom'],
    summary:
      'A luxurious study in dark tones: Italian large-format tiles with a natural-stone texture, warm wood and bronze — balanced by a light floor and white sanitaryware.',
    approach: [
      'Large-format Italian tiles with veined natural-stone texture wrap the room in a single dark surface. Warm timber shelving and bronze details bring warmth back in.',
      'A light floor and white sanitaryware keep the dark palette from feeling heavy, producing a bathroom that reads as both luxurious and contemporary.',
    ],
    palette: ['Italian large-format tiles', 'Natural-stone texture', 'Warm wood', 'Bronze details', 'White sanitaryware'],
    cover: { src: bathA, alt: 'Dark veined-stone bathroom with illuminated niche shelving, white basin and LED-framed mirror' },
    gallery: [{ src: bathB, alt: 'Close view of the dark stone bathroom niche with warm wood shelves and lighting', caption: 'Lit shelving niche' }],
    transformations: [
      {
        label: 'Bathroom',
        before: bathBefore,
        after: bathA,
        beforeAlt: 'Bathroom before the design: raw plaster walls and exposed pipes',
        afterAlt: 'The bathroom in the design visualisation with dark stone tiles and lit niches',
      },
    ],
  },
  {
    slug: 'contemporary-city-apartment',
    title: 'Contemporary City Apartment',
    category: 'Residential',
    type: 'Apartment interior',
    published: '2026-08',
    publishedLabel: 'August 2026',
    spaces: ['Living room', 'Dining & bar', 'Entrance'],
    summary:
      'An open living space built around a media wall of dark veined stone and timber panelling, with a linear fireplace, concealed light coves and a bar that links living and dining.',
    approach: [
      'The empty concrete shell was organised into one continuous living, dining and bar zone. A stone-and-timber media wall anchors the room and conceals storage and display behind lit glass.',
      'Concealed cove lighting, a linear fireplace and a crystal pendant layer the light for day and evening, while a quiet entrance with a round mirror introduces the same materials at the door.',
    ],
    palette: ['Dark veined stone', 'Timber panelling', 'Bronze-tinted glass', 'Polished stone floor'],
    cover: { src: cityLiving, alt: 'Contemporary living room with a stone and timber media wall, linear fireplace and crystal chandelier' },
    gallery: [
      { src: cityLivingC, alt: 'Living room seating facing a dark stone feature wall with timber slats', caption: 'Living room' },
      { src: cityLivingD, alt: 'Sofa and coffee table under a crystal chandelier, timber media wall beyond', caption: 'Seating area' },
      { src: cityEvening, alt: 'The apartment in evening light with bar stools and pendant lighting', caption: 'Evening scene' },
      { src: cityBar, alt: 'Dining table and bar counter with pendant lights and a city view', caption: 'Dining & bar' },
      { src: cityEntrance, alt: 'Entrance with walnut doors, round mirror and console', caption: 'Entrance' },
      { src: cityLivingB, alt: 'Wide view of the living room media wall and fireplace', caption: 'Media wall' },
    ],
    transformations: [
      {
        label: 'Living room',
        before: cityBefore,
        after: cityLiving,
        beforeAlt: 'Living room before the design: bare concrete ceiling, plain walls and an unfinished floor',
        afterAlt: 'The same living room in the design visualisation with media wall, fireplace and chandelier',
      },
    ],
    featured: true,
  },
  {
    slug: 'apartment-with-ararat-view',
    title: 'Suite with a View of Ararat',
    category: 'Residential',
    type: 'Bathing & dressing suite',
    published: '2026-06',
    publishedLabel: 'June 2026',
    spaces: ['Bathroom', 'Dressing room'],
    summary:
      'A raw concrete shell with a panoramic window facing Mount Ararat, reimagined as a bathing and dressing suite of warm stone, concealed light and a sculptural glass bath.',
    approach: [
      'Everything is oriented to the window. The bath sits in front of the glass so that the mountain becomes part of the room, and the surrounding surfaces are kept quiet — warm stone, slim joinery, light hidden in coves and niches.',
      'A walk-in dressing area continues the same language, so that the suite reads as one calm, luxurious volume.',
    ],
    palette: ['Warm natural stone', 'Concealed linear lighting', 'Glass', 'Timber joinery'],
    cover: { src: araratBath, alt: 'Bathroom with a sculptural glass bath in front of a panoramic window looking at Mount Ararat at dusk' },
    gallery: [
      { src: araratDressing, alt: 'Dressing area with glass-fronted wardrobes, crystal light installation and stone floor', caption: 'Dressing room' },
      { src: araratBathB, alt: 'Second view of the bath and stone vanity with Mount Ararat beyond', caption: 'Bath & vanity' },
    ],
    transformations: [
      {
        label: 'Bathing suite',
        before: araratBefore,
        after: araratBath,
        beforeAlt: 'The space before the design: raw concrete walls and a panoramic window with Mount Ararat beyond',
        afterAlt: 'The same space in the design visualisation as a stone bathing suite with a glass bath',
      },
    ],
    featured: true,
  },
  {
    slug: 'mediterranean-villa',
    title: 'Mediterranean Villa & Pool',
    category: 'Exterior & Landscape',
    type: 'Exterior & landscape design',
    published: '2026-06',
    publishedLabel: 'June 2026',
    spaces: ['Facade', 'Pool & terraces', 'Planting', 'Kitchen-living'],
    summary:
      'A detached house with pool and green zone — arched white facades, natural stone paving and layered evening light, designed as a place to rest.',
    approach: [
      'The exterior was conceived as one composition with the interior: the same colour combinations, natural stones and materials run from inside to the terraces and the pool.',
      'Arched openings, soft white render and Mediterranean planting set a relaxed rhythm, while lighting along the paths, walls and pool edge turns the garden into an evening space.',
    ],
    palette: ['White render', 'Natural stone paving', 'Timber doors', 'Mediterranean planting', 'Warm exterior lighting'],
    quote: {
      text: 'Just let us make your simple land a wonderland.',
      note: 'Studio post, June 2026',
    },
    cover: { src: villaPool, alt: 'White Mediterranean villa with arched windows beside a long pool at dusk' },
    gallery: [
      { src: villaFacade, alt: 'Villa facade with arched doors, wall lights and stone steps at dusk', caption: 'Facade' },
      { src: villaAerial, alt: 'Aerial view of the villa, courtyard and long lap pool', caption: 'Site from above' },
      { src: villaTerrace, alt: 'Pool terrace with planting and lights along the villa wall', caption: 'Pool terrace' },
      { src: villaPath, alt: 'Stone path along the pool towards the arched villa', caption: 'Pool path' },
    ],
    featured: true,
  },
  {
    slug: 'poolside-pavilion',
    title: 'Poolside Pavilion',
    category: 'Exterior & Landscape',
    type: 'Exterior & landscape design',
    published: '2026-06',
    publishedLabel: 'June 2026',
    spaces: ['Outdoor kitchen & bar', 'Barbecue zone', 'Pool', 'Lounge terrace'],
    summary:
      'An outdoor kitchen and bar pavilion, barbecue zone and pool composed as one evening landscape of stone, timber and water.',
    approach: [
      'A covered stone-and-timber pavilion holds the outdoor kitchen, bar and barbecue, facing a pool with low fountains and a timber deck of loungers.',
      'Light is treated as material: concealed strips under steps and counters, glowing water features and warm lanterns set the atmosphere after dark.',
    ],
    palette: ['Stacked stone', 'Timber decking', 'Water features', 'Warm concealed lighting'],
    cover: { src: pavNight, alt: 'Pool with illuminated fountains and timber deck in front of a covered outdoor kitchen at night' },
    gallery: [
      { src: pavFountains, alt: 'Low fountains in a dark stone pool basin in front of the outdoor bar', caption: 'Water features' },
      { src: pavLoungers, alt: 'Loungers along the pool deck under warm evening light', caption: 'Lounge deck' },
    ],
  },
  {
    slug: 'garden-pool-landscape',
    title: 'Garden Pool & Fire Lounge',
    category: 'Exterior & Landscape',
    type: 'Landscape design',
    published: '2026-04',
    publishedLabel: 'April 2026',
    spaces: ['Pool', 'Fireplace lounge', 'Pergola', 'Lawn & planting'],
    summary:
      'A private garden planned from the site plan up: pool, stone fireplace lounge, pergola and lawn arranged into distinct outdoor rooms.',
    approach: [
      'The project began as a plan — the studio’s site drawing places the pool, sun deck, fire lounge, pergola and play lawn so that each zone has its own character and the garden still reads as one.',
      'A stone fireplace anchors the lounge, paving in warm tones frames the water, and dense planting gives the edges privacy and depth.',
    ],
    palette: ['Warm stone paving', 'Stacked-stone fireplace', 'Timber pergola', 'Layered planting'],
    cover: { src: gardenMain, alt: 'Garden with a turquoise pool, sun loungers and a stone fireplace lounge under a pergola at dusk' },
    gallery: [
      { src: gardenPlan, alt: 'Illustrated site plan of the garden showing pool, lounge, pergola and lawn', caption: 'Site plan' },
      { src: gardenFire, alt: 'Stone fireplace lounge with sofas beside the pool', caption: 'Fire lounge' },
      { src: gardenPool, alt: 'Pool with in-water loungers and paved surround', caption: 'Pool' },
      { src: gardenOverview, alt: 'Overview of the garden, pool and covered seating', caption: 'Overview' },
      { src: gardenEvening, alt: 'Garden at evening with lit paths and the fireplace glowing', caption: 'Evening' },
    ],
  },
  {
    slug: 'patisserie',
    title: 'Pâtisserie Interior',
    category: 'Commercial',
    type: 'Café & pâtisserie',
    published: '2026-04',
    publishedLabel: 'April 2026',
    spaces: ['Display counter', 'Café seating', 'Back-bar shelving'],
    summary:
      'A pâtisserie built around a long, curved display counter in warm timber and marble, set on a bold black-and-white checkerboard floor.',
    approach: [
      'The counter is the protagonist: a sweeping timber-and-marble display that runs the length of the room and puts the pastries at the centre of the experience.',
      'A graphic checkerboard floor, soft pink seating and open back-bar shelving keep the room light and photogenic, with pendant lights marking the seating zone.',
    ],
    palette: ['Black & white checkerboard floor', 'Warm timber', 'White marble', 'Blush upholstery'],
    cover: { src: patCounter, alt: 'Pâtisserie with a curved timber and marble display counter on a black and white checkerboard floor' },
    gallery: [
      { src: patSalon, alt: 'Café seating with blush stools and round tables beside the display counter', caption: 'Café seating' },
      { src: patSeating, alt: 'Long view of the counter and seating under pendant lights', caption: 'Counter & seating' },
      { src: patDisplay, alt: 'Curved pastry display with back-bar shelving', caption: 'Display' },
    ],
    featured: true,
  },
  {
    slug: 'gallery-hallway',
    title: 'Gallery Hallway',
    category: 'Residential',
    type: 'Entrance & corridor',
    published: '2026-04',
    publishedLabel: 'April 2026',
    spaces: ['Entrance', 'Corridor'],
    summary:
      'A long, dark corridor turned into a calm entrance gallery with walnut doors, a light-framed full-height mirror and a slim console.',
    approach: [
      'The corridor is lengthened visually with a tall mirror framed in light and a continuous ceiling line, while flush walnut doors keep the walls quiet.',
    ],
    palette: ['Walnut veneer', 'Back-lit mirror', 'Light stone floor'],
    cover: { src: hallA, alt: 'Entrance corridor with walnut doors, illuminated full-height mirror and dark console' },
    gallery: [
      { src: hallB, alt: 'Corridor view with wall sconce, mirror and ceiling light', caption: 'Corridor' },
      { src: hallC, alt: 'Detail of console, vase and walnut door in the entrance', caption: 'Console' },
    ],
    transformations: [
      {
        label: 'Hallway',
        before: hallBefore,
        after: hallA,
        beforeAlt: 'Hallway before the design: a dark, narrow unfinished corridor',
        afterAlt: 'The hallway in the design visualisation with walnut doors and an illuminated mirror',
      },
    ],
  },
  {
    slug: 'textured-bedroom',
    title: 'Textured Master Bedroom',
    category: 'Residential',
    type: 'Bedroom design',
    published: '2026-02',
    publishedLabel: 'February 2026',
    spaces: ['Bedroom', 'Wardrobe wall'],
    summary:
      'A master bedroom layered in concrete-effect wall panels, soft linen and bronze-tinted wardrobe glass, under a sculptural pendant.',
    approach: [
      'Textured, concrete-effect panels give the bed wall a tactile, gallery-like calm. A sculptural pendant and a bronze-tinted wardrobe front add a quiet sense of luxury without clutter.',
    ],
    palette: ['Concrete-effect panels', 'Linen textiles', 'Bronze-tinted glass', 'Herringbone timber floor'],
    cover: { src: texBed, alt: 'Bedroom with concrete-effect wall panels, sculptural pendant light and neutral linen bedding' },
    gallery: [
      { src: texBedB, alt: 'Bed wall with textured panels and wall sconces', caption: 'Bed wall' },
      { src: texWardrobe, alt: 'Bronze-tinted glass wardrobe beside the bed', caption: 'Wardrobe' },
      { src: texWall, alt: 'Detail of the textured wall panels with slim light lines', caption: 'Panel detail' },
    ],
  },
  {
    slug: 'learning-centre',
    title: 'Learning Centre',
    category: 'Commercial',
    type: 'Educational interior',
    published: '2026-01',
    publishedLabel: 'January 2026',
    spaces: ['Classroom'],
    summary:
      'A plain white room transformed into a bright, playful classroom — designed around the chairs the client had already bought.',
    approach: [
      'The brief came with a constraint: the chairs were already purchased. The design takes them as its starting point, building a colourful graphic wall, a feature mural and clear zones for lessons around them.',
    ],
    palette: ['Graphic wall panels', 'Feature mural', 'Bright accent colours'],
    cover: { src: lcA, alt: 'Classroom with a colourful graphic wall, feature mural and rows of desks' },
    gallery: [{ src: lcB, alt: 'Second view of the classroom with mural and desks', caption: 'Classroom' }],
    transformations: [
      {
        label: 'Classroom',
        before: lcBefore,
        after: lcA,
        beforeAlt: 'Classroom before the design: a plain white room with the client’s chairs',
        afterAlt: 'The classroom in the design visualisation with graphic walls and mural',
      },
    ],
  },
  {
    slug: 'neoclassical-bedroom',
    title: 'Neoclassical Bedroom',
    category: 'Residential',
    type: 'Bedroom design',
    published: '2025-12',
    publishedLabel: 'December 2025',
    spaces: ['Bedroom', 'Dressing'],
    summary:
      'Panelled walls, a brass chandelier and an engraved landscape above the bed bring a soft neoclassical calm to a bare concrete room.',
    approach: [
      'Classical wall mouldings and a cream palette give structure to an empty room; a brass chandelier, sconces and a chevron-veneered door add warmth and detail.',
    ],
    palette: ['Wall mouldings', 'Cream & taupe textiles', 'Brass lighting', 'Chevron timber veneer'],
    cover: { src: neoBed, alt: 'Neoclassical bedroom with panelled walls, brass chandelier, engraved landscape artwork and a chevron-veneer door' },
    gallery: [
      { src: neoBedB, alt: 'Bed with quilted headboard under an engraved landscape artwork', caption: 'Bed wall' },
      { src: neoCanopy, alt: 'Alternative bedroom with sheer canopy and brass chandelier', caption: 'Canopy variant' },
      { src: neoBedC, alt: 'Bedroom view towards the dressing area and door', caption: 'Towards the dressing area' },
    ],
    transformations: [
      {
        label: 'Bedroom',
        before: neoBefore,
        after: neoBed,
        beforeAlt: 'Bedroom before the design: concrete ceiling and bare plaster walls',
        afterAlt: 'The bedroom in the design visualisation with panelled walls and brass chandelier',
      },
      {
        label: 'Bedroom — second view',
        before: neoBeforeB,
        after: neoBedC,
        beforeAlt: 'Second view of the bedroom before the design with exposed services',
        afterAlt: 'Second view of the bedroom in the design visualisation',
      },
    ],
  },
  {
    slug: 'monochrome-corridor',
    title: 'Monochrome Corridor',
    category: 'Residential',
    type: 'Entrance & corridor',
    published: '2025-11',
    publishedLabel: 'November 2025',
    spaces: ['Entrance', 'Corridor'],
    summary:
      'A narrow corridor given rhythm and length by a black-and-white geometric stone floor, linear ceiling lights and a tall framed mirror.',
    approach: [
      'With no room to widen the corridor, the design works with the floor and ceiling: a geometric black-and-white pattern and linear light lines pull the eye through the space.',
    ],
    palette: ['Black & white stone inlay', 'Linear lighting', 'Walnut joinery', 'Black metal frames'],
    cover: { src: corA, alt: 'Corridor with a black and white geometric stone floor, linear ceiling lights and a tall mirror' },
    gallery: [
      { src: corB, alt: 'Corridor variant with octagon-and-dot floor pattern and console', caption: 'Floor variant' },
      { src: corGallery, alt: 'Darker corridor scheme with large abstract artwork', caption: 'Gallery scheme' },
    ],
    transformations: [
      {
        label: 'Corridor',
        before: corBefore,
        after: corA,
        beforeAlt: 'Corridor before the design: bare concrete ceiling with exposed ducts',
        afterAlt: 'The corridor in the design visualisation with geometric floor and linear lights',
      },
      {
        label: 'Corridor — variant',
        before: corBeforeB,
        after: corB,
        beforeAlt: 'Corridor before the design, second photograph',
        afterAlt: 'Corridor design variant with octagon floor pattern',
      },
    ],
  },
];

export const categories: Category[] = ['Residential', 'Commercial', 'Exterior & Landscape'];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const allTransformations = projects.flatMap((p) =>
  (p.transformations ?? []).map((t) => ({ ...t, project: p })),
);
