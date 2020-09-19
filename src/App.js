import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')); //El local storage solo acepta string por eso se le agrega JSON.parse que convierte a string
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  //useEffect es para realizar operaciones cuando el state cambia. Agregarle un array vacio para que se ejecute una sola vez
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Funcion que lea las citas actuales y agregue las nuevas. 
  const agregarCita = cita => {
    setCitas([
      ...citas,
      cita
    ]);
  }
  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  //Mensaje condicional para cuando no hay citas agregadas
  const title = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
  return (  
    <Fragment>
        <h1>
          Administrador de pacientes
        </h1>
        <div className="container">
           <div className="row">
              <div className="one-half column"> {/* skeleton */}
                    <Formulario
                      agregarCita={agregarCita}
                    />
              </div>
              <div className="one-half column"> {/* skeleton */}
                    <h2>{title}</h2>
                    {citas.map(cita => (
                      <Cita
                        key={cita.id} 
                        cita={cita}
                        eliminarCita={eliminarCita}
                      /> 
                    ))}
              </div>
           </div>
        </div>
    </Fragment>
  );
}

export default App;
