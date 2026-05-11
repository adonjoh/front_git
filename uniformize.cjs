const fs = require('fs');
const path = require('path');

const directory = 'd:/laragon/www/club-genie-front/src/pages';
const excludeFiles = ['Dashboard.jsx', 'Landing.jsx', 'Showcase.jsx', 'Login.jsx', 'Register.jsx'];

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

const replacements = [
    { regex: /\bbg-white\b(?!(\/|\]))/g, replace: 'bg-white/[0.02] backdrop-blur-md' },
    { regex: /\btext-gray-900\b/g, replace: 'text-white' },
    { regex: /\btext-gray-800\b/g, replace: 'text-white' },
    { regex: /\btext-gray-700\b/g, replace: 'text-slate-300' },
    { regex: /\btext-gray-600\b/g, replace: 'text-slate-400' },
    { regex: /\btext-gray-500\b/g, replace: 'text-slate-400' },
    { regex: /\btext-gray-400\b/g, replace: 'text-slate-500' },
    { regex: /\btext-slate-900\b/g, replace: 'text-white' },
    { regex: /\btext-slate-800\b/g, replace: 'text-white' },
    { regex: /\bbg-gray-50\b/g, replace: 'bg-white/[0.01]' },
    { regex: /\bbg-gray-100\b/g, replace: 'bg-white/[0.02]' },
    { regex: /\bbg-slate-50\b/g, replace: 'bg-white/[0.01]' },
    { regex: /\bbg-slate-100\b/g, replace: 'bg-white/[0.02]' },
    { regex: /\bborder-gray-200\b/g, replace: 'border-white/10' },
    { regex: /\bborder-gray-100\b/g, replace: 'border-white/5' },
    { regex: /\bborder-gray-300\b/g, replace: 'border-white/10' },
    { regex: /\bborder-slate-200\b/g, replace: 'border-white/10' },
    { regex: /\bdivide-gray-200\b/g, replace: 'divide-white/10' },
    { regex: /\bbg-indigo-50\b/g, replace: 'bg-indigo-500/10' },
    { regex: /\btext-indigo-700\b/g, replace: 'text-indigo-400' },
    { regex: /\bbg-green-50\b/g, replace: 'bg-emerald-500/10' },
    { regex: /\bbg-green-100\b/g, replace: 'bg-emerald-500/20' },
    { regex: /\btext-green-700\b/g, replace: 'text-emerald-400' },
    { regex: /\bbg-red-50\b/g, replace: 'bg-rose-500/10' },
    { regex: /\btext-red-700\b/g, replace: 'text-rose-400' },
    { regex: /\btext-red-600\b/g, replace: 'text-rose-400' },
    { regex: /\bborder-red-200\b/g, replace: 'border-rose-500/20' },
    { regex: /\bborder-green-200\b/g, replace: 'border-emerald-500/20' },
    { regex: /\bbg-yellow-50\b/g, replace: 'bg-amber-500/10' },
    { regex: /\btext-yellow-700\b/g, replace: 'text-amber-400' },
    { regex: /\bborder-yellow-200\b/g, replace: 'border-amber-500/20' },
    { regex: /\bbg-blue-50\b/g, replace: 'bg-blue-500/10' },
    { regex: /\bbg-blue-100\b/g, replace: 'bg-blue-500/20' },
    { regex: /\btext-blue-700\b/g, replace: 'text-blue-400' },
    { regex: /\bbg-purple-100\b/g, replace: 'bg-purple-500/20' },
    { regex: /\btext-purple-700\b/g, replace: 'text-purple-400' },
    { regex: /\bbg-indigo-100\b/g, replace: 'bg-indigo-500/20' }
];

walk(directory, function(err, results) {
  if (err) throw err;
  results.forEach(file => {
    if (file.endsWith('.jsx')) {
        const basename = path.basename(file);
        if (excludeFiles.includes(basename)) return;

        let content = fs.readFileSync(file, 'utf8');
        let original = content;

        // Custom specific form inputs fix for standard strings
        content = content.replace(/className="w-full border rounded-lg/g, 'className="w-full border border-white/10 bg-white/5 rounded-lg text-white');
        content = content.replace(/className="w-full border border-gray-300/g, 'className="w-full border border-white/10 bg-white/5 text-white');
        content = content.replace(/className="border rounded px-2 py-1/g, 'className="border border-white/10 bg-white/5 rounded px-2 py-1 text-white');
        content = content.replace(/className="w-full border rounded-md/g, 'className="w-full border border-white/10 bg-white/5 rounded-md text-white');
        content = content.replace(/border border-gray-300/g, 'border border-white/10');
        
        replacements.forEach(r => {
            content = content.replace(r.regex, r.replace);
        });

        // Some manual cleanups since multiple replacements might cause duplicates
        content = content.replace(/border border border-white\/10/g, 'border border-white/10');
        content = content.replace(/border-white\/10 border-white\/10/g, 'border-white/10');
        
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Updated', basename);
        }
    }
  });
});
