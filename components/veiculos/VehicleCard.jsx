import styles from "./veiculos.module.css";

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onReserve,
  onCancelReservation,
  onDelete,
}) {
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
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {vehicle.marca} {vehicle.modelo}
        </h3>

        <span
          className={`${styles.status} ${
            statusClass[vehicle.status] || ""
          }`}
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
      </div>

      <p className={styles.price}>
        {precoFormatado}
      </p>

      <div className={styles.cardActions}>
        <button
          className={styles.detailsButton}
          type="button"
          onClick={() =>
            onViewDetails(vehicle)
          }
        >
          Ver detalhes
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
            className={styles.deleteCardButton}
            type="button"
            onClick={() =>
              onDelete(vehicle)
            }
          >
            Excluir
          </button>
        )}
      </div>
    </article>
  );
}