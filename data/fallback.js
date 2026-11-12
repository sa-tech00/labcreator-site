// Backup content copied from labcreator.in, used if scraping fails.
const img = (p) => `https://labcreator.in/img/${p}`;

module.exports = {
  title: 'Lab Creator - Laboratory Furniture & Turnkey Lab Setup',
  description: 'Laboratory furniture, fume hoods, biosafety cabinets and turnkey lab construction.',
  logo: img('logos/logolc.png'),
  email: 'Inquiry@labcreator.in',
  phone: '+91 8828991702',
  address: 'Office no. 104 & 103, Raj Swastik CHS Ltd., Daulat Nagar Road No. 3, Post Office Lane, Maharashtra 400066',
  services: [
    { title: 'Turnkey Services', text: 'One partner oversees every stage, from planning to final implementation, so the lab is functional and meets industry standards.', link: 'https://labcreator.in/turnkeyservices.html' },
    { title: 'Planning & Safety', text: 'Our in-house design and engineering team creates a detailed layout covering equipment selection, installation and integration.', link: 'https://labcreator.in/planningservice.html' },
    { title: 'Support Service', text: 'Dedicated email and phone support, plus help with assembly and handover.', link: 'https://labcreator.in/Supportservice.html' },
  ],
  products: [
    { title: 'Laboratory Furniture', text: 'Metal, steel, wood and plastic work, workbenches and educational furniture.', link: 'https://labcreator.in/Laboratory-furniture.html' },
    { title: 'Fume Hoods', text: 'Bench top, floor mounted, demonstration, perchloric acid, radio isotope and acid digestion.', link: 'https://labcreator.in/Fumehoods.html' },
    { title: 'Biosafety Cabinets', text: 'Class I, II and III, plus vertical and horizontal laminar cabinets.', link: 'https://labcreator.in/Biosafetycabinet.html' },
    { title: 'Lockers & Cabinets', text: 'Safety cabinets and storage built for laboratory conditions.', link: 'https://labcreator.in/Locker-cabinets.html' },
    { title: 'Mobile Laboratories', text: 'Fully equipped labs that go where the work is.', link: 'https://labcreator.in/Mobile-lab.html' },
    { title: 'Accessories', text: 'Balance and vibration tables, carts, peg boards, task lights and safety showers.', link: 'https://labcreator.in/Accessories.html' },
  ],
  process: [
    { title: 'Consultation & Design', text: 'A custom design that maximizes space, safety and workflow efficiency.' },
    { title: 'Material Selection & Planning', text: 'The best materials for durability, chemical resistance and compliance.' },
    { title: 'Manufacturing & Installation', text: 'We build and install everything, set up for optimal performance and safety.' },
  ],
  projects: [
    { title: 'Oleo chemical Laboratory Project', text: 'Precision, safety and innovation for an efficient, compliant laboratory.', image: img('content/history-01.jpg') },
    { title: 'Ayurvedic pharmaceutical Laboratory project', text: 'Custom laboratory solutions for the Ayurvedic pharmaceutical industry.', image: img('content/history-02.jpg') },
    { title: 'University Educational Laboratory Project', text: 'Cutting-edge lab environments for educational institutions.', image: img('content/history-03.jpg') },
    { title: 'Research & Technology Laboratory Project', text: 'Exceptional service and the best training for lab users.', image: img('content/history-04.jpg') },
    { title: 'Chemical and Petroleum Processing Laboratory Project', text: 'Built for demanding processing environments.', image: img('content/history-05.jpg') },
  ],
  industries: ['Research', 'Pharmaceutical', 'Biotechnology', 'Chemical', 'Petroleum', 'Electronics', 'Healthcare', 'Education', 'Food']
    .map((name) => ({ name, image: null })),
  faq: [
    { q: 'What types of laboratory furniture do you offer?', a: 'Workbenches, fume hoods, storage cabinets and custom designs tailored to your laboratory.' },
    { q: 'How do I get a custom lab furniture design?', a: 'Contact us with your requirements and our design team will create a tailored solution.' },
    { q: 'Are your products compliant with safety regulations?', a: 'Yes, all products meet or exceed industry safety standards.' },
  ],
  testimonials: [
    { name: 'Pranav', quote: 'Eco-friendly materials and practices align with our goals, and the furniture is durable.', image: null },
    { name: 'Shreya', quote: 'We have worked together for years and they always deliver excellent, long-lasting solutions.', image: null },
    { name: 'Santosh', quote: 'From consultation to post-installation support, the team was responsive and helpful.', image: null },
  ],
};
