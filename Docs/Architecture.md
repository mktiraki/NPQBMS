# NPQBMS Architecture

## Overview

NPQBMS follows a modular architecture designed to separate:

- Data storage
- Business logic
- Import processing
- User interaction
- Analytics

The system is built to allow future expansion without rewriting the core engine.

---

# High-Level Architecture
                INPUT SOURCES

    PDF       Manual Entry       AI Generation
      │             │                  │
      └─────────────┴──────────────────┘
                    │
                    ▼

          Import / Processing Layer

                    │
                    ▼

          Question Processing Engine

                    │

    ┌───────────────┼────────────────┐
    │               │                │
    ▼               ▼                ▼
        │               │                │
    └───────────────┼────────────────┘
                    │
                    ▼

            Search & Analytics

                    │
                    ▼

          Question Paper Generator
          
---

# Core Modules

## 1. Question Engine

Responsible for:

- Creating questions
- Validating question data
- Duplicate detection
- Generating Question IDs
- Storing question metadata

Main file:

---

# 2. Concept Engine

Responsible for managing:

- Physics concepts
- Chapter mapping
- Concept IDs
- Learning hierarchy

Main file:

---

# 3. Occurrence Engine

Tracks where a question appeared.

Example:

A question may appear in:
CBSE 2024
NEET 2025
JEE Main 2026

Instead of storing duplicate questions, NPQBMS stores one question with multiple occurrences.

Main file:

---

# 4. Variant Engine

Handles questions that are:

- Reworded
- Numerically changed
- Same concept, different format

Main file:

---

# 5. ID Generation Engine

Provides unique identifiers.

Examples:

Question:
PHY11-WAV-000001

Concept:
CON-000001

Occurrence:
OCC-000001

Main file:
ID.gs

---

# 6. Audit System

Every important operation is recorded.

Examples:
CREATE QUESTION
CREATE CONCEPT
CREATE OCCURRENCE
UPDATE DATA

Purpose:

- Debugging
- Data tracking
- Reliability

---

# Database Design

NPQBMS uses a relational database model implemented using Google Sheets.

Main tables:

| Table | Purpose |
|-|-|
| Question_Master_DB | Stores questions |
| Concept_DB | Stores concepts |
| Occurrence_DB | Stores exam appearances |
| Variant_DB | Stores question relationships |
| ID_Counter | Generates unique IDs |
| Audit_Log | Tracks activities |

---

# Future Architecture

Future versions will introduce:

## Import Engine

Handles:

- PDF extraction
- OCR
- Question detection
- Metadata extraction

---

## Search Engine

Provides:

- Full text search
- Concept search
- Chapter filtering
- Difficulty filtering

---

## AI Processing Layer

Future AI capabilities:

- Automatic concept classification
- Duplicate detection
- Difficulty prediction
- Solution generation assistance

---

# Design Principles

NPQBMS follows:

## Modularity

Each component has a specific responsibility.

## Scalability

New features can be added without modifying existing systems.

## Data Integrity

Questions, concepts, and occurrences remain correctly linked.

## Maintainability

Code and documentation are structured for long-term development.

---

# Current Version
NPQBMS v0.1 Alpha

Development Status:

Backend foundation completed.