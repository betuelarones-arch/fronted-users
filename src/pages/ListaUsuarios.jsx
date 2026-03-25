import { useState } from 'react';
import { useUsuarios } from '../hooks/useUsuarios';
import Formulario from '../components/Formulario';
import styles from '../ListaUsuarios.module.css';

const ListaUsuarios = () => {
    const { usuarios, cargando, crearUsuario, actualizarUsuario, eliminarUsuario } = useUsuarios();
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const guardarCambios = (datos) => {
        if (usuarioEditando) {
            actualizarUsuario(usuarioEditando.id, datos);
        } else {
            crearUsuario(datos);
        }
    };

    if (cargando) return (
        <div className={styles.wrapper}>
            <div className={styles.loading}>
                <span className={styles.spinner} />
                Cargando usuarios...
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>

            {/* ─── Encabezado ─────────────────── */}
            <div className={styles.header}>
                <div className={styles.headerLine} />
                <div>
                    <h2 className={styles.title}>Gestión de Usuarios</h2>
                    <p className={styles.subtitle}>Panel de administración</p>
                </div>
            </div>

            {/* ─── Formulario ─────────────────── */}
            <div className={styles.formCard}>
                <Formulario
                    onGuardar={guardarCambios}
                    usuarioEditando={usuarioEditando}
                    setUsuarioEditando={setUsuarioEditando}
                    styles={styles}         
                />
            </div>

            {/* ─── Tabla ──────────────────────── */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Sueldo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr>
                                <td colSpan={5}>
                                    <div className={styles.emptyState}>
                                        <span>📋</span>
                                        <p>Sin usuarios registrados aún.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            usuarios.map(u => (
                                <tr key={u.id}>
                                    <td data-label="Nombre">
                                        <span
                                            className={styles.cellNombre}
                                            data-initial={u.nombre?.[0]?.toUpperCase() ?? '?'}
                                        >
                                            {u.nombre}
                                        </span>
                                    </td>
                                    <td data-label="Email" className={styles.cellEmail}>{u.email}</td>
                                    <td data-label="Rol">
                                        <span className={`${styles.badge} ${styles[u.rol?.toLowerCase()] ?? ''}`}>
                                            {u.rol}
                                        </span>
                                    </td>
                                    <td data-label="Sueldo" className={styles.cellSueldo}>
                                        ${Number(u.sueldo).toLocaleString()}
                                    </td>
                                    <td data-label="Acciones" className={styles.cellAcciones}>
                                        <span className={styles.actionGroup}>
                                            <button
                                                className={styles.btnEdit}
                                                onClick={() => setUsuarioEditando(u)}
                                                title="Editar"
                                            >✏️</button>
                                            <button
                                                className={styles.btnDelete}
                                                onClick={() => eliminarUsuario(u.id)}
                                                title="Eliminar"
                                            >🗑️</button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaUsuarios;