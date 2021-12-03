
export const GenerateConsoleLogger = function(name: string)
{
    const { addColors, createLogger, format, transports } = require('winston');
    const { combine, timestamp, label, splat, simple, colorize } = format;

    addColors({
      warn: 'yellow',
      info: 'blue',
      debug: 'green'
    });

    return createLogger({
        format: combine(
          label({ label: name }),
          splat(),
          simple(),
          timestamp(),
          colorize()
        ),
        transports: [
          new(transports.Console)({
            level: 'debug',
            colorize: true,
            timestamp: function () {
                return (new Date()).toLocaleTimeString();
            },
            prettyPrint: true
          })
        ]
      });
}

export const GenerateFileLogger = function(name: string)
{
    const { createLogger, format, transports } = require('winston');
    const { combine, timestamp, label, prettyPrint } = format;

    return createLogger({
        format: combine(
          label({ label: name }),
          timestamp(),
          prettyPrint()
        ),
        transports: [new transports.File({ filename: 'combined.log' })]
      });
}