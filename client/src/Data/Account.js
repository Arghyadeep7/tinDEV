export const account = [
  {
    label: "Personal",
    choice: 1,
  },
  {
    label: "Education",
    choice: 2,
  },
  {
    label: "Experience",
    choice: 3,
  },
  {
    label: "Projects",
    choice: 4,
  },
  {
    label: "Skills",
    choice: 5,
  },
  {
    label: "Certificates",
    choice: 6,
  },
  {
    label: "Links",
    choice: 7,
  },
];

export const personal = [
  {
    label: "First Name",
    value: "Alex Martin",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    value: "Luther",
    type: "text",
    required: false,
  },
  {
    label: "Email Address",
    value: "amluther67@gmail.com",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    value: "QWERTY@1",
    type: "password",
    required: true,
  },
  {
    label: "Date of Birth",
    value: "2002-10-10",
    type: "date",
    required: true,
  },
  {
    label: "Gender",
    value: "Male",
    type: "select",
    required: true,
    options: ["Male", "Female", "Others", "Prefer not to disclose"],
  },
  {
    label: "Nationality",
    value: "United States",
    type: "select",
    required: true,
    options: [
      "India",
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Democratic Republic of the Congo",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Ivory Coast",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Korea",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Korea",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ],
  },
  {
    label: "Address",
    value: "1/29 California",
    type: "text",
    required: true,
  },
  {
    label: "Pincode",
    value: 100067,
    type: "number",
    required: true,
  },
  {
    label: "College",
    value: "Standard College of Engineering",
    type: "text",
    required: true,
  },
  {
    label: "University",
    value: "California State University",
    type: "text",
    required: true,
  },
  {
    label: "University Roll",
    value: "1234567890",
    type: "text",
    required: true,
  },
  {
    label: "Course",
    value: "B. Tech.",
    type: "select",
    required: true,
    options: [
      "B. Tech.",
      "M. Tech.",
      "B. Eng.",
      "M. Eng.",
      "B. B. A.",
      "M. B. A.",
      "B. Sc.",
      "M. Sc.",
      "B. Com.",
      "M. Com.",
      "B. C. A.",
      "M. C. A.",
      "B. A.",
      "B. Ed.",
      "PhD",
      "Others",
    ],
  },
  {
    label: "Course Type",
    value: "Full-Time",
    type: "select",
    required: true,
    options: ["Full-Time", "Part-Time"],
  },
  {
    label: "Specialisation",
    value: "CSE",
    type: "text",
    required: true,
  },
  {
    label: "Course Duration (Years)",
    value: 4,
    type: "number",
    required: true,
  },
  {
    label: "Year of Graduation",
    value: 2026,
    type: "number",
    required: true,
  },
  {
    label: "Course Status",
    value: "Pursuing",
    type: "select",
    required: true,
    options: ["Pursuing", "Completed"],
  },
];

export const education = [
  {
    id: 1,
    institute: "Standard College of Engineering1",
    course: "B. Tech.",
    options: [
      "B. Tech.",
      "M. Tech.",
      "B. Eng.",
      "M. Eng.",
      "B. B. A.",
      "M. B. A.",
      "B. Sc.",
      "M. Sc.",
      "B. Com.",
      "M. Com.",
      "B. C. A.",
      "M. C. A.",
      "B. A.",
      "B. Ed.",
      "PhD",
      "Others",
    ],
    specialisation: "CSE",
    from: "2022-10",
    to: "2026-06",
    grade: "9.2",
  },
  {
    id: 2,
    institute: "Standard College of Engineering2",
    course: "B. Tech.",
    options: [
      "B. Tech.",
      "M. Tech.",
      "B. Eng.",
      "M. Eng.",
      "B. B. A.",
      "M. B. A.",
      "B. Sc.",
      "M. Sc.",
      "B. Com.",
      "M. Com.",
      "B. C. A.",
      "M. C. A.",
      "B. A.",
      "B. Ed.",
      "PhD",
      "Others",
    ],
    specialisation: "CSE",
    from: "2022-10",
    to: "2026-06",
    grade: "9.2",
  },
  {
    id: 3,
    institute: "Standard College of Engineering3",
    course: "B. Tech.",
    options: [
      "B. Tech.",
      "M. Tech.",
      "B. Eng.",
      "M. Eng.",
      "B. B. A.",
      "M. B. A.",
      "B. Sc.",
      "M. Sc.",
      "B. Com.",
      "M. Com.",
      "B. C. A.",
      "M. C. A.",
      "B. A.",
      "B. Ed.",
      "PhD",
      "Others",
    ],
    specialisation: "CSE",
    from: "2022-10",
    to: "2026-06",
    grade: "9.2",
  },
];

