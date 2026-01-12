import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

// Create Tamagui configuration using the default v4 config
// This provides a complete token system for colors, spacing, typography, etc.
const tamaguiConfig = createTamagui(defaultConfig);

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
