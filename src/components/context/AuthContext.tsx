import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fullUser = { ...docSnap.data(), email: firebaseUser.email };
          setUser(fullUser);
          localStorage.setItem("user", JSON.stringify(fullUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    // Lire le user depuis localStorage au démarrage (pour éviter un flash à null)
    const local = localStorage.getItem("user");
    if (local) {
      setUser(JSON.parse(local));
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
