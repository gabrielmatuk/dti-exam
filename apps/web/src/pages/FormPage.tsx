import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/hooks/use-toast";
import { ApiService } from '@/api';

const apiService = new ApiService();

const Form: React.FC = () => {
  const { toast } = useToast()

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        await apiService.createUser(email, password, username);
        toast({
          title: "Usuário criado",
          variant: "default",
        })
      } else {
        await apiService.login(email, password);
        toast({
          title: "Login realizado",
          variant: "default",
        })
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            {isRegister ? 'Registro de Usuário' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <Label htmlFor="mode">Registrar</Label>
            <Switch
              id="mode"
              checked={isRegister}
              onCheckedChange={setIsRegister}
            />
            <Label htmlFor="mode">Login</Label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {isRegister && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="font-medium">
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  required
                  placeholder="Digite seu username"
                  className="border border-gray-300 focus:ring focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                placeholder="Digite seu email"
                className="border border-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
                placeholder="Digite sua senha"
                className="border border-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading
                ? 'Carregando...'
                : isRegister
                  ? 'Registrar'
                  : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
