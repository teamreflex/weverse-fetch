import { registerEvents } from './events';
import { WeverseClient } from "weverse"
import { info } from "./logging"

export function buildClient(silent: boolean = false): WeverseClient {
  const username = process.env.WEVERSE_EMAIL;
  const password = process.env.WEVERSE_PASSWORD;
  if (username && password) {
    const client = new WeverseClient({ username, password });

    if (!silent) {
      info(`Logging in with email & password`);
      return registerEvents(client);
    }

    return client;
  }

  const token = process.env.WEVERSE_TOKEN;
  if (token) {
    const client = new WeverseClient({ token });

    if (!silent) {
      info(`Logging in with access token`);
      return registerEvents(client);
    }

    return client;
  }

  throw new Error('No credentials provided');
}