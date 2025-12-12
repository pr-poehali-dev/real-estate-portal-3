import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const mockApplications = [
  {
    id: 1,
    name: "Иванов Иван",
    type: "Покупка",
    propertyType: "Квартира",
    area: 75,
    location: "Москва, ул. Ленина",
    estimate: 7500000,
    status: "new",
    date: "2024-12-10"
  },
  {
    id: 2,
    name: "Петрова Мария",
    type: "Аренда",
    propertyType: "Дом",
    area: 150,
    location: "Санкт-Петербург, пр. Невский",
    estimate: 225000,
    status: "in_progress",
    date: "2024-12-09"
  },
  {
    id: 3,
    name: "Сидоров Петр",
    type: "Покупка",
    propertyType: "Коммерческая",
    area: 200,
    location: "Казань, ул. Баумана",
    estimate: 40000000,
    status: "completed",
    date: "2024-12-08"
  },
  {
    id: 4,
    name: "Козлова Анна",
    type: "Аренда",
    propertyType: "Квартира",
    area: 50,
    location: "Москва, ул. Тверская",
    estimate: 50000,
    status: "new",
    date: "2024-12-11"
  },
];

const Admin = () => {
  const statusColors = {
    new: "bg-blue-500",
    in_progress: "bg-yellow-500",
    completed: "bg-green-500"
  };

  const statusLabels = {
    new: "Новая",
    in_progress: "В работе",
    completed: "Завершена"
  };

  const totalApplications = mockApplications.length;
  const newApplications = mockApplications.filter(a => a.status === "new").length;
  const totalValue = mockApplications.reduce((sum, a) => sum + a.estimate, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">Estate Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Администратор</span>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Icon name="LogOut" className="mr-2" size={16} />
                Выйти
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель администратора</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Всего заявок
              </CardTitle>
              <Icon name="FileText" className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Новые заявки
              </CardTitle>
              <Icon name="Bell" className="text-accent" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{newApplications}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Общая сумма
              </CardTitle>
              <Icon name="TrendingUp" className="text-green-600" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(totalValue / 1000000).toFixed(1)}М ₽
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Список заявок</CardTitle>
            <CardDescription>Все поступившие заявки на недвижимость</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>№</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Объект</TableHead>
                    <TableHead>Площадь</TableHead>
                    <TableHead>Местоположение</TableHead>
                    <TableHead>Оценка</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell>{app.propertyType}</TableCell>
                      <TableCell>{app.area} м²</TableCell>
                      <TableCell className="max-w-[200px] truncate">{app.location}</TableCell>
                      <TableCell className="font-semibold">
                        {app.estimate.toLocaleString('ru-RU')} ₽
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                          {statusLabels[app.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{app.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
