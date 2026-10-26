FINAL PROJECT IMPLEMENTATION PROMPT — AUTOCARE AI

1. Project Overview

Build a complete, working enterprise application named AutoCare AI — Smart Vehicle Service & Warranty Assistant.

The application is a Retrieval-Augmented Generation (RAG) chatbot that answers questions about vehicle servicing, maintenance, warranty policies, and related automotive information using eight knowledge bases supplied by my organization.

The chatbot must retrieve relevant information from these knowledge bases, generate accurate answers grounded in the retrieved content, and provide citations for its answers.

Before writing code, inspect the existing project, dependencies, configuration, database assumptions, and supplied knowledge-base files. Reuse existing resources wherever possible.

Do not ask unnecessary clarification questions. Make reasonable implementation decisions based on the actual workspace. If a genuine blocker exists, explain it clearly instead of inventing APIs, configurations, or files.

2. Mandatory Technology Stack

Use the following technologies:

- Java 21
- Spring Boot 3.x
- Spring AI, compatible with the selected Spring Boot version
- Organization-provided Azure OpenAI chat and embedding deployments
- MariaDB 11.8 or later, subject to the actual environment
- Spring JDBC and "JdbcTemplate" where appropriate
- Spring AI-supported vector storage and retrieval
- Maven
- HTML and CSS
- TypeScript for all frontend application logic
- "application.properties" for application configuration

Do not invent Azure deployment names, model names, API endpoints, credentials, or knowledge-base filenames. Inspect existing files and configuration to determine what is available.

Use environment variables for secrets.

3. Strict Project Structure

Keep the Java source structure exactly as follows:

src/main/java/com/autocare/ai/
├── AutoCareApplication.java
├── ChatController.java
└── ChatService.java

Keep the backend resources organized as follows:

src/main/resources/
├── application.properties
├── static/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── ts/
│   │   └── app.ts
│   └── js/
│       └── app.js
└── sql/
    ├── schema.sql
    └── queries.sql

The structure above shows the intended logical organization. If the TypeScript compiler needs to write generated JavaScript outside the static resources during development, configure the output accordingly and copy or package the generated output into the appropriate static location for the application.

Do not add extra Java source files or Java packages.

The frontend must remain minimal. Add only the minimum compiler configuration or build files required to compile TypeScript. Do not create a React project or introduce an unnecessary frontend framework.

Responsibilities of the three Java files

"AutoCareApplication.java"

- Provide the Spring Boot application entry point.
- Use standard Spring Boot component scanning and auto-configuration.
- Avoid unnecessary custom configuration classes.

"ChatController.java"

- Expose the required REST endpoints.
- Validate incoming requests.
- Return consistent JSON responses.
- Delegate business logic to "ChatService".
- Use nested Java records for request and response structures where needed.

"ChatService.java"

Organize the application's service logic into clear methods covering:

- Knowledge-base discovery
- Document ingestion
- Document chunking and embedding coordination
- Semantic retrieval
- RAG orchestration
- Conversation memory
- Query transformation
- Citation handling
- PII protection
- Audit logging
- Role and permission checks
- Fallback responses
- Database operations where appropriate

Use constructor injection and supported Spring-managed dependencies. Do not put the entire application implementation into one enormous method.

4. Database Requirements — Absolutely No Migrations

Do not use Flyway, Liquibase, or any database migration framework.

Specifically:

- Do not add Flyway or Liquibase dependencies.
- Do not create a "db/migration" directory.
- Do not create versioned migration scripts.
- Do not hardcode SQL statements throughout Java code.
- Do not automatically drop, recreate, or overwrite existing database tables.

All manually maintained SQL statements must be stored in these resource files:

"src/main/resources/sql/schema.sql"

"src/main/resources/sql/queries.sql"

"schema.sql"

Store the required database schema definitions, such as necessary tables and indexes for:

- Document metadata and ingestion status
- Document versions and approval status, where available
- Audit records
- Persistent conversation memory, if implemented through JDBC
- Other required application metadata

Only include schema objects actually needed by the implementation.

