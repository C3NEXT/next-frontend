"use client";

import { useState } from "react";

import VehicleSearch from "../components/veiculos/VehicleSearch";
import VehicleFilters from "../components/veiculos/VehicleFilters";
import VehicleCard from "../components/veiculos/VehicleCard";
import VehicleDetailsModal from "../components/veiculos/VehicleDetailsModal";

import styles from "../components/veiculos/veiculos.module.css";

const veiculosIniciais = [
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
  const [veiculos, setVeiculos] = useState(veiculosIniciais);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");

  const [vehicleSelecionado, setVehicleSelecionado] =
    useState(null);

  const [vehicleParaExcluir, setVehicleParaExcluir] =
    useState(null);

  const [modalCadastroAberto, setModalCadastroAberto] =
    useState(false);

  const [novoVeiculo, setNovoVeiculo] = useState({
    marca: "",
    modelo: "",
    ano: "",
    preco: "",
    tipo: "",
    status: "Disponível",
    tipoPreco: "À vista",
  });

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

  function atualizarCampoNovoVeiculo(event) {
    const { name, value } = event.target;

    setNovoVeiculo((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function cadastrarVeiculo(event) {
    event.preventDefault();

    const veiculoCriado = {
      id: Date.now(),
      marca: novoVeiculo.marca.trim(),
      modelo: novoVeiculo.modelo.trim(),
      ano: Number(novoVeiculo.ano),
      preco: Number(novoVeiculo.preco),
      tipo: novoVeiculo.tipo.trim(),
      status: novoVeiculo.status,
      tipoPreco: novoVeiculo.tipoPreco,
    };

    setVeiculos((veiculosAtuais) => [
      ...veiculosAtuais,
      veiculoCriado,
    ]);

    setNovoVeiculo({
      marca: "",
      modelo: "",
      ano: "",
      preco: "",
      tipo: "",
      status: "Disponível",
      tipoPreco: "À vista",
    });

    setModalCadastroAberto(false);
  }

  function reservarVeiculo(vehicle) {
    setVeiculos((veiculosAtuais) =>
      veiculosAtuais.map((item) =>
        item.id === vehicle.id
          ? {
              ...item,
              status: "Reservado",
            }
          : item
      )
    );

    setVehicleSelecionado(null);
  }

  function cancelarReserva(vehicle) {
    setVeiculos((veiculosAtuais) =>
      veiculosAtuais.map((item) =>
        item.id === vehicle.id
          ? {
              ...item,
              status: "Disponível",
            }
          : item
      )
    );

    setVehicleSelecionado(null);
  }

  function solicitarExclusao(vehicle) {
    if (vehicle.status === "Vendido") {
      return;
    }

    setVehicleSelecionado(null);
    setVehicleParaExcluir(vehicle);
  }

  function cancelarExclusao() {
    setVehicleParaExcluir(null);
  }

  function confirmarExclusao() {
    if (!vehicleParaExcluir) {
      return;
    }

    setVeiculos((veiculosAtuais) =>
      veiculosAtuais.filter(
        (vehicle) =>
          vehicle.id !== vehicleParaExcluir.id
      )
    );

    setVehicleParaExcluir(null);
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              Veículos
            </h1>

            <p className={styles.pageSubtitle}>
              Encontre o veículo ideal para cada cliente.
            </p>
          </div>

          <button
            className={styles.addButton}
            type="button"
            onClick={() => setModalCadastroAberto(true)}
          >
            <span className={styles.addIcon}>+</span>
            Adicionar veículo
          </button>
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
                onReserve={reservarVeiculo}
                onCancelReservation={cancelarReserva}
                onDelete={solicitarExclusao}
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
        onReserve={reservarVeiculo}
        onCancelReservation={cancelarReserva}
        onDelete={solicitarExclusao}
      />

      {modalCadastroAberto && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalCadastroAberto(false)}
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
                  NOVO VEÍCULO
                </span>

                <h2 className={styles.modalTitle}>
                  Adicionar veículo
                </h2>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                onClick={() =>
                  setModalCadastroAberto(false)
                }
                aria-label="Fechar cadastro"
              >
                ×
              </button>
            </div>

            <form
              className={styles.vehicleForm}
              onSubmit={cadastrarVeiculo}
            >
              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span>Marca</span>

                  <input
                    name="marca"
                    value={novoVeiculo.marca}
                    onChange={atualizarCampoNovoVeiculo}
                    placeholder="Ex.: BMW"
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Modelo</span>

                  <input
                    name="modelo"
                    value={novoVeiculo.modelo}
                    onChange={atualizarCampoNovoVeiculo}
                    placeholder="Ex.: X6"
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Ano</span>

                  <input
                    name="ano"
                    type="number"
                    min="1990"
                    value={novoVeiculo.ano}
                    onChange={atualizarCampoNovoVeiculo}
                    placeholder="2026"
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Preço</span>

                  <input
                    name="preco"
                    type="number"
                    min="0"
                    value={novoVeiculo.preco}
                    onChange={atualizarCampoNovoVeiculo}
                    placeholder="250000"
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Tipo</span>

                  <input
                    name="tipo"
                    value={novoVeiculo.tipo}
                    onChange={atualizarCampoNovoVeiculo}
                    placeholder="Ex.: SUV"
                    required
                  />
                </label>

                <label className={styles.formField}>
                  <span>Status</span>

                  <select
                    name="status"
                    value={novoVeiculo.status}
                    onChange={atualizarCampoNovoVeiculo}
                  >
                    <option value="Disponível">
                      Disponível
                    </option>

                    <option value="Reservado">
                      Reservado
                    </option>

                    <option value="Vendido">
                      Vendido
                    </option>
                  </select>
                </label>

                <label className={styles.formField}>
                  <span>Tipo de preço</span>

                  <select
                    name="tipoPreco"
                    value={novoVeiculo.tipoPreco}
                    onChange={atualizarCampoNovoVeiculo}
                  >
                    <option value="À vista">
                      À vista
                    </option>

                    <option value="Financiado">
                      Financiado
                    </option>
                  </select>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelButton}
                  type="button"
                  onClick={() =>
                    setModalCadastroAberto(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  className={styles.saveButton}
                  type="submit"
                >
                  Adicionar veículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {vehicleParaExcluir && (
        <div
          className={styles.modalOverlay}
          onClick={cancelarExclusao}
        >
          <div
            className={`${styles.modal} ${styles.deleteModal}`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className={styles.modalHeader}>
              <div>
                <span
                  className={`${styles.modalLabel} ${styles.deleteLabel}`}
                >
                  EXCLUIR VEÍCULO
                </span>

                <h2 className={styles.modalTitle}>
                  Confirmar exclusão
                </h2>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                onClick={cancelarExclusao}
                aria-label="Fechar confirmação"
              >
                ×
              </button>
            </div>

            <div className={styles.deleteWarning}>
              <div className={styles.warningIcon}>
                !
              </div>

              <div>
                <p className={styles.deleteQuestion}>
                  Tem certeza que deseja excluir{" "}
                  <strong>
                    {vehicleParaExcluir.marca}{" "}
                    {vehicleParaExcluir.modelo}
                  </strong>
                  ?
                </p>

                <p className={styles.deleteDescription}>
                  Esta ação removerá o veículo da lista.
                </p>
              </div>
            </div>

            <div className={styles.deleteActions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={cancelarExclusao}
              >
                Cancelar
              </button>

              <button
                className={styles.deleteButton}
                type="button"
                onClick={confirmarExclusao}
              >
                Excluir veículo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}