import { createRequire } from 'module';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { logs } from '@opentelemetry/api-logs';

const require = createRequire(import.meta.url);
const { Resource } = require('@opentelemetry/resources/build/src/Resource');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');
const SERVICE_NAME = process.env.OTEL_SERVICE_NAME || 'node-graphql-api';
const NEW_RELIC_OTLP_ENDPOINT =
  process.env.NEW_RELIC_OTLP_ENDPOINT || 'https://otlp.nr-data.net:4318';

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

  // Use Resource.fromAttributes for resource definition
  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
  });

  const headers = {
    'api-key': process.env.NEW_RELIC_API_KEY,
  };

  // Configure Trace Exporter to send data to New Relic
  const traceExporter = new OTLPTraceExporter({
    url: `${NEW_RELIC_OTLP_ENDPOINT}/v1/traces`,
    headers,
  });

  // Configure Metric Exporter to send data to New Relic
  const metricExporter = new OTLPMetricExporter({
    url: `${NEW_RELIC_OTLP_ENDPOINT}/v1/metrics`,
    headers,
  });

  // Configure Log Exporter to send data to New Relic
  const logExporter = new OTLPLogExporter({
    url: `${NEW_RELIC_OTLP_ENDPOINT}/v1/logs`,
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
    logRecordProcessor: new BatchLogRecordProcessor(logExporter),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  // Start the SDK and gracefully shut it down on process exit
  sdk.start();
  console.log('OpenTelemetry SDK initialized for New Relic.');

  process.on('SIGTERM', async () => {
    try {
      await sdk.shutdown();
      console.log('OpenTelemetry SDK shut down successfully');
    } catch (error) {
      console.error('Error shutting down SDK', error);
    } finally {
      process.exit(0);
    }
  });
};

export {
  OTLPTraceExporter,
  OTLPMetricExporter,
  OTLPLogExporter,
  BatchLogRecordProcessor,
  NodeSDK,
  getNodeAutoInstrumentations,
  PeriodicExportingMetricReader,
  SemanticResourceAttributes,
  logs,
};
