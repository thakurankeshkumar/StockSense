# StockSense

### Centralized Inventory Management System

StockSense is a full-stack Inventory Management System designed to replace manual registers, spreadsheets, and scattered inventory tracking with a centralized, structured, and easy-to-use platform.

The system provides a single place to manage products, categories, warehouses, storage locations, stock levels, receipts, deliveries, internal transfers, inventory adjustments, and complete stock movement history.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Our Solution](#our-solution)
- [Key Objectives](#key-objectives)
- [Core Features](#core-features)
- [Application Workflow](#application-workflow)
- [Inventory Lifecycle](#inventory-lifecycle)
- [Stock Management Logic](#stock-management-logic)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Authentication and Security](#authentication-and-security)
- [API Documentation](#api-documentation)
- [Frontend Pages](#frontend-pages)
- [Dashboard](#dashboard)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Demo Scenario](#demo-scenario)
- [Example Inventory Calculation](#example-inventory-calculation)
- [Error Handling and Validation](#error-handling-and-validation)
- [Development Guidelines](#development-guidelines)
- [Team Contributions](#team-contributions)
- [Future Improvements](#future-improvements)
- [Project Status](#project-status)
- [License](#license)

---

# Overview

Inventory management becomes difficult when stock information is maintained using manual registers, Excel sheets, or disconnected systems.

StockSense provides a centralized system where inventory-related operations can be performed and tracked from one application.

The system tracks inventory at the **product + location** level, allowing users to understand not only how much stock exists, but also where that stock is currently stored.

The major inventory operations supported by StockSense are:

- Product management
- Category management
- Warehouse management
- Location management
- Stock tracking
- Receipts
- Deliveries
- Internal transfers
- Inventory adjustments
- Stock movement history
- Dashboard monitoring
- Authentication
- Authorization support

---

# Problem Statement

Traditional inventory management often depends on:

- Manual registers
- Excel spreadsheets
- Multiple disconnected records
- Manual stock calculations
- Lack of real-time visibility
- Difficulty tracking stock between locations
- Difficulty identifying low-stock products
- Lack of a centralized movement history

These approaches can make it difficult to answer basic questions such as:

> How much stock do we currently have?

> Where is a particular product stored?

> When was this stock received?

> How much stock was delivered?

> Which location currently contains the product?

> What caused the current stock quantity?

StockSense addresses these problems by maintaining inventory operations and stock movements in a centralized system.

---

# Our Solution

StockSense introduces a centralized inventory workflow.

Instead of directly changing stock quantities manually, inventory is changed through defined business operations.

```text
                  ┌───────────────┐
                  │    Product    │
                  └───────┬───────┘
                          │
                          ↓
                  ┌───────────────┐
                  │     Stock     │
                  │ Product +     │
                  │   Location    │
                  └───────┬───────┘
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
      Receipt          Delivery        Transfer
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                  ┌───────────────┐
                  │   Movement    │
                  │    Ledger     │
                  └───────────────┘
                          ↑
                          │
                     Adjustment