# Database Schema

## 1. Overview

This document defines the initial database architecture for **NPQBMS (Question Bank Management System)**.

The database is designed to support:

- Question storage and management
- Subject and topic organization
- Exam/test generation
- User management
- Question analytics
- Import/export operations
- Future AI-assisted question generation

The schema is designed to be scalable and adaptable for web applications, mobile applications, and analytics systems.

---

# 2. Database Design Principles

The database follows these principles:

- Structured academic hierarchy
- Normalized data storage
- Easy question retrieval
- Flexible tagging system
- Support for multiple exam patterns
- Future analytics integration

---

# 3. Core Entities

## 3.1 Questions Table

Stores all questions available in the question bank.

### Fields

| Field | Description |
|---|---|
| Question_ID | Primary key |
| Question_Text | Main question content |
| Question_Type | MCQ, Integer, Assertion, etc. |
| Subject_ID | Linked subject |
| Chapter_ID | Linked chapter |
| Topic_ID | Linked topic |
| Difficulty_Level | Easy, Medium, Hard |
| Marks | Question marks |
| Negative_Marks | Negative marking value |
| Answer_Key | Correct answer |
| Explanation | Solution explanation |
| Created_Date | Creation timestamp |
| Updated_Date | Last update timestamp |

---

# 3.2 Subjects Table

Stores academic subjects.

### Fields

| Field | Description |
|---|---|
| Subject_ID | Primary key |
| Subject_Name | Name of subject |
| Description | Subject details |

### Examples

- Physics
- Chemistry
- Mathematics
- Biology

---

# 3.3 Chapters Table

Stores chapters under each subject.

### Fields

| Field | Description |
|---|---|
| Chapter_ID | Primary key |
| Subject_ID | Foreign key |
| Chapter_Name | Chapter title |
| Chapter_Order | Display order |

---

# 3.4 Topics Table

Stores detailed topic classification.

### Fields

| Field | Description |
|---|---|
| Topic_ID | Primary key |
| Chapter_ID | Foreign key |
| Topic_Name | Topic title |

---

# 3.5 Exams / Tests Table

Stores exam templates and generated tests.

### Fields

| Field | Description |
|---|---|
| Exam_ID | Primary key |
| Exam_Name | Name of exam |
| Exam_Type | Practice/Test/Mock |
| Duration | Exam duration |
| Total_Marks | Total marks |
| Created_Date | Creation date |

---

# 3.6 Exam Questions Table

Mapping table between exams and questions.

### Fields

| Field | Description |
|---|---|
| Exam_ID | Linked exam |
| Question_ID | Linked question |
| Question_Order | Question sequence |
| Marks_Assigned | Marks for question |

---

# 3.7 Users Table

Stores application users.

### Fields

| Field | Description |
|---|---|
| User_ID | Primary key |
| Name | User name |
| Email | User email |
| Role | Admin/Teacher/Student |
| Created_Date | Account creation date |

---

# 3.8 Tags Table

Provides flexible classification.

### Fields

| Field | Description |
|---|---|
| Tag_ID | Primary key |
| Tag_Name | Tag value |

### Examples

- Previous Year
- Important
- Conceptual
- Formula Based

---

# 3.9 Question Tags Table

Many-to-many relationship between questions and tags.

### Fields

| Field | Description |
|---|---|
| Question_ID | Linked question |
| Tag_ID | Linked tag |

---

# 4. Entity Relationships

```
Subjects
    |
    |
Chapters
    |
    |
Topics
    |
    |
Questions
    |
    |
Question Tags
    |
    |
Tags


Exams
    |
    |
Exam Questions
    |
    |
Questions
```

---

# 5. Data Flow

## Question Creation Flow

1. Question is entered manually or imported.
2. Question is assigned to a subject.
3. Chapter and topic classification is added.
4. Difficulty and metadata are assigned.
5. Question becomes available for tests.

---

## Test Generation Flow

1. User selects exam type.
2. System filters questions.
3. Questions are added to an exam.
4. Test paper is generated.
5. Results can be stored for analysis.

---

# 6. Future Database Expansion

Future versions may include:

## Question Attachments

For:

- Images
- Diagrams
- PDFs
- Reference materials

---

## Student Performance

Tracks:

- Attempts
- Accuracy
- Time taken
- Weak areas

---

## AI Question Generation

Stores:

- Generated questions
- AI prompts
- Review status
- Approval history

---

## Question Review History

Tracks:

- Modifications
- Reviewer comments
- Approval workflow

---

## Export History

Tracks:

- Generated PDFs
- Question papers
- Answer keys

---

# 7. Database Status

**Version:** Initial Design

**Status:** Under Development

**Last Updated:** Initial Documentation Phase