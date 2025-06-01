
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Wish {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
}

const Dashboard = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    setWishes(storedWishes);
  }, []);

  const deleteWish = (id: string) => {
    const updatedWishes = wishes.filter(wish => wish.id !== id);
    setWishes(updatedWishes);
    localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    
    toast({
      title: "Удалено",
      description: "Желание удалено из вашей коллекции",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Мои мечты о путешествиях
          </h1>
          <p className="text-gray-600 text-lg">
            Управляйте своими планами и отслеживайте прогресс
          </p>
        </div>

        {wishes.length === 0 ? (
          <Card className="bg-white border-2 border-emerald-100 text-center py-12 shadow-lg">
            <CardContent>
              <Heart className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Пока нет желаний
              </h3>
              <p className="text-gray-600 mb-6">
                Создайте свое первое желание на карте
              </p>
              <Button 
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                Создать желание
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((wish) => (
              <Card key={wish.id} className="bg-white border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-emerald-500" />
                      <span className="truncate">{wish.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteWish(wish.id)}
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    {wish.description}
                  </p>
                  
                  <div className="flex items-start gap-2 text-gray-500 text-xs">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span className="break-all">{wish.location.address}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Создано: {formatDate(wish.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
