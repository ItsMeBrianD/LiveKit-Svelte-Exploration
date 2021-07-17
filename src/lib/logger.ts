import { log, LogLevel } from "missionlog";

/**
 * initialize missionlog
 * @param config JSON which assigns tags levels. An uninitialized,
 *    tag's level defaults to INFO.
 * @param callback? handle logging whichever way works best for you
 */
 log.init(
    { transporter: 'INFO',
     security: 'ERROR', system: 'OFF', sfu: 'WARN',
      userMedia: 'INFO',
       userDevices: 'INFO',
        roomHandler: 'INFO',
      misc: 'INFO' },
    (level, tag, msg, params) => {
      const prefix = `[${tag}] ${level}: `;
      switch(level) {
        case LogLevel.ERROR:
          console.error(prefix, msg, ...params);
          break;
        case LogLevel.WARN:
          console.warn(prefix, msg, ...params);
          break;
        case LogLevel.INFO:
          console.log(prefix, msg, ...params);
          break;
      }
    });