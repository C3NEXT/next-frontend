"use client";

import { useState, useEffect, useMemo } from "react";
import Parse from "@/lib/parse";

const paths = {
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  car: (
    <>
      <path d="M5 17h14l-1.4-5.1A2.6 2.6 0 0 0 15.1 10H8.9a2.6 2.6 0 0 0-2.5 1.9L5 17Z" />
      <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2Z" />
      <circle cx="7" cy="17" r="1" />
      <circle cx="17" cy="17" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  arrow: <path d="m9 18 6-6-6-6" />,
  close: (
    <>
      <path d="M18 6 6 18M6 6l12 12" />
    </>
  ),
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

function Button({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = true,
  placeholder,
  autoComplete,
}) {
  return (
    <label className="field">
      <span>{label}</span>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </label>
  );
}

// ============================================
// PRIMEIRO BLOCO — VEÍCULOS
// Busca + Filtro + Cards + Detalhes
// ============================================

const STATUS_OPTIONS = [
  "Disponível",
  "Reservado",
  "Vendido",
];

const statusClass = (status) =>
  `status-${String(status)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}`;

const money = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value ?? 0);


// ============================================
// CARD DO VEÍCULO
// ============================================

function VehicleCard({
  vehicle,
  onSell,
  onDetails,
  onReserve,
  onCancelReservation,
}) {
  return (
    <article className="vehicle-card">

      <div className="vc-top">

        <span className="car-thumb">
          <Icon
            name="car"
            size={20}
          />
        </span>

        <span
          className={`status ${statusClass(
            vehicle.status
          )}`}
        >
          {vehicle.status}
        </span>

      </div>


      <div className="vc-brand">
        {vehicle.marca}
      </div>


      <h3 className="vc-model">
        {vehicle.modelo}
      </h3>


      <div className="vc-specs">

        <div>
          <span>ANO</span>

          <strong>
            {vehicle.ano}
          </strong>
        </div>


        <div>
          <span>TIPO</span>

          <strong>
            {vehicle.tipo}
          </strong>
        </div>


        <div>
          <span>PAGAMENTO</span>

          <strong>
            {vehicle.tipoPreco}
          </strong>
        </div>

      </div>


      <div className="vc-price">

        <span>PREÇO</span>

        <strong>
          {money(vehicle.preco)}
        </strong>

      </div>


      <div className="vc-actions">

        {/* VISUALIZAR DETALHES */}
        <Button
          className="secondary"
          onClick={() =>
            onDetails(vehicle)
          }
        >
          Ver detalhes
        </Button>


        {/* RESERVAR */}
        {vehicle.status ===
          "Disponível" && (
          <Button
            className="secondary"
            onClick={() =>
              onReserve(vehicle)
            }
          >
            Reservar
          </Button>
        )}


        {/* CANCELAR RESERVA */}
        {vehicle.status ===
          "Reservado" && (
          <Button
            className="secondary"
            onClick={() =>
              onCancelReservation(
                vehicle
              )
            }
          >
            Cancelar reserva
          </Button>
        )}


        {/* VENDER */}
        {vehicle.status !==
        "Vendido" ? (
          <Button
            className="primary"
            onClick={() =>
              onSell(vehicle)
            }
          >
            Vender
          </Button>
        ) : (
          <Button
            className="secondary"
            disabled
          >
            Vendido
          </Button>
        )}

      </div>

    </article>
  );
}


// ============================================
// GRID / LISTAGEM DE VEÍCULOS
// ============================================

function VehicleGrid({
  vehicles,
  onSell,
  onDetails,
  onReserve,
  onCancelReservation,
}) {

  if (vehicles.length === 0) {
    return (
      <div className="table-card">

        <div className="empty">
          Nenhum veículo encontrado.
        </div>

      </div>
    );
  }


  return (
    <div className="vehicle-grid">

      {vehicles.map((vehicle) => (

        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onSell={onSell}
          onDetails={onDetails}
          onReserve={onReserve}
          onCancelReservation={
            onCancelReservation
          }
        />

      ))}

    </div>
  );
}


// ============================================
// MODAL DE DETALHES DO VEÍCULO
// ============================================

function VehicleDetailsModal({
  vehicle,
  onClose,
  onEdit,
  onDelete,
  onReserve,
  onCancelReservation,
}) {

  const rows = [

    [
      "Marca",
      vehicle.marca,
    ],

    [
      "Modelo",
      vehicle.modelo,
    ],

    [
      "Ano",
      vehicle.ano,
    ],

    [
      "Tipo",
      vehicle.tipo,
    ],

    [
      "Pagamento",
      vehicle.tipoPreco,
    ],

    [
      "Preço",
      money(vehicle.preco),
    ],

    [
      "Status",
      vehicle.status,
    ],

  ];


  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >

      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* CABEÇALHO */}

        <div className="modal-top">

          <div>

            <div className="eyebrow">
              DETALHES
            </div>

            <h2>
              {vehicle.marca}{" "}
              {vehicle.modelo}
            </h2>

          </div>


          <Button
            className="icon-button"
            onClick={onClose}
          >
            <Icon name="close" />
          </Button>

        </div>


        {/* INFORMAÇÕES */}

        <div className="detail-list">

          {rows.map(
            ([key, value]) => (

              <div
                className="detail-row"
                key={key}
              >

                <span>
                  {key}
                </span>

                <strong>
                  {value}
                </strong>

              </div>

            )
          )}

        </div>


        {/* AÇÕES */}

        <div className="modal-actions">

          <Button
            className="danger"
            onClick={() =>
              onDelete(vehicle)
            }
          >
            Excluir
          </Button>


          {vehicle.status ===
            "Disponível" && (

            <Button
              className="secondary"
              onClick={() =>
                onReserve(vehicle)
              }
            >
              Reservar
            </Button>

          )}


          {vehicle.status ===
            "Reservado" && (

            <Button
              className="secondary"
              onClick={() =>
                onCancelReservation(
                  vehicle
                )
              }
            >
              Cancelar reserva
            </Button>

          )}


          <Button
            className="primary"
            onClick={() =>
              onEdit(vehicle)
            }
          >
            Editar
          </Button>

        </div>

      </div>

    </div>
  );
}

