import debug from 'debug';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const SESSION_KEY = 'oss-compass:debug';

if (typeof window !== 'undefined') {
  // enable debug logs if the URL search string contains `debug`
  // e.g. http://localhost:3000/?debug
  if (window.location.search.includes('debug')) {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }
  if (sessionStorage.getItem(SESSION_KEY) === 'true') {
    // enable all debug logs by default
    debug.enable('*');
    console.warn('Debug logs enabled');
  }
  if (process.env.NODE_ENV === 'development') {
    debug.enable('*');
    console.warn('Debug logs enabled');
  }
}

export class DebugLogger {
  private _debug: debug.Debugger;

  constructor(namespace: string) {
    this._debug = debug(namespace);
  }

  set enabled(enabled: boolean) {
    this._debug.enabled = enabled;
  }

  get enabled() {
    return this._debug.enabled;
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }

  log(level: LogLevel, message: string, ...args: any[]) {
    this._debug.log = console[level].bind(console);
    this._debug(`[${level.toUpperCase()}] ${message}`, ...args);
  }
}
