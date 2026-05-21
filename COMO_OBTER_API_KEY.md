# Como Obter a Chave de API da API-Football

## Passo 1: Acessar o Site da API-Football

1. Abra seu navegador e acesse: **https://api-football.com**
2. Clique no botão **"SIGN IN"** no canto superior direito

## Passo 2: Criar uma Conta (Se Não Tiver)

Se você não possui uma conta:

1. Na página de login, procure por um link como **"Sign Up"** ou **"Create Account"**
2. Preencha o formulário com:
   - Email
   - Senha
   - Confirme a senha
3. Clique em **"Register"** ou **"Create Account"**

## Passo 3: Confirmar o Email

1. Verifique seu email (pode estar na pasta de spam)
2. Clique no link de confirmação enviado pela API-Football
3. Você será redirecionado para confirmar sua conta

## Passo 4: Fazer Login no Dashboard

1. Retorne a **https://api-football.com** e clique em **"SIGN IN"**
2. Digite seu email e senha
3. Clique em **"Sign In"**

## Passo 5: Acessar a Chave de API

1. Após fazer login, você será redirecionado para o **Dashboard**
2. No menu lateral esquerdo, procure por:
   - **"Account"** ou
   - **"Settings"** ou
   - **"API Keys"**
3. Você verá sua chave de API listada (geralmente começa com números e letras)

## Passo 6: Copiar a Chave

1. Localize sua chave de API (será uma string longa como: `1a2b3c4d5e6f7g8h9i0j`)
2. Clique no ícone de **cópia** ao lado da chave ou selecione e copie manualmente

## Passo 7: Usar a Chave no Projeto

1. Abra o arquivo: `client/src/hooks/useFootballAPI.ts`
2. Localize as linhas com `'x-apisports-key': 'demo'`
3. Substitua `'demo'` pela sua chave:

```javascript
'x-apisports-key': 'sua_chave_aqui'
```

Exemplo:
```javascript
'x-apisports-key': '1a2b3c4d5e6f7g8h9i0j'
```

## ⚠️ Importante

- **Nunca compartilhe sua chave de API** publicamente
- A chave de API é pessoal e intransferível
- O plano gratuito tem limite de **50 requisições por dia**
- Se exceder o limite, você terá que esperar até o próximo dia para fazer mais requisições

## Planos Disponíveis

A API-Football oferece diferentes planos:

| Plano | Requisições/Dia | Preço |
|-------|-----------------|-------|
| Free | 50 | Gratuito |
| Starter | 500 | Pago |
| Professional | 5000 | Pago |
| Business | Ilimitado | Pago |

## Dúvidas?

Se tiver dúvidas, consulte a documentação oficial: **https://api-football.com/documentation**

---

**Nota**: A aplicação já possui dados de demonstração, então você pode usar o projeto mesmo sem uma chave de API válida. Os dados de fallback serão carregados automaticamente.
