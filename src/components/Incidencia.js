

function Incidencia({ children, incidencia }) {
    return (
        <div className='card'>
            <p><strong>{incidencia.nombre}</strong></p>
            <p>{incidencia.descripcion}</p>
            {children}
        </div>
    )
}

export default Incidencia