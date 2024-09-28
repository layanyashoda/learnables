# Learnables - Study Material Marketplace

![Learnables Logo](https://via.placeholder.com/150)

**Learnables** is a peer-to-peer marketplace for university students to buy, sell, and rent study materials, such as textbooks, notes, and lab equipment. The platform aims to make educational resources more affordable, accessible, and sustainable while fostering a community-driven environment for academic success.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Team Members](#team-members)
- [License](#license)

## Features
- **User Registration and Authentication**: Secure registration and login for university students.
- **Product Listings**: Users can create and manage listings for textbooks, notes, and other study materials.
- **Search and Filter**: Find materials easily with robust search and filter options.
- **In-App Messaging**: Communicate with other users to ask questions or negotiate deals.
- **Wishlist**: Save items you’re interested in for future reference.
- **Ratings and Reviews**: Leave feedback on buyers and sellers to promote trust in the community.
- **Payment Integration**: Secure online payments for transactions.

## Technology Stack
### Frontend
- **Web**: React.js
- **Mobile**: Flutter

### Backend
- **Server**: Node.js with Express
- **Database**: MongoDB

### Additional Tools
- **Authentication**: Firebase Authentication
- **Cloud Storage**: AWS S3
- **Payment Gateway**: Stripe or PayPal
- **Notifications**: Firebase Cloud Messaging

## Getting Started
To get started with Learnables, follow the instructions below to set up the development environment and run the project locally.

### Prerequisites
- **Node.js** (v14+)
- **Flutter SDK**
- **MongoDB** (local or cloud-based)
- **AWS Account** for S3 (for cloud storage)

## Installation
### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/learnables.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd learnables/backend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file for environment variables (e.g., database URL, AWS keys).
5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend (Web)
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

### Mobile
1. Navigate to the mobile directory:
    ```bash
    cd ../mobile
    ```
2. Install dependencies using Flutter:
    ```bash
    flutter pub get
    ```
3. Run the application:
    ```bash
    flutter run
    ```

## Usage
Once the server and frontend are running, you can access the web application at `http://localhost:3000` and the mobile application on your device or emulator. Users can register, create listings, search for materials, and interact with other users via chat.

## Project Structure
learnables/ │ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ └── server.js │ ├── frontend/ │ ├── public/ │ ├── src/ │ └── package.json │ ├── mobile/ │ ├── lib/ │ ├── android/ │ ├── ios/ │ └── pubspec.yaml │ └── README.md


## Team Members
- **Project Manager**: Chamika Lakshan
- **Frontend Developer**: Chanuka Isuru
- **Backend Developer**: Nethmi Pahasarani
- **UI/UX Designer**: Sanduni Bodhika
- **Quality Assurance**: Layan Yasoda

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