"queries.sql"

Store reusable SQL statements for operations such as:

- Reading document metadata
- Retrieving active and approved document versions
- Recording ingestion status
- Inserting or updating application metadata
- Recording audit events
- Reading and storing conversation history
- Other necessary database operations

Use descriptive SQL comments to identify the purpose of each query.

SQL execution rules

- Load SQL from the resource files using a maintainable mechanism within the permitted Java classes.
- Use "JdbcTemplate" or an appropriate supported Spring JDBC facility.
- Use parameterized queries for user-provided values.
- Handle individual SQL statements appropriately; do not assume an entire multi-statement SQL file can be executed as one query.
- Make schema initialization configurable and disabled by default if it could modify an existing database.
- Never drop or recreate tables on application startup.
- Do not assume that storing SQL in these files automatically initializes a vector store.
- Use the selected Spring AI vector-store integration's documented initialization and schema requirements.

If the selected vector-store integration requires its own schema initialization, follow its supported mechanism without introducing migrations or inventing SQL syntax.

5. Application Configuration

Put all application configuration in:

"src/main/resources/application.properties"

Include only the required properties for:

- Spring Boot application settings
- MariaDB connection and connection pooling
- Azure OpenAI chat deployment
- Azure OpenAI embedding deployment
- Spring AI vector store
- Document ingestion
- Retrieval parameters
- Conversation memory
- Logging and auditing
- Configurable access-control behavior
- SQL initialization
- Other necessary application features

Read sensitive values from environment variables.

Do not hardcode passwords, API keys, tokens, or other secrets.

Do not create "application.yml", additional application properties files, or Java configuration classes.

6. Knowledge-Base Discovery and Ingestion

My organization has supplied eight knowledge bases.

Inspect the actual workspace and discover the available knowledge bases dynamically. Do not hardcode the names or assume a particular folder layout or file format.

Implement this workflow:

1. Discover the available knowledge bases from the supplied files or configured source locations.
2. Identify their actual formats.
3. Extract text using appropriate parsers.
4. Split documents into useful chunks while preserving relevant context.
5. Generate embeddings using the configured Azure OpenAI embedding deployment.
6. Store the chunks and relevant metadata in the supported vector store.
7. Track ingestion status and source identifiers.
8. Track document versions and effective dates where the source information supports them.
9. Avoid unnecessarily re-ingesting unchanged documents.
10. Support re-ingestion when documents change.
11. Record ingestion errors and provide a way to retry failed ingestion.

Support the actual formats found in the workspace instead of assuming every document is a PDF or Markdown file.

Keep ingestion separate from normal chat requests. Do not re-ingest all eight knowledge bases every time a user asks a question.

7. RAG Pipeline and Semantic Retrieval

Implement a complete RAG pipeline using supported Spring AI APIs.

The expected workflow is:

1. Receive the user's question.
2. Apply appropriate PII protection.
3. Use relevant conversation history.
4. Rewrite contextual follow-up questions when necessary.
5. Optionally expand or transform queries when useful.
6. Generate the query embedding.
7. Retrieve relevant document chunks using semantic similarity.
8. Apply appropriate metadata filters.
9. Assemble the retrieved context.
10. Generate an answer grounded in the retrieved documents.
11. Validate citations against the retrieved sources.
12. Return a safe fallback when the evidence is insufficient.

Use appropriate Spring AI components, such as "RetrievalAugmentationAdvisor", "MessageChatMemoryAdvisor", and "SimpleLoggerAdvisor", if supported by the selected Spring AI version.

Do not assume that an API exists simply because it appears in an example for another version. Verify dependencies, imports, constructors, method signatures, and configuration against the actual project.

8. Answer Accuracy, Grounding, and Citations

The chatbot must:

- Base answers on relevant retrieved knowledge-base content.
- Provide citations identifying the source document and page or section when available.
- Never fabricate citations or claim that a source supports something it does not.
- Clearly distinguish supported facts from uncertain information.
- Ask for clarification when essential vehicle or service details are missing.
- State when the available documents do not provide enough information.
- Recommend contacting an authorized service advisor when an official decision is required.

