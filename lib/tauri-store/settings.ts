import { Store } from "tauri-plugin-store-api"

import { Settings } from "@/types/settings"
import { AppSetting } from "@/config/app-config"

const store = new Store(AppSetting.settingsStoreFile)

export async function getSettings(): Promise<Settings | null> {
  return await store.get("settings")
}

export async function setSettings(settings: Settings): Promise<void> {
  await store.set("settings", settings)
  await store.save()
}

export async function getChosenConnectionId(): Promise<string | null> {
  const settings = await getSettings()
  return settings?.chosenConnectionId || null
}

export async function setChosenConnectionId(
  connectionId: string
): Promise<void> {
  let settings = await getSettings()
  if (settings) {
    settings.chosenConnectionId = connectionId
  } else {
    settings = { chosenConnectionId: connectionId }
  }
  await setSettings(settings)
}
