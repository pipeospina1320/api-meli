# **Pasos para configurar el entorto de desarrollo**

### **Usando docker**

1. Construir imagen

```bash
docker build . -t meli-api
```

2. Correr imagen en contenedor

```bash
docker run -e PORT=8080 -dp 8080:8080 meli-api
```

### **Usando node**
