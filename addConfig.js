#!/usr/bin/env node

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, 'config.json');

const API_KEY = process.argv[2];

if (!API_KEY) {
    console.error('API key is required.');
    process.exit(1);
}

const config = {
    API_KEY,
};

async function writeConfig(config) {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}
writeConfig(config).then(() => {
    console.log('Config file written successfully!');
}).catch((err) => {
    console.error('Error writing config file:', err);
});
