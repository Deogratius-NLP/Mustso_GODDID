import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import mustsoData from '@/data/mustsoData.json';

// Import news images
import news1 from '@/assets/news-1.png';
import news2 from '@/assets/news-2.png';
import news3 from '@/assets/news-3.png';

const newsImages: Record<string, string> = {
  'news-1.png': news1,
  'news-2.png': news2,
  'news-3.png': news3,
};

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

  const getNewsImage = (imageName?: string) => {
    if (imageName && newsImages[imageName]) {
      return newsImages[imageName];
    }
    return news1; // fallback
  };

  return (
    <section id="newsroom" className="pt-24 pb-16 md:pt-28 md:pb-20 min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Latest Updates
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">Newsroom</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest announcements and events from MUSTSO.
          </p>
        </div>

        {/* Hero Carousel with Images */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-primary/10">
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
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img 
                        src={getNewsImage(item.image)} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:block hidden" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 md:p-8 bg-secondary/80 flex flex-col justify-center backdrop-blur-sm">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm mb-4 w-fit shadow-lg">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-secondary-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-secondary-foreground/80 line-clamp-3">
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-primary to-secondary w-8'
                    : 'bg-muted-foreground/30 hover:bg-primary/50 w-2.5'
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
              className="group card-hover animate-fade-up opacity-0 overflow-hidden border-0 shadow-lg ring-1 ring-primary/5 hover:ring-primary/20 bg-gradient-to-br from-card to-card/80"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={getNewsImage(item.image)} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
              </div>
              <div className="transition-colors duration-300 group-hover:bg-secondary/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground text-lg group-hover:text-secondary-foreground transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground group-hover:text-secondary-foreground/80 line-clamp-2 transition-colors">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsroomSection;
