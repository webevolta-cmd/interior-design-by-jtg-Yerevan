// Public recommendations from the studio's Facebook page (Reviews tab, checked 6 Oct 2026).
// Quoted verbatim except for light typo fixes; the French review is translated and marked.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  date: string;
  audience: 'client' | 'student';
  translated?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'It was a pleasure to work with Jemma. I did not have a clear picture of what I wanted in my mind; nevertheless, Jemma managed to create the interior and she did it perfectly.',
    name: 'Lusin Sahakyan',
    role: 'Design client',
    date: 'October 2022',
    audience: 'client',
  },
  {
    quote:
      'Every time I admire your works — you’re very professional and have your own signature in this field. I appreciate the precise use of colours in interiors; colour harmony works so well in all your works.',
    name: 'Tatevik Urutian',
    role: 'Facebook recommendation',
    date: 'October 2022',
    audience: 'client',
  },
  {
    quote: 'Professional team, flawless works. I get an aesthetic pleasure following your page.',
    name: 'Khandoot Dallakian',
    role: 'Facebook recommendation',
    date: 'October 2022',
    audience: 'client',
  },
  {
    quote: 'Professional, tasteful works.',
    name: 'Dina Harutyunyan',
    role: 'Facebook recommendation',
    date: 'October 2022',
    audience: 'client',
  },
  {
    quote:
      'JTG school was a great place for me to start an endeavour in a completely new field. A great advantage was that the school offers small groups, which made it really intense — but you can see a lot of progress week by week. All teachers have sound subject knowledge and explain things in a way students can understand clearly. The school felt like a big family.',
    name: 'Anna Mamikonyan',
    role: 'Graduate',
    date: 'October 2023',
    audience: 'student',
  },
  {
    quote:
      'An excellent interior design school. I finished this school and I am very happy with it. It provides a very good education and professional experience, and offers a wide range of programmes for better learning. The teachers are competent and encouraging; the atmosphere is very warm and caring.',
    name: 'Hasmik Hakobyan',
    role: 'Graduate',
    date: 'December 2024',
    audience: 'student',
    translated: 'Translated from French',
  },
  {
    quote:
      'I am a student at this school and I am very glad that I chose it. A very pleasant and interesting company, a lot of information and practice in the lessons, and a personal approach to each student.',
    name: 'As Grigoryan',
    role: 'Student',
    date: 'November 2025',
    audience: 'student',
  },
  {
    quote:
      'I studied interior design at this school. The school has a professional team — I love my design school and am very happy to be a part of it.',
    name: 'Susik Harutyunyan',
    role: 'Graduate',
    date: 'November 2025',
    audience: 'student',
  },
  {
    quote: 'Pleasant atmosphere and a professional approach to acquiring a new and interesting profession.',
    name: 'Ruzanna Abgaryan',
    role: 'Student',
    date: 'October 2022',
    audience: 'student',
  },
];

export const reviewSummary = {
  label: '100% recommend',
  detail: '10 public reviews on Facebook',
  href: 'https://www.facebook.com/profile.php?id=100083204438599&sk=reviews',
};
