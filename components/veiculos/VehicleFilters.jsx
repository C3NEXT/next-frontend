import styles from "./veiculos.module.css";

export default function VehicleFilters({ status, setStatus }) {
  return (
    <div className={styles.filterContainer}>
      <label className={styles.label} htmlFor="status-veiculo">
        Filtrar por status
      </label>

      <select
        className={styles.select}
        id="status-veiculo"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="">Todos</option>
        <option value="Disponível">Disponível</option>
        <option value="Reservado">Reservado</option>
        <option value="Vendido">Vendido</option>
      </select>
    </div>
  );
}