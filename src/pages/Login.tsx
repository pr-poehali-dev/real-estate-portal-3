import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin@estate.com" && password === "admin") {
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему!",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать!",
      });
      navigate("/applications");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Building2" className="text-white" size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl">Вход в систему</CardTitle>
          <CardDescription>Estate Manager</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Нет аккаунта? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Зарегистрироваться
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
              <Icon name="ArrowLeft" size={16} />
              На главную
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
