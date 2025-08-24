import { logs, SeverityNumber } from '@opentelemetry/api-logs';

// Get a logger instance from the global logger provider
const loggerProvider = logs.getLoggerProvider();
const otelLogger = loggerProvider.getLogger('node-graphql-api-logger');

/**
 * A logger middleware that sends logs to OpenTelemetry.
 * It can be injected into the GraphQL context.
 */
export const logger = {
  info: (message, attributes = {}) => {
    otelLogger.emit({
      severityNumber: SeverityNumber.INFO,
      body: message,
      attributes,
    });
  },
  error: (message, attributes = {}) => {
    otelLogger.emit({
      severityNumber: SeverityNumber.ERROR,
      body: message,
      attributes,
    });
  },
  warn: (message, attributes = {}) => {
    otelLogger.emit({
      severityNumber: SeverityNumber.WARN,
      body: message,
      attributes,
    });
  },
};
