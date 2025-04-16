/**
 * Centralized logging service for the application
 *
 * This module provides a consistent interface for logging across the application.
 * It supports different log levels and can be configured to output logs to
 * different destinations (console, file, remote service, etc.).
 *
 * @module logger
 */

// Log levels in order of severity
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Current log level - can be set via environment variable
const currentLogLevel: LogLevel = determineLogLevel()

/**
 * Determines the log level based on environment variables or defaults to INFO
 */
function determineLogLevel(): LogLevel {
  const envLogLevel = import.meta.env.VITE_LOG_LEVEL?.toUpperCase()

  switch (envLogLevel) {
    case 'DEBUG':
      return LogLevel.DEBUG
    case 'INFO':
      return LogLevel.INFO
    case 'WARN':
      return LogLevel.WARN
    case 'ERROR':
      return LogLevel.ERROR
    default:
      return LogLevel.INFO // Default log level
  }
}

/**
 * Formats a log message with timestamp and additional context
 */
function formatLogMessage(level: string, message: string, ...args: any[]): string {
  const timestamp = new Date().toISOString()
  const formattedArgs = args
    .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
    .join(' ')

  return `[${timestamp}] [${level}] ${message} ${formattedArgs}`.trim()
}

/**
 * Logger interface with methods for different log levels
 */
export interface Logger {
  debug(message: string, ...args: any[]): void
  info(message: string, ...args: any[]): void
  warn(message: string, ...args: any[]): void
  error(message: string, ...args: any[]): void
}

/**
 * Implementation of the Logger interface that logs to the console
 */
class ConsoleLogger implements Logger {
  debug(message: string, ...args: any[]): void {
    if (currentLogLevel <= LogLevel.DEBUG) {
      console.debug(formatLogMessage('DEBUG', message, ...args))
    }
  }

  info(message: string, ...args: any[]): void {
    if (currentLogLevel <= LogLevel.INFO) {
      console.info(formatLogMessage('INFO', message, ...args))
    }
  }

  warn(message: string, ...args: any[]): void {
    if (currentLogLevel <= LogLevel.WARN) {
      console.warn(formatLogMessage('WARN', message, ...args))
    }
  }

  error(message: string, ...args: any[]): void {
    if (currentLogLevel <= LogLevel.ERROR) {
      console.error(formatLogMessage('ERROR', message, ...args))
    }
  }
}

// Export a singleton instance of the logger
export const logger: Logger = new ConsoleLogger()
