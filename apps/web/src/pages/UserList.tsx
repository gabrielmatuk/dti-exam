import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import React from "react";
import { ApiService } from "@/api";
import { User } from "@/types";

const apiService = new ApiService();

export default function UsersList() {
	const [usersData, setUsersData] = React.useState<User[]>([]);

	async function getUsers() {
		const users = await apiService.getUsers();
		setUsersData(users);
	}

	React.useEffect(() => {
		getUsers();
	}, []);
	return (
		<div
			style={{
				padding: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Nome</TableHead>
						<TableHead>Email</TableHead>
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
				<TableFooter></TableFooter>
			</Table>
		</div>
	);
}
