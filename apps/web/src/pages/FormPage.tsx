import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Card style={{ width: "400px" }}>
        <CardHeader>
          <CardTitle>Formulário de Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="name">Nome</Label>
              <Input type="text" id="name" placeholder="Digite seu nome" />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Digite seu email" />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="password">Senha</Label>
              <Input type="password" id="password" placeholder="Digite sua senha" />
            </div>

            <Button type="submit">Cadastrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
