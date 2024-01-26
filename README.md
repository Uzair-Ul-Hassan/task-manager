## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Run the following command to install the necessary dependencies:

   npm install

2. Start the server using the following command:

   npm start

## Code Structure

### `server.js`

Entry point for the Express server, responsible for server setup and configurations.

### `app.js`

Configuration file for the Express application, including middleware setups and route configurations.

### `controllers/`

Contains files handling application business logic. Each file corresponds to a controller, managing specific functionalities.

### `models/`

Holds files defining data structures (models) for the application. Responsible for database interactions.

### `routes/`

Defines routes for the application. Each file maps HTTP methods to corresponding controller functions.

### `utils/`

Contains utility functions or modules for reusable functionalities across the application.

This project structure follows the MVC architecture, promoting a modular and organized codebase. Adjustments can be made based on specific project requirements.
