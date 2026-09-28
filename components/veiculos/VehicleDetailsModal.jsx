import styles from "./veiculos.module.css";

export default function VehicleDetailsModal({ vehicle, onClose }) {
  if (!vehicle) {
    return null;
  }

  const precoFormatado = vehicle.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.modalLabel}>
              DETALHES DO VEÍCULO
            </span>

            <h2 className={styles.modalTitle}>
              {vehicle.marca} {vehicle.modelo}
            </h2>
          </div>

          <button
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
          >
            ×
          </button>
        </div>

        <div className={styles.modalInfo}>
          <span>Ano</span>
          <strong>{vehicle.ano}</strong>
        </div>

        <div className={styles.modalInfo}>
          <span>Tipo</span>
          <strong>{vehicle.tipo}</strong>
        </div>

        <div className={styles.modalInfo}>
          <span>Status</span>
          <strong>{vehicle.status}</strong>
        </div>

        <div className={styles.modalInfo}>
          <span>Tipo de preço</span>
          <strong>{vehicle.tipoPreco}</strong>
        </div>

        <div className={`${styles.modalInfo} ${styles.modalPrice}`}>
          <span>Preço</span>
          <strong>{precoFormatado}</strong>
        </div>
      </div>
    </div>
  );
}