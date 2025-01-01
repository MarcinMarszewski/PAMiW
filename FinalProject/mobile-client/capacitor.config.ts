import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  appId: 'com.example.app',
  appName: 'androidApp',
  webDir: 'out'
};

export default config;
