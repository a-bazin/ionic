import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { IonButton, IonIcon, IonImg, IonItem, IonLabel, IonList } from "@ionic/react";
import { home } from "ionicons/icons";

const List: React.FC = () => {
 const [products , setProducts] = useState<any[]>([])

 const url = "http://localhost:3000/public/";

    useEffect(() =>{
        const sql  = query(collection(db, "product"));
        const unsubscribe = onSnapshot(sql, (snapshot) => {

            const products = snapshot.docs.map((doc) =>{
                const data = doc.data();
                
            /********** RECUP PHOTO FROM BACK */
            //  const photos = Array.isArray(data.photo) && data.photo.length  ?
            //  data.photo.filter((photoName) => photoName) 
            //  .map( (photoName) => 'http://localhost:3000/public/' +photoName.filepath) : 
            //  [];
             
             /********** RECUP PHOTO FROM BACK */
             
                return {
                    id: doc.id,
                    // photos,
                    ...data
                }
            })

            setProducts(products)
});   
return () => unsubscribe();
    },[])

console.log(products);
const markAsSold = async (productId: string) => {
    try {
      await fetch('http://localhost:3000/mark-as-sold', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId}),
      });

      // Optionnel : afficher une alerte ou notifier l'utilisateur ici
    } catch (error) {
      console.error('Erreur lors du marquage comme vendu :', error);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <IonLabel> Aucun produit trouvé </IonLabel>
      ) : (
        products
          .filter((p) => !p.isSold) // Ne pas afficher les produits vendus
          .map((product, index) => (
            <div key={index}>
              <IonImg
                src={
                  product.photo?.length > 0 && product.photo[0]
                    ? `${url}${product.photo[0].filepath}`
                    : "https://placehold.co/400"
                }
                alt="Image du produit"
              />

              {product.id && (
                <IonButton routerLink={`/detail/${product.id}`} routerDirection="forward">
                  Voir le produit
                </IonButton>
              )}

              <IonButton color="warning" onClick={() => markAsSold(product.id)}>
                Marquer comme vendu
              </IonButton>
            </div>
          ))
      )}
    </>
  );
};

export default List;