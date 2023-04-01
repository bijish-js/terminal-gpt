#!/usr/bin/env node

import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import chalk from "chalk"
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, 'config.json');

const API_KEY = process.argv[2];

if (!API_KEY) {
    console.log(chalk.hex("#EE4040").bold('API key is required.'));
    process.exit(1);
}

const config = {
    API_KEY,
};

async function writeConfig(config) {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}
writeConfig(config).then(() => {
    console.log(chalk.hex('#37BCFE').bold('Config file written successfully!'));
}).catch((err) => {
    console.log(chalk.hex("#EE4040").bold('Error writing config file:', err));
});
