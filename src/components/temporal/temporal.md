# This document contain steps required to integrate temporal with vue-flow

## Workflow (workflow.ts): This is the core orchestrator of your business logic.

1. It defines the high-level steps of the money transfer process (withdraw, deposit, refund).
2. It does not contain the actual business logic of interacting with external systems (like banks). Instead, it orchestrates calls to Activities.
3. It manages the flow of control, error handling, and compensation logic (e.g., refunding if a deposit fails).
4. Temporal Workflows are deterministic and replay able, meaning their execution can be replayed from scratch to recover state after failures.

## Activities (activities.ts): These are the actual units of work that interact with external systems or perform specific business operations.

1. In your example, withdraw, deposit, and refund are Activities.
2. They are designed to be idempotent (callable multiple times with the same result) for robustness.
3. Activities are executed by Workers and can be retried independently by the Temporal server if they fail.

## Activity Implementations (banking-client.ts): This file provides the concrete implementation of the operations that the Activities call.

1. It simulates a banking service with withdraw and deposit functions.
2. This is where the actual "business logic" of interacting with a bank (in a real-world scenario, this would involve API calls, database updates, etc.) resides.

## Worker (worker.ts): This component is responsible for:

1. Polling the Temporal Task Queue for new Workflow Tasks and Activity Tasks.
2. Executing Workflow code.
3. Executing Activity code.
4. Communicating with the Temporal Server.
5. Multiple workers can be running concurrently, providing scalability and high availability.

## Client (client.ts): This is the entry point for starting a new Workflow execution.

1. It connects to the Temporal Server.
2. It initiates a Workflow by calling client.start(), passing in the workflow type and arguments.
3. It can also query, signal, or cancel workflows.

## Shared (shared.ts): This file contains common definitions and constants used across different components, such as PaymentDetails type, namespace, and taskQueueName.

## Code %ge

| code file         | temporal specific code | business logic code |
| ----------------- | ---------------------- | ------------------- |
| activities.ts     | 10-15%                 | 85-90%              |
| banking-client.ts | 0%                     | 100%                |
| client.ts         | 80-90%                 | 10-20%              |
| shared.ts         | 50%                    | 50%                 |
| worker.ts         | 90-100%                | 0-10%               |
| workflow.ts       | 40-50%                 | 50-60%              |

## workflow activity

Workflow : Activity is 1 : M (Each Workflow can have multiple Activities)
Workflow -> Many Activity Calls (Conceptual): A Workflow definition uses many different Activity function calls.

# Activity

Activity : Task is 1 : M (Each Activity can have multiple Tasks)
Activity Call -> Many Activity Tasks (Execution Level): A single logical call to an Activity within a Workflow might result in multiple Activity Tasks being generated by the Temporal Server if retries are involved for that specific call.
