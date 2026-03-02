# Smart Mecânico

Smart Mecânico is a robust React Native application built with Expo designed to simplify automotive maintenance management and service scheduling. It provides users with a comprehensive set of tools to track vehicle health, manage expenses, and schedule professional mechanic services.

## Key Features

- **Service Scheduling:** Easily book appointments for various automotive services like oil changes, brake inspections, and full vehicle reviews.
- **Vehicle Management:** Maintain a digital garage with detailed profiles for each of your vehicles, including brand, model, and fuel type.
- **Expense Tracking:** Log and categorize all vehicle-related costs, including fuel, maintenance, insurance, and taxes (IPVA).
- **Maintenance History:** Keep a detailed record of all past services and upcoming maintenance needs to ensure your vehicle stays in peak condition.
- **Authentication & Security:** Secure user authentication with support for password recovery and OTP verification.
- **Service Integration:** Integrated with local services to provide real-time updates and scheduling availability.

## Technologies Used

- **React Native:** Core framework for cross-platform mobile development.
- **Expo:** Development platform and toolkit for React Native.
- **React Navigation:** Robust navigation library for handling app flow (Stack, Tab, Drawer).
- **React Native Paper:** Material Design component library for a consistent UI/UX.
- **Async Storage:** Local data persistence for user preferences and tokens.
- **Context API:** Global state management for authentication and user data.
- **Vector Icons:** High-quality icons via `@expo/vector-icons`.

## Project Structure

- `src/components/`: Reusable UI components (Buttons, Inputs, Modals, etc.).
- `src/screens/`: Main application screens and views.
- `src/Routes/`: Navigation stack configurations (App, Auth, Tab, Drawer).
- `src/Contexts/`: Global state providers and contexts (e.g., `GlobalContext`).
- `src/service/`: API interaction logic and service definitions (e.g., `Api.js`).
- `src/helpers/`: Utility functions and validators (e.g., `emailValidator`).
- `src/model/`: Data models and static data used throughout the app.
- `src/assets/`: Static assets including images and icons.
- `src/core/`: Theme definitions and core project configurations.

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/smartmecanico/smartmecanico-mobile.git
   cd smartmecanico-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on a physical device or emulator:
   - Use the Expo Go app on your phone to scan the QR code.
   - Press `a` for Android emulator or `i` for iOS simulator.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and for internal use only.
