"use client";

import { useState } from "react";

export default function Home() {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const total = carrito.reduce((suma, item) => suma + item.precio, 0);

  return (
    <main style={{ padding: 20, background: "#f2f2f2", minHeight: "100vh" }}>
      
      <h1 style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
        TIENDA DE RELOJES
      </h1>

      <p style={{ textAlign: "center" }}>
        Relojes originales, deportivos y elegantes
      </p>

      {/* Barra del carrito */}
      <div style={{
        background: "linear-gradient(135deg, #111, #333)",
        color: "white",
        padding: "15px 20px",
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}>
        <span style={{ fontSize: 18 }}>
          🛒 {carrito.length} productos
        </span>

        <strong style={{ fontSize: 20, color: "#00ff99" }}>
          S/ {total}
        </strong>
      </div>

      {/* Productos */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: 20, 
        marginTop: 30 
      }}>

        {[
          { nombre: "Reloj Invicta Pro", precio: 499, img: "/reloj1.jpg" },
          { nombre: "Reloj Automático", precio: 699, img: "/reloj2.jpg" },
          { nombre: "Reloj Deportivo", precio: 399, img: "/reloj3.jpg" }
        ].map((producto, index) => (
          <div key={index} style={{ background: "white", padding: 15, borderRadius: 8 }}>
            <img src={producto.img} alt={producto.nombre} style={{ width: "100%" }} />
            <h2>{producto.nombre}</h2>
            <p><b>S/ {producto.precio}</b></p>
            <button 
              style={{ width: "100%" }} 
              onClick={() => agregarProducto(producto)}
            >
              Comprar
            </button>
          </div>
        ))}

      </div>

      {/* Carrito */}
      <div style={{ 
        background: "#fff", 
        marginTop: 30, 
        padding: 15, 
        borderRadius: 10 
      }}>
        <h3>Productos en el carrito:</h3>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <ul>
              {carrito.map((item, index) => (
                <li key={index}>
                  {item.nombre} - S/ {item.precio}
                </li>
              ))}
            </ul>

            <button
              style={{
                marginTop: 15,
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #00ff99, #00cc88)",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                color: "#111",
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
              }}
              onClick={() => {
                alert("Compra realizada con éxito ✅");
                setCarrito([]);
              }}
            >
              Finalizar compra
            </button>
          </>
        )}
      </div>

    </main>
  );
}
