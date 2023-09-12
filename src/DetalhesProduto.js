// DetalhesProduto.js

import React from "react";
import { Card } from "antd";

function DetalhesProduto({ produto, onClose }) {
  return (
    <div className="detalhes-produto">
      <Card
        title={produto.title}
        extra={<button onClick={onClose}>Fechar</button>}
      >
        <img src={produto.image} alt={produto.title} />
        <p>{produto.description}</p>
        <p>Preço: {formatarPreco(produto.price)}</p>
      </Card>
    </div>
  );
}

export default DetalhesProduto;
