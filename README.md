# Salon-Queue-Management-System

**Live demo:** https://salon-queue-management-system-five.vercel.app
**Hosted on:** Vercel.com

## Overview

Salon Queue Management System is a web-based application designed to streamline salon operations by digitizing customer queues and simplifying staff coordination.

Customers can join the queue remotely or as walk-ins, select their preferred services and barber, and track their queue status in real time. Receptionists and barbers can manage customer flow, while salon owners can configure services, manage staff availability, and monitor daily operations.

## Key Features

- **Online Queue Registration:** Customers can join the salon queue remotely by selecting services and a preferred barber.
- **Live Queue Tracking:** View queue position, estimated waiting time, and real-time status updates.
- **Reception Dashboard:** Manage walk-in customers, call the next customer, and handle cancellations and no-shows.
- **Barber Dashboard:** View assigned customers, manage service progress, and update availability.
- **Live Waiting Area Display:** Display currently served customers and upcoming queue tokens.
- **Salon Administration:** Manage services, pricing, service duration, and barber availability.
- **Bilingual Interface:** Support for English and Gujarati.
- **Responsive Design:** Interfaces optimized for mobile phones, tablets, and larger displays.

## Application Modules

| Module | Description |
|---|---|
| Home | Salon information, barber availability, and queue overview |
| Join Queue | Customer registration and service selection |
| My Status | Queue token, position, and estimated waiting time |
| Reception Dashboard | Queue and walk-in management |
| Barber View | Customer service management |
| Waiting Area Display | Live queue information for customers |
| Owner Settings | Service, staff, and queue configuration |

## Queue Management Rules

- Customers are served on a first-come, first-served basis, subject to barber preferences.
- Customers can select a specific barber or choose any available barber.
- Customers selecting a particular barber cannot be assigned to another barber.
- Each barber can serve only one customer at a time.
- Queue statuses progress through Waiting → Called → In Chair → Done.
- Customers can cancel their queue position while waiting.
- Customers who do not arrive within the specified 10-minute calling window can be marked as No-show.
- Re-added no-show customers receive a new token and join at the end of the queue.
- Only one active queue entry is permitted per phone number.

## Technology Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS

**Development Tools**
- Git & GitHub
- Google Antigravity / OpenAI Codex

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_REPOSITORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## Project Structure

```text
salon-queue/
├── docs/
│   ├── 01-brief.md
│   ├── 02-screens.md
│   └── 03-flows-rules.md
├── public/
├── src/
├── AGENTS.md
├── prompts.md
├── package.json
└── README.md
```

*Note: Update this structure to match your actual repository.*

## Deployment

The application is intended to be deployed using:

- **Vercel:** Frontend hosting.
- **Render / Railway:** Backend hosting, if required.

**Live Application:** https://salon-queue-management-system-five.vercel.app

## Assignment Deliverables

- GitHub repository containing the complete source code.
- Live deployed application.
- `prompts.md` documenting prompts used during development.
- Three-minute demonstration video showcasing the main application workflow.
- Short reflection describing an issue encountered during AI-assisted development and how it was identified and resolved.

## Project Context

Developed as part of the MSc IT Vibe Coding Lab assignment.

The application was developed using AI-assisted development practices, with an emphasis on structured documentation, iterative prompting, functional UI implementation, and end-to-end testing.