Never invent:

- Warranty eligibility or coverage
- Warranty exclusions
- Service intervals
- Service prices
- Recall information
- Warranty claim decisions
- Vehicle-specific diagnoses
- Manufacturer policies

Do not present a model-generated answer as verified merely because the model produced it.

9. Conversation Memory

Implement contextual conversation memory so the chatbot can understand follow-up questions.

For example, after a user asks about warranty coverage, the chatbot should understand a follow-up such as, "What about the exclusions?"

Requirements:

- Use supported Spring AI chat-memory components where appropriate.
- Prefer MariaDB-backed persistence if compatible with the chosen implementation.
- If persistent memory is unavailable through the selected integration, use the permitted service class and SQL resource files to implement it.
- Separate conversations using conversation identifiers.
- Enforce access controls so one user cannot access another user's conversation.
- Avoid claiming that in-memory storage persists across application restarts.

10. PII Protection

Implement privacy protection for sensitive identifiers, including:

- VIN
- Vehicle registration number
- Customer ID
- Phone number
- Email address

Requirements:

- Redact sensitive values before external model processing or logging when appropriate.
- Avoid storing unnecessary personal data in audit records.
- Preserve enough information to answer accurately.
- Do not silently alter identifiers in ways that could result in incorrect vehicle-specific information.
- Keep redaction logic maintainable within the permitted Java classes.

Do not claim that redaction guarantees complete protection. Implement reasonable safeguards and test them against representative examples.

11. Audit Logging and Diagnostics

Implement useful application logging and an audit trail.

Record relevant information such as:

- Request or conversation identifier
- Timestamp
- Retrieval outcome
- Source document identifiers
- Ingestion success or failure
- Authorization failures
- Important operational errors
- Response status

Redact sensitive information before logging. Do not log API keys, passwords, or unnecessary personal data.

Use "SimpleLoggerAdvisor" where appropriate and supported.

Store the SQL for persisted audit records in "queries.sql".

Keep diagnostic information useful without exposing internal errors, credentials, or sensitive data to frontend users.

12. Role-Based Access Control

Support these logical roles:

- "VEHICLE_OWNER"
- "SERVICE_ADVISOR"
- "ADMIN"

Apply role checks to appropriate operations, especially administrative knowledge-base ingestion and management.

Do not trust a role supplied directly by an unauthenticated client.

Inspect the existing workspace for an available authentication mechanism. If none exists, implement only what can be done securely within the permitted architecture and clearly identify any external authentication setup still required.

Do not claim production-ready security unless authentication and authorization have actually been implemented and verified.

13. Document Versioning

Where the source data supports it:

- Track document versions and effective dates.
- Prefer active, approved documents.
- Exclude obsolete or superseded documents from current-policy answers.
- Include version information in citations when available.
- Return a fallback when the applicable version cannot be determined reliably.

Do not invent document approval states, effective dates, or version numbers.

14. REST API Requirements

Implement the minimum endpoints needed for the application, including:

- A chat endpoint that accepts the user's question and conversation identifier.
- An endpoint to list discovered knowledge bases.
- An endpoint to check ingestion status.
- An administrative endpoint to initiate ingestion or re-ingestion, with appropriate access control.
- A health or readiness endpoint if required.

Requirements:

- Validate incoming requests.
- Return consistent JSON responses.
- Use appropriate HTTP status codes.
- Keep controller methods small.
- Delegate business logic to "ChatService".
- Never expose stack traces, secrets, or internal database details in API responses.

Do not create unnecessary endpoints.

15. Frontend Requirements — TypeScript Only

Build a minimal, professional frontend using HTML, CSS, and TypeScript.

TypeScript must be the only language used to write frontend application logic. Do not manually write plain JavaScript.

The interface must include:

- AutoCare AI branding and a clean layout
- A chat area showing user and assistant messages
- A message input and Send button
- A loading indicator
- Clear error messages
- Citations displayed with answers
- A conversation identifier
- A knowledge-base or ingestion-status section if supported by the backend

