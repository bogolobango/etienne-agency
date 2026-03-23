/**
 * Structured logger for production use.
 * - Production: JSON lines (machine-parseable, compatible with Datadog/ELK/etc.)
 * - Development: human-readable console output
 */

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

const isProduction = process.env.NODE_ENV === "production";

function write(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  if (isProduction) {
    // Structured JSON — one line per entry for log aggregators
    const output = JSON.stringify(entry);
    if (level === "error") {
      process.stderr.write(output + "\n");
    } else {
      process.stdout.write(output + "\n");
    }
  } else {
    // Human-readable for development
    const prefix = `[${level.toUpperCase()}]`;
    const ctx = context ? ` ${JSON.stringify(context)}` : "";
    if (level === "error") {
      console.error(`${prefix} ${message}${ctx}`);
    } else if (level === "warn") {
      console.warn(`${prefix} ${message}${ctx}`);
    } else {
      console.log(`${prefix} ${message}${ctx}`);
    }
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => write("info", message, context),
  warn: (message: string, context?: Record<string, unknown>) => write("warn", message, context),
  error: (message: string, context?: Record<string, unknown>) => write("error", message, context),
};
