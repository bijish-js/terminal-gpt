#!/usr/bin/env node

import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
import chalk from 'chalk';
import fs from 'fs/promises';

import { highlight } from "./highlight.js"
const { log } = console

config()

const appConfig = {
    model: "gpt-3.5-turbo",
    welcomeText: "#37BCFE",
    prompt: "#D84CA9",
    answer: "#51DF60",
    error: "#EE4040"
}


async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

const jsonConfig = await readJsonFile('./config.json');
const API_KEY = jsonConfig.API_KEY;

if (!API_KEY) {
    log(chalk.hex("#EE4040").bold("API_KEY not present."))
    process.exit();
}

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let loadingInterval;
const askGPT = async (inputText) => {
    try {
        loadingInterval = startLoadingAnimation();
        const response = await openai.createChatCompletion({
            model: appConfig.model,
            messages: [{ role: "user", content: inputText }]
        })
        // an object inside choice contains message:{role,content},finish_reason,index
        stopLoadingAnimation(loadingInterval);
        highlight(response?.data?.choices[0]?.message?.content)


    }
    catch (error) {
        stopLoadingAnimation(loadingInterval, "");
        log(chalk.hex(appConfig.error).bold(error))

    }

}

function startLoadingAnimation() {
    const animation = ['|', '/', '-', '\\'];
    let i = 0;
    return setInterval(() => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`Loading ${animation[i++]}`);
        i = i % animation.length;
    }, 200);
}

function stopLoadingAnimation(loadingInterval, completeText = " ") {
    clearInterval(loadingInterval);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(completeText);
}

//start
log(chalk.hex(appConfig.welcomeText).bold('HELLO! I AM'),
    chalk.hex('#000000').bgHex('#BEFF87').bold('CHAT-GPT'),
    chalk.hex(appConfig.welcomeText).bold('IN YOUR TERMINAL.')
);

userInterface.prompt()
userInterface.on("line", async (input) => {
    await askGPT(input)
    userInterface.prompt()
}
)



