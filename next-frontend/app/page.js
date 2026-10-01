"use client";

import { useState, useEffect, useMemo } from "react";
import Parse from "@/lib/parse";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";

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

function SelectField({
  label,
  name,
  defaultValue,
  options,
}) {
  return (
    <label className="field">
      <span>{label}</span>

      <select
        className="select"
        name={name}
        defaultValue={defaultValue}
        required
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

const STATUS_OPTIONS = [
  "Disponível",
  "Reservado",
  "Vendido",
];

const PAGAMENTO_OPTIONS = [
  "À vista",
  "Financiado",
];

const ROLE_OPTIONS = ["admin", "consultor"];

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
              formData.get(
                "confirmarSenha"
              )
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
        <Button
          className="secondary"
          onClick={() =>
            onDetails(vehicle)
          }
        >
          Ver detalhes
        </Button>

        {vehicle.status === "Disponível" && (
          <Button
            className="secondary"
            onClick={() => onReserve(vehicle)}
          >
            Reservar
          </Button>
        )}

        {vehicle.status === "Reservado" && (
          <Button
            className="secondary"
            onClick={() => onCancelReservation(vehicle)}
          >
            Cancelar reserva
          </Button>
        )}

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
      {vehicles.map((v) => (
        <VehicleCard
          key={v.id}
          vehicle={v}
          onSell={onSell}
          onDetails={onDetails}
          onReserve={onReserve}
          onCancelReservation={onCancelReservation}
        />
      ))}
    </div>
  );
}

function UserCard({ user, index, currentUser, isAdmin, onChangeRole, onDelete }) {
  const isSelf = user.id === currentUser?.id;
  const roleName = user.role || "Consultor";
  const initials = (user.nome || user.username || "U").slice(0, 2).toUpperCase();

  return (
    <article className="vehicle-card user-card-custom">
      <div className="vc-top">
        <span className={`avatar-pill tone-${index % 3}`}>
          {initials}
        </span>
        <span className={`status ${roleName.toLowerCase() === "admin" ? "status-disponivel" : "status-reservado"}`}>
          {roleName}
        </span>
      </div>

      <div className="vc-brand">COLABORADOR</div>
      <h3 className="vc-model">
        {user.nome || user.username}
        {isSelf && <span className="self-tag"> (você)</span>}
      </h3>

      <div className="vc-specs">
        <div style={{ flex: "2" }}>
          <span>E-MAIL</span>
          <strong className="truncate-text" title={user.email}>{user.email || "—"}</strong>
        </div>
        <div>
          <span>CARGO</span>
          <strong style={{ textTransform: "capitalize" }}>{roleName}</strong>
        </div>
      </div>

      <div className="vc-actions">
        {isAdmin && !isSelf ? (
          <>
            <select
              className="select small"
              value={user.role || "consultor"}
              onChange={(e) => onChangeRole(user.id, e.target.value)}
              style={{ flex: 1 }}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r.toUpperCase()}
                </option>
              ))}
            </select>
            <Button className="danger small" onClick={() => onDelete(user)}>
              Excluir
            </Button>
          </>
        ) : (
          <div className="user-card-footer-info">
            {isSelf ? "Sua conta atual" : "Acesso padrão"}
          </div>
        )}
      </div>
    </article>
  );
}

