"use client";

import { useState, useEffect } from "react";

type Producto = {
  nombre: string;
  precio: number;
  img: string;
  cantidad: number;
};

export default function Home() {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const productos = [
    { nombre: "Reloj Invicta Pro", precio: 499, img: "/reloj1.jpg" },
    { nombre: "Reloj Automático", precio: 699, img: "/reloj2.jpg" },
    { nombre: "Reloj Deportivo", precio: 399, img: "/reloj3.jpg" }
  ];

  // 🔹 CARGAR CARRITO GUARDADO
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  // 🔹 GUARDAR CARRITO
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // ➕ AGREGAR PRODUCTO
  const agregarProducto = (producto: any) => {
    const existe = carrito.find(p => p.nombre === producto.nombre);

    if (existe) {
      setCarrito(
        carrito.map(p =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // ➖ ELIMINAR PRODUCTO
  const eliminarProducto = (nombre: string) => {
    setCarrito(carrito.filter(p => p.nombre !== nombre));
  };

  // 🔢 TOTAL
  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  return (
    <main style={{ padding: 20 }}>
      <h1>🕒 TIENDA DE RELOJES</h1>

      <div style={{ marginBottom: 20 }}>
        🛒 {carrito.reduce((s, p) => s + p.cantidad, 0)} productos —{" "}
        <b>S/ {total}</b>
      </div>

      {/* PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20
        }}
      >
        {productos.map((producto, index) => (
          <div
            key={index}
            style={{ background: "#fff", padding: 15, borderRadius: 8 }}
          >
            <img src={producto.img} style={{ width: "100%" }} />
            <h3>{producto.nombre}</h3>
            <p>S/ {producto.precio}</p>
            <button onClick={() => agregarProducto(producto)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div style={{ marginTop: 30, background: "#fff", padding: 15 }}>
        <h2>🛒 Carrito</h2>

        {carrito.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          <ul>
            {carrito.map((item, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                {item.nombre} — S/ {item.precio} x {item.cantidad}
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => eliminarProducto(item.nombre)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
