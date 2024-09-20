import PageTitle from "@/components/page-title"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, Calendar, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Study Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +2.5 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Computer Science, Math, Physics, English
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Exams
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Next: Math (in 5 days)
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <LayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card> */}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Math Problem Set",
                "Physics Lab Report",
                "English Essay",
                "CS Project",
              ].map((assignment, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="flex-grow">{assignment}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Due in {index + 1} days
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Study Progress</CardTitle>
            <CardDescription>
              Your study progress across all courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Computer Science", "Mathematics", "Physics", "English"].map(
                (course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{course}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {65 + index * 5}%
                      </span>
                    </div>
                    {/* <Progress value={65 + index * 5} /> */}
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
