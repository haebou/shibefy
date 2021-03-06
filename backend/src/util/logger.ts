import winston from "winston";
import 'winston-daily-rotate-file';

const LOG_LEVEL_LIMIT = 12;
const format = winston.format.printf((meta) => {
  const { level, message, labels, timestamp } = meta;
  return `${
    timestamp
  } | ${
    level.padEnd(7, ' ')
  } | ${
    (labels || []).join("-").slice(0, LOG_LEVEL_LIMIT).padEnd(LOG_LEVEL_LIMIT, ' ')
  } | ${message}`;
});
 

export const logger = winston.createLogger({
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp(),
    format,
    // winston.format.json(),
  ),
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console(),
    new (winston.transports as any).DailyRotateFile({
      filename: 'output-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxFiles: 10,
   })
  ], 
});