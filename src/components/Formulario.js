import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({agregarCita}) => {

    //Creo estado para citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    //Creo un stado para errores
    const [error, setError] = useState(false)

    //Funcion que se ejecuta cuando se escribe algo en los inputs
    const handleChange = e => {
        setCita({ 
            ...cita, //hago una copia del objeto para cuando escriba en los inputs me agregue el valor a cada propiedad
            [e.target.name]: e.target.value //e: evento target: input seleccionado name: name de cada input
        })
    }

    //Extraer valor. Uso destructuring para evitar tener que escribir cita.mascota, cita.propietario, ...
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el uduario envia el formulario...abs
    const crearCita = e => {
        e.preventDefault(); //evita que se actualice la pagina y el query string en la url

        //Validar. El trim elimina los espacios en blanco
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true);
            return; //Para que no se siga ejecutando el codigo
        }
        //Eliminar mensaje de error cuando el formulario es valido
        setError(false);

        //Asignar un id para el objeto cita. Usar libreria npm i uuid
        cita.id = uuidv4();

        //Crear la cita
        agregarCita(cita);

        //Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
        }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            
            <form
               onSubmit={crearCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-witdh"
                    placeholder="Nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-witdh"
                    placeholder="Nombre dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-witdh"
                    onChange={handleChange}
                    value={fecha}
                    
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-witdh"
                    onChange={handleChange}
                    value={hora}
                    
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >AGREGAR CITA</button>
            </form>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
        </Fragment>
     );
}

//Documentar el componente
Formulario.propTypes = {
    agregarCita: PropTypes.func.isRequired
}
export default Formulario;