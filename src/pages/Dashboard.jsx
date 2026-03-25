import styles from '../Dashboard.module.css';

const Dashboard = ({ usuarios }) => {
    // Calculamos algunos datos rápidos
    const totalUsers = usuarios.length;
    const totalSueldos = usuarios.reduce((acc, u) => acc + Number(u.sueldo), 0);
    const promedio = totalUsers > 0 ? (totalSueldos / totalUsers).toFixed(2) : 0;

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Tarjeta 1 */}
                <div className={styles.card}>
                    <span className={styles.icon}>👥</span>
                    <div className={styles.info}>
                        <h3>Total Usuarios</h3>
                        <p>{totalUsers}</p>
                    </div>
                </div>

                {/* Tarjeta 2 */}
                <div className={styles.card}>
                    <span className={styles.icon}>💰</span>
                    <div className={styles.info}>
                        <h3>Nómina Mensual</h3>
                        <p>${totalSueldos.toLocaleString()}</p>
                    </div>
                </div>

                {/* Tarjeta 3 */}
                <div className={styles.card}>
                    <span className={styles.icon}>📈</span>
                    <div className={styles.info}>
                        <h3>Sueldo Promedio</h3>
                        <p>${Number(promedio).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className={styles.welcomeSection}>
                <h2>¡Bienvenido al Panel Elite!</h2>
                <p>Usa el menú lateral para gestionar los usuarios</p>
            </div>
        </div>
    );
};

export default Dashboard;