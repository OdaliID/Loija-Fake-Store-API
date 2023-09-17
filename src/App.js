import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Card, Modal, Button } from "antd";
import logo from "./logo.png";
import logoFooter from './logo.svg';
import DetalhesProduto from "./DetalhesProduto";

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
  const [produtoDetalhado, setProdutoDetalhado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

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

  const abrirModalDetalhes = (produto) => {
    setProdutoDetalhado(produto);
    setModalVisivel(true);
  };

  const fecharModalDetalhes = () => {
    setProdutoDetalhado(null);
    setModalVisivel(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="cabecalho">
          <img src={logo} alt="Loja PMW Logo" />
          <div className="marca">Varejo PMW</div>
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
                  <img src={produto.image} alt={produto.title} className="produto-imagem" />
                  <div className="comprar">
                    <button onClick={() => comprarProduto(produto)}>Comprar</button>
                    <Button onClick={() => abrirModalDetalhes(produto)}>Detalhes</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="carrinho">
            <h1>Seu carrinho</h1>
            <ul id="lista-carrinho">
              {carrinho.map((item) => (
                <li key={item.id}>
                  <div>{item.title}</div>
                  <div>
                    {item.quantidade} un. x {formatarPreco(item.price)} ={" "}
                    {formatarPreco(item.price * item.quantidade)}
                  </div>
                  <button className="remover-produto" onClick={() => removerProduto(item.id)}>
                    Remover
                  </button>
                </li>
              ))}
              {carrinho.length === 0 && (
                <li className="carrinho-vazio">
                  <div className="titulo">Seu carrinho está vazio</div>
                  <div className="mensagem">Que tal mudar essa situação? 😉</div>
                </li>
              )}
            </ul>
            <Modal
              title="Detalhes do Produto"
              visible={modalVisivel}
              onOk={fecharModalDetalhes}
              onCancel={fecharModalDetalhes}
            >
              <DetalhesProduto produto={produtoDetalhado} />
            </Modal>
            <div id="carrinho-total">
              <div>Total</div>
              <div>{formatarPreco(totalDoCarrinho)}</div>
            </div>
          </div>
        </div>
        <footer className="rodape">
          <div>Varejo PMW &copy; 2023 - Todos os direitos reservados.</div>
          <div>
            Desenvolvido com react <img src={logoFooter} className="rodape-logo" alt="logo" />
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
