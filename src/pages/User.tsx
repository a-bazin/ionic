import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTabBar, IonTitle, IonToolbar } from "@ionic/react";
import Register from "../components/user/Register";
import Login from "../components/user/Login";
import { useEffect, useState } from "react";
import "./User.css"
import { useAuth } from "../components/context/AuthContext";
import Profil from "../components/profil/Profil";
import { useHistory } from "react-router";


const User: React.FC = () => {
    const [activeForm, setActiveForm] = useState<string | null>(null);
    
    //Recuperation du user connecté
    const { user } = useAuth();
    const history = useHistory(); 

// console.log(user);
 useEffect(() => {
    if (!user) return;
            history.push("/profil"); // Redirection immédiate

  }, [user]);
    return (
        <IonPage>
        {user ? (
                <>
            <Profil></Profil>
          </>
                    ) : (
                       
                        <>
                            <IonHeader>
                <IonToolbar>
                    <IonTitle className="header-title">Acceder à mon application</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="page-container">
                <div className="form-container">
                    <IonItem>
                        
                        <IonButton slot="end" onClick={() => setActiveForm('login')}>Connexion</IonButton>
                        <IonButton slot="end" onClick={() => setActiveForm('register')}>Inscription</IonButton>

                    </IonItem>

                    <h3 className="text-center">La bonne zone (Vinted)</h3>
                
                    {activeForm === 'login' && <Login />}
                    {/* {activeForm === 'register' && <Register />} */}
                    
                    {/* Redirection vers la page de login apres Inscription */}
                    {activeForm === 'register' && (
                    <Register onRegisterSuccess={() => setActiveForm('login')} />
                    )}
                </div>
            </IonContent>
                        </>
                    )}
                    </IonPage>
    )
}

export default User;