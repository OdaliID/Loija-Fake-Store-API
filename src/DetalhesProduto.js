import React from "react";
import "./styles.css";

function DetalhesProduto({ produto }) {
  if (!produto) {
    return <div>Carregando detalhes do produto...</div>;
  }

  return (
    <div className="detalhes-produto">
      <h2>{produto.title}</h2>
      <img src={produto.image} alt={produto.title} />
      <p>Preço: {produto.price}</p>
      <p>Categoria: {produto.category}</p>
      <p>Descrição: {produto.description}</p>
    </div>
  );
}

export default DetalhesProduto;
