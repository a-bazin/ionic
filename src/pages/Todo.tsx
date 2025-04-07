import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';


const Todo: React.FC = () => {

  const [task, setTask] = useState("");

  
  const handleChange = (event:any) =>{
    console.log(event.detail.value);
    
    setTask(event.target.value)
  }
  
  //CRUD -- READ - R
  const  [tasks, setTasks] = useState<{id:number, name:string, completed:boolean}[]>([]);
  
  //CRUD -- CREATE  - C
  const handleSubmit = () =>{
    console.log(task);
    
    if (task !== "") {
          //Ajout de la tache dans mon tableau tasks
        setTasks([...tasks, { id: new Date().getTime(), name:task, completed:false} ])
      //Ajout de la tache dans mon tableau tasks
    }

    // setTask("");
  }
const handleCompleted = (id:number) =>{
  setTasks(
    tasks.map(task =>
      task.id == id ? {...task, completed : !task.completed} : task
      
    )
  )
}
console.log(tasks);

//CRUD -- UPDATE - U

const handleEdit = (id:number) =>{
  setTasks(
    tasks.map(task =>
      task.id == id ? {...task, completed : !task.completed} : task
      
    )
  )
}
  
  //CRUD -- DELETE - D
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
  
  <IonItem >
    <IonInput label="Saisir une tâche" labelPlacement="floating" 
    placeholder="Saisir une tâche"
    
    name= "task" 
    value={task}

    onIonChange={handleChange}

    //AUTRE version/façon de faire ---
    // onIonChange={(event) => setTask(event.detail.value!)}

    ></IonInput>
    <IonButton  onClick={handleSubmit}>
     <IonIcon slot="icon-only" icon={add} ></IonIcon>
    </IonButton>
  </IonItem>

  <IonList>
    { tasks.map ((task) =>
      <IonItem key={task.id}>

        <IonCheckbox labelPlacement="end">
          <IonLabel 
          style={{ textDecoration: task.completed ? "line-through" : "none "}}
          onClick={() =>handleCompleted(task.id)}>{task.name}</IonLabel>
        </IonCheckbox>

        <IonButton onClick={() =>handleEdit(task.id)} color='warning'>Edit</IonButton>
        <IonButton color='danger'>Supprimer</IonButton>

      </IonItem>
    )}
  </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Todo;
