# Database Tables Specification

## 1. Overview

This document defines the implementation-level database table structure for NPQBMS.

The design follows a relational database model with proper normalization and relationships between academic content, questions, exams, users, and analytics.

---

# 2. Table: subjects

Stores all academic subjects.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Subject_ID | INT | Primary Key | Unique subject identifier |
| Subject_Name | VARCHAR(100) | | Subject name |
| Description | TEXT | | Subject details |
| Created_Date | DATETIME | | Record creation date |

## Example

| Subject_ID | Subject_Name |
|---|---|
| 1 | Physics |
| 2 | Chemistry |
| 3 | Mathematics |
| 4 | Biology |

---

# 3. Table: chapters

Stores chapters under subjects.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Chapter_ID | INT | Primary Key | Unique chapter identifier |
| Subject_ID | INT | Foreign Key | Related subject |
| Chapter_Name | VARCHAR(150) | | Chapter name |
| Chapter_Order | INT | | Display sequence |

Relationship:

```
subjects
   |
   └── chapters
```

---

# 4. Table: topics

Stores topics under chapters.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Topic_ID | INT | Primary Key | Unique topic identifier |
| Chapter_ID | INT | Foreign Key | Related chapter |
| Topic_Name | VARCHAR(150) | | Topic name |

Relationship:

```
chapters
   |
   └── topics
```

---

# 5. Table: questions

Main question bank table.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Question_ID | INT | Primary Key | Unique question ID |
| Question_Text | TEXT | | Question content |
| Question_Type | VARCHAR(50) | | MCQ, Integer, etc. |
| Subject_ID | INT | Foreign Key | Subject |
| Chapter_ID | INT | Foreign Key | Chapter |
| Topic_ID | INT | Foreign Key | Topic |
| Difficulty_Level | VARCHAR(20) | | Easy/Medium/Hard |
| Marks | DECIMAL | | Marks assigned |
| Negative_Marks | DECIMAL | | Negative marking |
| Answer_Key | VARCHAR(100) | | Correct answer |
| Explanation | TEXT | | Solution explanation |
| Created_Date | DATETIME | | Creation date |
| Updated_Date | DATETIME | | Last update |

---

# 6. Table: question_options

Stores options for multiple-choice questions.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Option_ID | INT | Primary Key | Option identifier |
| Question_ID | INT | Foreign Key | Related question |
| Option_Text | TEXT | | Option content |
| Is_Correct | BOOLEAN | | Correct option flag |

Relationship:

```
questions
    |
    └── question_options
```

---

# 7. Table: tags

Stores reusable question labels.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Tag_ID | INT | Primary Key | Tag identifier |
| Tag_Name | VARCHAR(100) | | Tag name |

Examples:

- Important
- Previous Year
- Formula Based
- Conceptual

---

# 8. Table: question_tags

Many-to-many relationship between questions and tags.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Question_ID | INT | Foreign Key | Question reference |
| Tag_ID | INT | Foreign Key | Tag reference |

Relationship:

```
questions
     |
 question_tags
     |
    tags
```

---

# 9. Table: exams

Stores examination templates.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Exam_ID | INT | Primary Key | Exam identifier |
| Exam_Name | VARCHAR(150) | | Exam title |
| Exam_Type | VARCHAR(50) | | Mock/Test/Practice |
| Duration | INT | | Minutes |
| Total_Marks | INT | | Maximum marks |
| Created_Date | DATETIME | | Creation date |

---

# 10. Table: exam_questions

Maps questions to exams.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| Exam_ID | INT | Foreign Key | Exam reference |
| Question_ID | INT | Foreign Key | Question reference |
| Question_Order | INT | | Display order |
| Marks_Assigned | INT | | Assigned marks |

---

# 11. Table: users

Stores system users.

## Structure

| Column | Data Type | Key | Description |
|---|---|---|---|
| User_ID | INT | Primary Key | User identifier |
| Name | VARCHAR(100) | | User name |
| Email | VARCHAR(150) | | Email address |
| Role | VARCHAR(50) | | Admin/Teacher/Student |
| Created_Date | DATETIME | | Registration date |

---

# 12. Future Tables

## student_attempts

Stores test attempts.

Possible fields:

- Attempt_ID
- User_ID
- Exam_ID
- Score
- Attempt_Date

---

## question_analytics

Stores question usage statistics.

Possible fields:

- Question_ID
- Attempt_Count
- Correct_Count
- Average_Time

---

## question_history

Tracks question modifications.

Possible fields:

- History_ID
- Question_ID
- Modified_By
- Change_Date
- Change_Type

---

# 13. Database Status

Version:

```
1.0 Initial Database Design
```

Status:

```
Ready for Implementation
```

Maintained by:

```
NPQBMS Development Team
```