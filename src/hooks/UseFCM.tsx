import { useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import { auth } from "../firebaseConfig";

const useFCM = () => {
 
//  const { user } = useAuth();

const user = auth.currentUser;
 
 useEffect(() => {
  if (!user) return;
  console.log("Plateforme détectée :", Capacitor.getPlatform());
  if (!Capacitor.isNativePlatform()) {
   console.log("Non natif : pas pour les notifications push.");
   return;
  }
PushNotifications.requestPermissions().then(result => {
 console.log('Résultat de requestPermissions:', result);
 if (result.receive === 'granted') {
  console.log('Permission accordée');
  PushNotifications.register();
 } else {
  console.log('Permission refusée');
 }
});
  PushNotifications.addListener('registration', async (token) => {
   console.log('Token FCM :', token.value);
   try {
    await axios.post('http://192.168.1.174:3000/save-token', {
     userId: user.uid,
     token: token.value
    });
    console.log(token + 'Token envoyé au serveur');
   } catch (err) {
    console.error('Erreur envoi token au serveur', err);
   }
  });
  PushNotifications.addListener('registrationError', (err) => {
   console.error('Erreur d’enregistrement FCM', err);
  });
 }, [user]);
};
export default useFCM;
