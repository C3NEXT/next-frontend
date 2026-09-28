import styles from "./veiculos.module.css";

export default function VehicleCard({ vehicle, onViewDetails }) {
  const precoFormatado = vehicle.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {vehicle.marca} {vehicle.modelo}
        </h3>

        <span className={styles.status}>
          {vehicle.status}
        </span>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.info}>
          <span>Ano</span>
          <strong>{vehicle.ano}</strong>
        </p>

        <p className={styles.info}>
          <span>Tipo</span>
          <strong>{vehicle.tipo}</strong>
        </p>
      </div>

      <p className={styles.price}>{precoFormatado}</p>

      <button
        className={styles.detailsButton}
        type="button"
        onClick={() => onViewDetails(vehicle)}
      >
        Ver detalhes
      </button>
    </article>
  );
}