# playground-ai-chat-mem
Playground project on LLM/AI chatbot and RAG/memory using Java/Quarkus and Langchain4j

This project is web application with a **Java & Quarkus** backend and a **JavaScript (React)** frontend.
The backend serves a REST API, while the frontend is a SPA (Single Page Application).

## 📁 Project Structure

- api/ # Java backend application
- client/ # JavaScript frontend  ReactJS application

## 🚀 Getting Started

### Prerequisites

- Java 21+. You can download from and install [Oracle](https://dev.java/download/). Or you can use a [SDKMAN!](https://sdkman.io/).
- Maven 3.9+. Installation guide [here](https://maven.apache.org/install.html)
- Node.js (v23 or higher) and npm. Download and install from [here](https://nodejs.org/en)
- [Podman](https://podman.io/) or (Docker)[https://docs.docker.com/get-started/get-docker/]

**Clone the repository:**

```shell
git clone <repository_url>
cd <project_root_directory>
```


## 💻 Development

Start Quarkus app in (dev mode)[https://quarkus.io/guides/dev-mode-differences]

```shell
cd backend
mvn quarkus:dev
```

(Quinoa extension)[https://quarkus.io/extensions/io.quarkiverse.quinoa/quarkus-quinoa/] will automatically start the frontend development server.

Both frontend and backend hot-reloading will be enabled.

Quarkus (dev services)[https://quarkus.io/guides/dev-services] will also start PostgreSQL PGVector database and (ollama)[https://ollama.com/] for local model inference.


## 🛠 Build and run

TODO