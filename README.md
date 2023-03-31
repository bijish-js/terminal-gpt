## Getting Started

To use GPT-in-Terminal, follow these steps:

1. Install Node.js on your local machine.
2. Install GPT-in-Terminal globally by running 
`npm install -g gpt-in-terminal`.
3. Add your OpenAI API key to the GPT-in-Terminal configuration file by running 
`terminal-gpt-add-key your_api_key_here`. 
This will add your API key to the `config.json` file located in the GPT-in-Terminal installation directory.
4. Run the command `terminal-gpt` to start a chat session with GPT-3.

## Usage

To start a chat session with GPT-3, simply open a terminal and type `terminal-gpt`. The program will prompt you for input and generate a response based on GPT-3's language model.

## Adding Your API Key

To add your OpenAI API key to the configuration file, run the command `terminal-gpt-add-key your_api_key_here`. This will add your API key to the `config.json` file located in the GPT-in-Terminal installation directory.

**Note:** You must have write permissions to the `config.json` file to add your API key.

## Check API Key Usage

To check the usage of your API key between a specific date range, run the following command:
`terminal-gpt-check-usage <start_date> <end_date>`

Replace `<start_date>` and `<end_date>` with dates in the format "yyyy-mm-dd". For example:
`terminal-gpt-check-usage "2023-01-01" "2023-01-31"`
This command will display the usage details of your API key between January 1st, 2023 and January 31st, 2023.

