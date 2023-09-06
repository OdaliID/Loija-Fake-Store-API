import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from './logo.svg';

function formatarPreco(valor) {
  if (valor != null) {
    return valor.toLocaleString(undefined, {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return "Preço indisponível";
  }
}

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, []);

  const comprarProduto = (produto) => {
    if (produto.price > 0) {
      const itemExistente = carrinho.find((item) => item.id === produto.id);

      if (itemExistente) {
        const novoCarrinho = carrinho.map((item) => {
          if (item.id === produto.id) {
            return {
              ...item,
              quantidade: item.quantidade + 1
            };
          } else {
            return item;
          }
        });
        setCarrinho(novoCarrinho);
      } else {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
      }
    }
  };

  const totalDoCarrinho = carrinho.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );

  const removerProduto = (produtoId) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== produtoId);
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="App">
      <header className="cabecalho">
      <img src="./logo.png" alt="Loja PMW Logo"/>
        <div className="marca">Loja PMW </div>
      </header>
      <div className="conteudo">
        <div className="lista">
          <div className="lista-cabecalho">
            <h1>Produtos</h1>
          </div>
          <ul id="lista-produtos">
            {produtos.map((produto) => (
              <li key={produto.id} className="produto-item">
                <div className="produto-info">
                  <div className="titulo">{produto.title}</div>
                  <div className="preco">{formatarPreco(produto.price)}</div>
                </div>
                <img src={produto.image} alt={produto.title} className="produto-imagem"/>
                <div className="comprar">
                  <button onClick={() => comprarProduto(produto)}>Comprar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="carrinho">
          <h1>Seu carrinho</h1>
          <div className="carrinho-container"></div>
          <ul id="lista-carrinho">
            {carrinho.map((item) => (
              <li key={item.id}>
                <div>{item.title}</div>
                <div>
                  {item.quantidade} un. x {formatarPreco(item.price)} ={" "}
                  {formatarPreco(item.price * item.quantidade)}
                </div>
                <button className="remover-produto" onClick={() => removerProduto(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <div id="carrinho-total">
            <div>Total</div>
            <div>{formatarPreco(totalDoCarrinho)}</div>
          </div>
        </div>
      </div>
      <footer className="rodape">
        <div>Loja PMW &copy; 2023 - Todos os direitos reservados.</div>
        <div>Desenvolvido com react <img src={logo} className="App-logo" alt="logo" /></div>
      </footer>
    </div>
  );
}

export default App;