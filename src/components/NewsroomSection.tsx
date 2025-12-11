import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';
import leaderPlaceholder from '@/assets/leader-placeholder.png';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

const NewsroomSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const news = mustsoData.news as NewsItem[];

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
    <section id="newsroom" className="pt-24 pb-16 md:pt-28 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gradient-text">Newsroom</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest announcements and events from MUSTSO.
          </p>
        </div>

        {/* Hero Carousel with Images */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {news.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-80 bg-accent overflow-hidden">
                      <img 
                        src={leaderPlaceholder} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:block hidden" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 md:p-8 bg-accent/30 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm mb-4 w-fit">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    </div>
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/70 text-foreground rounded-full"
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
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* News Cards Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card
              key={item.id}
              className="card-hover animate-fade-up opacity-0 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Card Image */}
              <div className="relative h-40 bg-accent">
                <img 
                  src={leaderPlaceholder} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <CardTitle className="text-foreground text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground line-clamp-2">
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
