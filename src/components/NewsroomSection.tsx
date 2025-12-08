import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';

const NewsroomSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const news = mustsoData.news;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <section id="newsroom" className="section-padding bg-secondary text-secondary-foreground">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-secondary-foreground">Newsroom</span>
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
            Stay updated with the latest announcements and events from MUSTSO.
          </p>
        </div>

        {/* Hero Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl bg-secondary-foreground/5 backdrop-blur-sm">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {news.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 p-8 md:p-12"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm mb-6">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 text-secondary-foreground rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary w-8'
                    : 'bg-secondary-foreground/30 hover:bg-secondary-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className="bg-secondary-foreground/5 border-secondary-foreground/10 card-hover animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-secondary-foreground/60 mb-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <CardTitle className="text-secondary-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary-foreground/70">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsroomSection;
