# GPT in Terminal 👾

GPT-in-Terminal is a versatile and user-friendly command-line tool built with Node.js that allows developers to interact seamlessly with OpenAI's powerful GPT-3 language model. 

After obtaining an API key from the __OpenAI dashboard__, users can easily set it up within the tool and start leveraging its features. By installing GPT-in-Terminal globally, users can access its functionalities directly from their terminal, provided they have Node.js installed. 

The tool offers interactive chat sessions with GPT-3, complete with __colorful__ highlights for chats, prompts, code sections, and important terms for enhanced readability. 

Additionally, GPT-in-Terminal provides a convenient way to monitor API key usage in terms of monetary cost within specified date ranges. This comprehensive solution simplifies the process of working with the GPT-3 language model directly from the terminal.


![GPT in terminal screenshot](https://i.ibb.co/ByLWBp9/Screenshot-2023-04-01-at-6-14-28-PM.png)

## Getting Started 🎬

To use GPT-in-Terminal, follow these steps:

1️⃣  Install [Node.js](https://nodejs.org/en/download) on your local machine.  

2️⃣  Install GPT-in-Terminal globally 
```bash
npm install -g gpt-in-terminal
```
3️⃣  Add your OpenAI API key to the GPT-in-Terminal configuration file. This will add your API key to the `config.json` file located in the GPT-in-Terminal installation directory.
```bash
terminal-gpt-add-key your_api_key_here
```
For example, if  API key is  `SN-uelksry743swfr875ty758jsr`, it should be given as:
```bash
terminal-gpt-add-key SN-uelksry743swfr875ty758jsr
```
  
4️⃣  Run the command to start a chat session with GPT-3.
```bash 
terminal-gpt
```
 

## API Key Usage 🔑

To check the usage of your API key between a specific date range, run the following command:
```bash
terminal-gpt-check-usage start_date_here end_date_here
```
Replace `start_date_here` and `end_date_here` with dates in the format `yyyy-mm-dd`. For example:
```bash
terminal-gpt-check-usage "2023-01-01" "2023-01-31"
```
The above command will display the usage details of your API key between January 1st, 2023 and January 31st, 2023.

##  Links 🔗
- [Author](https://www.bijishob.com)
- [Repository](https://github.com/bijish-js/terminal-gpt)
