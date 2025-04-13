import React, { use, useEffect, useState } from "react";
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton,
    IonItem, IonLabel, IonAlert, IonGrid, IonRow, IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const Profil: React.FC = () => {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, "users", user.uid)
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setPrenom(data.prenom);
                    setNom(data.nom);
                    setEmail(data.email);
                }
            }
        }
        fetchUserData();
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            if (!auth.currentUser) return;
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                prenom,
                nom
            })

            setAlertMessage("Profil mis à jour avec succès!")
        } catch (error: any) {
            setAlertMessage("Erreur lors de la mis à jour" + error.message);
        }
        setShowAlert(true);
    };

    const handleLogout = async () => {
        await auth.signOut();
        history.push("/login")
    };

    const handleDeleteAccount = async () => {
        if (!auth.currentUser) return;

        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await deleteDoc(userRef);

            await auth.currentUser.delete();

            setAlertMessage("Compte supprimé avec succès!")
            setShowAlert(true);
            history.push("/login");

        } catch (error: any) {
            setAlertMessage("Erreur lors de la supprission" + error.message);
            setShowAlert(true)
        }
    };

    console.log('***currentUser', user);

    return (
        <IonPage>
            {user ? (
                <>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Mon Profil</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <>
                            <IonItem>
                                <IonLabel position="floating">Prénom</IonLabel>
                                <IonInput value={prenom} onIonChange={(e) => setPrenom(e.detail.value!)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Nom</IonLabel>
                                <IonInput value={nom} onIonChange={(e) => setNom(e.detail.value!)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput value={email} disabled />
                            </IonItem>

                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonButton expand="full" onClick={handleUpdateProfile} color="primary">Enregistrer</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton expand="full" onClick={handleLogout} color="warning">Se Déconnecter</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton expand="full" onClick={() => setShowDeleteAlert(true)} color="danger">Supprimer</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </>
                        <IonAlert
                            isOpen={showAlert}
                            message={alertMessage}
                            buttons={["OK"]}
                            onDidDismiss={() => setShowAlert(false)}
                        />

                        <IonAlert
                            isOpen={showDeleteAlert}
                            header="Confirmation"
                            message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
                            buttons={[
                                { text: "Annuler", role: "cancel" },
                                { text: "Supprimer", handler: handleDeleteAccount }
                            ]}
                            onDidDismiss={() => setShowDeleteAlert(false)}
                        />
                    </IonContent>
                </>
            ) : (
                <IonContent>
                    <p>Il faut être connecté pour la page profil😒</p>
                    <IonButton expand="full" href="/login" color="primary">Se connecter</IonButton> </IonContent>
            )}
        </IonPage>
    );
};

export default Profil;