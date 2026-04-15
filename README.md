# 🏦 SwiftCap | Next-Gen Financial Control

SwiftCap is an institutional-grade banking management system that demonstrates the practical implementation of **Complex Data Structures (DSA)** within a modern web architecture.

## 💎 Premium Features
- **Next-Gen UI:** A bespoke, light-themed "Snow & Azure" interface built with pure CSS.
- **Hybrid DSA Engine:** 
  - **Binary Search Tree (BST):** Optimized for $O(\log n)$ account lookups.
  - **Custom LinkedList:** Utilized for sequential transaction history and audit trails.
- **Full Transaction Lifecycle:** Support for account creation, balance inquiries, and secure fund transfers.
- **RESTful API:** Robust backend endpoints for seamless integration.

## 🛠️ Technology Stack
- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Data Structures:** Custom BST & LinkedList implementations (In-memory storage).

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
```powershell
npm install
```

### 3. Launching the System
```powershell
npm start
```
*Access the dashboard at: `http://localhost:3000/app`*

## 📊 Logic & Performance
The system uses a **Hybrid structure**:
- **BST** handles account indexing for fast searches.
- **LinkedList** handles transaction logs for linear, chronological storage.
- **Complexity:** $O(\log n)$ for search/transfer, $O(1)$ for transaction logging.

## 🧪 Testing & Demo
- **Run Unit Tests:** `npm test`
- **Logic Walkthrough:** `npm run demo`
