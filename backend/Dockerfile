FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set default port if not provided by Render
ENV PORT=8000
EXPOSE 8000

# Run FastAPI with dynamic port binding for Render
CMD python -m app.seed && uvicorn app.main:app --host 0.0.0.0 --port $PORT
