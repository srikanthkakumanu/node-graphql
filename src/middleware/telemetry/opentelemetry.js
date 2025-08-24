import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import {
  SimpleLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { logs } from '@opentelemetry/api-logs';

/**
 * Initializes the OpenTelemetry SDK for Node.js.
 * This function should be called before any other module is imported.
 */
export const initOpenTelemetry = () => {
  // Check for New Relic API Key. It should be an Ingest - License key.
  if (!process.env.NEW_RELIC_API_KEY) {
    console.warn(
      'NEW_RELIC_API_KEY is not set. OpenTelemetry data will not be sent to New Relic.'
    );
    return;
  }

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'node-graphql-api', // Replace with your service name
  });

  const headers = {
    'api-key': process.env.NEW_RELIC_API_KEY,
  };

  // Configure Trace Exporter to send data to New Relic
  const traceExporter = new OTLPTraceExporter({
    url: 'https://otlp.nr-data.net:4318/v1/traces',
    headers,
  });

  // Configure Metric Exporter to send data to New Relic
  const metricExporter = new OTLPMetricExporter({
    url: 'https://otlp.nr-data.net:4318/v1/metrics',
    headers,
  });

  // Configure Log Exporter to send data to New Relic
  const logExporter = new OTLPLogExporter({
    url: 'https://otlp.nr-data.net:4318/v1/logs',
    headers,
  });

  // Set up the SDK
  const sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 5000,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  // Set up the global logger provider
  const loggerProvider = new LoggerProvider({ resource });
  loggerProvider.addLogRecordProcessor(
    new SimpleLogRecordProcessor(logExporter)
  );
  logs.setGlobalLoggerProvider(loggerProvider);

  // Start the SDK and gracefully shut it down on process exit
  sdk.start();
  console.log('OpenTelemetry SDK initialized for New Relic.');

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => console.log('OpenTelemetry SDK shut down successfully'))
      .catch((error) => console.error('Error shutting down SDK', error))
      .finally(() => process.exit(0));
  });
};
