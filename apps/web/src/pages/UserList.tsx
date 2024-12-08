import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usersData = [
  {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  }, {
    id: 1,
    name: "Gabriel",
    email: "test@test.com",
    password: "******", // Simulação de senha codificada
    isActive: true,
  },
  {
    id: 2,
    name: "João",
    email: "joao@test.com",
    password: "******", // Simulação de senha codificada
    isActive: false,
  },
  // Outros usuários...
];

export default function UsersList() {
  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead className="text-right">Ativo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((users) => (
            <TableRow key={users.id}>
              <TableCell className="font-medium">{users.name}</TableCell>
              <TableCell>{users.email}</TableCell>
              <TableCell>{users.password}</TableCell>
              <TableCell className="text-right">{users.isActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>

    </div>
  )
}
