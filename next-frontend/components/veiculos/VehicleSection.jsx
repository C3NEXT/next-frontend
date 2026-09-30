"use client";

import { useMemo, useState } from "react";
import VehicleSearch from "./VehicleSearch";
import VehicleFilters from "./VehicleFilters";
import VehicleCard from "./VehicleCard";
import VehicleDetailsModal from "./VehicleDetailsModal";
import styles from "./veiculos.module.css";

export default function VehicleSection({
  vehicles,
  onReserve,
  onCancelReservation,
  onDelete,
  onSell,
}) {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [vehicleSelecionado, setVehicleSelecionado] = useState(null);

  const veiculosFiltrados = useMemo(() => {
    const termoBusca = busca.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const correspondeBusca =
        termoBusca === "" ||
        vehicle.marca.toLowerCase().includes(termoBusca) ||
        vehicle.modelo.toLowerCase().includes(termoBusca) ||
        vehicle.tipo.toLowerCase().includes(termoBusca);

      const correspondeStatus =
        status === "" || vehicle.status === status;

      return correspondeBusca && correspondeStatus;
    });
  }, [vehicles, busca, status]);

  return (
    <>
      <div className={styles.filtersArea}>
        <VehicleSearch busca={busca} setBusca={setBusca} />
        <VehicleFilters status={status} setStatus={setStatus} />
      </div>

      {veiculosFiltrados.length > 0 ? (
        <div className={styles.vehicleGrid}>
          {veiculosFiltrados.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={setVehicleSelecionado}
              onReserve={onReserve}
              onCancelReservation={onCancelReservation}
              onDelete={onDelete}
              onSell={onSell}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          Nenhum veículo encontrado.
        </div>
      )}

      <VehicleDetailsModal
        vehicle={vehicleSelecionado}
        onClose={() => setVehicleSelecionado(null)}
        onReserve={(vehicle) => {
          setVehicleSelecionado(null);
          onReserve(vehicle);
        }}
        onCancelReservation={(vehicle) => {
          setVehicleSelecionado(null);
          onCancelReservation(vehicle);
        }}
        onDelete={(vehicle) => {
          setVehicleSelecionado(null);
          onDelete(vehicle);
        }}
      />
    </>
  );
}