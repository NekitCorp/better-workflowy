import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from '../package.json';
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, '')
    // split into version parts
    .split(/[.-]/);

export default defineManifest(async (env) => ({
    manifest_version: 3,
    name: 'Better WorkFlowy',
    description: 'Enhance WorkFlowy',
    version: `${major}.${minor}.${patch}`,
    version_name: version,
    icons: {
        '16': 'src/assets/icons/icon16.png',
        '48': 'src/assets/icons/icon48.png',
        '128': 'src/assets/icons/icon128.png',
    },
    permissions: ['storage'] as chrome.runtime.ManifestPermissions[],
    options_ui: {
        page: 'src/options/options.html',
        open_in_tab: false,
    },
    content_scripts: [
        {
            matches: ['*://www.workflowy.com/*', '*://workflowy.com/*'],
            js: ['src/content/index.ts'],
        },
    ],
}));
