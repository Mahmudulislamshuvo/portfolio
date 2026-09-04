import { FaStar as Star } from "react-icons/fa";

export const Reviews = ({ reviews }) => {
  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary inline-block">
            Client{' '}
            <span className="text-accent-text">
              Reviews
            </span>
          </h2>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-bg-card border border-border-subtle hover:border-border-strong rounded-lg p-6 transition-all duration-300 hover:shadow-sm group flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border border-border-subtle group-hover:border-accent-text transition-colors"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary leading-tight">
                      {rev.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {rev.role}, {rev.company}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => {
                    const isFull = i < Math.floor(rev.rating);
                    const isHalf = i === Math.floor(rev.rating) && rev.rating % 1 !== 0;
                    return (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          isFull || isHalf
                            ? 'text-accent-text fill-accent-text'
                            : 'text-border-strong'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Comment */}
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {rev.category && (
                <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Project: {rev.category}</span>
                  <span className="text-accent-text font-mono font-medium">Verified</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};




