import { getGatewayWebsocketServer } from "../../gateway/server/ws-connection.js";
import { formatForLog } from "../../gateway/ws-log.js";

// A simplified approach to send a system message.
// This broadcasts a custom event that a UI could listen for to display a system message.
// A more robust solution would target the specific client session.
export function sendSystemMessageToSession(sessionKey: string | undefined, message: string) {
  try {
    if (!sessionKey) return;
    const ws = getGatewayWebsocketServer();
    if (!ws) return;

    ws.broadcast("system-message", {
      sessionKey,
      message,
      timestamp: Date.now(),
    });
  } catch (err) {
    // Fail silently, this is a non-critical notification
    console.error(`Failed to send system message: ${formatForLog(err)}`);
  }
}
