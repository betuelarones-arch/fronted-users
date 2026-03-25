import { useState, useEffect } from 'react';
import styles from '../Formulario.module.css';

const Formulario = ({ onGuardar, usuarioEditando, setUsuarioEditando }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('empleado');
    const [sueldo, setSueldo] = useState('');
    const [error, setError] = useState('');

    const isEditing = Boolean(usuarioEditando);

    useEffect(() => {
        if (usuarioEditando) {
            setNombre(usuarioEditando.nombre || '');
            setEmail(usuarioEditando.email || '');
            setRol(usuarioEditando.rol || 'empleado');
            setSueldo(usuarioEditando.sueldo || '');
            setError(''); 
        }
    }, [usuarioEditando]);

    const limpiar = () => {
        setNombre(''); setEmail(''); setSueldo(''); setRol('empleado');
        setError('');
        setUsuarioEditando(null);
    };

    const enviar = (e) => {
        e.preventDefault();
        if (!nombre || !email || !sueldo) {
            setError('Todos los campos con * son obligatorios.');
            return;
        }
        onGuardar({ 
            nombre: nombre.trim(), 
            email: email.trim(), 
            rol, 
            sueldo: parseFloat(sueldo), 
            estado: true 
        });
        limpiar();
    };

    return (
        <form
            onSubmit={enviar}
            className={`${styles.form} ${isEditing ? styles.modeEdit : styles.modeCreate}`}
        >
            {/* --- Alerta de Error --- */}
            {error && <div className={styles.alertError}><span>⚠️</span> {error}</div>}

            <div className={styles.formHeader}>
                <div className={styles.titleGroup}>
                    <h3 className={styles.formTitle}>
                        {isEditing ? '✏️ Edición de Perfil' : '➕ Registro de Usuario'}
                    </h3>
                    <p className={styles.formSubtitle}>
                        {isEditing ? 'Modificando credenciales' : 'Añadir nuevo miembro al sistema'}
                    </p>
                </div>
                <div className={`${styles.modePill} ${isEditing ? styles.edit : styles.create}`}>
                    {isEditing ? '⚡ EDITANDO' : '● NUEVO'}
                </div>
            </div>

            <div className={styles.grid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Nombre Completo <span className={styles.required}>*</span></label>
                    <input
                        className={styles.input}
                        type="text"
                        value={nombre}
                        onChange={e => {setNombre(e.target.value); setError('');}}
                        placeholder="Ej. Alexander Pierce"
                        autoComplete="off"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={e => {setEmail(e.target.value); setError('');}}
                        placeholder="correo@empresa.com"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Rol</label>
                    <div className={styles.selectWrapper}>
                        <select className={styles.select} value={rol} onChange={e => setRol(e.target.value)}>
                            <option value="empleado">Empleado</option>
                            <option value="admin">Administrador</option>
                            <option value="editor">Editor</option>
                            <option value="it">IT</option>
                        </select>
                    </div>
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Sueldo (USD) <span className={styles.required}>*</span></label>
                    <input
                        className={`${styles.input} ${styles.inputNumber}`}
                        type="number"
                        value={sueldo}
                        onChange={e => {setSueldo(e.target.value); setError('');}}
                        placeholder="0.00"
                        step="0.01"
                        min={0}
                    />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.actions}>
                <button 
                    type="submit" 
                    className={`${styles.btnSubmit} ${isEditing ? styles.edit : styles.create}`}
                >
                    {isEditing ? '💾 Guardar Cambios' : '✚ Registrar Usuario'}
                </button>

                {isEditing && (
                    <button type="button" className={styles.btnCancel} onClick={limpiar}>
                        ✕ Descartar
                    </button>
                )}
                
                <span className={styles.hint}>
                    {isEditing ? `Editando a: ${usuarioEditando.nombre}` : 'Los campos con * son obligatorios'}
                </span>
            </div>
        </form>
    );
};

export default Formulario;