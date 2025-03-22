import Link from "next/link";
import { ArrowRight, Calendar, Flag } from "lucide-react";

// Current challenge set info
const currentChallengeSet = {
  id: "week0-2025",
  title: "Week 0 - 2025 Challenges",
  dateRange: "March 24 - March 30, 2025",
  description: "This week focuses on application logic flaws and vulnerabilities of web applications.",
  featuredChallenges: [
    {
      name: "login",
      difficulty: "easy"
    },
    {
      name: "jsonweirdtoken",
      difficulty: "medium"
    },
    {
      name: "blogdog",
      difficulty: "hard"
    }
  ]
};

// Map difficulty to color classes
const difficultyClasses = {
  easy: "bg-green-500/20 text-green-500 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-500 border-red-500/30"
};

export default function Home() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) px-4 flex flex-col gap-y-6">
      {/* Intro Section */}
      <section>
        <div className="rounded-none border bg-background">
          <div className="p-6 prose dark:prose-invert">
            <p className="text-sm text-muted-foreground">
              This site is an experimental co-learning project by the Hong Kong
              capture-the-flag (CTF) team <a href="https://ctftime.org/team/83678/" target="_self" className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground">Black Bauhinia</a>.
              Through meticulously curated sets of challenges, we hope to create an
              environment for CTF players to strive and explore new fields and categories.
            </p>
          </div>
        </div>
      </section>

      {/* Current Challenge Section */}
      <section className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Current challenge set</h2>
          <span className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1.5 h-4 w-4" /> {currentChallengeSet.dateRange}
          </span>
        </div>

        <div className="rounded-none border bg-background/50 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{currentChallengeSet.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{currentChallengeSet.description}</p>
          </div>

          <div className="mt-6 mb-6">
            <h4 className="text-base font-semibold mb-3 flex items-center">
              <Flag className="mr-2 h-4 w-4" /> Featured challenges
            </h4>
            <ul className="space-y-2">
              {currentChallengeSet.featuredChallenges.map((challenge) => (
                <li key={challenge.name} className="flex items-center justify-between border-b pb-2">
                  <span>{challenge.name}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors ${difficultyClasses[challenge.difficulty as keyof typeof difficultyClasses]}`}>
                    {challenge.difficulty}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <Link href="/challenges" className="duration-300 ease-in-out inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 group">
              View all challenges <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
