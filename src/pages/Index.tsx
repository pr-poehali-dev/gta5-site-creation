import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Новое обновление сервера!',
      content: 'Добавлены новые машины и локации. Присоединяйтесь к игре!',
      date: '15 марта 2024',
      author: 'Администрация'
    },
    {
      id: 2,
      title: 'Турнир по гонкам',
      content: 'Участвуйте в еженедельном турнире и выигрывайте призы!',
      date: '12 марта 2024',
      author: 'Event Manager'
    }
  ]);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUsername(email);
    if (email === 'admin@gta5.ru') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername('');
  };

  const addNews = () => {
    if (newNewsTitle && newNewsContent) {
      const newNewsItem = {
        id: Date.now(),
        title: newNewsTitle,
        content: newNewsContent,
        date: new Date().toLocaleDateString('ru-RU'),
        author: 'Администратор'
      };
      setNews([newNewsItem, ...news]);
      setNewNewsTitle('');
      setNewNewsContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-navy via-gaming-purple to-gaming-navy">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gaming-orange/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gamepad2" className="text-gaming-orange" size={32} />
              <h1 className="text-2xl font-bold text-white">GTA 5 ONLINE</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-white hover:text-gaming-orange transition-colors">Главная</a>
              <a href="#servers" className="text-white hover:text-gaming-orange transition-colors">Серверы</a>
              <a href="#howto" className="text-white hover:text-gaming-orange transition-colors">Как начать</a>
              <a href="#rules" className="text-white hover:text-gaming-orange transition-colors">Правила</a>
              <a href="#donate" className="text-white hover:text-gaming-orange transition-colors">Донат</a>
            </div>

            <div className="flex items-center space-x-2">
              {!isLoggedIn ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gaming-orange hover:bg-gaming-orange/80 text-white">
                      <Icon name="User" size={16} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gaming-navy border-gaming-orange/20">
                    <DialogHeader>
                      <DialogTitle className="text-white">Авторизация</DialogTitle>
                    </DialogHeader>
                    <LoginForm onLogin={handleLogin} />
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-gaming-blue text-gaming-navy">
                    {username}
                  </Badge>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    size="sm"
                    className="border-gaming-orange text-gaming-orange hover:bg-gaming-orange hover:text-white"
                  >
                    Выйти
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(/img/56372028-6017-4344-a2ef-43abf874fb74.jpg)' }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            GTA 5 <span className="text-gaming-orange">ONLINE</span>
          </h1>
          <p className="text-xl text-gaming-blue mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к лучшему серверу GTA 5 RP! Создайте свою историю в Лос-Сантосе.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gaming-orange hover:bg-gaming-orange/80 text-white text-lg px-8 py-4 h-auto"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Начать играть
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gaming-blue text-gaming-blue hover:bg-gaming-blue hover:text-gaming-navy text-lg px-8 py-4 h-auto"
            >
              <Icon name="Download" size={20} className="mr-2" />
              Скачать лаунчер
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="servers" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full bg-black/20 mb-8">
            <TabsTrigger value="servers" className="data-[state=active]:bg-gaming-orange">Серверы</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-gaming-orange">Новости</TabsTrigger>
            <TabsTrigger value="howto" className="data-[state=active]:bg-gaming-orange">Как начать</TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-gaming-orange">Правила</TabsTrigger>
            <TabsTrigger value="donate" className="data-[state=active]:bg-gaming-orange">Донат</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gaming-orange">Профиль</TabsTrigger>
          </TabsList>

          {/* Servers Section */}
          <TabsContent value="servers">
            <div className="grid justify-center">
              <Card className="bg-black/40 border-gaming-orange/20 hover:border-gaming-orange/40 transition-all max-w-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Miami Role Play
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Онлайн
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-gaming-blue">Игроков: 847/1000</p>
                    <p className="text-white text-sm">Режим: RolePlay</p>
                    <p className="text-white text-sm">Регион: Россия</p>
                  </div>
                  <Button className="w-full bg-gaming-orange hover:bg-gaming-orange/80">
                    Подключиться
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* News Section */}
          <TabsContent value="news">
            <div className="space-y-6">
              {isAdmin && (
                <Card className="bg-black/40 border-gaming-orange/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Plus" size={20} className="mr-2 text-gaming-orange" />
                      Добавить новость (Админ-панель)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="newsTitle" className="text-white">Заголовок</Label>
                      <Input
                        id="newsTitle"
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        className="bg-black/20 border-gaming-orange/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsContent" className="text-white">Содержание</Label>
                      <Textarea
                        id="newsContent"
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        className="bg-black/20 border-gaming-orange/20 text-white"
                        rows={4}
                      />
                    </div>
                    <Button onClick={addNews} className="bg-gaming-orange hover:bg-gaming-orange/80">
                      Опубликовать новость
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {news.map((item) => (
                  <Card key={item.id} className="bg-black/40 border-gaming-orange/20">
                    <CardHeader>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gaming-blue">
                        <span>{item.date}</span>
                        <span>Автор: {item.author}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* How to Start Section */}
          <TabsContent value="howto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "Download", title: "1. Скачайте лаунчер", desc: "Установите наш специальный лаунчер для подключения к серверу" },
                { icon: "UserPlus", title: "2. Создайте аккаунт", desc: "Зарегистрируйтесь на сайте и подтвердите email" },
                { icon: "Play", title: "3. Начните играть", desc: "Выберите сервер и создайте своего персонажа" }
              ].map((step, index) => (
                <Card key={index} className="bg-black/40 border-gaming-orange/20 text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gaming-orange rounded-full flex items-center justify-center mb-4">
                      <Icon name={step.icon as any} size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-white">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gaming-blue">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rules Section */}
          <TabsContent value="rules">
            <Card className="bg-black/40 border-gaming-orange/20">
              <CardHeader>
                <CardTitle className="text-white">Правила сервера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-gaming-orange font-semibold">1. Общие правила</h3>
                  <p className="text-white">• Запрещены читы, боты и любые модификации игры</p>
                  <p className="text-white">• Соблюдайте игровую этику и уважайте других игроков</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-gaming-orange font-semibold">2. RolePlay правила</h3>
                  <p className="text-white">• Играйте роль своего персонажа</p>
                  <p className="text-white">• Запрещено использование информации вне игры</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-gaming-orange font-semibold">3. Наказания</h3>
                  <p className="text-white">• Предупреждение → Мут → Кик → Бан</p>
                  <p className="text-white">• За серьезные нарушения - перманентный бан</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donate Section */}
          <TabsContent value="donate">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "VIP", price: "299₽", features: ["Приоритет в очереди", "Эксклюзивные машины", "VIP чат"] },
                { name: "PREMIUM", price: "599₽", features: ["Все VIP привилегии", "Больше денег за работу", "Доступ к закрытым зонам"] },
                { name: "LEGEND", price: "999₽", features: ["Все PREMIUM привилегии", "Кастомные номера", "Личный гараж"] }
              ].map((plan, index) => (
                <Card key={index} className="bg-black/40 border-gaming-orange/20 text-center">
                  <CardHeader>
                    <CardTitle className="text-gaming-orange text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-white">{plan.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-white text-sm">• {feature}</li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gaming-orange hover:bg-gaming-orange/80">
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Section */}
          <TabsContent value="profile">
            {isLoggedIn ? (
              <Card className="bg-black/40 border-gaming-orange/20">
                <CardHeader>
                  <CardTitle className="text-white">Личный кабинет</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gaming-orange font-semibold mb-2">Информация об аккаунте</h3>
                      <p className="text-white">Email: {username}</p>
                      <p className="text-white">Статус: {isAdmin ? 'Администратор' : 'Игрок'}</p>
                      <p className="text-white">Дата регистрации: 15.03.2024</p>
                    </div>
                    <div>
                      <h3 className="text-gaming-orange font-semibold mb-2">Игровая статистика</h3>
                      <p className="text-white">Время в игре: 24 часа</p>
                      <p className="text-white">Уровень: 15</p>
                      <p className="text-white">Деньги: $125,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/40 border-gaming-orange/20 text-center">
                <CardContent className="py-12">
                  <Icon name="User" size={48} className="mx-auto text-gaming-orange mb-4" />
                  <h3 className="text-white text-xl mb-2">Войдите в аккаунт</h3>
                  <p className="text-gaming-blue mb-4">Авторизуйтесь, чтобы получить доступ к личному кабинету</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gaming-orange hover:bg-gaming-orange/80">
                        Войти в аккаунт
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gaming-navy border-gaming-orange/20">
                      <DialogHeader>
                        <DialogTitle className="text-white">Авторизация</DialogTitle>
                      </DialogHeader>
                      <LoginForm onLogin={handleLogin} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gaming-orange/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gaming-blue">© 2024 GTA 5 Online Server. Все права защищены.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Icon name="MessageCircle" size={20} className="text-gaming-blue hover:text-gaming-orange cursor-pointer" />
            <Icon name="Users" size={20} className="text-gaming-blue hover:text-gaming-orange cursor-pointer" />
            <Icon name="Globe" size={20} className="text-gaming-blue hover:text-gaming-orange cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black/20 border-gaming-orange/20 text-white"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white">Пароль</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/20 border-gaming-orange/20 text-white"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" className="bg-gaming-orange hover:bg-gaming-orange/80">
          Войти
        </Button>
        <p className="text-xs text-gaming-blue text-center">
          Для демо: admin@gta5.ru - админ, любой другой email - игрок
        </p>
      </div>
    </form>
  );
}