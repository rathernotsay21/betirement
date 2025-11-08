'use client';

const speakingTestimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'Event Organizer',
    organization: 'Financial Independence Summit',
    content: 'Michael was the highlight of our conference. His authentic story and practical advice resonated with everyone from beginners to experienced investors. Attendees are still talking about his keynote months later.',
    rating: 5,
    image: '/images/testimonials/organizer-1.jpg',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Podcast Host',
    organization: 'The Bitcoin Retirement Podcast',
    content: 'Having Michael on the show was fantastic. He breaks down complex concepts in a way that anyone can understand, and his real-world experience adds credibility that is hard to find. Our listeners loved the episode.',
    rating: 5,
    image: '/images/testimonials/host-1.jpg',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Conference Director',
    organization: 'Crypto Investing Conference',
    content: 'Professional, prepared, and engaging. Michael delivered exactly what we needed—actionable insights backed by personal experience. He was easy to work with and our attendees gave him the highest ratings.',
    rating: 5,
    image: '/images/testimonials/director-1.jpg',
  },
  {
    id: 4,
    name: 'Robert Williams',
    role: 'Corporate Event Planner',
    organization: 'Tech Corp Annual Meeting',
    content: 'We brought Michael in to speak to our employees about financial planning and Bitcoin. He tailored his presentation perfectly to our audience and sparked great conversations. Highly recommend!',
    rating: 5,
    image: '/images/testimonials/planner-1.jpg',
  },
];

export function SpeakingTestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Event Organizers Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from hosts, organizers, and attendees who've experienced Michael's presentations firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {speakingTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-bitcoin-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-neutral-700 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-bitcoin-500 to-bitcoin-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.organization}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-bitcoin-500 mb-2">25+</div>
              <div className="text-neutral-600">Speaking Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-bitcoin-500 mb-2">15+</div>
              <div className="text-neutral-600">Podcast Appearances</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-bitcoin-500 mb-2">4.9/5</div>
              <div className="text-neutral-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-bitcoin-500 mb-2">100%</div>
              <div className="text-neutral-600">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