export const work = [
  {
    id: 1,
    firm: "Bentley Systems",
    position: "Software Engineering Intern",
    from: "2024-02",
    to: "Present",
  },
  {
    id: 2,
    firm: "Pro GenX",
    position: "Full Stack Developer Intern",
    from: "2023-06",
    to: "2023-07",
  },
  {
    id: 3,
    firm: "CodeClause",
    position: "Web Developer Intern",
    from: "2023-07",
    to: "2023-08",
  },
];

export const projects = [
  {
    id: 1,
    name: "MAIL-IT",
    about: "User friendly mailing app!",
    tech: "MongoDb, Express, React, Node, React-Bootstrap, CSS",
    repo: "https://github.com/Arghyadeep7/mail-it",
    deployed: "https://mail-it.vercel.app/",
  },
  {
    id: 2,
    name: "E-HUB | Entertainment Hub",
    about: "Your one destination for all Movies & TV/Web Series",
    tech: "React, TMDB API, React-Bootstrap, Axios, CSS",
    repo: "https://github.com/Arghyadeep7/E-Hub",
    deployed: "https://e-hub.vercel.app",
  },
  {
    id: 3,
    name: "Online Resume",
    about: "Online Resume, Accessible from anywhere",
    tech: "React, React-Bootstrap",
    repo: "https://github.com/Arghyadeep7/Resume",
    deployed: "https://arghya-deep-pal.vercel.app",
  },
];

export const technologies = [
  "AWS",
  "Angular",
  "Assembly",
  "Atom",
  "Azure",
  "Bash",
  "Bootstrap",
  "C",
  "C#",
  "C++",
  "COBOL",
  "CSS",
  "Clojure",
  "Dart",
  "Django",
  "Docker",
  "Eclipse",
  "Elixir",
  "Elm",
  "Erlang",
  "Express.js",
  "F#",
  "Firebase",
  "Flask",
  "Fortran",
  "Git",
  "Go",
  "Google Cloud Platform",
  "GraphQL",
  "Groovy",
  "HTML",
  "Haskell",
  "IntelliJ IDEA",
  "Java",
  "JavaScript",
  "Jira",
  "Julia",
  "Kotlin",
  "Kubernetes",
  "Lua",
  "Matlab",
  "MongoDB",
  "MySQL",
  "Next.js",
  "Node.js",
  "OCaml",
  "Objective-C",
  "OpenGL",
  "PHP",
  "Pascal",
  "Perl",
  "PostgreSQL",
  "PowerShell",
  "Prolog",
  "PyTorch",
  "Python",
  "R",
  "RESTful API",
  "React",
  "Redis",
  "Ruby",
  "Rust",
  "SOAP",
  "SQL",
  "SQLite",
  "Scala",
  "Scheme",
  "Shell",
  "Slack",
  "Smalltalk",
  "Spring",
  "Sublime Text",
  "Swift",
  "Tcl",
  "TensorFlow",
  "TypeScript",
  "Unity",
  "VBA",
  "Visual Basic",
  "Visual Studio Code",
  "Vue.js",
  "WebAssembly",
  "Wolfram Language",
  "XML",
  "XPath",
  "XQuery",
  "Xamarin",
  "Zig",
];

export const skills = [
  {
    id: "C++",
    name: "C++",
    rating: 80,
  },
  {
    id: "Python",
    name: "Python",
    rating: 65,
  },
  {
    id: "Java",
    name: "Java",
    rating: 70,
  },
  {
    id: "C",
    name: "C",
    rating: 80,
  },
  {
    id: "JavaScript",
    name: "JavaScript",
    rating: 70,
  },
];

export const certifications = [
  {
    id: 1,
    org: "Coursera",
    name: "Process Data from Dirty to Clean",
    issued: "2023-02",
    expiry: "Not Applicable",
    link: "https://www.coursera.org/account/accomplishments/certificate/6CG24UFARVSW",
  },
  {
    id: 2,
    org: "Coursera",
    name: "Process Data from Dirty to Clean",
    issued: "2023-02",
    expiry: "Not Applicable",
    link: "https://www.coursera.org/account/accomplishments/certificate/6CG24UFARVSW",
  },
  {
    id: 3,
    org: "Coursera",
    name: "Process Data from Dirty to Clean",
    issued: "2023-02",
    expiry: "Not Applicable",
    link: "https://www.coursera.org/account/accomplishments/certificate/6CG24UFARVSW",
  },
];

export const links = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/arghya-deep-pal7/",
  },
  {
    id: 2,
    url: "https://github.com/Arghyadeep7",
  },
  {
    id: 3,
    url: "https://leetcode.com/arghyadeep7/",
  },
];
