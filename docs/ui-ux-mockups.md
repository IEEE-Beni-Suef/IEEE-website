# IEEE Management System - UI/UX Design Mockups

## Dashboard Layouts by Role

### Normal Member Dashboard

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph TB
    subgraph "Normal Member Dashboard"
        A[Header with IEEE Logo & Theme Toggle]
        B[Welcome Message with Member Name]
        C[Navigation: Profile - Assignments - Committee - Best Members]

        subgraph "Main Content Area"
            D[Current Assignments Card]
            E[Committee Information Card]
            F[Best Members of the Month Card]
            G[Personal Performance Summary]
        end

        H[Footer]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H

    style A fill:#e1f5fe
    style D fill:#e8f5e8
    style E fill:#e8f5e8
    style F fill:#e8f5e8
    style G fill:#e8f5e8
```

### HR Member Dashboard

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph TB
    subgraph "HR Member Dashboard"
        A[Header with IEEE Logo & Theme Toggle]
        B[Welcome Message with HR Member Name]
        C[Navigation: Profile - Members - Attendance - Behaviors - Reports]

        subgraph "Main Content Area"
            D[Committee Members Overview]
            E[Attendance Tracking Panel]
            F[Behavior Management Panel]
            G[Quick Actions: Rate Attendance, Add Behavior]
            H[Monthly Reports Summary]
        end

        I[Footer]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I

    style A fill:#e1f5fe
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#fff3e0
    style H fill:#fff3e0
```

### Head Member Dashboard

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph TB
    subgraph "Head Member Dashboard"
        A[Header with IEEE Logo & Theme Toggle]
        B[Welcome Message with Head Member Name]
        C[Navigation: Profile - Committee - Assignments - Tasks - Members - Meetings]

        subgraph "Main Content Area"
            D[Committee Overview & Statistics]
            E[Assignment Review Panel]
            F[Task Management Panel]
            G[Member Management Panel]
            H[Meeting Agenda Creator]
            I[Committee Posts Panel]
        end

        J[Footer]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J

    style A fill:#e1f5fe
    style D fill:#f3e5f5
    style E fill:#f3e5f5
    style F fill:#f3e5f5
    style G fill:#f3e5f5
    style H fill:#f3e5f5
    style I fill:#f3e5f5
```

### High Board Member Dashboard

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph TB
    subgraph "High Board Member Dashboard"
        A[Header with IEEE Logo & Theme Toggle]
        B[Welcome Message with High Board Member Name]
        C[Navigation: Profile - All Committees - Events - General Meetings - Leadership - Analytics]

        subgraph "Main Content Area"
            D[Organization Overview & KPIs]
            E[All Committees Management]
            F[Event Planning & Management]
            G[General Meeting Scheduler]
            H[Leadership Rating Panel]
            I[Committee Creation Panel]
            J[Branch Analytics Dashboard]
        end

        K[Footer]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K

    style A fill:#e1f5fe
    style D fill:#e3f2fd
    style E fill:#e3f2fd
    style F fill:#e3f2fd
    style G fill:#e3f2fd
    style H fill:#e3f2fd
    style I fill:#e3f2fd
    style J fill:#e3f2fd
```

## User Interaction Flows

### Assignment Management Flow

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
flowchart TD
    A[Head Member creates assignment] --> B[Assignment appears in member dashboard]
    B --> C[Member works on assignment]
    C --> D[Member submits assignment]
    D --> E[Head Member reviews submission]
    E --> F{Review Result}
    F --> |Approved| G[Assignment marked complete]
    F --> |Needs revision| H[Assignment returned with feedback]
    H --> C
    G --> I[Rating assigned by Head Member]
    I --> J[Rating reflects in member profile]

    style A fill:#f3e5f5
    style E fill:#f3e5f5
    style I fill:#f3e5f5
    style B fill:#e8f5e8
    style J fill:#e8f5e8
```

### Attendance Tracking Flow

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
flowchart TD
    A[Committee meeting scheduled] --> B[Members attend meeting]
    B --> C[HR Member records attendance]
    C --> D[Attendance data saved]
    D --> E[HR Member rates attendance quality]
    E --> F[Rating saved to member profile]
    F --> G[Attendance statistics updated]
    G --> H[Monthly reports generated]

    style C fill:#fff3e0
    style E fill:#fff3e0
    style H fill:#fff3e0
    style B fill:#e8f5e8
    style F fill:#e8f5e8
```

### Committee Creation Flow

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
flowchart TD
    A[High Board Member initiates committee creation] --> B[Fill committee details form]
    B --> C[Select committee head]
    C --> D[Define committee scope and goals]
    D --> E[Create committee in system]
    E --> F[Notify selected head member]
    F --> G[Head member accepts role]
    G --> H[Committee becomes active]
    H --> I[Head can start adding members]

    style A fill:#e3f2fd
    style E fill:#e3f2fd
    style G fill:#f3e5f5
    style I fill:#f3e5f5
```

## Responsive Design Layouts

### Mobile Layout

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph TB
    subgraph "Mobile View (320px - 768px)"
        A[Hamburger Menu]
        B[IEEE Logo]
        C[User Avatar & Role Badge]
        D[Collapsible Navigation]
        E[Stacked Content Cards]
        F[Floating Action Button]
        G[Bottom Navigation]
    end

    A --> D
    B --> C
    C --> E
    E --> F
    F --> G

    style A fill:#ffcdd2
    style E fill:#e8f5e8
    style F fill:#fff3e0
    style G fill:#f3e5f5
```

### Tablet Layout

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph LR
    subgraph "Tablet View (768px - 1024px)"
        A[Side Navigation Panel]
        B[Main Content Area - 2 Column Grid]
        C[Action Panel]
    end

    A --> B
    B --> C

    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#fff3e0
```

### Desktop Layout

```mermaid
---
config:
  layout: elk
  theme: neutral
  themeVariables:
    darkMode: true
---
graph LR
    subgraph "Desktop View (1024px+)"
        A[Fixed Side Navigation]
        B[Header Bar with Actions]
        C[Main Content - 3 Column Grid]
        D[Right Sidebar - Quick Actions]
    end

    A --> B
    B --> C
    C --> D

    style A fill:#e3f2fd
    style B fill:#e1f5fe
    style C fill:#e8f5e8
    style D fill:#fff3e0
```
