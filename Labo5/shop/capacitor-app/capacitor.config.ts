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
  appName: 'capacitor-app',
  webDir: 'build'
};

export default config;