// ============================================
// MODAL — CADASTRO / EDIÇÃO DE VEÍCULO
// ============================================

function VehicleFormModal({
  mode = "create",
  vehicle = null,
  onClose,
  onSubmit,
  loading = false,
}) {
  const isEdit = mode === "edit";

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    onSubmit({
      marca: String(
        formData.get("marca") ?? ""
      ).trim(),

      modelo: String(
        formData.get("modelo") ?? ""
      ).trim(),

      ano: Number(
        formData.get("ano")
      ),

      tipo: String(
        formData.get("tipo") ?? ""
      ).trim(),

      tipoPreco: String(
        formData.get("tipoPreco") ?? ""
      ).trim(),

      preco: Number(
        formData.get("preco")
      ),

      status: String(
        formData.get("status") ?? "Disponível"
      ),
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* CABEÇALHO */}

        <div className="modal-top">

          <div>
            <div className="eyebrow">
              {isEdit
                ? "EDITAR VEÍCULO"
                : "NOVO VEÍCULO"}
            </div>

            <h2>
              {isEdit
                ? "Editar veículo"
                : "Cadastrar veículo"}
            </h2>
          </div>

          <Button
            className="icon-button"
            onClick={onClose}
            disabled={loading}
          >
            <Icon name="close" />
          </Button>

        </div>


        {/* FORMULÁRIO */}

        <form
          className="vehicle-form"
          onSubmit={handleSubmit}
        >

          {/* MARCA */}

          <label className="field">
            <span>Marca</span>

            <input
              name="marca"
              type="text"
              defaultValue={
                vehicle?.marca ?? ""
              }
              placeholder="Ex.: Toyota"
              required
            />
          </label>


          {/* MODELO */}

          <label className="field">
            <span>Modelo</span>

            <input
              name="modelo"
              type="text"
              defaultValue={
                vehicle?.modelo ?? ""
              }
              placeholder="Ex.: Corolla"
              required
            />
          </label>


          {/* ANO */}

          <label className="field">
            <span>Ano</span>

            <input
              name="ano"
              type="number"
              min="1900"
              max="2100"
              defaultValue={
                vehicle?.ano ?? ""
              }
              placeholder="Ex.: 2025"
              required
            />
          </label>


          {/* TIPO */}

          <label className="field">
            <span>Tipo</span>

            <select
              name="tipo"
              defaultValue={
                vehicle?.tipo ?? ""
              }
              required
            >
              <option value="">
                Selecione o tipo
              </option>

              <option value="Sedan">
                Sedan
              </option>

              <option value="SUV">
                SUV
              </option>

              <option value="Hatch">
                Hatch
              </option>

              <option value="Pickup">
                Pickup
              </option>

              <option value="Esportivo">
                Esportivo
              </option>

              <option value="Conversível">
                Conversível
              </option>

              <option value="Outro">
                Outro
              </option>
            </select>
          </label>


          {/* TIPO DE PAGAMENTO */}

          <label className="field">
            <span>Pagamento</span>

            <select
              name="tipoPreco"
              defaultValue={
                vehicle?.tipoPreco ?? ""
              }
              required
            >
              <option value="">
                Selecione
              </option>

              <option value="À vista">
                À vista
              </option>

              <option value="Financiamento">
                Financiamento
              </option>

              <option value="À vista / Financiamento">
                À vista / Financiamento
              </option>
            </select>
          </label>


          {/* PREÇO */}

          <label className="field">
            <span>Preço</span>

            <input
              name="preco"
              type="number"
              min="0"
              step="1"
              defaultValue={
                vehicle?.preco ?? ""
              }
              placeholder="Ex.: 120000"
              required
            />
          </label>


          {/* STATUS */}

          <label className="field">
            <span>Status</span>

            <select
              name="status"
              defaultValue={
                vehicle?.status ??
                "Disponível"
              }
              required
            >
              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </label>


          {/* AÇÕES */}

          <div className="modal-actions">

            <Button
              className="secondary"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              className="primary"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : isEdit
                  ? "Salvar alterações"
                  : "Cadastrar veículo"}
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}

