import chalk from 'chalk';
export const highlight = (response) => {
    const lines = response.split('\n');
    let inCodeBlock = false;
    let codeLines = [];

    for (const line of lines) {
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;

            if (!inCodeBlock) {
                const maxLength = Math.max(...codeLines.map(codeLine => codeLine.length));

                console.log(chalk.bgHex('#1f2938').hex('#51DF60')(' '.repeat(maxLength + 4)));
                // Print each code line with a black background and white text
                for (const codeLine of codeLines) {
                    console.log(chalk.bgHex('#1f2938').hex('#51DF60')(`  ${codeLine.padEnd(maxLength, ' ')}  `));

                }
                console.log(chalk.bgHex('#1f2938').hex('#51DF60')(' '.repeat(maxLength + 4)));
                // Reset codeLines array
                codeLines = [];
            }
        } else if (inCodeBlock) {
            codeLines.push(line);
        } else {
            console.log(highlightTerms(line));
        }
    }
}

function highlightTerms(line) {
    const regex = /`[^`]+`/g;
    let result;
    let lastIndex = 0;
    let output = '';

    while ((result = regex.exec(line)) !== null) {
        const term = result[0].slice(1, -1); // Remove backticks
        const highlightedTerm = chalk.blueBright.bold(` ${term} `);

        // Add text before the term and the highlighted term to the output
        output += chalk.hex(`#51DF60`)(line.slice(lastIndex, result.index)) + highlightedTerm;

        // Update lastIndex to start after the current term
        lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last term
    output += chalk.hex(`#51DF60`)(line.slice(lastIndex));

    return output;
}
