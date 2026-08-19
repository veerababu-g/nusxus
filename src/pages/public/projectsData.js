// Centralised project data used by both the Projects list and Project Details pages.
// Everything here is either a real internal/demonstration project, clearly labeled as such.
// No client results are fabricated.
export const projects = [
  {
    slug: 'bookhub',
    name: 'BookHub',
    industry: 'Publishing / Media',
    isDemo: true,
    problem: 'Readers and small publishers needed a simple way to catalogue, discover and track books.',
    solution: 'A full-stack catalogue and tracking application with search, filtering and user libraries.',
    features: ['Book search and filtering', 'User libraries and reading lists', 'Admin catalogue management'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    slug: 'smart-ai-farming',
    name: 'Smart AI Farming',
    industry: 'Agriculture',
    isDemo: true,
    problem: 'Small farms lacked an accessible way to monitor conditions and get AI-assisted recommendations.',
    solution: 'A dashboard combining sensor-style data input with AI-assisted recommendations for crop care.',
    features: ['Data dashboard', 'AI-assisted recommendations', 'Historical trend tracking'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AI integration']
  },
  {
    slug: 'exam-portal',
    name: 'Exam Portal',
    industry: 'Education',
    isDemo: true,
    problem: 'Institutions needed an online system to create, deliver and grade exams securely.',
    solution: 'An exam portal supporting question banks, timed exams, and automated grading for objective questions.',
    features: ['Question bank management', 'Timed exam delivery', 'Automated grading'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    slug: 'iot-plc-dashboard',
    name: 'IoT / PLC Dashboard',
    industry: 'Industrial / Manufacturing',
    isDemo: true,
    problem: 'Operators needed real-time visibility into industrial equipment status and metrics.',
    solution: 'A monitoring dashboard visualising equipment/PLC data with historical logging.',
    features: ['Real-time data visualisation', 'Historical logging', 'Alert thresholds'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB']
  }
];
