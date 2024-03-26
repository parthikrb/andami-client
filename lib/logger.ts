"use strict";

import type { LoggerOptions, Logger } from "winston";
import type Transport from "winston-transport";
import { createLogger, transports as _transports, format } from "winston";

const _logger = (opts?: LoggerOptions): Logger => {
  const defaultTransport: Transport = new _transports.Console({
    format:
      process.env.NODE_ENV === "production"
        ? format.combine(
            format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            format.json()
          )
        : format.combine(
            format.colorize(),
            format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
    handleExceptions: true,
  });

  const transports = !opts?.transports
    ? [defaultTransport]
    : Array.isArray(opts.transports)
    ? [defaultTransport, ...opts.transports]
    : [defaultTransport, opts.transports];

  return createLogger({
    ...opts,
    transports,
  });
};

export const logger = _logger();
