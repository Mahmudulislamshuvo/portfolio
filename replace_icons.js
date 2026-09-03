const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/rajau/Desktop/new-my';

const iconMap = {
  'ArrowLeft': { name: 'FaArrowLeft', pkg: 'react-icons/fa' },
  'Star': { name: 'FaStar', pkg: 'react-icons/fa' },
  'Send': { name: 'FaPaperPlane', pkg: 'react-icons/fa' },
  'Calendar': { name: 'FaCalendarAlt', pkg: 'react-icons/fa' },
  'ExternalLink': { name: 'FaExternalLinkAlt', pkg: 'react-icons/fa' },
  'Github': { name: 'FaGithub', pkg: 'react-icons/fa' },
  'Globe': { name: 'FaGlobe', pkg: 'react-icons/fa' },
  'X': { name: 'FaTimes', pkg: 'react-icons/fa' },
  'Download': { name: 'FaDownload', pkg: 'react-icons/fa' },
  'FileText': { name: 'FaFileAlt', pkg: 'react-icons/fa' },
  'GraduationCap': { name: 'FaGraduationCap', pkg: 'react-icons/fa' },
  'Moon': { name: 'FaMoon', pkg: 'react-icons/fa' },
  'Sun': { name: 'FaSun', pkg: 'react-icons/fa' },
  'ArrowRight': { name: 'FaArrowRight', pkg: 'react-icons/fa' },
  'User': { name: 'FaUser', pkg: 'react-icons/fa' },
  'Building2': { name: 'FaBuilding', pkg: 'react-icons/fa' },
  'FolderKanban': { name: 'FaFolder', pkg: 'react-icons/fa' },
  'MessageSquare': { name: 'FaCommentAlt', pkg: 'react-icons/fa' },
  'Check': { name: 'FaCheck', pkg: 'react-icons/fa' },
  'Menu': { name: 'FaBars', pkg: 'react-icons/fa' },
  'ArrowUp': { name: 'FaArrowUp', pkg: 'react-icons/fa' },
  'Code2': { name: 'FaCode', pkg: 'react-icons/fa' },
  'Layers': { name: 'FaLayerGroup', pkg: 'react-icons/fa' },
  'Terminal': { name: 'FaTerminal', pkg: 'react-icons/fa' },
  'Database': { name: 'FaDatabase', pkg: 'react-icons/fa' },
  'Linkedin': { name: 'FaLinkedin', pkg: 'react-icons/fa' },
  'Twitter': { name: 'FaTwitter', pkg: 'react-icons/fa' },
  'Mail': { name: 'FaEnvelope', pkg: 'react-icons/fa' },
  'ChevronRight': { name: 'FaChevronRight', pkg: 'react-icons/fa' },
  'MapPin': { name: 'FaMapMarkerAlt', pkg: 'react-icons/fa' },
  'Phone': { name: 'FaPhoneAlt', pkg: 'react-icons/fa' }
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules' && f !== '.next' && f !== '.git') {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.tsx') || f.endsWith('.ts')) {
      callback(path.join(dir, f));
    }
  });
}

walkDir(directory, function(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
  
  if (importRegex.test(content)) {
    console.log('Processing:', filePath);
    content = content.replace(importRegex, (match, p1) => {
      const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
      
      const packages = {};
      
      icons.forEach(icon => {
        const mapped = iconMap[icon];
        if (!mapped) {
          console.warn(`WARNING: No mapping for ${icon} in ${filePath}`);
          // Default fallback just in case
          if (!packages['react-icons/fa']) packages['react-icons/fa'] = [];
          packages['react-icons/fa'].push(`FaQuestionCircle as ${icon}`);
          return;
        }
        
        if (!packages[mapped.pkg]) packages[mapped.pkg] = [];
        packages[mapped.pkg].push(`${mapped.name} as ${icon}`);
      });
      
      let replacement = '';
      for (const [pkg, iconList] of Object.entries(packages)) {
        replacement += `import { ${iconList.join(', ')} } from "${pkg}";\n`;
      }
      return replacement.trim();
    });
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
