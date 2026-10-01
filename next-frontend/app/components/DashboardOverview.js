"use client";

import styles from "../page.module.css";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("pt-BR");
}

function MetricWave() {
  return (
    <svg
      className={styles.metricWave}
      viewBox="0 0 300 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 70 C45 65, 55 25, 105 40 S165 75, 205 35 S260 20, 300 10"
        fill="none"
      />
    </svg>
  );
}

export default function DashboardOverview({
  stats,
  sales = [],
  loading = false,
  onOpenSales,
}) {
  if (loading) {
    return (
      <div className={styles.dashboardContent}>
        <div className={styles.skeletonHeader} />

        <div className={styles.skeletonMetrics}>
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonFuture} />
        </div>

        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonLarge} />
          <div className={styles.skeletonLarge} />
        </div>

        <div className={styles.skeletonSales} />
      </div>
    );
  }

  const dashboardStats = stats || {
    totalVeiculos: 0,
    disponiveis: 0,
    vendidos: 0,
    reservados: 0,
    vendasNoMes: 0,
    receitaNoMes: 0,
    taxaConversao: 0,
  };

  const total = Number(dashboardStats.totalVeiculos || 0);

  const disponiveis = Number(dashboardStats.disponiveis || 0);
  const vendidos = Number(dashboardStats.vendidos || 0);
  const reservados = Number(dashboardStats.reservados || 0);

  const conversion = Math.min(
    100,
    Math.max(0, Number(dashboardStats.taxaConversao || 0))
  );

  const availablePercent =
    total > 0 ? (disponiveis / total) * 100 : 0;

  const soldPercent =
    total > 0 ? (vendidos / total) * 100 : 0;

  const reservedPercent =
    total > 0 ? (reservados / total) * 100 : 0;

  const availableEnd = availablePercent;
  const soldEnd = availablePercent + soldPercent;
  const reservedEnd =
    availablePercent + soldPercent + reservedPercent;

  const donutStyle = {
    background: `conic-gradient(
      #ff3347 0% ${availableEnd}%,
      #8b0012 ${availableEnd}% ${soldEnd}%,
      #4a0008 ${soldEnd}% ${reservedEnd}%,
      rgba(255, 255, 255, 0.08) ${reservedEnd}% 100%
    )`,
  };

  return (
    <div className={styles.dashboardContent}>
      <section className={styles.dashboardHeader}>
        <div className={styles.dashboardHeaderText}>
          <span className={styles.eyebrow}>VISÃO GERAL</span>
          <h1>Dashboard</h1>
          <p>
            Acompanhe os principais indicadores da NEXT.
          </p>
        </div>

        <img
          src="/assets/imagemfundo.png"
          alt=""
          className={styles.headerBackground}
        />
      </section>

      <section className={styles.topCards}>
        <article className={styles.metricCard}>
          <div className={styles.metricTop}>
            <div>
              <span className={styles.metricLabel}>
                RECEITA DO MÊS
              </span>

              <strong>
                {formatCurrency(dashboardStats.receitaNoMes)}
              </strong>
            </div>

            <span className={styles.metricDot} />
          </div>

          <p>Receita registrada no mês atual</p>

          <MetricWave />
        </article>

        <article className={styles.metricCard}>
          <div className={styles.metricTop}>
            <div>
              <span className={styles.metricLabel}>
                VENDAS NO MÊS
              </span>

              <strong>{dashboardStats.vendasNoMes}</strong>
            </div>

            <span className={styles.metricDot} />
          </div>

          <p>Veículos vendidos no mês atual</p>

          <MetricWave />
        </article>

        <article className={styles.futureCard}>
          <div className={styles.futureGlow} />

          <div className={styles.futureText}>
            <span>NEXT</span>

            <h2>
              Movendo
              <br />
              o futuro.
            </h2>

            <p>Performance. Tecnologia. Exclusividade.</p>
          </div>

          <img
            src="/assets/carro.png"
            alt="Veículo NEXT"
            className={styles.futureCar}
          />
        </article>
      </section>

      <section className={styles.dashboardGrid}>
        <article className={styles.fleetCard}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>
                FROTA
              </span>

              <h2>Situação dos veículos</h2>
            </div>

            <span className={styles.totalBadge}>
              {total} veículos
            </span>
          </div>

          <div className={styles.fleetContent}>
            <div
              className={styles.donut}
              style={donutStyle}
            >
              <div className={styles.donutCenter}>
                <strong>{total}</strong>
                <span>Total</span>
              </div>
            </div>

            <div className={styles.fleetLegend}>
              <div className={styles.legendRow}>
                <span
                  className={`${styles.legendDot} ${styles.availableDot}`}
                />

                <div>
                  <span>Disponíveis</span>
                  <strong>{disponiveis}</strong>
                </div>
              </div>

              <div className={styles.legendRow}>
                <span
                  className={`${styles.legendDot} ${styles.soldDot}`}
                />

                <div>
                  <span>Vendidos</span>
                  <strong>{vendidos}</strong>
                </div>
              </div>

              <div className={styles.legendRow}>
                <span
                  className={`${styles.legendDot} ${styles.reservedDot}`}
                />

                <div>
                  <span>Reservados</span>
                  <strong>{reservados}</strong>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className={styles.performanceCard}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>
                DESEMPENHO
              </span>

              <h2>Taxa de conversão</h2>
            </div>
          </div>

          <div className={styles.performanceContent}>
            <div className={styles.conversionNumber}>
              <strong>{conversion.toFixed(1)}</strong>
              <span>%</span>
            </div>

            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${conversion}%`,
                }}
              />
            </div>

            <div className={styles.performanceInfo}>
              <span>Conversão atual</span>
              <strong>
                {vendidos} de {total}
              </strong>
            </div>

            <p>
              Percentual de veículos vendidos em relação à
              frota cadastrada.
            </p>
          </div>
        </article>
      </section>

      <section className={styles.salesCard}>
        <div className={styles.salesHeader}>
          <div>
            <span className={styles.eyebrow}>
              MOVIMENTAÇÕES
            </span>

            <h2>Vendas recentes</h2>
          </div>

          <button
            type="button"
            className={styles.historyButton}
            onClick={onOpenSales}
          >
            Ver histórico
            <span>→</span>
          </button>
        </div>

        <div className={styles.salesTableHeader}>
          <span>VEÍCULO</span>
          <span>CONSULTOR</span>
          <span>DATA</span>
          <span>VALOR</span>
        </div>

        <div className={styles.salesList}>
          {sales.length === 0 ? (
            <div className={styles.emptySales}>
              Nenhuma venda registrada.
            </div>
          ) : (
            sales.slice(0, 4).map((sale) => (
              <div
                className={styles.saleRow}
                key={sale.id}
              >
                <div className={styles.saleVehicle}>
                  <div className={styles.saleIcon}>
                    N
                  </div>

                  <div>
                    <strong>
                      {sale.veiculo?.marca || "Veículo"}{" "}
                      {sale.veiculo?.modelo || ""}
                    </strong>

                    <span>
                      #{sale.veiculo?.id?.slice(-6) || "NEXT"}
                    </span>
                  </div>
                </div>

                <span className={styles.saleConsultant}>
                  {sale.consultor || "-"}
                </span>

                <span className={styles.saleDate}>
                  {formatDate(sale.data)}
                </span>

                <strong className={styles.saleValue}>
                  {formatCurrency(sale.valorFinal)}
                </strong>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
