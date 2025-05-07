import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { IonButton, IonIcon, IonImg, IonItem, IonLabel, IonList } from "@ionic/react";
import { home } from "ionicons/icons";

const List: React.FC = () => {
 const [products , setProducts] = useState<any[]>([])

 const url = "http://192.168.1.174:3000/public/";

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


    return (
        <>
           { products.length === 0 ? (
            <IonLabel> Aucun produit trouvé </IonLabel>
           ) : (
               products.map((product, index) => (
                   <>
                   
              <IonImg
                src={product.photo?.length > 0 && product.photo[0] ? 
                    `${url}${product.photo[0].filepath}`
                     : 
                    "https://placehold.co/400"}
                alt="The Wisconsin State Capitol building in Madison, WI at night"
                ></IonImg>


{product.id && (
  <IonButton routerLink={`/detail/${product.id}`} routerDirection="forward">
    Voir le produit
  </IonButton>
)}

            </>
            )
        )
           )}
        </>
    )
}

export default List;