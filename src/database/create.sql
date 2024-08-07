CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    chave_pix VARCHAR(100),
    instituicao VARCHAR(50),
    agencia VARCHAR(50),
    conta VARCHAR(50),
    cargo VARCHAR(50)
);