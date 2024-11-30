"use client";

import { SettingsMenu } from "@/presentation/components/admin/Settings/SettingsMenu";
import { SettingsContent } from "@/presentation/components/admin/Settings/SettingsContent";

interface Props {
  params: {
    section: string;
  };
}

export default function SettingsSectionPage({ params }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SettingsMenu />
      <div className="md:col-span-2">
        <SettingsContent section={params.section} />
      </div>
    </div>
  );
} 