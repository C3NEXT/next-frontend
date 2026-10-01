"use client";

import styles from "../page.module.css";

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 17h14l1-5-2-5H6l-2 5 1 5Z" />
      <path d="M7 7 5 12h14l-2-5" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  sales: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19V3" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-7 7-7s7 3 7 7" />
      <circle cx="18" cy="9" r="3" />
      <path d="M17 15c3 0 5 2 5 5" />
    </svg>
  ),
};

export default function Sidebar({
  active,
  setActive,
  userName = "Usuário",
  userRole = "Admin",
}) {
  const menuItems = [
    { name: "Visão geral", icon: icons.dashboard },
    { name: "Veículos", icon: icons.car },
    { name: "Vendas", icon: icons.sales },
    { name: "Usuários", icon: icons.users },
  ];

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.brandSymbol}>N</div>

        <div>
          <strong className={styles.brandName}>NEXT</strong>
          <span className={styles.brandSubtitle}>
            GESTÃO AUTOMOTIVA
          </span>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <span className={styles.sidebarLabel}>
          MENU PRINCIPAL
        </span>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`${styles.navItem} ${
                active === item.name
                  ? styles.navItemActive
                  : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className={styles.navIcon}>
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.sidebarProfile}>
        <div className={styles.profileAvatar}>
          {initials || "U"}
        </div>

        <div className={styles.profileInfo}>
          <strong>{userName}</strong>
          <span>{userRole}</span>
        </div>
      </div>
    </aside>
  );
}