# Quiz Components

Interactive quiz components for the Start Here page, providing personalized learning path recommendations.

## Components

### InteractiveQuiz

A multi-step quiz component with progress tracking and answer collection.

**Features:**
- Progress bar showing completion percentage
- Single and multiple choice questions
- Back/Next navigation
- Answer persistence
- Results calculation

**Usage:**
```tsx
import { InteractiveQuiz } from "@/components/quiz";

<InteractiveQuiz
  questions={questions}
  onComplete={(results) => {
    console.log(results);
  }}
/>
```

**Props:**
- `questions`: Array of QuizQuestion objects
- `onComplete`: Callback function called when quiz is completed with QuizResults

### LearningPathRecommendation

Displays personalized learning path recommendations based on quiz results.

**Features:**
- Success message with visual feedback
- Recommended resources list
- Next steps checklist
- Action buttons for navigation
- Email course CTA

**Usage:**
```tsx
import { LearningPathRecommendation } from "@/components/quiz";

<LearningPathRecommendation
  path={learningPath}
  onRestart={() => {
    // Handle quiz restart
  }}
/>
```

**Props:**
- `path`: LearningPath object with title, description, resources, and nextSteps
- `onRestart`: Optional callback to restart the quiz

### QuickWinsChecklist

An interactive checklist component for quick action items.

**Features:**
- Checkbox completion tracking
- Progress bar
- Completion celebration
- Action buttons for each item
- Local state persistence

**Usage:**
```tsx
import { QuickWinsChecklist } from "@/components/quiz";

<QuickWinsChecklist items={quickWins} />
```

**Props:**
- `items`: Array of QuickWin objects with id, title, description, action, and link

## Data Structure

### Quiz Data Format

The quiz data is stored in `src/data/quiz/start-here-quiz.json`:

```json
{
  "questions": [
    {
      "id": "experience",
      "question": "What's your current experience with Bitcoin?",
      "options": ["Option 1", "Option 2"],
      "type": "single"
    }
  ],
  "learningPaths": {
    "beginner": {
      "title": "Bitcoin Basics Path",
      "description": "Start with the fundamentals",
      "resources": ["Resource 1", "Resource 2"],
      "nextSteps": ["Step 1", "Step 2"]
    }
  },
  "quickWins": [
    {
      "id": "calculator",
      "title": "Calculate Your Bitcoin Retirement Number",
      "description": "Use our free calculator",
      "action": "Try Calculator",
      "link": "/content/resources"
    }
  ]
}
```

## Analytics Tracking

The quiz components automatically track the following events:
- `Quiz Started`: When user begins the quiz
- `Quiz Completed`: When user finishes with recommended path

Events are tracked using Plausible Analytics if configured.

## Styling

All components use Tailwind CSS with the project's design system:
- Bitcoin orange (`bitcoin-500`) for primary actions
- Success green for completion states
- Neutral grays for backgrounds and text
- Responsive design with mobile-first approach

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly markup
- Semantic HTML structure
