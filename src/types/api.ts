export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  fullUrl: string;
}

export interface EndpointCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  endpoints: Endpoint[];
}

export const API_BASE_URL = 'https://api.bhutanapi.com/api/v1/bhutan';
export const PROXY_BASE_URL = API_BASE_URL;

export const endpointCategories: EndpointCategory[] = [
  {
    id: 'majesties',
    name: 'Majesties',
    description: 'Information about Bhutanese royalty and rulers',
    icon: 'crown',
    endpoints: [
      {
        method: 'GET',
        path: '/majesties',
        description: 'Get all majesties',
        fullUrl: `${API_BASE_URL}/majesties`,
      },
      {
        method: 'GET',
        path: '/majesties/title/{title}',
        description: 'Get majesty by title',
        fullUrl: `${API_BASE_URL}/majesties/title/{title}`,
      },
      {
        method: 'GET',
        path: '/majesties/name/{name}',
        description: 'Get majesty by name',
        fullUrl: `${API_BASE_URL}/majesties/name/{name}`,
      },
    ],
  },
  {
    id: 'gnh',
    name: 'GNH (Gross National Happiness)',
    description: "Bhutan's unique development philosophy and framework",
    icon: 'heart',
    endpoints: [
      {
        method: 'GET',
        path: '/gnh',
        description: 'Get GNH information',
        fullUrl: `${API_BASE_URL}/gnh`,
      },
      {
        method: 'GET',
        path: '/gnh/pillars',
        description: 'Get all GNH pillars',
        fullUrl: `${API_BASE_URL}/gnh/pillars`,
      },
      {
        method: 'GET',
        path: '/gnh/domains',
        description: 'Get all GNH domains',
        fullUrl: `${API_BASE_URL}/gnh/domains`,
      },
    ],
  },
  {
    id: 'dzongkhags',
    name: 'Dzongkhags (Districts)',
    description: 'Administrative districts of Bhutan',
    icon: 'mapPin',
    endpoints: [
      {
        method: 'GET',
        path: '/dzongkhags',
        description: 'Get all dzongkhags',
        fullUrl: `${API_BASE_URL}/dzongkhags`,
      },
      {
        method: 'GET',
        path: '/dzongkhags/{name}',
        description: 'Get dzongkhag by name',
        fullUrl: `${API_BASE_URL}/dzongkhags/{name}`,
      },
      {
        method: 'GET',
        path: '/dzongkhags/{name}/population',
        description: 'Get population',
        fullUrl: `${API_BASE_URL}/dzongkhags/{name}/population`,
      },
    ],
  },
  {
    id: 'gewogs',
    name: 'Gewogs (Sub-districts)',
    description: 'Sub-district administrative units',
    icon: 'mountain',
    endpoints: [
      {
        method: 'GET',
        path: '/gewogs',
        description: 'Get all gewogs',
        fullUrl: `${API_BASE_URL}/gewogs`,
      },
      {
        method: 'GET',
        path: '/gewogs/{name}',
        description: 'Get gewog by name',
        fullUrl: `${API_BASE_URL}/gewogs/{name}`,
      },
    ],
  },
  {
    id: 'dzongs',
    name: 'Dzongs (Fortresses)',
    description: 'Historic fortresses and administrative centers',
    icon: 'building',
    endpoints: [
      {
        method: 'GET',
        path: '/dzongs',
        description: 'Get all dzongs',
        fullUrl: `${API_BASE_URL}/dzongs`,
      },
    ],
  },
  {
    id: 'general',
    name: 'General',
    description: 'General information about Bhutan',
    icon: 'globe',
    endpoints: [
      {
        method: 'GET',
        path: '/details',
        description: 'Get general Bhutan details',
        fullUrl: `${API_BASE_URL}/details`,
      },
    ],
  },
];

export const quickStartExamples = {
  curl: `# Get all dzongkhags (districts)
curl https://api.bhutanapi.com/api/v1/bhutan/dzongkhags

# Get specific dzongkhag information
curl https://api.bhutanapi.com/api/v1/bhutan/dzongkhags/Thimphu

# Get GNH pillars
curl https://api.bhutanapi.com/api/v1/bhutan/gnh/pillars`,
  javascript: `// Get all dzongkhags (districts)
fetch('https://api.bhutanapi.com/api/v1/bhutan/dzongkhags')
  .then(response => response.json())
  .then(data => console.log(data));

// Get specific dzongkhag information
fetch('https://api.bhutanapi.com/api/v1/bhutan/dzongkhags/Thimphu')
  .then(response => response.json())
  .then(data => console.log(data));

// Get GNH pillars
fetch('https://api.bhutanapi.com/api/v1/bhutan/gnh/pillars')
  .then(response => response.json())
  .then(data => console.log(data));`,
  python: `import requests

# Get all dzongkhags (districts)
response = requests.get('https://api.bhutanapi.com/api/v1/bhutan/dzongkhags')
data = response.json()
print(data)

# Get specific dzongkhag information
response = requests.get('https://api.bhutanapi.com/api/v1/bhutan/dzongkhags/Thimphu')
data = response.json()
print(data)

# Get GNH pillars
response = requests.get('https://api.bhutanapi.com/api/v1/bhutan/gnh/pillars')
data = response.json()
print(data)`,
};
