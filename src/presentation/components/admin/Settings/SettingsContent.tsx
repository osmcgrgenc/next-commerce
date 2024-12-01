"use client";

import { SecuritySettings } from "./SecuritySettings";
import { GeneralSettings } from "./GeneralSettings";
import { NotificationSettings } from "./NotificationSettings";
import { DatabaseSettings } from "./DatabaseSettings"
import { LogSettings } from "./LogSettings"
import { UserSettings } from "./UserSettings";
import { UpdateSettings } from "./UpdateSettings";
import { InformationSettings } from "./InformationSettings";

interface Props {
  section: string;
}

const SECTION_COMPONENTS = {
  "security": SecuritySettings,
  "general": GeneralSettings,
  "notifications": NotificationSettings,
  "database": DatabaseSettings,
  "logs": LogSettings,
  "users": UserSettings,
  "update": UpdateSettings,
  "information": InformationSettings,
} as const;

export function SettingsContent({ section }: Props) {
  const Component = SECTION_COMPONENTS[section as keyof typeof SECTION_COMPONENTS] || GeneralSettings;

  return (
    <div className="bg-white rounded-lg shadow">
      <Component />
    </div>
  );
} 