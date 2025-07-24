import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Check } from "lucide-react";
import brushTeethImg from "@/assets/brush-teeth.png";
import appleImg from "@/assets/apple.png";
import sunImg from "@/assets/sun.png";

interface ScheduleTask {
  id: string;
  title: string;
  image: string;
  completed: boolean;
  time?: string;
}

const defaultTasks: ScheduleTask[] = [
  {
    id: "1",
    title: "Brush Teeth",
    image: brushTeethImg,
    completed: false,
    time: "8:00 AM"
  },
  {
    id: "2",
    title: "Eat Breakfast", 
    image: appleImg,
    completed: false,
    time: "8:30 AM"
  },
  {
    id: "3",
    title: "Play Outside",
    image: sunImg,
    completed: false,
    time: "10:00 AM"
  }
];

interface ScheduleScreenProps {
  onBack: () => void;
  onHome: () => void;
}

export const ScheduleScreen = ({ onBack, onHome }: ScheduleScreenProps) => {
  const [tasks, setTasks] = useState<ScheduleTask[]>(defaultTasks);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header title="My Daily Tasks" onBack={onBack} onHome={onHome} showHome />
      
      <main className="container px-6 py-8">
        {/* Progress Section */}
        <div className="bg-card rounded-3xl p-6 mb-8 shadow-lg border-2 border-border">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Great Progress! 🌟
            </h2>
            <p className="text-muted-foreground">
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
          
          <div className="w-full bg-muted rounded-full h-4 mb-4">
            <div 
              className="bg-success h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-success">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-all duration-300 ${
                task.completed 
                  ? 'border-success bg-success/10 opacity-75' 
                  : 'border-border hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <GripVertical className="h-6 w-6 text-muted-foreground cursor-grab" />
                
                {/* Task Image */}
                <div className="flex-shrink-0">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-16 h-16 object-contain rounded-xl"
                  />
                </div>

                {/* Task Info */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${
                    task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {task.title}
                  </h3>
                  {task.time && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {task.time}
                    </p>
                  )}
                </div>

                {/* Complete Button */}
                <Button
                  variant={task.completed ? "success" : "outline"}
                  size="icon-lg"
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 ${
                    task.completed ? 'animate-pulse-glow' : ''
                  }`}
                >
                  <Check className="h-8 w-8" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="warning"
            size="lg"
            className="gap-3"
            onClick={() => {
              // In a real app, this would open an add task dialog
              console.log("Add new task");
            }}
          >
            <Plus className="h-6 w-6" />
            Add New Task
          </Button>
        </div>

        {/* Encouragement */}
        {completedCount === tasks.length && tasks.length > 0 && (
          <div className="text-center mt-8 p-6 bg-success/10 rounded-3xl border-2 border-success">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-success mb-2">
              All Done!
            </h3>
            <p className="text-muted-foreground">
              You completed all your tasks today! Great job!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};