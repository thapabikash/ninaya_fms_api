/**
 * winstonLogger.js
 * uses winston for logging
 * not used for now but if we want to use in future
 */
const appRoot = require("app-root-path");
const winston = require("winston");
const path = require("path");

const options = {
  file: {
    level: "info",
    filename: path.join(appRoot.toString(), "src", "log", "app.log"),
    handleExceptions: true,
    json: true,
    maxsize: 52428800, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.json(),
  },
};
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.json()
);
winston.addColors(options.colors);
// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
