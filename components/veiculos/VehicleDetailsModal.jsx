import styles from "./veiculos.module.css";

export default function VehicleDetailsModal({
  vehicle,
  onClose,
  onReserve,
  onCancelReservation,
  onDelete,
}) {
  if (!vehicle) {
    return null;
  }

  const precoFormatado =
    vehicle.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const statusClass = {
    Disponível: styles.statusDisponivel,
    Reservado: styles.statusReservado,
    Vendido: styles.statusVendido,
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(event) =>
          event.stopPropagation()
        }
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

          <span
            className={`${styles.status} ${
              statusClass[vehicle.status] || ""
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <div className={styles.modalInfo}>
          <span>Tipo de preço</span>

          <strong>
            {vehicle.tipoPreco}
          </strong>
        </div>

        <div
          className={`${styles.modalInfo} ${styles.modalPrice}`}
        >
          <span>Preço</span>

          <strong>
            {precoFormatado}
          </strong>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onClose}
          >
            Fechar
          </button>

          {vehicle.status === "Disponível" && (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() =>
                onReserve(vehicle)
              }
            >
              Reservar
            </button>
          )}

          {vehicle.status === "Reservado" && (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() =>
                onCancelReservation(vehicle)
              }
            >
              Cancelar reserva
            </button>
          )}

          {vehicle.status !== "Vendido" && (
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() =>
                onDelete(vehicle)
              }
            >
              Excluir veículo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}