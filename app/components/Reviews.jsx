import reviewsData from "../data/reviews.json";
import { Star } from "lucide-react";

export function Reviews() {
  return (
    <section id="reviews" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-2">Client <span className="text-blue-500">Reviews</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {reviewsData.map((review) => (
          <div key={review.id} className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
            <div className="flex gap-1 text-yellow-500 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-zinc-300 dark:text-zinc-700" : ""} />
              ))}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 italic flex-grow mb-8">&quot;{review.text}&quot;</p>
            <div className="flex items-center gap-4 mt-auto">
              <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-bold text-sm">{review.name}</div>
                <div className="text-xs text-zinc-500">{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <div className="inline-block p-8 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 w-full md:w-auto">
          <h3 className="text-2xl font-bold mb-2">&quot;Worked with me on a project?&quot;</h3>
          <p className="text-zinc-400 dark:text-zinc-600 mb-6">Your feedback helps me grow and helps others trust my work process.</p>
          <a href="/feedback" className="inline-block px-6 py-3 bg-white dark:bg-black text-black dark:text-white rounded-full font-medium hover:scale-105 transition-transform">
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
}
