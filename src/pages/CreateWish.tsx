
import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Heart, Plus, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Map from '@/components/Map';

interface WishLocation {
  lat: number;
  lng: number;
  address: string;
}

const CreateWish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<WishLocation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 55.7558, lng: 37.6173 }); // Москва по умолчанию

  useEffect(() => {
    // Получаем текущее местоположение только для центрирования карты
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Оставляем Москву если не удалось получить геолокацию
        }
      );
    }
  }, []);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Ошибка",
        description: "Геолокация не поддерживается вашим браузером",
        variant: "destructive"
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        const address = `Ваше местоположение: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        setLocation({
          lat: latitude,
          lng: longitude,
          address: address
        });

        setMapCenter({ lat: latitude, lng: longitude });
        
        toast({
          title: "Успешно!",
          description: "Текущее местоположение получено",
        });
        
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось получить местоположение. Проверьте разрешения браузера.",
          variant: "destructive"
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    console.log('Location selected:', { lat, lng });
    const address = `Выбранное место: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    setLocation({ lat, lng, address });
    
    toast({
      title: "Место выбрано!",
      description: "Геолокация добавлена к вашему желанию",
    });
  };

  const clearLocation = () => {
    setLocation(null);
    toast({
      title: "Местоположение очищено",
      description: "Выберите новое место на карте",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast({
        title: "Ошибка",
        description: "Заполните название и описание желания",
        variant: "destructive"
      });
      return;
    }

    if (!location) {
      toast({
        title: "Ошибка",
        description: "Выберите местоположение на карте",
        variant: "destructive"
      });
      return;
    }

    const newWish = {
      id: Date.now().toString(),
      title,
      description,
      location,
      createdAt: new Date().toISOString(),
    };

    const existingWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    localStorage.setItem('wishes', JSON.stringify([...existingWishes, newWish]));

    toast({
      title: "Желание создано!",
      description: "Ваше желание добавлено на карту",
    });

    setTitle('');
    setDescription('');
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Создать новое желание
          </h1>
          <p className="text-slate-600 text-lg">
            Выберите место на карте, которое хотите посетить
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма */}
          <Card className="backdrop-blur-sm bg-white/90 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <Heart className="w-6 h-6 text-emerald-500" />
                Детали желания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Название желания *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Например: Посетить Эйфелеву башню"
                    className="bg-white/90 border-slate-300 text-slate-800 placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Описание *
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Расскажите о своей мечте подробнее..."
                    className="bg-white/90 border-slate-300 text-slate-800 placeholder:text-slate-500 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-3">
                    Местоположение *
                  </label>
                  
                  <div className="space-y-3">
                    <Button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      {isGettingLocation ? 'Получение...' : 'Моё местоположение'}
                    </Button>
                    
                    {location && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <div>
                              <p className="text-emerald-800 font-medium text-sm">
                                Место выбрано
                              </p>
                              <p className="text-emerald-700 text-xs">
                                {location.address}
                              </p>
                              <p className="text-emerald-600 text-xs mt-1">
                                Координаты: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={clearLocation}
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                          >
                            Очистить
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить желание
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Карта */}
          <Card className="backdrop-blur-sm bg-white/90 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-500" />
                Выбор местоположения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Map 
                  latitude={mapCenter.lat}
                  longitude={mapCenter.lng}
                  title={location ? "Выбранное место" : undefined}
                  onLocationSelect={handleMapLocationSelect}
                  interactive={true}
                  selectedLocation={location}
                />
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h3 className="text-emerald-800 font-medium text-sm mb-2">
                    Как выбрать место:
                  </h3>
                  <ul className="text-emerald-700 text-xs space-y-1">
                    <li>• Кликните в любое место на карте</li>
                    <li>• Или используйте кнопку "Моё местоположение"</li>
                    <li>• Выбранное место сохранится автоматически</li>
                    <li>• Нажмите на "Выбранное место" чтобы открыть в карте</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateWish;
