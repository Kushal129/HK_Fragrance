# Fragrance Website

## Overview

Welcome to the Fragrance Website project! This is a modern and stylish e-commerce website for fragrances, built using React.js with the Vite framework, and styled with Tailwind CSS. The website features a dynamic product display, responsive design, and an admin panel for managing product inventory. Firebase is used for database management and user authentication.

## Features

- **Responsive Design**: The site is fully responsive and looks great on all devices, thanks to Tailwind CSS.
- **Admin Panel**: An easy-to-use admin interface for adding, updating, and deleting products.
- **Product Categories**: Organize and browse fragrances by categories.
- **Firebase Integration**: Utilizes Firebase for real-time database storage and user authentication.
- **Dynamic Product Display**: Products are displayed in a grid layout with responsive design.

## Tech Stack

- **Frontend**: 
  - React.js
  - Vite
  - Tailwind CSS

- **Backend**: 
  - Firebase (Database and Authentication)

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/fragrance-website.git
   ```
2. **Navigate to the Project Directory**

    ```bash
    cd fragrance-website
    ```
3. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Start the Development Server**
    ```bash
    npm run dev
    ```

## Usage

### Admin Panel

Access the admin panel to manage your product inventory. The panel allows you to:

- **Add Products**: Enter details for new products to be added to the store.
- **Update Products**: Modify existing product details.
- **Delete Products**: Remove products from the inventory.

### Product Categories

The website features multiple categories for fragrances, allowing users to browse and find products that suit their preferences.

## Firebase Setup

1. **Create a Firebase Project**: Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Add Firebase Configuration**: Obtain your Firebase config and add it to your project. This typically involves creating a `.env` file with your Firebase credentials:

   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
    ```
3. **Install Firebase SDK**
    ```bash
    npm install firebase
    ```
4. **Initialize Firebase**: Configure Firebase in your project by initializing it with the credentials obtained in the previous step.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request. For substantial changes, consider discussing them first.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, feel free to reach out to [your email] or create an issue on GitHub.
