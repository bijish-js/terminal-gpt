import axios from "axios";
import dayjs from "dayjs";
import chalk from 'chalk';
import jsonConfig from './config.json' assert { type: "json" };

const API_KEY = jsonConfig.API_KEY;

if (!API_KEY) {
    log(chalk.hex("#EE4040").bold("API_KEY not present."))
    process.exit();
}

function isValidDate(dateString) {
    const dateFormat = "YYYY-MM-DD";
    const dateObject = dayjs(dateString, dateFormat);
    return dateObject.isValid() && dateObject.format(dateFormat) === dateString;
}
function checkInequality(startDate, endDate) {
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);

    if (startDateObj.isAfter(endDateObj)) {
        return true
    } else {
        return false
    }
}

export async function checkTotalUsageSingle(givenDate) {
    try {
        if (isValidDate(givenDate) === false) {
            throw new Error("Invalid date format. Please use yyyy-mm-dd format.");
        }
        const url = `https://api.openai.com/v1/usage?date=${givenDate}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        console.log(chalk.hex('#37BCFE').bold(
            `Current usage in USD: ${response.data.current_usage_usd}`
        ));
    } catch (error) {
        console.log(chalk.hex("#EE4040").bold("Error:", error.message))
    }
}
export async function checkTotalUsageBetween(startDate, endDate) {
    try {
        if (isValidDate(startDate) === false) {
            throw new Error("Invalid start date format. Please use yyyy-mm-dd format.");
        } if (isValidDate(endDate) === false) {
            throw new Error("Invalid end date format. Please use yyyy-mm-dd format.");
        }
        if (checkInequality(startDate, endDate)) {
            throw new Error("Start date must be older than end date.");

        }
        const url = `https://api.openai.com/dashboard/billing/usage?end_date=${endDate}&start_date=${startDate}`

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        console.log(chalk.hex('#37BCFE').bold(
            `Total usage between ${startDate} and ${endDate} in USD: ${response.data.total_usage}`
        ));
    } catch (error) {
        console.log(chalk.hex("#EE4040").bold("Error:", error.message))
    }
}
const startDateArg = process.argv[2];
const endDateArg = process.argv[3];

if (startDateArg && endDateArg) {
    if (startDateArg === endDateArg) {
        console.log("Please provide distinct start date and end date");
    }
    else {
        checkTotalUsageBetween(startDateArg, endDateArg);

    }
} else if (startDateArg && !endDateArg) {
    checkTotalUsageSingle(startDateArg);
} else {
    checkTotalUsageSingle(dayjs().format("YYYY-MM-DD"));
}
