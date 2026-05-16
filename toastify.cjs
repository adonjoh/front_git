const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'src/pages/Projects.jsx',
    'src/pages/Notifications.jsx',
    'src/pages/MesGroupes.jsx',
    'src/pages/Forum.jsx',
    'src/pages/chef/ProjetTaches.jsx',
    'src/pages/chef/MesProjets.jsx',
    'src/pages/censeur/QrCodes.jsx',
    'src/pages/censeur/Infractions.jsx',
    'src/pages/admin/Utilisateurs.jsx',
    'src/pages/admin/Groupes.jsx'
];

filesToUpdate.forEach(relPath => {
    const fullPath = path.join('d:/laragon/www/club-genie-front', relPath);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Determine relative path depth
    const depth = relPath.split('/').length - 2; // src/pages/Forum.jsx -> 3-2 = 1 => '../'
    const prefix = depth === 1 ? '../' : '../../';
    const importStatement = `import { useNotificationStore } from '${prefix}stores/useNotificationStore';\n`;
    
    // Add import if missing
    if (!content.includes('useNotificationStore')) {
        const importMatch = content.match(/import .*?['"];?\n/g);
        if (importMatch) {
            const lastImport = importMatch[importMatch.length - 1];
            content = content.replace(lastImport, lastImport + importStatement);
        } else {
            content = importStatement + content;
        }
    }
    
    // Inject hook inside component
    const compRegex = /(const \w+ = \(\) => {|export default function \w+\(\) {)/;
    if (!content.includes('const addToast =')) {
        content = content.replace(compRegex, `$1\n    const addToast = useNotificationStore(state => state.addToast);`);
    }

    // Replace alerts
    content = content.replace(/alert\((.*)\)(;?)/g, (match, inner, semi) => {
        if (inner.includes('Erreur') || inner.includes('err.response')) {
            return `addToast(${inner}, "error")${semi}`;
        }
        return `addToast(${inner}, "success")${semi}`;
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated', relPath);
});