Frontend restrictions

- Use plain HTML and CSS.
- Use TypeScript for event handling, API calls, state management, response parsing, and other frontend logic.
- Do not use React, Angular, Vue, JSX, or another frontend framework.
- Do not create a separate frontend application.
- Do not create unnecessary HTML, CSS, or TypeScript files.
- Do not manually write or maintain compiled JavaScript.
- Do not add dependencies or build tooling that is not required.

Browsers do not execute TypeScript directly. Therefore, configure the TypeScript compiler to generate browser-compatible JavaScript from "app.ts". The generated file is a build artifact, not a manually authored source file.

Use the minimum tooling needed to compile TypeScript and make the generated output available to Spring Boot's static-resource server.

If Node.js, npm, or "tsconfig.json" is required for compilation, add only the minimum necessary setup. Do not introduce a frontend framework or a complex build system.

The frontend must call the real Spring Boot endpoints using the compiled TypeScript output and must work when served by Spring Boot.

16. Error Handling

Handle failures appropriately, including:

- Missing Azure OpenAI configuration
- Azure authentication or deployment errors
- Embedding generation failures
- MariaDB connection failures
- Vector-store initialization or search failures
- Document parsing and ingestion failures
- Empty or insufficient retrieval results
- Invalid requests
- Unauthorized operations
- Missing configuration

Do not fabricate answers when retrieval, embeddings, or model calls fail.

Return clear user-facing messages and record appropriately redacted technical details in server logs.

17. Implementation and Verification Workflow

Follow these steps:

1. Inspect the existing project, Maven dependencies, configuration, database assumptions, and all eight supplied knowledge bases.
2. Identify the exact Spring Boot and Spring AI versions and verify API compatibility.
3. Reuse existing working code and dependencies wherever possible.
4. Maintain exactly three Java source files.
5. Create the required SQL resource files.
6. Configure Azure OpenAI and MariaDB through "application.properties" and environment variables.
7. Implement dynamic knowledge-base discovery and ingestion.
8. Implement embeddings, vector storage, semantic retrieval, and RAG.
9. Implement conversation memory, PII protection, auditing, access checks, and citation validation.
10. Implement the REST endpoints.
11. Implement the HTML/CSS/TypeScript frontend and configure TypeScript compilation.
12. Verify that generated frontend output is served correctly by Spring Boot.
13. Compile the Java backend and TypeScript frontend.
14. Run available tests and fix compilation errors, dependency conflicts, and incorrect API usage.
15. Report any external setup that cannot be performed automatically, such as Azure deployment configuration, database provisioning, or authentication credentials.

Do not stop after producing a plan or example snippets. Implement the application in the existing workspace and verify as much of it as the available environment permits.

18. Final Non-Negotiable Constraints

1. Exactly three Java source files: "AutoCareApplication.java", "ChatController.java", and "ChatService.java".
2. All manually maintained SQL must be in ".sql" files under "src/main/resources/sql/".
3. No Flyway, Liquibase, or database migrations.
4. All application configuration must be in "application.properties".
5. The frontend must use TypeScript for all authored application logic.
6. Do not manually author plain JavaScript. Generated JavaScript is permitted only as compiler output required by the browser.
7. No React, Angular, Vue, JSX, or frontend frameworks.
8. Use only the minimum HTML, CSS, TypeScript, and compiler configuration files necessary.
9. No additional Java classes, DTO files, entities, repositories, configuration classes, advisor classes, or utility classes.
10. No hardcoded credentials, Azure deployment names, or knowledge-base filenames.
11. No destructive database initialization.
12. No fabricated APIs, unsupported SQL syntax, fabricated citations, or invented policy information.
13. Do not claim functionality has been tested unless it has actually been tested.
14. If a strict requirement conflicts with a technical limitation, explain the exact conflict and propose the smallest necessary adjustment rather than silently violating the requirements.

Begin by inspecting the existing workspace. Then implement AutoCare AI according to these requirements, keeping the code minimal, maintainable, compatible with the actual dependencies, and free of unnecessary files.
