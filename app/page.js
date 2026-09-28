"use client";

import { useState } from "react";

import VehicleSearch from "../components/veiculos/VehicleSearch";
import VehicleFilters from "../components/veiculos/VehicleFilters";
import VehicleCard from "../components/veiculos/VehicleCard";
import VehicleDetailsModal from "../components/veiculos/VehicleDetailsModal";

import styles from "../components/veiculos/veiculos.module.css";

const veiculos = [
  {
    id: 1,
    marca: "BMW",
    modelo: "X6",
    ano: 2024,
    preco: 689900,
    tipo: "SUV",
    status: "Disponível",
    tipoPreco: "À vista",
  },
  {
    id: 2,
    marca: "Mercedes-Benz",
    modelo: "C 300 AMG Line",
    ano: 2023,
    preco: 379900,
    tipo: "Sedan",
    status: "Reservado",
    tipoPreco: "Financiado",
  },
  {
    id: 3,
    marca: "Porsche",
    modelo: "Cayenne",
    ano: 2024,
    preco: 799900,
    tipo: "SUV",
    status: "Vendido",
    tipoPreco: "À vista",
  },
  {
    id: 4,
    marca: "Audi",
    modelo: "RS e-tron GT",
    ano: 2024,
    preco: 899900,
    tipo: "Esportivo",
    status: "Disponível",
    tipoPreco: "Financiado",
  },
];

export default function Home() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [vehicleSelecionado, setVehicleSelecionado] = useState(null);

  const veiculosFiltrados = veiculos.filter((vehicle) => {
    const termoBusca = busca.toLowerCase();

    const correspondeBusca =
      vehicle.marca.toLowerCase().includes(termoBusca) ||
      vehicle.modelo.toLowerCase().includes(termoBusca) ||
      vehicle.tipo.toLowerCase().includes(termoBusca);

    const correspondeStatus =
      status === "" || vehicle.status === status;

    return correspondeBusca && correspondeStatus;
  });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandNext}>NEXT</span>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Veículos</h1>

          <p className={styles.pageSubtitle}>
            Encontre o veículo ideal para cada cliente.
          </p>
        </div>

        <div className={styles.filtersArea}>
          <VehicleSearch
            busca={busca}
            setBusca={setBusca}
          />

          <VehicleFilters
            status={status}
            setStatus={setStatus}
          />
        </div>

        {veiculosFiltrados.length > 0 ? (
          <div className={styles.vehicleGrid}>
            {veiculosFiltrados.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={setVehicleSelecionado}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            Nenhum veículo encontrado.
          </div>
        )}
      </section>

      <VehicleDetailsModal
        vehicle={vehicleSelecionado}
        onClose={() => setVehicleSelecionado(null)}
      />
    </main>
  );
}