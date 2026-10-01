import styles from "./veiculos.module.css";

export default function VehicleSearch({ busca, setBusca }) {
  return (
    <div className={styles.searchContainer}>
      <label className={styles.label} htmlFor="busca-veiculo">
        Buscar veículo
      </label>

      <input
        className={styles.input}
        id="busca-veiculo"
        type="text"
        placeholder="Buscar por marca, modelo ou tipo..."
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
      />
    </div>
  );
}