

function Tecnico({ children, tecnico }) {
    return (
        <div className='card'>
            <p><strong>{tecnico.nombre}</strong></p>
            {/* <p>Nacional: {proveedor.nacional ? 'Sí' : 'No'}</p> */}
            {children}
        </div>
    )
}

export default Tecnico