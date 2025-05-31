
import React from 'react';
import { Map, Heart, Users, Star, Plus, ArrowRight, Globe, Camera, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/20 to-blue-800/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-20">
          <div className="text-center">
            <div className="text-8xl mb-6">🌍</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Моя Карта
              <span className="bg-gradient-to-r from-yellow-300 to-emerald-300 bg-clip-text text-transparent">
                {" "}Желаний
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Персональное приложение для создания интерактивных карт мест, которые вы мечтаете посетить. 
              Организуйте свои путешествия и следите за реализацией мечт.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/create'}
                className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Создать мечту
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/popular'}
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Исследовать
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Возможности приложения
            </h2>
            <p className="text-gray-600 text-lg">
              Превратите мечты о путешествиях в конкретные планы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Интерактивные карты
                </h3>
                <p className="text-gray-600">
                  Отмечайте места на карте с точными координатами. 
                  Визуализируйте свои мечты на реальной географии.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Детальные описания
                </h3>
                <p className="text-gray-600">
                  Добавляйте подробные описания к каждому месту. 
                  Сохраните все важные детали о ваших планах.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Персональная коллекция
                </h3>
                <p className="text-gray-600">
                  Организуйте неограниченное количество желаний. 
                  Отслеживайте прогресс реализации ваших мечт.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-5xl font-bold text-emerald-600 mb-2">∞</div>
              <div className="text-gray-600 text-lg">Безграничные возможности</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-2">📍</div>
              <div className="text-gray-600 text-lg">Точные локации</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">🎯</div>
              <div className="text-gray-600 text-lg">Достижение целей</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Начните планировать путешествия прямо сейчас
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Создайте свою первую карту желаний и начните превращать мечты в реальность
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/create'}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Star className="w-5 h-5 mr-2" />
            Создать первую карту
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