// ============================================
// MODAL — CONFIRMAÇÃO DE EXCLUSÃO
// ============================================

function ConfirmModal({
  title = "Excluir veículo?",
  message = "Tem certeza que deseja excluir este veículo? Essa ação não poderá ser desfeita.",
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* CABEÇALHO */}

        <div className="modal-top">

          <div>
            <div className="eyebrow">
              CONFIRMAÇÃO
            </div>

            <h2 id="confirm-modal-title">
              {title}
            </h2>
          </div>

          <Button
            className="icon-button"
            onClick={onClose}
            disabled={loading}
          >
            <Icon name="close" />
          </Button>

        </div>


        {/* MENSAGEM */}

        <div className="confirm-content">

          <p>
            {message}
          </p>

        </div>


        {/* AÇÕES */}

        <div className="modal-actions">

          <Button
            className="secondary"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            className="danger"
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Excluindo..."
              : "Excluir veículo"}
          </Button>

        </div>

      </div>
    </div>
  );
}

export function AuthScreen({
  mode,
  setMode,
  onSubmit,
  error,
  loading,
}) {
  const isLogin = mode === "login";

  const submit = (event) => {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1560361586-8242b1fc06c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1600"
          alt="Supercarro vermelho"
        />

        <div className="auth-visual-shade" />

        <div className="auth-brand">
          <div className="brand-mark">
            <span>N</span>
          </div>

          <div>
            <div className="brand-name">
              NEXTCAR
            </div>

            <div className="brand-caption">
              GESTÃO AUTOMOTIVA
            </div>
          </div>
        </div>

        <div className="auth-message">
          <div className="hero-kicker">
            <span /> POTÊNCIA PARA SUA GESTÃO
          </div>

          <h1>
            Seu negócio em
            <br />
            alta performance.
          </h1>

          <p>
            Controle estoque, vendas e equipe em
            uma plataforma feita para acelerar
            resultados.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <div className="eyebrow">
              {isLogin
                ? "BEM-VINDO DE VOLTA"
                : "COMECE AGORA"}
            </div>

            <h2>
              {isLogin
                ? "Acesse sua conta"
                : "Crie sua conta"}
            </h2>
          </div>

          <div className="auth-tabs">
            <Button
              className={
                isLogin
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                setMode("login")
              }
            >
              Entrar
            </Button>

            <Button
              className={
                !isLogin
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() =>
                setMode("register")
              }
            >
              Criar conta
            </Button>
          </div>

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={submit}
          >
            {!isLogin && (
              <Field
                label="Nome completo"
                name="nome"
              />
            )}

            <Field
              label="E-mail"
              name="login"
              type="email"
            />

            <Field
              label="Senha"
              name="senha"
              type="password"
            />

            {!isLogin && (
              <Field
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
              />
            )}

            <Button
              className="primary auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Aguarde..."
                : isLogin
                  ? "Entrar"
                  : "Criar conta"}

              <Icon
                name="arrow"
                size={18}
              />
            </Button>
          </form>

          <div className="auth-switch">
            <span>
              {isLogin
                ? "Ainda não tem uma conta?"
                : "Já possui uma conta?"}
            </span>

            <Button
              className="text-button"
              onClick={() =>
                setMode(
                  isLogin
                    ? "register"
                    : "login"
                )
              }
            >
              {isLogin
                ? "Cadastre-se"
                : "Fazer login"}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AuthGate({
  onAuthenticated,
}) {
  const [authMode, setAuthMode] =
    useState("login");

  const [authError, setAuthError] =
    useState(null);

  const [authLoading, setAuthLoading] =
    useState(false);

  return (
    <AuthScreen
      mode={authMode}
      setMode={setAuthMode}
      error={authError}
      loading={authLoading}
      onSubmit={async (formData) => {
        setAuthError(null);
        setAuthLoading(true);

        try {
          if (authMode === "login") {
            await Parse.User.logIn(
              String(
                formData.get("login")
              ),
              String(
                formData.get("senha")
              )
            );
          } else {
            if (
              formData.get("senha") !==
              formData.get("confirmarSenha")
            ) {
              throw new Error(
                "As senhas não coincidem."
              );
            }

            await Parse.Cloud.run(
              "registerUser",
              {
                nome: String(
                  formData.get("nome")
                ),
                email: String(
                  formData.get("login")
                ),
                senha: String(
                  formData.get("senha")
                ),
              }
            );

            await Parse.User.logIn(
              String(
                formData.get("login")
              ),
              String(
                formData.get("senha")
              )
            );
          }

          onAuthenticated();
        } catch (err) {
          setAuthError(
            err?.message ??
              "Falha na autenticação."
          );
        } finally {
          setAuthLoading(false);
        }
      }}
    />
  );
}


// ==========================================================
// TRECHOS PARA COLAR DENTRO DO DASHBOARD
// (usam hooks/estados/JSX, então só funcionam dentro do componente;
//  ficam comentados para não quebrar o arquivo)
// ==========================================================

// 1) ESTADOS + FILTRO + CARREGAMENTO — colar dentro do componente Dashboard,
//    junto com os outros useState/useEffect (mantendo o useEffect das outras abas,
//    o ramo "Veículos" abaixo deve entrar nele)
//
// // ============================================
// // ESTADOS DO PRIMEIRO BLOCO
// // ============================================
//
// const [query, setQuery] =
//   useState("");
//
// const [vehicles, setVehicles] =
//   useState([]);
//
// const [
//   detailsTarget,
//   setDetailsTarget,
// ] = useState(null);
//
// const [
//   statusFilter,
//   setStatusFilter,
// ] = useState("Todos");
//
//
// // ============================================
// // FILTRO DOS VEÍCULOS
// // ============================================
//
// const visibleVehicles =
//   useMemo(
//     () =>
//       statusFilter === "Todos"
//         ? vehicles
//         : vehicles.filter(
//             (vehicle) =>
//               vehicle.status ===
//               statusFilter
//           ),
//     [
//       vehicles,
//       statusFilter,
//     ]
//   );
//
//
// // ============================================
// // CARREGAR VEÍCULOS
// // ============================================
//
// useEffect(() => {
//
//   if (!authenticated) return;
//
//   let cancelado = false;
//
//   setLoading(true);
//   setError(null);
//
//
//   async function carregar() {
//
//     try {
//
//       if (
//         active ===
//         "Veículos"
//       ) {
//
//         const result =
//           await Parse.Cloud.run(
//             "listVehicles",
//             {
//               busca: query,
//             }
//           );
//
//
//         if (!cancelado) {
//
//           setVehicles(
//             result
//           );
//
//         }
//
//       }
//
//     } catch (err) {
//
//       if (!cancelado) {
//
//         setError(
//           err?.message ??
//             "Erro ao carregar dados."
//         );
//
//       }
//
//     } finally {
//
//       if (!cancelado) {
//
//         setLoading(false);
//
//       }
//
//     }
//
//   }
//
//
//   carregar();
//
//
//   return () => {
//
//     cancelado = true;
//
//   };
//
// }, [
//   authenticated,
//   active,
//   query,
//   refreshKey,
// ]);

// 2) TELA DE VEÍCULOS — colar no JSX do Dashboard, no lugar do bloco {active === "Veículos" && (...)} atual
//
// {/* ============================================ */}
// {/* TELA DE VEÍCULOS                             */}
// {/* ============================================ */}
//
// {active === "Veículos" && (
//
//   <>
//
//     {/* CABEÇALHO */}
//
//     <div className="page-heading compact">
//
//       <div>
//
//         <div className="eyebrow">
//           INVENTÁRIO
//         </div>
//
//         <h1>
//           Veículos
//         </h1>
//
//         <p>
//           {vehicles.length}{" "}
//           veículos cadastrados
//           na sua operação.
//         </p>
//
//       </div>
//
//     </div>
//
//
//     {/* BUSCA + FILTRO */}
//
//     <div className="filter-row">
//
//       {/* CAMPO DE BUSCA */}
//
//       <div className="search wide">
//
//         <Icon
//           name="search"
//           size={19}
//         />
//
//         <input
//           aria-label="Buscar veículo"
//           placeholder="Busque por marca, modelo ou tipo..."
//           value={query}
//           onChange={(e) =>
//             setQuery(
//               e.target.value
//             )
//           }
//         />
//
//       </div>
//
//
//       {/* FILTRO DE STATUS */}
//
//       <label className="status-filter">
//
//         <span>
//           STATUS
//         </span>
//
//         <select
//           value={statusFilter}
//           onChange={(e) =>
//             setStatusFilter(
//               e.target.value
//             )
//           }
//         >
//
//           {[
//             "Todos",
//             ...STATUS_OPTIONS,
//           ].map((status) => (
//
//             <option
//               key={status}
//               value={status}
//             >
//               {status}
//             </option>
//
//           ))}
//
//         </select>
//
//       </label>
//
//     </div>
//
//
//     {/* QUANTIDADE DE RESULTADOS */}
//
//     <div className="results-count">
//
//       {visibleVehicles.length}{" "}
//       resultados
//
//     </div>
//
//
//     {/* CARDS */}
//
//     <VehicleGrid
//       vehicles={
//         visibleVehicles
//       }
//
//       onSell={
//         openSellModal
//       }
//
//       onDetails={
//         setDetailsTarget
//       }
//
//       onReserve={
//         reserveVehicle
//       }
//
//       onCancelReservation={
//         cancelReservation
//       }
//     />
//
//   </>
//
// )}

// 3) MODAL DO VEÍCULO SELECIONADO — colar no JSX do Dashboard, no lugar do bloco {detailsTarget && ...} atual
//
// {/* ============================================ */}
// {/* MODAL DO VEÍCULO SELECIONADO                 */}
// {/* ============================================ */}
//
// {detailsTarget &&
//   !vehicleModal &&
//   !deleteTarget && (
//
//     <VehicleDetailsModal
//
//       vehicle={
//         detailsTarget
//       }
//
//       onClose={() =>
//         setDetailsTarget(
//           null
//         )
//       }
//
//       onEdit={(vehicle) =>
//         setVehicleModal({
//           mode: "edit",
//           vehicle,
//         })
//       }
//
//       onDelete={(vehicle) =>
//         setDeleteTarget(
//           vehicle
//         )
//       }
//
//       onReserve={
//         reserveVehicle
//       }
//
//       onCancelReservation={
//         cancelReservation
//       }
//
//     />
//
//   )}

export default function Page() {
  const [
    authenticated,
    setAuthenticated,
  ] = useState(false);

  useEffect(() => {
    if (Parse.User.current()) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return (
      <AuthGate
        onAuthenticated={() =>
          setAuthenticated(true)
        }
      />
    );
  }

  return (
    <Dashboard
      authenticated={
        authenticated
      }
    />
  );
}
