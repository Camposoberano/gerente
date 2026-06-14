import fs from "fs";
import path from "path";

const DEFAULT_STORE = path.join(process.cwd(), ".agents", "notifications.json");

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function readNotifications(storePath = DEFAULT_STORE) {
  if (!fs.existsSync(storePath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeNotifications(notifications, storePath = DEFAULT_STORE) {
  ensureDir(storePath);
  fs.writeFileSync(storePath, JSON.stringify(notifications, null, 2));
}

export function recordNotification(notification, storePath = DEFAULT_STORE) {
  const notifications = readNotifications(storePath);
  const record = {
    id: `notif_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    created_at: new Date().toISOString(),
    ...notification,
  };
  notifications.push(record);
  writeNotifications(notifications.slice(-300), storePath);
  return record;
}

