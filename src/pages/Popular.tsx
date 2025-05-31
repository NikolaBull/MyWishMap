import React, { useState } from 'react';
import { MapPin, Heart, Users, Star, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';

const Popular = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const popularPlaces = [
    {
      id: 1,
      title: "Эйфелева башня",
      location: "Париж, Франция",
      coordinates: { lat: 48.8584, lng: 2.2945 },
      wishes: 1247,
      rating: 4.9,
      image: "🗼",
      description: "Символ Парижа и самая известная достопримечательность Франции"
    },
    {
      id: 2,
      title: "Мачу-Пикчу",
      location: "Перу",
      coordinates: { lat: -13.1631, lng: -72.5450 },
      wishes: 892,
      rating: 4.8,
      image: "🏔️",
      description: "Древний город инков высоко в Андах"
    },
    {
      id: 3,
      title: "Великая китайская стена",
      location: "Китай",
      coordinates: { lat: 40.4319, lng: 116.5704 },
      wishes: 756,
      rating: 4.7,
      image: "🏯",
      description: "Одно из новых чудес света протяженностью тысячи километров"
    },
    {
      id: 4,
      title: "Санторини",
      location: "Греция",
      coordinates: { lat: 36.3932, lng: 25.4615 },
      wishes: 634,
      rating: 4.9,
      image: "🏖️",
      description: "Романтический остров с белоснежными домами и синими куполами"
    },
    {
      id: 5,
      title: "Северное сияние",
      location: "Исландия",
      coordinates: { lat: 64.9631, lng: -19.0208 },
      wishes: 543,
      rating: 4.8,
      image: "🌌",
      description: "Удивительное природное явление в полярных широтах"
    },
    {
      id: 6,
      title: "Тадж-Махал",
      location: "Индия",
      coordinates: { lat: 27.1751, lng: 78.0421 },
      wishes: 478,
      rating: 4.6,
      image: "🕌",
      description: "Мавзолей-мечеть из белого мрамора, символ вечной любви"
    }
  ];

  const formatWishes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Популярные места
          </h1>
          <p className="text-slate-600 text-lg">
            Самые желанные направления от наших пользователей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              className="backdrop-blur-sm bg-white/80 border-slate-200 hover:bg-white/90 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPlace(place)}
            >
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{place.image}</div>
                <CardTitle className="text-slate-800">
                  {place.title}
                </CardTitle>
                {index < 3 && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    ТОП {index + 1}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{place.location}</span>
                </div>

                <p className="text-slate-600 text-sm">
                  {place.description}
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium">
                      {formatWishes(place.wishes)} желаний
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-600">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Users className="w-4 h-4" />
                  <span>Добавили {place.wishes} пользователей</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Модальное окно с картой */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-3xl">{selectedPlace.image}</span>
                      {selectedPlace.title}
                    </h2>
                    <p className="text-slate-600">{selectedPlace.location}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPlace(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <Map 
                    latitude={selectedPlace.coordinates.lat}
                    longitude={selectedPlace.coordinates.lng}
                    title={selectedPlace.title}
                  />
                </div>
                
                <p className="text-slate-600 mb-4">{selectedPlace.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Heart className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium">
                        {formatWishes(selectedPlace.wishes)} желаний
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-slate-600">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium">{selectedPlace.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Card className="backdrop-blur-sm bg-white/80 border-slate-200 p-6">
            <CardContent>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Не нашли свое место?
              </h3>
              <p className="text-slate-600 mb-4">
                Создайте собственную карту желаний и вдохновите других!
              </p>
              <button 
                onClick={() => window.location.href = '/create'}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Создать желание
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Popular;
