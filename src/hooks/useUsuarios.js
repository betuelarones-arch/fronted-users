import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const listarUsuarios = async () => {
        try {
            const res = await api.get('/usuarios');
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al listar:", error);
        } finally {
            setCargando(false);
        }
    };

    const crearUsuario = async (datos) => {
        try {
            await api.post('/usuarios', datos);
            await listarUsuarios();
        } catch (error) {
            console.error("Error al crear:", error);
        }
    };

    const actualizarUsuario = async (id, datos) => {
        try {
            await api.put(`/usuarios/${id}`, datos);
            await listarUsuarios();
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    const eliminarUsuario = async (id) => {
        if (window.confirm('¿Eliminar este usuario?')) {
            try {
                await api.delete(`/usuarios/${id}`);
                await listarUsuarios();
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    useEffect(() => {
        listarUsuarios();
    }, []);

    return { usuarios, cargando, crearUsuario, actualizarUsuario, eliminarUsuario };
};