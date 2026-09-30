import styles from "./veiculos.module.css";

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onDetails,
  onReserve,
  onCancelReservation,
  onSell,
  onDelete,
}) {
  const handleDetails = onViewDetails || onDetails;

  const precoFormatado = (vehicle.preco ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const statusClass = {
    Disponível: styles.statusDisponivel,
    Reservado: styles.statusReservado,
    Vendido: styles.statusVendido,
  };

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {vehicle.marca} {vehicle.modelo}
        </h3>

        <span
          className={`${styles.status} ${statusClass[vehicle.status] || ""}`}
        >
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

        {vehicle.tipoPreco && (
          <p className={styles.info}>
            <span>Pagamento</span>
            <strong>{vehicle.tipoPreco}</strong>
          </p>
        )}
      </div>

      <p className={styles.price}>{precoFormatado}</p>

      <div className={styles.cardActions}>
        {handleDetails && (
          <button
            className={styles.detailsButton}
            type="button"
            onClick={() => handleDetails(vehicle)}
          >
            Ver detalhes
          </button>
        )}

        {vehicle.status === "Disponível" && onReserve && (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => onReserve(vehicle)}
          >
            Reservar
          </button>
        )}

        {vehicle.status === "Reservado" && onCancelReservation && (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => onCancelReservation(vehicle)}
          >
            Cancelar reserva
          </button>
        )}

        {vehicle.status !== "Vendido" && onSell && (
          <button
            className={styles.saveButton}
            type="button"
            onClick={() => onSell(vehicle)}
          >
            Vender
          </button>
        )}

        {vehicle.status !== "Vendido" && onDelete && (
          <button
            className={styles.deleteCardButton}
            type="button"
            onClick={() => onDelete(vehicle)}
          >
            Excluir
          </button>
        )}
      </div>
    </article>
  );
}