function VehicleFormModal({
  mode,
  vehicle,
  onClose,
  onSubmit,
}) {
  const editing = mode === "edit";

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
        <div className="modal-top">
          <div>
            <div className="eyebrow">
              {editing
                ? "EDITAR CADASTRO"
                : "NOVO CADASTRO"}
            </div>

            <h2>
              {editing
                ? `${vehicle.marca} ${vehicle.modelo}`
                : "Adicionar veículo"}
            </h2>
          </div>

          <Button
            className="icon-button"
            onClick={onClose}
          >
            <Icon name="close" />
          </Button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <Field
              label="Marca"
              name="marca"
              defaultValue={
                vehicle?.marca
              }
              placeholder="Ex.: Toyota"
            />

            <Field
              label="Modelo"
              name="modelo"
              defaultValue={
                vehicle?.modelo
              }
              placeholder="Ex.: Corolla"
            />

            <Field
              label="Ano"
              name="ano"
              type="number"
              defaultValue={
                vehicle?.ano
              }
              placeholder="2025"
            />

            <Field
              label="Preço"
              name="preco"
              type="number"
              defaultValue={
                vehicle?.preco
              }
              placeholder="180000"
            />

            <Field
              label="Tipo"
              name="tipo"
              defaultValue={
                vehicle?.tipo
              }
              placeholder="Sedan, SUV..."
            />

            <SelectField
              label="Pagamento"
              name="tipoPreco"
              defaultValue={
                vehicle?.tipoPreco ??
                "À vista"
              }
              options={
                PAGAMENTO_OPTIONS
              }
            />

            {editing && (
              <SelectField
                label="Status"
                name="status"
                defaultValue={
                  vehicle.status
                }
                options={
                  STATUS_OPTIONS
                }
              />
            )}
          </div>

          <div className="modal-actions">
            <Button
              className="secondary"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              className="primary"
              type="submit"
            >
              {editing
                ? "Salvar alterações"
                : "Salvar veículo"}

              <Icon
                name="arrow"
                size={17}
              />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VehicleDetailsModal({
  vehicle,
  onClose,
  onEdit,
  onDelete,
  onReserve,
  onCancelReservation,
}) {
  const rows = [
    ["Marca", vehicle.marca],
    ["Modelo", vehicle.modelo],
    ["Ano", vehicle.ano],
    ["Tipo", vehicle.tipo],
    [
      "Pagamento",
      vehicle.tipoPreco,
    ],
    [
      "Preço",
      money(vehicle.preco),
    ],
    ["Status", vehicle.status],
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

        <div className="detail-list">
          {rows.map(([k, v]) => (
            <div
              className="detail-row"
              key={k}
            >
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <Button
            className="danger"
            onClick={() =>
              onDelete(vehicle)
            }
          >
            Excluir
          </Button>

          {vehicle.status === "Disponível" && (
            <Button
              className="secondary"
              onClick={() => onReserve(vehicle)}
            >
              Reservar
            </Button>
          )}

          {vehicle.status === "Reservado" && (
            <Button
              className="secondary"
              onClick={() => onCancelReservation(vehicle)}
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

function ConfirmModal({
  eyebrow = "CONFIRMAR",
  title,
  message,
  confirmLabel = "Excluir",
  onCancel,
  onConfirm,
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-top">
          <div>
            <div className="eyebrow">
              {eyebrow}
            </div>

            <h2>{title}</h2>
          </div>
        </div>

        <p className="confirm-text">
          {message}
        </p>

        <div className="modal-actions">
          <Button
            className="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>

          <Button
            className="danger"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function UserFormModal({
  onClose,
  onSubmit,
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
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-top">
          <div>
            <div className="eyebrow">
              NOVO ACESSO
            </div>

            <h2>
              Adicionar usuário
            </h2>
          </div>

          <Button
            className="icon-button"
            onClick={onClose}
          >
            <Icon name="close" />
          </Button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <Field
              label="Nome completo"
              name="nome"
              placeholder="Nome do usuário"
            />

            <Field
              label="E-mail"
              name="email"
              type="email"
              placeholder="usuario@empresa.com.br"
            />

            <Field
              label="Senha"
              name="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />

            <SelectField
              label="Perfil"
              name="role"
              defaultValue="consultor"
              options={
                ROLE_OPTIONS
              }
            />
          </div>

          <div className="modal-actions">
            <Button
              className="secondary"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              className="primary"
              type="submit"
            >
              Criar usuário

              <Icon
                name="arrow"
                size={17}
              />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dashboard({
  authenticated,
}) {
  const [active, setActive] =
    useState("Visão geral");

  const [query, setQuery] =
    useState("");

  const [
    refreshKey,
    setRefreshKey,
  ] = useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [vehicles, setVehicles] =
    useState([]);

  const [usuarios, setUsuarios] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [sales, setSales] =
    useState([]);

  const [
    sellModalOpen,
    setSellModalOpen,
  ] = useState(false);

  const [
    sellTarget,
    setSellTarget,
  ] = useState(null);

  const [
    vehicleModal,
    setVehicleModal,
  ] = useState(null);

  const [
    detailsTarget,
    setDetailsTarget,
  ] = useState(null);

  const [
    deleteTarget,
    setDeleteTarget,
  ] = useState(null);

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("Todos");

  const [
    userModalOpen,
    setUserModalOpen,
  ] = useState(false);

  const [
    userDeleteTarget,
    setUserDeleteTarget,
  ] = useState(null);

  const currentUser =
    Parse.User.current();

  const isAdmin =
    currentUser?.get("role") ===
    "admin";

  const userName =
    currentUser?.get("nome") ||
    currentUser?.get("username") ||
    currentUser?.get("email") ||
    "Usuário";

  const userRole =
    currentUser?.get("role") ===
    "admin"
      ? "Admin"
      : "Consultor";

  useEffect(() => {
    if (!authenticated) return;

    let cancelado = false;

    setLoading(true);
    setError(null);

    async function carregar() {
      try {
        if (
          active === "Visão geral"
        ) {
          const [
            statsResult,
            salesResult,
          ] = await Promise.all([
            Parse.Cloud.run(
              "dashboardStats"
            ),
            Parse.Cloud.run(
              "listSales"
            ),
          ]);

          if (!cancelado) {
            setStats(statsResult);
            setSales(
              salesResult || []
            );
          }
        } else if (
          active === "Veículos"
        ) {
          const result =
            await Parse.Cloud.run(
              "listVehicles",
              {
                busca: query,
              }
            );

          if (!cancelado) {
            setVehicles(result);
          }
        } else if (
          active === "Vendas"
        ) {
          const result =
            await Parse.Cloud.run(
              "listSales"
            );

          if (!cancelado) {
            setSales(result || []);
          }
        } else if (
          active === "Usuários"
        ) {
          const result =
            await Parse.Cloud.run(
              "listUsers"
            );

          if (!cancelado) {
            setUsuarios(result);
          }
        }
      } catch (err) {
        if (!cancelado) {
          setError(
            err?.message ??
              "Erro ao carregar dados."
          );
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, [
    authenticated,
    active,
    query,
    refreshKey,
  ]);

  const visibleVehicles =
    useMemo(
      () =>
        statusFilter === "Todos"
          ? vehicles
          : vehicles.filter(
              (v) =>
                v.status ===
                statusFilter
            ),
      [vehicles, statusFilter]
    );

  const openSellModal = (
    vehicle
  ) => {
    setSellTarget(vehicle);
    setSellModalOpen(true);
  };

  const reserveVehicle = async (vehicle) => {
    try {
      setError(null);

      await Parse.Cloud.run("reserveVehicle", {
        vehicleId: vehicle.id,
      });

      setDetailsTarget(null);
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setError(
        err?.message ?? "Erro ao reservar veículo."
      );
    }
  };

  const cancelReservation = async (vehicle) => {
    try {
      setError(null);

      await Parse.Cloud.run("cancelReservation", {
        vehicleId: vehicle.id,
      });

      setDetailsTarget(null);
      setRefreshKey((key) => key + 1);
    } catch (err) {
      setError(
        err?.message ?? "Erro ao cancelar reserva."
      );
    }
  };

  const vehiclePayload = (
    data
  ) => ({
    marca: String(
      data.get("marca")
    ).trim(),

    modelo: String(
      data.get("modelo")
    ).trim(),

    ano: Number(
      data.get("ano")
    ),

    preco: Number(
      data.get("preco")
    ),

    tipo: String(
      data.get("tipo")
    ).trim(),

    tipoPreco: String(
      data.get("tipoPreco")
    ),
  });

  const saveVehicle = async (
    event
  ) => {
    event.preventDefault();

    const data = new FormData(
      event.currentTarget
    );

    setError(null);

    try {
      if (
        vehicleModal.mode ===
        "edit"
      ) {
        await Parse.Cloud.run(
          "updateVehicle",
          {
            id:
              vehicleModal
                .vehicle.id,

            ...vehiclePayload(
              data
            ),

            status: String(
              data.get("status")
            ),
          }
        );
      } else {
        await Parse.Cloud.run(
          "createVehicle",
          vehiclePayload(data)
        );
      }

      setVehicleModal(null);
      setDetailsTarget(null);
      setActive("Veículos");

      setRefreshKey(
        (k) => k + 1
      );
    } catch (err) {
      setError(
        err?.message ??
          "Erro ao salvar veículo."
      );
    }
  };

  const confirmDeleteVehicle =
    async () => {
      try {
        await Parse.Cloud.run(
          "deleteVehicle",
          {
            id: deleteTarget.id,
          }
        );

        setDeleteTarget(null);
        setDetailsTarget(null);

        setRefreshKey(
          (k) => k + 1
        );
      } catch (err) {
        setDeleteTarget(null);

        setError(
          err?.message ??
            "Erro ao excluir veículo."
        );
      }
    };

  const createUser = async (
    event
  ) => {
    event.preventDefault();

    const data = new FormData(
      event.currentTarget
    );

    try {
      await Parse.Cloud.run(
        "createUser",
        {
          nome: String(
            data.get("nome")
          ),

          email: String(
            data.get("email")
          ),

          senha: String(
            data.get("senha")
          ),

          role: String(
            data.get("role")
          ),
        }
      );

      setUserModalOpen(false);

      setRefreshKey(
        (k) => k + 1
      );
    } catch (err) {
      setError(
        err?.message ??
          "Erro ao criar usuário."
      );
    }
  };

  const changeUserRole =
    async (userId, role) => {
      try {
        await Parse.Cloud.run(
          "updateUserRole",
          {
            userId,
            role,
          }
        );

        setRefreshKey(
          (k) => k + 1
        );
      } catch (err) {
        setError(
          err?.message ??
            "Erro ao alterar perfil."
        );
      }
    };

  const confirmDeleteUser =
    async () => {
      try {
        await Parse.Cloud.run(
          "deleteUser",
          {
            userId:
              userDeleteTarget.id,
          }
        );

        setUserDeleteTarget(
          null
        );

        setRefreshKey(
          (k) => k + 1
        );
      } catch (err) {
        setUserDeleteTarget(
          null
        );

        setError(
          err?.message ??
            "Erro ao excluir usuário."
        );
      }
    };

  return (
    <>
      <Sidebar
        active={active}
        setActive={setActive}
        userName={userName}
        userRole={userRole}
      />

      <div className="main">
        <header className="topbar">
          <Button
            className="icon-button menu-button"
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          >
            <Icon name="menu" />
          </Button>
        </header>

        <div className="content">
          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          {active ===
            "Visão geral" && (
            <DashboardOverview
              stats={stats}
              sales={sales}
              loading={loading}
              onOpenSales={() =>
                setActive(
                  "Vendas"
                )
              }
            />
          )}

          {active !==
            "Visão geral" &&
            loading && (
              <div className="alert">
                Carregando...
              </div>
            )}

          {active ===
            "Veículos" && (
            <>
              <div className="page-heading compact">
                <div>
                  <div className="eyebrow">
                    INVENTÁRIO
                  </div>

                  <h1>
                    Veículos
                  </h1>

                  <p>
                    {
                      vehicles.length
                    }{" "}
                    veículos
                    cadastrados na
                    sua operação.
                  </p>
                </div>

                <Button
                  className="primary"
                  onClick={() =>
                    setVehicleModal(
                      {
                        mode:
                          "create",
                      }
                    )
                  }
                >
                  <Icon
                    name="plus"
                    size={18}
                  />

                  Cadastrar veículo
                </Button>
              </div>

              <div className="filter-row">
                <div className="search wide">
                  <Icon
                    name="search"
                    size={19}
                  />

                  <input
                    aria-label="Buscar veículo"
                    placeholder="Busque por marca, modelo ou tipo..."
                    value={query}
                    onChange={(e) =>
                      setQuery(
                        e.target
                          .value
                      )
                    }
                  />
                </div>

                <label className="status-filter">
                  <span>
                    STATUS
                  </span>

                  <select
                    value={
                      statusFilter
                    }
                    onChange={(
                      e
                    ) =>
                      setStatusFilter(
                        e.target
                          .value
                      )
                    }
                  >
                    {[
                      "Todos",
                      ...STATUS_OPTIONS,
                    ].map(
                      (s) => (
                        <option
                          key={
                            s
                          }
                          value={
                            s
                          }
                        >
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              <div className="results-count">
                {
                  visibleVehicles.length
                }{" "}
                resultados
              </div>

              <VehicleGrid
                vehicles={
                  visibleVehicles
                }
                onSell={
                  openSellModal
                }
                onDetails={
                  setDetailsTarget
                }
                onReserve={reserveVehicle}
                onCancelReservation={cancelReservation}
              />
            </>
          )}

          {active ===
            "Vendas" &&
            !loading && (
              <>
                <div className="page-heading compact">
                  <div>
                    <div className="eyebrow">
                      MOVIMENTAÇÕES
                    </div>

                    <h1>
                      Vendas
                    </h1>

                    <p>
                      {
                        sales.length
                      }{" "}
                      vendas
                      registradas
                      no sistema.
                    </p>
                  </div>
                </div>

                <div className="table-card">
                  {sales.length ===
                  0 ? (
                    <div className="empty">
                      Nenhuma
                      venda
                      registrada.
                    </div>
                  ) : (
                    <div className="detail-list">
                      {sales.map(
                        (
                          sale
                        ) => (
                          <div
                            className="detail-row"
                            key={
                              sale.id
                            }
                          >
                            <div>
                              <strong>
                                {sale
                                  .veiculo
                                  ?.marca ||
                                  "Veículo"}{" "}
                                {sale
                                  .veiculo
                                  ?.modelo ||
                                  ""}
                              </strong>

                              <span>
                                {sale.consultor ||
                                  "Consultor não informado"}
                              </span>
                            </div>

                            <strong>
                              {money(
                                sale.valorFinal
                              )}
                            </strong>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

          {active ===
            "Usuários" && (
            <>
              <div className="page-heading compact">
                <div>
                  <div className="eyebrow">
                    EQUIPE
                  </div>

                  <h1>
                    Usuários
                  </h1>

                  <p>
                    {usuarios.length} usuários cadastrados na sua operação.
                  </p>
                </div>

                {isAdmin && (
                  <Button
                    className="primary"
                    onClick={() =>
                      setUserModalOpen(
                        true
                      )
                    }
                  >
                    <Icon
                      name="plus"
                      size={18}
                    />

                    Novo usuário
                  </Button>
                )}
              </div>

              <div className="vehicle-grid">
                {usuarios.length === 0 ? (
                  <div className="table-card">
                    <div className="empty">Nenhum usuário cadastrado.</div>
                  </div>
                ) : (
                  usuarios.map((user, index) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      index={index}
                      currentUser={currentUser}
                      isAdmin={isAdmin}
                      onChangeRole={changeUserRole}
                      onDelete={setUserDeleteTarget}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {vehicleModal && (
          <VehicleFormModal
            mode={
              vehicleModal.mode
            }
            vehicle={
              vehicleModal.vehicle
            }
            onClose={() =>
              setVehicleModal(
                null
              )
            }
            onSubmit={
              saveVehicle
            }
          />
        )}

        {detailsTarget &&
          !vehicleModal &&
          !deleteTarget && (
            <VehicleDetailsModal
              vehicle={
                detailsTarget
              }
              onClose={() =>
                setDetailsTarget(
                  null
                )
              }
              onEdit={(v) =>
                setVehicleModal(
                  {
                    mode:
                      "edit",
                    vehicle:
                      v,
                  }
                )
              }
              onDelete={(v) =>
                setDeleteTarget(
                  v
                )
              }
              onReserve={reserveVehicle}
              onCancelReservation={cancelReservation}
            />
          )}

        {deleteTarget && (
          <ConfirmModal
            title={`Excluir ${deleteTarget.marca} ${deleteTarget.modelo}?`}
            message="Essa ação não pode ser desfeita. Veículos com vendas registradas não podem ser excluídos."
            onCancel={() =>
              setDeleteTarget(
                null
              )
            }
            onConfirm={
              confirmDeleteVehicle
            }
          />
        )}

        {userModalOpen && (
          <UserFormModal
            onClose={() =>
              setUserModalOpen(
                false
              )
            }
            onSubmit={
              createUser
            }
          />
        )}

        {userDeleteTarget && (
          <ConfirmModal
            title={`Excluir ${userDeleteTarget.nome}?`}
            message="O usuário perderá o acesso à plataforma imediatamente."
            onCancel={() =>
              setUserDeleteTarget(
                null
              )
            }
            onConfirm={
              confirmDeleteUser
            }
          />
        )}
      </div>
    </>
  );
}

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