import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

// Use Tamagui's full default configuration
// This includes all the tokens, themes, and setup needed for Tamagui UI components
const config = createTamagui(defaultConfig);

export type AppConfig = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
