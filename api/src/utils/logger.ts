const { createLogger, format, transports } = require("winston");
require("winston-mongodb");

const logConfiguration = {
  transports: [
    new transports.File({
      filename: "logs/server.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info: { level: any; timestamp: any; message: any }) =>
            `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.MongoDB({
      level: "error",
      db: "mongodb+srv://kagan:Mongodb33@cluster0.8mguy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      options: {
        useUnifiedTopology: true,
      },
      collection: "server_logs",
    }),
  ],
};

export const logger = createLogger(logConfiguration);
