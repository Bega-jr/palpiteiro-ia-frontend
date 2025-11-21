# Imagem base leve e estável
FROM python:3.11-slim

# Evitar buffering nos logs
ENV PYTHONUNBUFFERED=1

# Criar diretório do app
WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de dependências
COPY requirements.txt .

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o projeto para dentro do container
COPY . .

# Expõe a porta usada pelo Render
EXPOSE 5000

# Comando final de execução (Gunicorn)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
