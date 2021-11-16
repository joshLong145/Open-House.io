
export const GenerateConsoleLogger = function(name: string)
{
    const { createLogger, format, transports } = require('winston');
    const { combine, timestamp, label, splat, simple } = format;

    return createLogger({
        format: combine(
          label({ label: name }),
          splat(),
          simple(),
          timestamp()
        ),
        transports: [new transports.Console()]
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