import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #eaeaea",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo ou título do site */}
      <h1>EzBusiness</h1>

      {/* Avatar + Botões de Login/Registro */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Avatar>
          <AvatarImage src="" alt="User Avatar" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Link to='/'>
          <Button variant="outline">Registrar</Button>
        </Link>
      </div>
    </header>
  );
}
