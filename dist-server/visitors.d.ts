import { WebSocket } from "ws";
import { IncomingMessage, Server } from "http";
export declare function setupVisitorTracking(server: Server): import("ws").Server<typeof WebSocket, typeof IncomingMessage>;
export declare function getActiveVisitorCount(): number;
