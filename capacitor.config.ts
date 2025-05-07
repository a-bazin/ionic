import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'demo1',
  webDir: 'dist',
  server: {
    cleartext: true, // j'autorise le HTTP
    hostname: '192.168.1.174', //Mon IP (à changer)
    androidScheme: 'http'
  },plugins: {
  PushNotifications: {
   presentationOptions: ["badge", "sound", "alert"],
  },
 },

};

export default config;
