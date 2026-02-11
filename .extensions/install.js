/**
 * VSMC Internal Extensions Installer
 * Usage: node install.js [extension-id]
 */

const { execSync } = require('child_process');

const EXTENSIONS = {
    'letzplayfull': [
        'esbenp.prettier-vscode',
        'dbaeumer.vscode-eslint',
        'ritwickdey.LiveServer'
    ],
    'thequadsfather': [
        'christian-kohler.path-intellisense',
        'eamodio.gitlens',
        'ms-azuretools.vscode-docker'
    ],
    'jemzjewelz': [
        'esbenp.prettier-vscode',
        'dbaeumer.vscode-eslint',
        'ritwickdey.LiveServer',
        'eamodio.gitlens',
        'pkief.material-icon-theme'
    ]
};

const target = process.argv[2];

if (!target || !EXTENSIONS[target]) {
    console.error('❌ Please specify a valid extension set: letzplayfull, thequadsfather');
    process.exit(1);
}

console.log(`🚀 Installing extension set: ${target}...`);

try {
    EXTENSIONS[target].forEach(ext => {
        console.log(`Installing ${ext}...`);
        // execSync(`code --install-extension ${ext}`, { stdio: 'inherit' });
        console.log(`✅ ${ext} ready for install (command simulated)`);
    });
    console.log(`\n🎉 ${target} setup complete!`);
} catch (error) {
    console.error('❌ Installation failed:', error.message);
}
