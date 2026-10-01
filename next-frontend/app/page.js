"use client";

import { useState, useEffect } from "react";
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