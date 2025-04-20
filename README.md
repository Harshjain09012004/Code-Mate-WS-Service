# Code-Mate-WS-Service

Code-Mate-WS-Service is the backend WebSocket service for the Code-Mate platform. It facilitates real-time communication and collaboration between users, enabling features like messaging, room-based interactions, and live updates.

## Features

- **WebSocket Communication**: Provides a robust WebSocket-based communication layer for real-time updates.
- **Room Management**: Supports creating, joining, and managing collaboration rooms.
- **User Identification**: Tracks and identifies users within rooms.
- **Scalable Architecture**: Built with TypeScript for maintainability and scalability.

## Prerequisites

- Node.js and npm installed on your system.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Harshjain09012004/Code-Mate-WS-Service.git
    cd Code-Mate-WS-Service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build the project:
    ```bash
    npm run build
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

1. Ensure the server is running before starting the Code-Mate frontend.
2. The server will handle WebSocket connections for real-time collaboration.
3. Configure the frontend to connect to the WebSocket server's URL.

## API Endpoints

The WebSocket server does not expose traditional REST endpoints but communicates via WebSocket events. Below are some key events:

- **`join-room`**: Allows a user to join a specific room.
- **`send-message`**: Sends a message to other users in the room.
- **`update-drawing`**: Broadcasts drawing board updates to collaborators.

## Development

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the service.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
